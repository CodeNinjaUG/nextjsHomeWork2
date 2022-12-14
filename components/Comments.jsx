import React, {useState, useEffect} from 'react';
import moment from 'moment/moment';
import parse from 'html-react-parser';
import { getComments } from '../services';
import { comment } from 'postcss';
const Comments = ({slug}) => {
  const [ comments, setComments] = useState([]);
  useEffect(() => {
     getComments(slug).then((result) => setComments(result))
  }, []);
  return (
    <>
     {comment.length > 0 && (
       <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
           <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
              <div className='px-4'>
                 <span>{comments.length} </span>
                 <span> Comments </span> 
                </div> 
           </h3>
           {comments.map((comment) => (
            <div key={comment.createdAt}
             className="border-b border-gray-100 mb-4 pb-4">
              <p className='mb-4 px-3'>
                   <span className='font-semibold px-3'> { comment.name }</span>
                   <span>{moment(comment.createdAt).format('MMM ddd YYYY')} </span> 
                   <p className='px-3 whitespace-pre-line text-gray-600 w-full'>
                       {parse(comment.comment)}
                   </p>
              </p> 
            </div>
           ))}
       </div>
      )}
    </>
  )
}

export default Comments