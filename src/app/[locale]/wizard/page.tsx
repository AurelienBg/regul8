'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import type { ActivityKey, Jurisdiction, WizardAnswers } from '@/types';
import StepActivity from '@/components/wizard/StepActivity';
import StepSubtype from '@/components/wizard/StepSubtype';
import StepJurisdiction from '@/components/wizard/StepJurisdiction';
import StepProfile from '@/components/wizard/StepProfile';

const TOTAL_STEPS = 4;

export default function WizardPage() {
  const t = useTranslations('wizard');
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({});

  const update = (patch: Partial<WizardAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  };

  const canNext = () => {
    if (step === 1) return !!answers.activity;
    if (step === 2) return true; // subtype is optional
    if (step === 3) return !!answers.jurisdiction;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Navigate to report with query params
      const params = new URLSearchParams();
      if (answers.activity) params.set('activity', answers.activity);
      if (answers.subtype) params.set('subtype', answers.subtype);
      if (answers.jurisdiction) params.set('jurisdiction', answers.jurisdiction);
      if (answers.stage) params.set('stage', answers.stage);
      if (answers.model) params.set('model', answers.model);
      if (answers.chain) params.set('chain', answers.chain);
      router.push(`/report?${params.toString()}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">{t('title')}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {t('step', { current: step, total: TOTAL_STEPS })}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      {step === 1 && (
        <StepActivity
          selected={answers.activity}
          onSelect={(activity: ActivityKey) => update({ activity })}
        />
      )}
      {step === 2 && (
        <StepSubtype
          activity={answers.activity!}
          selected={answers.subtype}
          onSelect={(subtype: string) => update({ subtype })}
        />
      )}
      {step === 3 && (
        <StepJurisdiction
          selected={answers.jurisdiction}
          onSelect={(jurisdiction: Jurisdiction) => update({ jurisdiction })}
        />
      )}
      {step === 4 && (
        <StepProfile
          answers={answers}
          onUpdate={update}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
        >
          {t('back')}
        </button>
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === TOTAL_STEPS ? t('generate') : t('next')} &rarr;
        </button>
      </div>
    </div>
  );
}
