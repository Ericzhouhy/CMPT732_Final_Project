// 'use client';

// import { AnimatePresence, motion } from 'framer-motion';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { cn } from '@/lib/utils';

// export function PlaceholdersAndVanishInput({
//   placeholders,
//   onChange,
//   onSubmit,
// }) {
//   const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
//   const intervalRef = useRef(null);
//   const startAnimation = () => {
//     intervalRef.current = setInterval(() => {
//       setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
//     }, 3000);
//   };
//   const handleVisibilityChange = () => {
//     if (document.visibilityState !== 'visible' && intervalRef.current) {
//       clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
//       intervalRef.current = null;
//     } else if (document.visibilityState === 'visible') {
//       startAnimation(); // Restart the interval when the tab becomes visible
//     }
//   };

//   useEffect(() => {
//     startAnimation();
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [placeholders]);

//   const canvasRef = useRef(null);
//   const newDataRef = useRef([]);
//   const inputRef = useRef(null);
//   const [value, setValue] = useState('');
//   const [categoryValue, setCategoryValue] = useState('');
//   const [animating, setAnimating] = useState(false);
//   const [rating, setRating] = useState(null);
//   const [category, setCategory] = useState(null);
//   const currentHour = new Date().getHours();
//   const isDayTime = currentHour >= 6 && currentHour < 18;

//   const draw = useCallback(() => {
//     if (!inputRef.current) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     canvas.width = 800;
//     canvas.height = 800;
//     ctx.clearRect(0, 0, 800, 800);
//     const computedStyles = getComputedStyle(inputRef.current);

//     const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
//     ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
//     ctx.fillStyle = '#FFF';
//     ctx.fillText(value, 16, 40);

//     const imageData = ctx.getImageData(0, 0, 800, 800);
//     const pixelData = imageData.data;
//     const newData = [];

//     for (let t = 0; t < 800; t++) {
//       let i = 4 * t * 800;
//       for (let n = 0; n < 800; n++) {
//         let e = i + 4 * n;
//         if (
//           pixelData[e] !== 0 &&
//           pixelData[e + 1] !== 0 &&
//           pixelData[e + 2] !== 0
//         ) {
//           newData.push({
//             x: n,
//             y: t,
//             color: [
//               pixelData[e],
//               pixelData[e + 1],
//               pixelData[e + 2],
//               pixelData[e + 3],
//             ],
//           });
//         }
//       }
//     }

//     newDataRef.current = newData.map(({ x, y, color }) => ({
//       x,
//       y,
//       r: 1,
//       color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
//     }));
//   }, [value]);

//   useEffect(() => {
//     draw();
//   }, [value, draw]);

//   const animate = (start) => {
//     const animateFrame = (pos = 0) => {
//       requestAnimationFrame(() => {
//         const newArr = [];
//         for (let i = 0; i < newDataRef.current.length; i++) {
//           const current = newDataRef.current[i];
//           if (current.x < pos) {
//             newArr.push(current);
//           } else {
//             if (current.r <= 0) {
//               current.r = 0;
//               continue;
//             }
//             current.x += Math.random() > 0.5 ? 1 : -1;
//             current.y += Math.random() > 0.5 ? 1 : -1;
//             current.r -= 0.05 * Math.random();
//             newArr.push(current);
//           }
//         }
//         newDataRef.current = newArr;
//         const ctx = canvasRef.current?.getContext('2d');
//         if (ctx) {
//           ctx.clearRect(pos, 0, 800, 800);
//           newDataRef.current.forEach((t) => {
//             const { x: n, y: i, r: s, color: color } = t;
//             if (n > pos) {
//               ctx.beginPath();
//               ctx.rect(n, i, s, s);
//               ctx.fillStyle = color;
//               ctx.strokeStyle = color;
//               ctx.stroke();
//             }
//           });
//         }
//         if (newDataRef.current.length > 0) {
//           animateFrame(pos - 8);
//         } else {
//           setValue('');
//           setAnimating(false);
//         }
//       });
//     };
//     animateFrame(start);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !animating) {
//       vanishAndSubmit();
//     }
//   };

//   const vanishAndSubmit = () => {
//     setAnimating(true);
//     draw();

//     const value = inputRef.current?.value || '';
//     if (value && inputRef.current) {
//       const maxX = newDataRef.current.reduce(
//         (prev, current) => (current.x > prev ? current.x : prev),
//         0
//       );
//       animate(maxX);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!value) {
//       return;
//     }
//     try {
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_BASE_URL
//         }/predict_rating/${encodeURIComponent(value)}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch rating');
//       }
//       const data = await response.json();
//       console.log(data);
//       setRating(data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//     http: vanishAndSubmit();
//     onSubmit && onSubmit(e);
//   };
//   const handleAnotherSubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryValue) {
//       return;
//     }
//     try {
//       const response = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_BASE_URL
//         }/predict_category/${encodeURIComponent(categoryValue)}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch rating');
//       }
//       const data = await response.json();
//       console.log(data);
//       setCategory(data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//     http: vanishAndSubmit();
//     onSubmit && onSubmit(e);
//   };
//   return (
//     <div>
//       <form
//         className={cn(
//           'w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
//           value && 'bg-gray-50'
//         )}
//         onSubmit={handleSubmit}
//       >
//         <canvas
//           className={cn(
//             'absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20',
//             !animating ? 'opacity-0' : 'opacity-100'
//           )}
//           ref={canvasRef}
//         />
//         <input
//           onChange={(e) => {
//             if (!animating) {
//               setValue(e.target.value);
//               onChange && onChange(e);
//             }
//           }}
//           onKeyDown={handleKeyDown}
//           ref={inputRef}
//           value={value}
//           type="text"
//           className={cn(
//             'w-[600px] relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20',
//             animating && 'text-transparent dark:text-transparent'
//           )}
//         />
//         <button
//           disabled={!value}
//           type="submit"
//           className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
//         >
//           <motion.svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="text-gray-300 h-4 w-4"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <motion.path
//               d="M5 12l14 0"
//               initial={{
//                 strokeDasharray: '50%',
//                 strokeDashoffset: '50%',
//               }}
//               animate={{
//                 strokeDashoffset: value ? 0 : '50%',
//               }}
//               transition={{
//                 duration: 0.3,
//                 ease: 'linear',
//               }}
//             />
//             <path d="M13 18l6 -6" />
//             <path d="M13 6l6 6" />
//           </motion.svg>
//         </button>

//         <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
//           <AnimatePresence mode="wait">
//             {!value && (
//               <motion.p
//                 initial={{
//                   y: 5,
//                   opacity: 0,
//                 }}
//                 key={`current-placeholder-${currentPlaceholder}`}
//                 animate={{
//                   y: 0,
//                   opacity: 1,
//                 }}
//                 exit={{
//                   y: -15,
//                   opacity: 0,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   ease: 'linear',
//                 }}
//                 className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
//               >
//                 {placeholders[currentPlaceholder]}
//               </motion.p>
//             )}
//           </AnimatePresence>
//         </div>
//       </form>
//       {rating !== null && (
//         <p
//           style={{
//             color: isDayTime ? 'black' : 'white',
//             backgroundColor: isDayTime ? '#f0f0f0' : '#333',
//             padding: '0.5rem 1rem',
//             borderRadius: '0.5rem',
//             fontSize: '1.25rem',
//             fontWeight: 'bold',
//             textAlign: 'center',
//             boxShadow: isDayTime
//               ? '0 4px 6px rgba(0, 0, 0, 0.1)'
//               : '0 4px 6px rgba(255, 255, 255, 0.1)',
//             marginTop: '1rem',
//           }}
//         >
//           Predicted Rating: {rating}
//         </p>
//       )}
//       <form
//         className={cn(
//           'w-full relative max-w-xl mx-auto bg-white mt-5 dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
//           value && 'bg-gray-50'
//         )}
//         onSubmit={handleAnotherSubmit}
//       >
//         <canvas
//           className={cn(
//             'absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20',
//             !animating ? 'opacity-0' : 'opacity-100'
//           )}
//           ref={canvasRef}
//         />
//         <input
//           onChange={(e) => {
//             if (!animating) {
//               setCategoryValue(e.target.value);
//               onChange && onChange(e);
//             }
//           }}
//           onKeyDown={handleKeyDown}
//           ref={inputRef}
//           value={categoryValue}
//           type="text"
//           className={cn(
//             'w-[600px] relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20',
//             animating && 'text-transparent dark:text-transparent'
//           )}
//         />
//         <button
//           disabled={!categoryValue}
//           type="submit"
//           className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
//         >
//           <motion.svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="text-gray-300 h-4 w-4"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <motion.path
//               d="M5 12l14 0"
//               initial={{
//                 strokeDasharray: '50%',
//                 strokeDashoffset: '50%',
//               }}
//               animate={{
//                 strokeDashoffset: value ? 0 : '50%',
//               }}
//               transition={{
//                 duration: 0.3,
//                 ease: 'linear',
//               }}
//             />
//             <path d="M13 18l6 -6" />
//             <path d="M13 6l6 6" />
//           </motion.svg>
//         </button>

//         <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
//           <AnimatePresence mode="wait">
//             {!categoryValue && (
//               <motion.p
//                 initial={{
//                   y: 5,
//                   opacity: 0,
//                 }}
//                 key={`current-placeholder-${currentPlaceholder}`}
//                 animate={{
//                   y: 0,
//                   opacity: 1,
//                 }}
//                 exit={{
//                   y: -15,
//                   opacity: 0,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   ease: 'linear',
//                 }}
//                 className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
//               >
//                 {placeholders[currentPlaceholder]}
//               </motion.p>
//             )}
//           </AnimatePresence>
//         </div>
//       </form>

//       {category !== null && (
//         <p
//           style={{
//             color: isDayTime ? 'black' : 'white',
//             backgroundColor: isDayTime ? '#f0f0f0' : '#333',
//             padding: '0.5rem 1rem',
//             borderRadius: '0.5rem',
//             fontSize: '1.25rem',
//             fontWeight: 'bold',
//             textAlign: 'center',
//             boxShadow: isDayTime
//               ? '0 4px 6px rgba(0, 0, 0, 0.1)'
//               : '0 4px 6px rgba(255, 255, 255, 0.1)',
//             marginTop: '1rem',
//           }}
//         >
//           Predicted Category: {category}
//         </p>
//       )}
//     </div>
//   );
// }

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef(null);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible' && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === 'visible') {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [value, setValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [animating, setAnimating] = useState(false);
  const [rating, setRating] = useState(null);
  const [category, setCategory] = useState(null);
  const currentHour = new Date().getHours();
  const isDayTime = currentHour >= 6 && currentHour < 18;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/predict_rating/${encodeURIComponent(value)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch rating');
      }
      const data = await response.json();
      setRating(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!categoryValue) {
      return;
    }
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/predict_category/${encodeURIComponent(categoryValue)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <p>To get predicted rating</p>
        <form
          className={cn(
            'w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
            value && 'bg-gray-50'
          )}
          onSubmit={handleSubmit}
        >
          <canvas
            className={cn(
              'absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20',
              !animating ? 'opacity-0' : 'opacity-100'
            )}
            ref={canvasRef1}
          />

          <input
            onChange={(e) => {
              if (!animating) {
                setValue(e.target.value);
                onChange && onChange(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
            ref={inputRef1}
            value={value}
            type="text"
            className={cn(
              'w-[600px] relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20',
              animating && 'text-transparent dark:text-transparent'
            )}
          />
          <button
            disabled={!value}
            type="submit"
            className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-300 h-4 w-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <motion.path
                d="M5 12l14 0"
                initial={{
                  strokeDasharray: '50%',
                  strokeDashoffset: '50%',
                }}
                animate={{
                  strokeDashoffset: value ? 0 : '50%',
                }}
                transition={{
                  duration: 0.3,
                  ease: 'linear',
                }}
              />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </motion.svg>
          </button>

          <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
            <AnimatePresence mode="wait">
              {!value && (
                <motion.p
                  initial={{
                    y: 5,
                    opacity: 0,
                  }}
                  key={`current-placeholder-${currentPlaceholder}`}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -15,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'linear',
                  }}
                  className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
                >
                  {placeholders[currentPlaceholder]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
      {rating !== null && (
        <p
          style={{
            color: isDayTime ? 'black' : 'white',
            backgroundColor: isDayTime ? '#f0f0f0' : '#333',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textAlign: 'center',
            boxShadow: isDayTime
              ? '0 4px 6px rgba(0, 0, 0, 0.1)'
              : '0 4px 6px rgba(255, 255, 255, 0.1)',
            marginTop: '1rem',
          }}
        >
          Predicted Rating: {rating}
        </p>
      )}
      <div className="flex items-center space-x-4 mt-5">
        <p className="mt-5 text-sm font-medium text-gray-600 dark:text-gray-300">
          To get predicted category
        </p>
        <form
          className={cn(
            'w-full relative max-w-xl mx-auto bg-white mt-5 dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
            categoryValue && 'bg-gray-50'
          )}
          onSubmit={handleCategorySubmit}
        >
          <canvas
            className={cn(
              'absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20',
              !animating ? 'opacity-0' : 'opacity-100'
            )}
            ref={canvasRef2}
          />

          <input
            onChange={(e) => {
              if (!animating) {
                setCategoryValue(e.target.value);
                onChange && onChange(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCategorySubmit(e);
            }}
            ref={inputRef2}
            value={categoryValue}
            type="text"
            className={cn(
              'w-[600px] relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20',
              animating && 'text-transparent dark:text-transparent'
            )}
          />
          <button
            disabled={!categoryValue}
            type="submit"
            className="absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-300 h-4 w-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <motion.path
                d="M5 12l14 0"
                initial={{
                  strokeDasharray: '50%',
                  strokeDashoffset: '50%',
                }}
                animate={{
                  strokeDashoffset: categoryValue ? 0 : '50%',
                }}
                transition={{
                  duration: 0.3,
                  ease: 'linear',
                }}
              />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </motion.svg>
          </button>

          <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
            <AnimatePresence mode="wait">
              {!categoryValue && (
                <motion.p
                  initial={{
                    y: 5,
                    opacity: 0,
                  }}
                  key={`current-placeholder-${currentPlaceholder}`}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -15,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'linear',
                  }}
                  className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
                >
                  {placeholders[currentPlaceholder]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
      {category !== null && (
        <p
          style={{
            color: isDayTime ? 'black' : 'white',
            backgroundColor: isDayTime ? '#f0f0f0' : '#333',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textAlign: 'center',
            boxShadow: isDayTime
              ? '0 4px 6px rgba(0, 0, 0, 0.1)'
              : '0 4px 6px rgba(255, 255, 255, 0.1)',
            marginTop: '1rem',
          }}
        >
          Predicted Category: {category}
        </p>
      )}
    </div>
  );
}
