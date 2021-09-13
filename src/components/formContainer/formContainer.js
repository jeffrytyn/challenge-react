import React from 'react';
import {Button, Container, Jumbotron} from 'react-bootstrap';
import Question from "../question/question";
import ErrorModal from "../errorModal/errorModal";
import data from '../../data.json';
import {mode} from "../../helpers";

import './formContainer.css';

class FormContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: "",
      completed: false,
      data: data,
      answers: new Array(data.questions.length).fill(-1)
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleRetake = this.handleRetake.bind(this);
    this.closeError = this.closeError.bind(this);
  }

  componentDidUpdate(_, prevState){
    if(this.state.completed && !prevState.completed){
      window.scrollTo(0,document.body.scrollHeight);
    }
  }

  handleSelection(index, option){
    if(!this.state.completed){
      const updates = this.state.answers.map((item, i) => {
        if(i === index){
          if(item === option) return -1;
          else return option;
        }
        else return item;
      })
      this.setState({
        answers: updates
      })
    }else{
      this.setState({
        error: "You cannot change your answers after submitting."
      })
    }
  }

  handleSubmit(){
    if(!this.state.answers.includes(-1)){
      this.setState({
        completed: true
      });
    }else{
      this.setState({
        error: "You must answer all questions to submit."
      })
    }
  }

  handleRetake(){
    window.scrollTo(0,0);
    this.setState({
      completed: false
    })
  }

  closeError(){
    this.setState({
      error: ""
    })
  }

  render(){
    let children = [];
    for(var i = 0; i < this.state.data.questions.length; i++){
      children.push(
      <Question
        key={i}
        index={i}
        selected = {this.state.answers[i]}
        handleClick={this.handleSelection}
        prompt={this.state.data.questions[i].prompt} 
        options={this.state.data.questions[i].options}
        />
      );
    }
    return(
      <Container className="py-3 px-3 formContainer">
        <ErrorModal show={this.state.error!==""} message={this.state.error} handleClose={this.closeError}/>
        <h2 className="text-center mb-4">DP Challenge Quiz!</h2>
        <div>
          {children}
          {this.state.completed ? 
            <div>
              <Button className={"formButton mb-4"} variant="primary" onClick={this.handleRetake}>Retake Quiz</Button>
              <Jumbotron className="quiz-result">
                {this.state.data.results[mode(this.state.answers)]}
              </Jumbotron>
            </div> :
            <Button className={"formButton mb-4"} variant="primary" onClick={this.handleSubmit}>Show Me My Results</Button>
          }
        </div>
      </Container>
    )
  }
}

export default FormContainer