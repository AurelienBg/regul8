import { NextResponse } from 'next/server';
import { lookupRegulation } from '@/lib/regulations-lookup';
import { analyzeCompliance } from '@/lib/claude';
import type { ActivityKey, Jurisdiction } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { activity, jurisdiction, subtype, stage, model, chain } = body as {
      activity: ActivityKey;
      jurisdiction: Jurisdiction;
      subtype?: string;
      stage?: string;
      model?: string;
      chain?: string;
    };

    const result = lookupRegulation(activity, jurisdiction);
    if (!result) {
      return NextResponse.json(
        { error: 'No regulation data found for this combination' },
        { status: 404 }
      );
    }

    // Build prompt for Claude enrichment
    const prompt = `Analyze compliance requirements for a crypto startup with the following profile:
- Activity: ${activity}${subtype ? ` (${subtype})` : ''}
- Jurisdiction: ${jurisdiction.toUpperCase()}
- Stage: ${stage || 'not specified'}
- Business model: ${model || 'not specified'}
- Blockchain: ${chain || 'not specified'}

Regulatory context (from our database):
- Regime: ${result.regime}
- Risk level: ${result.risk}
- Required licences: ${result.licenses.join(', ')}
- Key obligations: ${result.obligations.join(', ')}
- Timeline: ${result.time}
- Cost: ${result.cost}
- Authority: ${result.authority}
${result.xrplNote ? `- XRPL note: ${result.xrplNote}` : ''}
${result.custodyNote ? `- Custody note: ${result.custodyNote}` : ''}

Based on this context, provide:
1. A compliance roadmap (3-5 numbered steps)
2. Key risks to watch (2-3 bullet points)
3. A checklist of immediate actions (3-5 items)

Be concise and actionable. Use the language of this message.`;

    let narrative = '';
    let checklist: string[] = [];

    try {
      const aiResponse = await analyzeCompliance(prompt);
      // Parse the AI response into narrative and checklist
      const checklistMatch = aiResponse.match(/(?:checklist|actions? immédiates?|immediate actions?)[\s\S]*?(?:\d+[.)]\s*(.+?)(?:\n|$))+/i);
      if (checklistMatch) {
        const checklistSection = aiResponse.slice(aiResponse.indexOf(checklistMatch[0]));
        checklist = checklistSection
          .split('\n')
          .filter((l) => /^\d+[.)]\s/.test(l.trim()))
          .map((l) => l.replace(/^\d+[.)]\s*/, '').trim())
          .filter(Boolean);
        narrative = aiResponse.slice(0, aiResponse.indexOf(checklistMatch[0])).trim();
      } else {
        narrative = aiResponse;
      }
    } catch {
      // If Claude API fails, return the structured data without AI enrichment
      narrative = '';
      checklist = [];
    }

    return NextResponse.json({ result, narrative, checklist });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
