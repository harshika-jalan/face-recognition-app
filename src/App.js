
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'
import React, { Component } from 'react'

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '4604841c576e4b2f8a34733b2d5f5c6b'
});

class App extends Component {
  constructor() {
    super();
    this.state =
    {input: '',
     imgUrl: ''
   }

  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL,'components/Logo/brain.png').then(
      function (response) {
        // response data fetch from FACE_DETECT_MODEL
        console.log(response);
      },
      function (err) {
        // there was an error
      }
    )
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}/>
        <Rank />
        <FaceRecognition imgUrl = {this.state.imgUrl}/>
      </div>
    );
  }

}

export default App;
