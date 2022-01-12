import React from 'react';
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from 'react-icons/ti';
import '../input.css';
// import {getRandomNumber} from './MainSection';


const PostLoading = () => {
  return (
      <article className="flex w-[100%] border-2 rounded shadow-2xl mb-4 p-3">
        {/* votes container */}
        <div className="flex flex-col  items-center">
          <button
            type="button"
            className="bg-none border-none cursor-pointer p-0 flex items-center rounded-sm active:text-green-400 hover:text-green-400"
            aria-label="Up vote"
          >
            <TiArrowUpOutline className="text-2xl animate-pulse text-slate-300" />
          </button>  
          <div className="h-[16px] w-[16px] rounded animate-pulse bg-slate-300" ></div>  
          <button
            type="button"
            className="bg-none border-none cursor-pointer p-0 flex items-center rounded-sm active:text-red-600 hover:text-red-600"
            aria-label="Down vote"
          >
            <TiArrowDownOutline className="text-2xl text-slate-300 animate-pulse" />
          </button>
        </div>
        {/* post container */}
        <div className="w-full">
          <h3 className="m-0 mb-2 text-slate-500">
            <div className="h-[24px] w-[12rem] rounded animate-pulse bg-slate-300"></div>
            
          </h3>
          {/* Image container */}
          <div className="w-full">
            <div className="h-[250px] w-[100%] rounded animate-pulse bg-slate-300"></div>
            
          </div>
          {/* submenu container */}
          <div className="flex items-center">
            <span>
              <div className="w-[4rem] h-[16px] mr-[9rem] rounded animate-pulse bg-slate-300"></div>
              
            </span>
            
            <span className="flex flex-row">
              <button
                type="button"
                className="bg-none border-none cursor-pointer p-0 flex items-center rounded-sm"
                aria-label="Show comments"
              >
                <TiMessage className="text-2xl text-slate-300 animate-pulse" />
              </button>
              <div className="h-[16px] mt-1 w-[16px] rounded animate-pulse bg-slate-300"></div>
            
            </span>
          </div>
        </div>
      </article>
  );
};

export default PostLoading;
