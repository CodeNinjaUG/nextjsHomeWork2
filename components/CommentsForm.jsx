import React, {useRef, useState , useEffect} from 'react'
import { submitComment } from '../services';
const CommentsForm = ( { slug }) => {
  const [ error, setError ] = useState(false);
  const [localStorage , setLocaStorage ] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();  
  const emailEl = useRef(); 
  const storeDataEl = useRef();
  const handleCommentSubmission = () => {
       setError(false);
       const { value: comment } = commentEl.current;
       const { value: name } = nameEl.current;
       const { value: email } = emailEl.current;

       if(!comment || !name || !email){
           setError(true);
           return;
       }
       const commentObj  = {
           name, email,comment,slug
       }

       submitComment(commentObj).then((res)=> {
             setShowSuccessMessage(true);
             setTimeout(() => {
              setShowSuccessMessage(false);
             },3000)
       })
  }
      return (
        <div className='bg-white shadowlg roundedlg p8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'> Comments</h3>
            <div className='grid grid-cols-1 gap-4 mb-4'>
                <textarea ref={commentEl}
                className="p-4 outline-none w-full
                          rounded-lg focus:ring-2
                          focus:ring-gray-200 bg-gray-100 text-gray-700
                          "
                placeholder="comment"
                name="comment"
                />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
                <input type="text" 
                   ref={nameEl}
                   className="py-4 px-4 outline-none w-full
                   rounded-lg focus:ring-2
                 focus:ring-gray-200 bg-gray-100 text-gray-700 "
                   placeholder='name'
                   name='name'
                />
                  <input type="text" 
                   ref={emailEl}
                   className="py-4 px-4 outline-none w-full
                   rounded-lg focus:ring-2
                 focus:ring-gray-200 bg-gray-100 text-gray-700 "
                   placeholder='email'
                   name='email'
                />
            </div>
            { error && <p className='text-xs text-red-500'> All fields are required</p>}
            <div className='mt-8'>
                <button onClick={handleCommentSubmission}
                 className="transaition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg text-white rounded-full px-8 py-3 cursor-pointer"
                 type='button'>
                 Post Comment
                </button>
                {showSuccessMessage && <span className='text-xl float-right font-semibold'> Commented Submitted for review</span> }
            </div>
        </div>
      )
}

export default CommentsForm