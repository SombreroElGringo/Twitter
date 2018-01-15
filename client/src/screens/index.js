import React, { Component } from 'react';
import '../assets/css/App.css';
import Navbar from '../components/Navbar';
import Dataflow from '../components/Dataflow';

export default class IndexScreen extends Component {
    render() {
		return (
			<div className="App">
				<Navbar />
				<Dataflow />
			</div>
		);
    }
  }