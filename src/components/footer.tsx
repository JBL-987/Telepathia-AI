"use client";
import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-gray-600 w-full p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm text-gray-400 mb-4 md:mb-0">
          © 2025 Telepathia-AI™. All Rights Reserved.
        </span>
        
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
          <li>
            <button 
              onClick={() => scrollTo('features')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Features
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollTo('about')}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              About
            </button>
          </li>
          <li>
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link 
              href="mailto:contact@telepathia.ai" 
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};