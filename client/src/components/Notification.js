import React, { Component } from 'react';

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
                        {createdAt}
                    </span>
                </div>
                <div className="_text">
                    {text}
                </div>
            </div>
		);
	}
}