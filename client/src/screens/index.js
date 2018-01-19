import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import { auth } from '../firebase';
import '../assets/css/App.css';
import Navbar from '../components/Navbar';
import Dataflow from '../components/Dataflow';


export default class IndexScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuth: true,
		}
	}

	async componentDidMount() {
		if (await auth.isUserAuth()) {
			this.setState({
				isAuth: true,
			})
		} else {
			this.setState({
				isAuth: null,
			})
		}
	}

    render() {
		const { isAuth } = this.state;

		if(!isAuth) {
			return <Redirect to='/sign'  />
		}

		return (
			<div className="App">
				<Navbar />
				<Dataflow />
			</div>
		);
    }
  }