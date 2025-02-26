import React from 'react';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-500 mt-4">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-block mt-6 px-6 py-3 text-lg text-white bg-[#0C68F4] rounded-lg hover:bg-[#0951BE] transition duration-300"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
