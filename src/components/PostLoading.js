import React from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from 'react-icons/ti';
import {getRandomNumber} from './MainSection';


const PostLoading = () => {
  return (
    <article className="flex shadow-2xl mb-4 p-3">
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="bg-none border-none cursor-pointer p-0 flex items-center rounded-sm active:text-green-400 hover:text-green-400"
          aria-label="Up vote"
        >
          <TiArrowUpOutline className="text-2xl" />
        </button>
        <Skeleton className="py-1 font-bold w-[2ch]" />
        <button
          type="button"
          className="bg-none border-none cursor-pointer p-0 flex items-center rounded-sm active:text-red-600 hover:text-red-600"
          aria-label="Down vote"
        >
          <TiArrowDownOutline className="text-2xl" />
        </button>
      </div>
      <div className="w-full">
        <h3 className="m-0 mb-2 text-slate-500">
          <Skeleton width={getRandomNumber(100, 200)} />
        </h3>

        <div className="w-full">
          <Skeleton height={250} />
        </div>
        <div className="flex items-center">
          <span>
            <Skeleton width={getRandomNumber(20, 50)} />
          </span>
          <span>
            <Skeleton width={getRandomNumber(50, 100)} />
          </span>
          <span className="mr-0">
            <button
              type="button"
              className="bg-none border-none cursor-pointer p-0 flex items-center rounded-sm"
              aria-label="Show comments"
            >
              <TiMessage className="text-2xl" />
            </button>
            <Skeleton width={getRandomNumber(10, 50)} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostLoading;
