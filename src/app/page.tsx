'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { API_URL, PAGE_LMIT } from '@/utils/constant';

interface Article {
  image_url: string;
  url: string;
  title: string;
  body: string;
  published_on: number;
  category: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [articles, setArticles] = useState<Article[]>([]);
  const [inputPage, setInputPage] = useState<string>('');

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
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

  const updateCurrentPage = () => {
    let page = Math.max(1, parseInt(inputPage));
    page = Math.min(page, totalPages);
    setCurrentPage(page);
  };

  const updateInputPage = (pg: string | number) => {
    let page = Math.max(1, Number(pg));
    page = Math.min(page, totalPages);
    setInputPage(page.toString());
  };

  const initArticlesInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/newsLength`);
      setTotalPages(Math.ceil(res.data.total / PAGE_LMIT));
      setCurrentPage(1);
    } catch (e) {
      console.error('Error in get articles count', e);
    }
  };

  const getArticles = async () => {
    try {
      const res = await axios.get(`${API_URL}/getNews?page=${currentPage}&limit=${PAGE_LMIT}`);
      setArticles(res.data.data);
    } catch (e) {
      console.error('Error in get articles', e);
    }
  };

  useEffect(() => {
    initArticlesInfo();
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      getArticles();
    }
  }, [currentPage]);

  return (
    <main>
      <div className="relative w-full h-[500px] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')]">
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">News</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {articles.map((atcl, index) => (
          <article key={index} className={`mb-12 ${index !== articles.length - 1 ? 'pb-12 border-b border-gray-200' : ''}`}>
            <div className='flex flex-col md:flex-row gap-4'>
              <img src={atcl.image_url} className='w-full md:w-64 md:h-64 mx-auto' alt="news" />
              <div className="block">
                <div className='text-black hover:text-[#0085A1] cursor-pointer'>
                  <h2 className="text-4xl font-bold transition-colors mb-2">
                    <a href={atcl.url} target='_blank' rel='noopener noreferrer'>{atcl.title}</a>
                  </h2>
                </div>
                <div className="text-lg">{atcl.body}</div>
                <div className="text-gray-500 py-2">{new Date(atcl.published_on * 1000).toDateString()}</div>
                <div className='flex flex-row flex-wrap gap-2 text-blue-600'>
                  {atcl.category?.split('|').map((cat, index) => (
                    <div key={index} className='bg-blue-100 rounded-xl px-4 py-1 text-sm'>
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Pagination */}
        <div className="flex flex-col items-center space-y-4 mt-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              ← Previous
            </button>
            <div className="flex items-center space-x-2">
              {getPageNumbers().map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              Next →
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputPage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateInputPage(e.target.value)}
              placeholder="Go to page..."
              className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
              onClick={updateCurrentPage}
            >
              Go
            </button>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
