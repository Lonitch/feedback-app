import Card from "./shared/Card";
import { useState, useContext, useEffect } from 'react';
import FeedbackContext from "../context/FeedbackContext";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [msg, setMsg] = useState('');
  const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

  // run this whenever "feedbackEdit" is changed
  // i.e., whenever the edit button is clicked
  useEffect(()=>{
    if(feedbackEdit.edit===true){
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  },[feedbackEdit])

  /* 
  `e` is the event, which in this case is change, 
  `target` is the element that triggered the event, 
  which in this case is the input, 
  and `value` is a property of the `input` element.
  Because of this, we need to define `value` prop 
  for the input DOM.
  */
  const handleTextChange = (e)=>{
    if(text===''){
        setBtnDisabled(true);
        setMsg(null)
    }else if (text!=='' && text.trim().length<=10){
        setMsg('Text Must Be at Least 10 Characters');
        setBtnDisabled(true);
    }else{
        setMsg(null);
        setBtnDisabled(false);
    }
    setText(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(text.trim().length>10){
        const newFeedback={
            text, rating
        }
        if (feedbackEdit.edit===true){
          updateFeedback(feedbackEdit.item.id,newFeedback)
        } else{
          addFeedback(newFeedback);
        }
        
    }
  }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service?</h2>
            <RatingSelect select={setRating} selected={rating} />
            <div className='input-group'>
                <input 
                onChange={handleTextChange} 
                type='text' 
                placeholder='Write your review' 
                value={text}
                />
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {msg && <div className='message'>{msg}</div>}
        </form>
    </ Card>
  )
}

export default FeedbackForm