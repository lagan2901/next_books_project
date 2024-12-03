import React, { Fragment, useRef, useState, useEffect } from 'react';

const Banner = () => {
  return (
    <Fragment>
      <div
        className="flex justify-center items-center bg-cover bg-center relative mt-10"
        style={{ backgroundImage: "url(/photo.png)" }}
      >
        <div className="flex flex-col items-center justify-center w-full bg-gradient-to-l from-gray-900/30 to-gray-900/90 p-16 text-center">
          <div className="w-1/2 md:w-3/4 lg:w-1/2">
            <div className="text-4xl font-semibold">
              Books are worth for reading
            </div>
            <div className="mt-8 text-lg font-normal">
              Order books at a cheap rate from our outlet. We have more than 10,000 books in our store. Explore Now
            </div>
            <button className="mt-8 py-2 px-6 text-xl font-extrabold bg-gray-900 text-yellow-500 rounded-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
