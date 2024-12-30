'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { TimelineController } from '../../components/timeLine/TimelineController';
import { AnimatedTestimonialsController } from '../../components/animatedForUsers/AnimatedController';
import { SparklesPreview } from '../../components/sparkEffect/SparklesPreview';
function Page() {
  const [showTransition, setShowTransition] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {showTransition ? (
        <div className="h-7/8 w-7/8 flex items-center justify-center">
          <SparklesPreview />
        </div>
      ) : (
        <div className="flex min-h-screen">
          <div className="w-2/3 flex items-center justify-center bg-gray-100">
            <TimelineController />
          </div>

          <div className="w-1/3 h-1/3 flex items-center justify-center">
            <AnimatedTestimonialsController />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
