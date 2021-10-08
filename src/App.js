
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import React, { Component } from 'react'

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '4604841c576e4b2f8a34733b2d5f5c6b'
});

class App extends Component {
  constructor() {
    super();
    this.state = {input: '', }

  }
  onInputChange = (event) => {
    console.log(event.target.value);
  }
  onSubmit = () => {
    console.log('click');

  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}/>
        <Rank />
      </div>
    );
  }

}

export default App;
