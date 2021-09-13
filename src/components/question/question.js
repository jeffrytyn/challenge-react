import React from 'react';
import Form from 'react-bootstrap/Form';

import './question.css'

function Question(props){
    const options = Object.entries(props.options).map(([k,v], i) => {
      return (
        <div 
          key={`${props.prompt}-${i}`}
          className={"question-option mb-2 " + (props.selected === i ? "clicked": "")} 
          onClick={() => props.handleClick(props.index, i)}>
            <Form.Check 
            label={`${k}: ${v}`} 
            checked={props.selected === i}
            onChange={() =>{return}} 
            />
        </div>
      )
    })
    return(
      <div className="question mb-4">
        <h4>{props.prompt}</h4>
        {options}
      </div>
    )
}

export default Question
