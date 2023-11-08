import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="flex items-center justify-center h-screen sm:p-16 bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-fit text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-40 h-40 dark:text-gray-600 sm:w-48 sm:h-48 animate-spin-slow"
        >
          <path
            fill="currentColor"
            d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
          ></path>
          <rect
            width="176"
            height="32"
            x="168"
            y="320"
            fill="currentColor"
          ></rect>
          <polygon
            fill="currentColor"
            points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
          ></polygon>
          <polygon
            fill="currentColor"
            points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
          ></polygon>
        </svg>
        <div className="text-3xl flex flex-col gap-2 animate-pulse">
          <p>This may not mean anything.</p>
          <p>We are probably working on something that has blown up!</p>
        </div>
        <Link
          rel="noopener noreferrer"
          to={"/"}
          className="px-8 py-3 font-bold rounded border border-transparent dark:bg-violet-400 dark:text-gray-900 hover:border-white hover:bg-transparent hover:text-white transition duration-300 delay-100"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
