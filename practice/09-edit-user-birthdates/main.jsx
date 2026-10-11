import React, {Component} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import Solution from './Solution.jsx';
import './style.css';
class ErrorBoundary extends Component {
  state = {error:null};
  static getDerivedStateFromError(error) { return {error}; }
  render() {return this.state.error ? <pre role="alert">{this.state.error.message}
Read the console and repair App.jsx, then reload.</pre> : this.props.children;}
}
const solution = new URLSearchParams(location.search).get('solution') === '1';
const Exercise = solution ? Solution : App;
createRoot(document.getElementById('root')).render(<React.StrictMode>
  <main><h1>09. Edit users across birth-year lists</h1><p>{solution ? 'Reference solution' : 'Your practice starter'}</p>
  <nav><a href="/">Practice</a> · <a href="/?solution=1">Reveal solution</a></nav>
  <p>Edit App.jsx; read README.md for the requirements.</p><hr/>
  <ErrorBoundary><Exercise/></ErrorBoundary></main></React.StrictMode>);
