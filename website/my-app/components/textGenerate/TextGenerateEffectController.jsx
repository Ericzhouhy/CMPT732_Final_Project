'use client';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const words = `Welcome to CMPT732_ALLIN Project`;

export function TextGenerateEffectController() {
  return <TextGenerateEffect words={words} />;
}
