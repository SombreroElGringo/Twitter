import React, { Component } from 'react';
import '../assets/css/App.css';
import Navbar from '../components/Navbar';
import Portfolio from '../components/Portfolio';
import Dataflow from '../components/Dataflow';

export default class AccountScreen extends Component {
    render() {
        const data = {
            username: 'michel',
            description: 'Artiste & Ingénieur!',
            createdAt: '1 year',
        }
		return (
			<div className="App">
				<Navbar />
                <Portfolio data={data} />
				<Dataflow username={'current or params'}/>
			</div>
		);
    }
}