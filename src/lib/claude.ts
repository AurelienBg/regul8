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
): Promise<{ activities: string[]; jurisdictions: string[]; reasoning: string }> {
  const systemPrompt = `You classify crypto/fintech startup descriptions into a fixed vocabulary.

You MUST respond with a single JSON object, no prose before or after, of the shape:
{
  "activities": ["..."],   // 1-5 codes from the ALLOWED_ACTIVITIES list below
  "jurisdictions": ["..."], // 1-5 codes from the ALLOWED_JURISDICTIONS list below
  "reasoning": "..."        // 2-3 sentences, ${locale === 'fr' ? 'in French' : 'in English'}, explaining the choice
}

ALLOWED_ACTIVITIES = ${JSON.stringify(allowedActivities)}
ALLOWED_JURISDICTIONS = ${JSON.stringify(allowedJurisdictions)}

Rules:
- Only return codes from the two lists above.
- If the user does not specify a jurisdiction, infer from context (language, currency, market cues) or default to ["eu"] if genuinely unclear.
- Prefer fewer, sharper selections over many vague ones (1-3 items of each is typical).
- If the description is too vague or unrelated to a crypto business, return empty arrays with reasoning explaining why.
- Respond ONLY with the JSON — no markdown, no explanation.`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 512,
    system: systemPrompt,
    messages: [{ role: 'user', content: description }],
  });

  const block = message.content[0];
  const text = block.type === 'text' ? block.text : '';

  try {
    const cleaned = text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    const parsed = JSON.parse(cleaned) as {
      activities?: unknown;
      jurisdictions?: unknown;
      reasoning?: unknown;
    };
    const activities = Array.isArray(parsed.activities)
      ? parsed.activities.filter((x): x is string => typeof x === 'string' && allowedActivities.includes(x))
      : [];
    const jurisdictions = Array.isArray(parsed.jurisdictions)
      ? parsed.jurisdictions.filter((x): x is string => typeof x === 'string' && allowedJurisdictions.includes(x))
      : [];
    const reasoning = typeof parsed.reasoning === 'string' ? parsed.reasoning : '';
    return { activities, jurisdictions, reasoning };
  } catch {
    return { activities: [], jurisdictions: [], reasoning: '' };
  }
}
