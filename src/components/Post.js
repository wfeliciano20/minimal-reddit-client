import {TiMessage , TiArrowUpOutline, TiArrowDownOutline} from 'react-icons/ti';
import moment from 'moment';
import Comment from './Comment';
import '../input.css';

const Post = ({post,index, onToggleComments}) => {

  const renderComments = () => {
    if(post.loadingComments){
      return (<div>
        <h1>Loading comments...</h1>
      </div>)
    }

    if(post.errorComments){
      return (<div>
        <h1>Error Loading Comments</h1>
      </div>)
    }

    if(post.showingComments){
      return (<div>
        {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)} 
      </div>)
    }

  }

  return (
    <div className='hover:shadow-xl border-2 rounded-xl mb-5'>
      <article key={post.id} className='flex flex-row mb-5 p-5 w-[100%] rounded-2xl'>
        <div className="mt-5 mr-4 flex flex-col justify-start items-center">
          <TiArrowUpOutline className="text-2xl hover:text-green-500 active:text-green-500" />
          <p>{ shortenNumber(post.ups,1) }</p>
          <TiArrowDownOutline className="text-2xl hover:text-red-500 active:text-red-500" />
        </div>
        <div className="content mx-auto">
          <h3 className="font-bold text-2xl">{post.title}</h3>
          {post.url && <img className="w-full object-cover object-center mt-5 mb-5" src={post.url} alt="" /> }
          <hr />
          <div className="submenu flex flex-row justify-between">
            <h5>by: <span className="text-blue-600 font-bold">{post.author}</span></h5>
            <span>{moment.unix(post.created_utc).fromNow()}</span>

            <div className="flex flex-row justify-center items-center">
              <button
                type="button"
                className={`icon-action-button mr-2 ${
                  post.showingComments && 'showing-comments'
                }`}
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

export default Post

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
