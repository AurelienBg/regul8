import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export const SYSTEM_PROMPT = `You are Regul8, an expert in global crypto and blockchain compliance.

You have deep knowledge of:
- EU: MiCA (CASP, EMT, ART, Utility Tokens), DASP (AMF France), DLT Pilot Regime, JONUM
- USA: FinCEN MSB, State MTLs, BitLicense, SEC Howey Test, CFTC jurisdiction
- UAE: VARA Dubai, FSRA ADGM
- Singapore: MAS PSA (MPI/SPI), DPT framework
- UK: FCA crypto registration, Consumer Duty, CASS
- Hong Kong: SFC VASP (VATP), AMLO
- Switzerland: FINMA DLT Act, VQF/SRO, FinTech licence
- Liechtenstein: TVTG (all 14 SP service types)
- FATF Travel Rule, AML/KYC/KYB best practices

XRPL-specific expertise:
- XRP legal status (SEC v. Ripple July 2023)
- XRPL EVM Sidechain regulatory treatment
- AMM XLS-30 (native DEX + AMM)
- NFT XLS-20 (non-custodial broker mode)
- MPT XLS-33 (programmable tokens, no MiCA category yet)
- RLUSD (EMT reference implementation on XRPL)
- Custody methods: SignerList, MPC/TSS, Escrow, Payment Channels, IOU/Trust Lines, Checks

Given the startup profile provided, generate:
1. A clear compliance roadmap (step-by-step, 3-5 steps)
2. Key risks to watch
3. A practical checklist of immediate actions

Be specific, actionable, and honest about grey zones.
Always end with: "This is general information only. Consult a qualified lawyer for advice specific to your situation."

Respond in the same language as the request (FR or EN).`;

export async function analyzeCompliance(prompt: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = message.content[0];
  return block.type === 'text' ? block.text : '';
}

export async function* streamSearch(query: string): AsyncGenerator<string> {
  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: query }],
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      yield event.delta.text;
    }
  }
}

/**
 * Classify a freeform startup description into structured activities + jurisdictions.
 * Used by /api/classify → /assess step-0 ("Describe your startup").
 *
 * Keeps token usage tiny: haiku model, max 512 tokens, forced JSON output.
 */
export async function classifyStartup(
  description: string,
  locale: 'en' | 'fr',
  allowedActivities: readonly string[],
  allowedJurisdictions: readonly string[],
): Promise<{
  activities: string[];
  jurisdictions: string[];
  other: string;
  reasoning: string;
}> {
  const systemPrompt = `You classify crypto/fintech startup descriptions into a fixed vocabulary.

You MUST respond with a single JSON object, no prose before or after, of the shape:
{
  "activities": ["..."],   // 1-5 codes from the ALLOWED_ACTIVITIES list below
  "jurisdictions": ["..."], // 1-5 codes from the ALLOWED_JURISDICTIONS list below
  "other": "...",           // Short label (3-8 words) for any activity described that does NOT fit the list. "" if everything fits.
  "reasoning": "..."        // 2-3 sentences, ${locale === 'fr' ? 'in French' : 'in English'}, explaining the choice
}

ALLOWED_ACTIVITIES = ${JSON.stringify(allowedActivities)}
ALLOWED_JURISDICTIONS = ${JSON.stringify(allowedJurisdictions)}

Rules:
- Only return codes from the two lists above in "activities" and "jurisdictions".
- **Jurisdictions — STRICT rule**: only return jurisdictions EXPLICITLY mentioned by the user. Do NOT add adjacent, regional, neighbouring, corridor-partner, or "commonly associated" jurisdictions, even if they seem natural. Example: "cross-border payment from US to Nigeria" → ["us", "ng"] ONLY, never add Kenya/Ghana/South Africa even though they are common African corridor markets. If the description genuinely implies an unnamed jurisdiction (e.g. "serving French users" → "eu"), that's fine — but "implied by geography/corridor" is NOT sufficient.
- If the user does not specify any jurisdiction at all, infer from clear context (language, currency, market cues) or default to ["eu"] if genuinely unclear. Do not infer more than 1 juri when nothing is explicit.
- Prefer fewer, sharper selections over many vague ones (1-3 items of each is typical).
- Activities are less strict than jurisdictions — you can infer activities that are clearly implied by the description (e.g. "users can buy crypto with EUR" → onramp_offramp even if not spelled out).
- If the description mentions something that doesn't cleanly fit any listed activity code (e.g., insurance protocol, prediction market, DAO tooling, identity/DID, oracle network, mining pool, broker/OTC desk, crypto-card issuance), set "other" to a concise label for it (e.g., "prediction market", "crypto insurance protocol", "crypto-card issuance"). "other" is optional — leave "" when everything fits.
- In "reasoning", be explicit about any gap: e.g., "Note: the description also mentions <X> which is not in our activity taxonomy — treat as a known gap."
- If the description is too vague or unrelated to a crypto business, return empty arrays and an empty "other" with reasoning explaining why.
- Respond ONLY with the JSON — no markdown, no explanation.`;

  // Use the same model as the rest of the app (analyzeCompliance / streamSearch).
  // We previously tried a haiku-tier model for cost, but the exact name isn't
  // reliable to hardcode across SDK versions — stick with the known-good one.
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    system: systemPrompt,
    messages: [{ role: 'user', content: description }],
  });

  const block = message.content[0];
  const text = block.type === 'text' ? block.text : '';

  // Extract JSON robustly — handles markdown fences, leading/trailing prose,
  // and models that respond with "Here's the classification: {...}".
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  const jsonText =
    firstBrace !== -1 && lastBrace > firstBrace
      ? text.slice(firstBrace, lastBrace + 1)
      : text.trim();

  try {
    const parsed = JSON.parse(jsonText) as {
      activities?: unknown;
      jurisdictions?: unknown;
      other?: unknown;
      reasoning?: unknown;
    };
    const activities = Array.isArray(parsed.activities)
      ? parsed.activities.filter((x): x is string => typeof x === 'string' && allowedActivities.includes(x))
      : [];
    const jurisdictions = Array.isArray(parsed.jurisdictions)
      ? parsed.jurisdictions.filter((x): x is string => typeof x === 'string' && allowedJurisdictions.includes(x))
      : [];
    const other = typeof parsed.other === 'string' ? parsed.other.trim().slice(0, 80) : '';
    const reasoning = typeof parsed.reasoning === 'string' ? parsed.reasoning : '';
    return { activities, jurisdictions, other, reasoning };
  } catch (err) {
    console.error('[classifyStartup] JSON parse failed. Raw text:', text, 'Error:', err);
    return { activities: [], jurisdictions: [], other: '', reasoning: '' };
  }
}
