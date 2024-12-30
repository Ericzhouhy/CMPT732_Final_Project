import Image from 'next/image';
import React from 'react';
import { Timeline } from '@/components/timeLine/timeline';

export function TimelineController() {
  const data = [
    {
      title: '10.15 -10.25',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-8">
            Doing data selection, data clean for the whole project.
          </p>
          <div className="w-full">
            <Image
              src="/images/timeline1.jpg"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: '10.25 - 11.5',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-8">
            Amazon product data visualization and rating prediction using neural
            networks (not used due to low accuracy).
          </p>
          <div className="w-full">
            <Image
              src="/images/timeline2.jpg"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: '11.6-11.10',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-4">
            Creation of a review polarity model and Amazon product and category
            prediction using the BART model
          </p>
          <div className="w-full mb-4">
            <Image
              src="/images/timeline5.jpg"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <div className="w-full">
            <Image
              src="/images/timeline6.jpg"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: '11.11-11.20',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-8">
            Representative words analysis and Amazon rating prediction by
            reviews using a random forest classifier.
          </p>
          <div className="w-full">
            <Image
              src="/images/timeline4.png"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover h-auto w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: '11.21-11.30',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-4">
            Connected saved model with our project web for demo
          </p>
          <div className="w-full mb-4">
            <Image
              src="/images/analysis1.png"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
          <div className="w-full">
            <Image
              src="/images/analysis2.png"
              alt="hero template"
              width={1000}
              height={500}
              className="rounded-lg object-cover w-full h-auto shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
