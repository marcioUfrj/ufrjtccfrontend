import React from 'react'
import Answer from '../answer'

function AnswerContainer( { exercise, answers } ) {
  return (
    <div className="btn-grid">
      {answers.map((item, index) => (
        <Answer key={index} item={item} exercise={exercise}/>
      ))}
    </div>
  )
}

export default AnswerContainer