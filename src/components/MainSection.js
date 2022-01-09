import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { AnimatedList } from 'react-animated-list';
import {selectSelectedSubreddit, fetchPosts, selectIsLoading, selectError, selectPosts, fetchCommentsForPost}  from '../features/reddit/redditSlice.js';
import Post from '../components/Post';
import PostLoading from '../components/PostLoading';

const MainSection = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const posts = useSelector(selectPosts);
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
//'w-full grid-area-main lg:col-span-2'
  return (
    <div className={`rounded-2xl  shadow-2xl p-5 w-full grid-area-main lg:col-span-2`}>
      <div className=''>
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
    </div>
    )
}

export default MainSection

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
