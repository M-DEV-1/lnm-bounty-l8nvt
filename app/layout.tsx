// 'use client';

import React from 'react';
import './globals.css'; // Import your global styles here

export const metadata = {
  title: 'Flow Bounty Platform',
  description: 'A decentralized platform for bounties on the Flow blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://placekitten.com/g/32/32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-800">
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Flow Bounty Platform</h1>
            <nav>
              <a
                href="/"
                className="text-white hover:text-blue-200 ml-4"
              >
                Home
              </a>
            </nav>
          </div>
        </header>
        <main className="p-8 min-h-screen max-w-4xl mx-auto">{children}</main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-8">
          <p>© 2025 Flow Bounty Platform. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
