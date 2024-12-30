'use client';
import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { TracingBeam } from '../ui/tracing-beam';
import { cn } from '@/lib/utils';
import logo from '@/public/images/amazon-vs-temu.jpg';

export function TracingBeamController() {
  return (
    <TracingBeam className="px-6">
      <div className="max-w-4xl mx-auto antialiased pt-4 pb-8 relative h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <p className={twMerge(cn('text-4xl mb-4', 'font-sans'))}>
              {item.title}
            </p>

            <div className="text-3xl prose prose-lg dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: 'Final Project‘s introduction',
    description: (
      <>
        <p>
          By tackling challenges like handling heterogeneous datasets,
          processing high-dimensional data, and optimizing models, this project
          demonstrates the effective use of distributed systems, machine
          learning, and web technologies to deliver actionable insights and
          practical solutions.
        </p>
      </>
    ),
    image: logo,
  },
  {
    description: (
      <>
        <p>
          To handle large-scale data, Apache Spark and HDFS were implemented,
          addressing memory limitations in Python and enabling efficient
          preprocessing and analysis of high-dimensional data. This ensured
          scalability and performance for the project’s analytical tasks.
        </p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>
          The focus was on two predictive modeling tasks: predicting review
          ratings from textual data and classifying products into categories
          using product names. Traditional models like Random Forest provided
          reliable baselines, while fine-tuned deep learning models such as
          facebook/bart-base delivered superior accuracy by leveraging
          contextual text information.
        </p>
      </>
    ),
  },
  {
    description: (
      <>
        <p>
          A key outcome was an interactive web application developed with
          Next.js and FastAPI. It featured dynamic visualizations and real-time
          predictions, offering an intuitive user experience. Deployment on AWS
          and Vercel ensured scalability and reliability.
        </p>
      </>
    ),
  },
];
