import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
    return (
      <div className={`rounded-2xl flex flex-col shadow-2xl w-[100%] h-screen grid-area-main col-span-1 lg:col-span-2`}>
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    )
  }

  if(error) {
    <div className={`rounded-2xl shadow-2xl w-full h-screen grid-area-main lg:col-span-2 `}>
        <div className="flex flex-col justify-center items-center">
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

  if(posts.length === 0 && searchTerm !== '') {
    return (
      <div className={`rounded-2xl shadow-2xl w-full h-screen grid-area-main lg:col-span-2`}>
        <div className="flex flex-col justify-center items-center">
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
