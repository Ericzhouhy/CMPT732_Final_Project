'use client';

import { PlaceholdersAndVanishInput } from '../inputProvider/PlaceholdersAndVanishInput';

export function PlaceholdersAndVanishInputController() {
  const Placeholders = [
    'Do customers at Amazon have higher expectations than at Temu?',
    'How would you rate your experience with this service?',
    'Which category does this product belong to?',
    'What category best fits this review?',
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Input reviews to get predicted rating or predicted category
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={Placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
