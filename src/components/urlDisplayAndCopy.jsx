import React, { useState } from 'react';

const UrlCopyComponent = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      // Reset the "Copied!" state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className='flex items-center space-x-3 p-4 bg-gray-100 rounded-lg shadow-sm'>
      {/* Input field to display the URL */}
      <input
        type='text'
        value={url}
        readOnly
        className='flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        aria-label='URL to copy'
      />

      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className={`px-4 py-2 rounded-md font-semibold text-green transition-colors duration-200 ${
          isCopied
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isCopied ? 'Copied!' : 'Copy URL'}
      </button>
    </div>
  );
};

export default UrlCopyComponent;
