'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SportsSection({ title, image, buttonText, href }) {
  const router = useRouter();

  const renderImage = () => {
    if (!image || !image.image) {
      return (
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">No image available</span>
        </div>
      );
    }

    const imageUrl = typeof image.image === 'string'
      ? `data:image/png;base64,${image.image}`
      : image.image;

    return (
      <img
        src={imageUrl}
        alt={image.altText || `${title} image`}
        className="object-cover w-full h-full"
      />
    );
  };

  return (
    <Link href={href} className="relative w-full block">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        {renderImage()}
        <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
        <h2 className="text-3xl font-bold mb-4">{title.toUpperCase()}</h2>
        <button className="bg-white font-semibold text-black py-2 px-4 rounded hover:bg-gray-200 transition-colors">
          {buttonText}
        </button>
      </div>
    </Link>
  );
}