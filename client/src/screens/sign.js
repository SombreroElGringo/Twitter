import React, { Component } from 'react';
import '../assets/css/App.css';
import Sign from '../components/Sign';

export default class SignScreen extends Component {
    render() {
        return (
            <div className="App">
                <Sign />
            </div>
        );
    }
}