import React from 'react'
import Answer from '../answer'

function AnswerContainer( { answers } ) {
  return (
    <div className="btn-grid">
      {answers.map((item, index) => (
        <Answer key={index} item={item} />
      ))}
    </div>
  )
}

export default AnswerContainer