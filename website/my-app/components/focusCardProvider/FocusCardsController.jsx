import { FocusCards } from '../ui/focus-cards';

export function FocusCardsController() {
  const cards = [
    {
      title: 'Negative Words',
      src: '/images/negative_words.jpg',
    },
    {
      title: 'Positive Words',
      src: '/images/positive_words.jpg',
    },
  ];

  return <FocusCards cards={cards} />;
}
