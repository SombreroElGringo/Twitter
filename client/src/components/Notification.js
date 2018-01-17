import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

export default class Notification extends Component {
	render() {
        const {  username, text, createdAt} = this.props.data;

		return (
            <div className="_notification">
                <div className="_header"> 
                    <span className="_username">
                        <a href={`/account/${username}`}>@{username}</a>
                    </span>
                    <span className="_createdAt">
                        {moment(createdAt).from()}
                    </span>
                </div>
                <div className="_text">
                    {text}
                </div>
            </div>
		);
	}
}