'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Post() {
  return (
    <main>
      {/* Header/Hero Section */}
      <div className="relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-4">Man must explore, and this is exploration at its greatest</h1>
            <h2 className="text-xl mb-4">Problems look mighty small from 150 miles up</h2>
            <span className="text-gray-400">
              Posted by <Link href="/about" className="text-white hover:underline">Start Bootstrap</Link> on September 24, 2023
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="mb-4">
          Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.
        </p>
        <p className="mb-4">
          Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.
        </p>
        <p className="mb-4">
          What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.
        </p>
        <p className="mb-4">
          A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.
        </p>
        <p className="mb-4">
          For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.
        </p>
      </article>
    </main>
  );
}