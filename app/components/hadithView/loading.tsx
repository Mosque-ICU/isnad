'use client';
import React from 'react';

function loading() {
  return (
    <p className="text-3xl  text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      Loading web scraping data (db would be mush faster) ...
    </p>
  );
}

export default loading;
