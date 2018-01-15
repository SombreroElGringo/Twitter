import React, { Component } from 'react';
import '../assets/css/App.css';
import Navbar from '../components/Navbar';
import Notifications from '../components/Notifications';

export default class NotificationScreen extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Notifications />
            </div>
        );
    }
}