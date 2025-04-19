'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const POSTS_PER_PAGE = 2;

const ALL_POSTS = [
  {
    title: "Man must explore, and this is exploration at its greatest",
    subtitle: "Problems look mighty small from 150 miles up",
    date: "September 24, 2023",
    author: "Start Bootstrap"
  },
  {
    title: "I believe every human has a finite number of heartbeats",
    subtitle: "I don't intend to waste any of mine",
    date: "September 18, 2023",
    author: "Start Bootstrap"
  },
  {
    title: "Science has not yet mastered prophecy",
    subtitle: "We predict too much for the next year and yet far too little for the next ten",
    date: "August 24, 2023",
    author: "Start Bootstrap"
  },
  {
    title: "Failure is not an option",
    subtitle: "Many say exploration is part of our destiny, but it's actually our duty to future generations",
    date: "July 8, 2023",
    author: "Start Bootstrap"
  }
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const totalPages = Math.ceil(ALL_POSTS.length / POSTS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = ALL_POSTS.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage('');
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <main>
      {/* Header/Hero Section */}
      <div className="relative w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Clean Blog</h1>
            <span className="text-xl">A Blog Theme by Start Bootstrap</span>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {visiblePosts.map((post, index) => (
          <article key={index} className={`mb-12 ${index !== visiblePosts.length - 1 ? 'pb-12 border-b border-gray-200' : ''}`}>
            <Link href="/post" className="block">
              <h2 className="text-4xl font-bold hover:text-gray-600 transition-colors mb-2">
                {post.title}
              </h2>
              <h3 className="text-xl text-gray-600 mb-4">
                {post.subtitle}
              </h3>
            </Link>
            <p className="text-gray-500">
              Posted by <Link href="/about" className="text-gray-700 hover:underline">{post.author}</Link> on {post.date}
            </p>
          </article>
        ))}

        {/* Pagination */}
        <div className="flex flex-col items-center space-y-4 mt-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              ← Previous
            </button>
            <div className="flex items-center space-x-2">
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded ${
                    currentPage === page
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Next →
            </button>
          </div>
          
          {/* Page Input Form */}
          <form onSubmit={handlePageSubmit} className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              placeholder="Go to page..."
              className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Go
            </button>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
          </form>
        </div>
      </div>
    </main>
  );
}