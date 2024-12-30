'use client';
import React from 'react';
import { StickyScroll } from './sticky-scroll-reveal';
import Image from 'next/image';
import image1 from '@/public/images/image1.png';
import image2 from '@/public/images/image2.png';
import image3 from '@/public/images/image3.png';
import image4 from '@/public/images/image4.png';
import image5 from '@/public/images/image5.png';
import image6 from '@/public/images/image6.png';
import image7 from '@/public/images/image7.png';

const content = [
  {
    title: 'Average rating between Temu and Amazon.',
    description:
      'Temu generally has higher average ratings but significantly lower average prices compared to Amazon. This suggests that Temu might be more competitively priced, which could be influencing consumer satisfaction positively reflected in the ratings.',
    content: (
      <div className="h-full w-full flex items-center justify-center  text-white">
        <Image
          src={image1}
          width={1600}
          height={950}
          className="max-h-full max-w-full object-contain p-4"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Average price in Temu and Amazon',
    description:
      '	The higher prices on Amazon might be justified by a wider selection of branded or premium products, potentially leading to slightly lower average ratings if customer expectations are not always met, given the higher price points.',
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={image2}
          width={1500}
          height={900}
          className="h-full w-full object-contain"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Average Rating Comparision between Temu and Amazon by Category',
    description:
      'The bar graph comparing average ratings across various categories on Temu and Amazon shows generally high ratings for both platforms, with most categories averaging around 4 stars or higher.Several categories display consistent ratings between the two platforms, such as "Pet Supplies" and "Grocery," indicating similar customer satisfaction levels. Amazon+: There are notable differences in specific categories; for example, "Camera & Photo" and "Health & Personal Care" tend to rate higher on Amazon, suggesting a perception of better quality or reliability.Temu+: Temu shows stronger performance in categories like "Tools & Home Improvement." Probably because Temu offers these products at more competitive prices',
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={image3}
          width={1500}
          height={900}
          className="h-full w-full object-contain"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Average Price Comparision by Target Audience (Temu vs Amazon)',
    description:
      "Temu's prices are significantly lower across all target audiences—general any, kids, men, and women—compared to Amazon: Maybe because Amazon tends to offer a range of branded and premium products, justifying higher prices due to perceived quality and superior customer service. On the other hand, Temu focuses on cost-effectiveness, appealing to price-sensitive customers by offering functional products at lower prices. In the 'men' category, Temu's average price is much lower than Amazon's: Men's products often include high-value items like electronics and gadgets, which have more variable pricing and a higher presence of luxury and premium brands on Amazon. This aligns with consumer behavior where men tend to make fewer but higher-value purchases. Thereby creating a noticeable price gap in this category.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={image4}
          width={1500}
          height={900}
          className="h-full w-full object-contain"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Average Price Comparsion betwen Temu and Amazon by Category',
    description:
      'Amazon generally has higher prices across almost all category. Especially noticeable in categories like "Collectible Coins" and "Fine Art. Temu has consistently lower prices, but like "Books" and "Music", the difference in pricing between the two platforms remains relatively close. So for everyday items or commodities, Temu competes more closely with Amazon',
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src={image5}
          width={1500}
          height={900}
          className="h-full w-full object-contain"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Top 10 Categories in Amazon:',
    description: `
      Amazon predominantly focuses on essential household and personal care products such as "Kitchen & Dining" and "Health & Household." 
      Temu targets more lifestyle-oriented categories, including "Women's Jewelry" and "Men's Shoes."
      Both platforms share strong sales in universal categories like "Kitchen & Dining," indicating a broad appeal to consumers seeking everyday necessities.
      However, Amazon shows higher overall sales volumes, highlighting its larger customer base and market reach, while Temu's niche appears to be in offering fashionable and personal items at competitive prices, possibly catering to specific market segments.
    `,
    content: (
      <div className="h-full w-full flex items-center justify-center  text-white">
        <Image
          src={image6}
          width={1600} // 调整宽度稍大于原来的1500
          height={950}
          className="max-h-full max-w-full object-contain p-4"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: 'Top 10 Categories in Temu',
    description:
      'Amazon predominantly focuses on essential household and personal care products such as "Kitchen & Dining" and "Health & Household,"',
    content: (
      <div className="h-full w-full flex items-center justify-center  text-white">
        <Image
          src={image7}
          width={1600} // 调整宽度稍大于原来的1500
          height={950}
          className="max-h-full max-w-full object-contain p-4"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function StickyScrollRevealController() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
