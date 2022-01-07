import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { selectSubreddits, fetchSubreddits, selectIsLoading, selectError, selectSelectedSubreddit, selectSubreddit } from '../features/reddit/redditSlice';
import '../input.css';

const Sidebar = () => {

  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const subreddits = useSelector(selectSubreddits);;
  let isLoading = useSelector(selectIsLoading);
  let error = useSelector(selectError);
  

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);
  
  if(isLoading) {
    return (
      <div className={`rounded-2xl shadow-2xl w-[15rem] h-[52rem] col-span-1 grid-area-sidebar lg:col-span-1`}>
        <h1 className="font-bold text-2xl p-5">Subreddits</h1>
        <div>
          <Skeleton count={subreddits.length} height={80} />
        </div>
      </div>)
  }

  if(error) {
    return (
      <div className={`rounded-2xl shadow-2xl w-[15rem] h-[52rem] col-span-1 grid-area-sidebar lg:col-span-1`}>
        <h1 className="font-bold text-2xl p-5">Subreddits</h1>
        <div>Error: Loading subreddits</div>
      </div>)
  }

  if(subreddits && !isLoading && !error) {
    return (
        <div className={`rounded-2xl shadow-2xl w-[15rem] h-[200rem]  col-span-1 grid-area-sidebar lg:col-span-1`}>
          <h1 className="font-bold text-2xl p-5">Subreddits</h1>
          <ul className="flex flex-col">
            {subreddits.map(subreddit => {
              return (
                <li key={subreddit.id} className={` hover:border-l-[5px] hover:border-blue-500 mb-2`}>
                  <button 
                  onClick={()=>{dispatch(selectSubreddit(subreddit.url))}}
                  className={`font-bold py-[5px] px-6 rounded-full ${selectedSubreddit ===  subreddit.url && "text-orange-500"}`}>
                  
                    <img 
                    src={
                      subreddit.icon_img ||
                      `https://api.adorable.io/avatars/25/${subreddit.display_name}`
                    } 
                    alt={`profile of ${subreddit.display_name}`}
                    className={selectedSubreddit === subreddit.url ? "border-orange-500 border-solid border-4 w-[75px] h-[75px] font-bold rounded-full mb-2" : "border-gray-500 border-solid border-2 w-[75px] h-[75px] font-bold rounded-full mb-2"}
                    />
                    {subreddit.display_name}
                  </button>
                </li>
              )})}
          </ul>
        </div>
      )
  }
  
}

export default Sidebar
