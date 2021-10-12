
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Rank from './components/Rank/Rank.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
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
     imgUrl: '',
     box: [],
     route: "signin",
     isSignedIn: false
   }
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState({isSignedIn: false});
    } else if(route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  render() {
    return (
      <div className="App">
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {this.state.route === "home"
        ?
        <div>
          <Logo />

          <ImageLinkForm onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
          <Rank />
          <FaceRecognition box = {this.state.box} imgUrl = {this.state.imgUrl}/>
        </ div>
        :
        (this.state.route === "signin"
        ? <Signin onRouteChange = {this.onRouteChange}/>
        : <Register onRouteChange = {this.onRouteChange}/>

        )
      }
      </div>
    );
  }

}


export default App;
