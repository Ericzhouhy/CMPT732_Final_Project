import React from 'react';
import { FlipWords } from '../ui/flip-words';

export function FlipWordsController() {
  const words = ['Amazon reviews', 'Temu sales', 'both platforms'];

  return (
    <div className="h-[18rem] flex justify-center items-center px-4 mt-[-1rem] mb-8">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Datasets
        <FlipWords words={words} /> <br />
        we use in our project
      </div>
    </div>
  );
}
