import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import '../input.css';

const Comment = ({comment}) => {
  if(!comment.body){
    return (<div key={comment.id}></div>);
  }
  return (
    <div key={comment.id} className='flex flex-col justify-evenly'>
      <hr />
      <br />
      <div className="flex flex-row justify-between">
        <p className="text-blue-600">{comment.author}</p>
        <p className="comment-created-time">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown children={comment.body} />
    </div>
  )
}

export default Comment;