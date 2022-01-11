import {useState} from 'react';
import {TiMessage , TiArrowUpOutline, TiArrowDownOutline, TiArrowDownThick, TiArrowUpThick} from 'react-icons/ti';
import moment from 'moment';
import Comment from './Comment';
import '../input.css';

const Post = ({post, onToggleComments}) => {
  const [isUpVote,setIsUpVote] = useState(false);
  const [isDownVote,setIsDownVote] = useState(false);
  const [isNeutral,setIsNeutral] = useState(true);
  const [deactivatedUpVote,setDeactivatedUpVote] = useState(false);
  const [deactivatedDownVote,setDeactivatedDownVote] = useState(false);
  const [votes,setVotes] = useState(post.ups);
  const [currentVotes,setCurrentVotes] = useState(post.ups);


  const renderComments = () => {
    if(post.loadingComments){
      return (
        <div>
          <h1>Loading comments...</h1>
        </div>
      )
    }

    if(post.errorComments){
      return (
        <div>
          <h1>Error Loading Comments</h1>
        </div>
      )
    }

    if(post.showingComments){
      return (
        <div>
          {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)} 
        </div>
      )
    }
  }

  const handleUpVote = () => {
    setIsUpVote(true);
    setIsNeutral(false);
    if(isDownVote){
      setCurrentVotes(post.ups)
    }
    setIsDownVote(false);
    setDeactivatedUpVote(false);
    setDeactivatedDownVote(true);
    setVotes(currentVotes + 1);
  }

  const handleUpVoteToNeutral = () => {
    setIsUpVote(false);
    setIsNeutral(true);
    setIsDownVote(false);
    setDeactivatedUpVote(true);
    setDeactivatedDownVote(true);
    setVotes(post.ups);
  }

  const handleDownVote = () => {
    setIsDownVote(true);
    setIsNeutral(false);
    if(isUpVote){
      setCurrentVotes(post.ups);
    }
    setIsUpVote(false);
    setDeactivatedDownVote(false);
    setDeactivatedUpVote(true);
    setVotes(currentVotes - 1);
  }

  const handleDownVoteToNeutral = () => {
    setIsDownVote(false);
    setIsNeutral(true);
    setIsUpVote(false);
    setDeactivatedDownVote(true);
    setDeactivatedUpVote(false);
    setVotes(post.ups);
  }
  
  return (
    <div className='hover:shadow-xl w-[100%] border-2 rounded-xl mb-5'>
      <article key={post.id} className='flex flex-row mb-5 p-5 w-ful rounded-2xl '>
        <div className="mt-5 mr-4 flex flex-col justify-start items-center">
          {
            (isNeutral || deactivatedUpVote) && <button onClick={handleUpVote}>
              <TiArrowUpOutline className="text-2xl hover:text-green-500 " />
            </button> 
          }
          {
            isUpVote && <button onClick={handleUpVoteToNeutral}>
              <TiArrowUpThick className="text-2xl text-green-500" />
            </button>
          }
            <p className={`${isUpVote && 'text-green-500'} ${isDownVote && 'text-red-500'}`} >{ shortenNumber(votes,1) }</p>
          {
            (isNeutral || deactivatedDownVote) && <button onClick={handleDownVote}>
              <TiArrowDownOutline className="text-2xl hover:text-red-500 " />
            </button>
          }
          {
            isDownVote && <button onClick={handleDownVoteToNeutral}>
              <TiArrowDownThick className="text-2xl text-red-500" />
            </button>
          }
        </div>

        <div className="content w-[100%] mx-auto">
            <h3 className="font-bold text-2xl">{post.title}</h3>
            {post.url && <img className="w-[100%] object-cover object-center mt-5 mb-5" src={post.url} alt="" /> } 
            <hr />
            <div className="submenu flex flex-row justify-between">
              <h5>by: <span className="text-blue-600 font-bold">{post.author}</span></h5>
              <span>{moment.unix(post.created_utc).fromNow()}</span>

              <div className="flex flex-row justify-center items-center">
                <button
                  type="button"
                  className={`icon-action-button mr-2`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show comments"
                  >
                    <TiMessage className="text-2xl" />
                </button>
                  <span>{post.num_comments}</span>
              </div>
            </div>
            <div>
                {renderComments()}
            </div>
        </div>
      </article>
      
    </div>
  )
}

export default Post;

const shortenNumber = (num, digits) => {
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  for (let i = units.length - 1; i >= 0; i -= 1) {
    const decimal = 1000 ** (i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i];
    }
  }

  return num;
};
