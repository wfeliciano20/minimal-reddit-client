import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { AnimatedList } from 'react-animated-list';
import {selectSelectedSubreddit, fetchPosts, selectIsLoading, selectError, selectPostsContainingSearchTerm, fetchCommentsForPost, setSearchTerm, selectSearchTerm}  from '../features/reddit/redditSlice.js';
import Post from '../components/Post';
import PostLoading from '../components/PostLoading';

const MainSection = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const searchTerm = useSelector(selectSearchTerm);
  const posts = useSelector(selectPostsContainingSearchTerm);
  let isLoading = useSelector(selectIsLoading);
  let error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      dispatch(fetchCommentsForPost(index,permalink));
    }
    return getComments;
  }

  if(isLoading) {
    <div className={`rounded-2xl shadow-2xl w-full h-screen grid-area-main lg:col-span-2`}>
        <AnimatedList animation="zoom">
          { Array(getRandomNumber(3, 10)).fill(<PostLoading key={Math.floor(Math.random() * getRandomNumber(3, 10))} />)}
        </AnimatedList>
    </div>
  }

  if(error) {
    <div className={`rounded-2xl shadow-2xl w-full h-screen grid-area-main lg:col-span-2 `}>
        <div className="error">
          <h2>Failed to load posts.</h2>
          <button
            type="button"
            onClick={() => dispatch(fetchPosts(selectedSubreddit))}
          >
            Try again
          </button>
      </div>
    </div>
  }

  if(posts.length === 0){
    return (
      <div className={`rounded-2xl shadow-2xl w-full h-screen grid-area-main lg:col-span-2`}>
        <div className="error">
          <h2>No posts match `${searchTerm}`</h2>
          <button
            type="button"
            onClick={() => dispatch(setSearchTerm(''))}
          >
            Try again
          </button>
      </div>
    </div>
    )
  }

  return (
      <div className='w-full grid-area-main lg:col-span-2'>
        {posts.map((post, index) => {
            return (
              <div key={post.id} className="flex flex-column justify-around align-start flex-wrap ">
                <Post
                  post={post}
                  onToggleComments={onToggleComments(index)}
                />
              </div>
            )})
          }
      </div>  
    )
}

export default MainSection

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
