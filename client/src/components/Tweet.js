import React, { Component } from 'react';
import Heart from './Heart';

export default class Tweet extends Component {
	render() {
        const { id, username, text, createdAt, likes} = this.props.data;
		return (
            <div className="_tweet">
                <div className="_header"> 
                    <img className="_avatar" src="https://unsplash.it/64?random" alt="avatar" />
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
                <div className="_footer">
                    <Heart id={id} likes={likes} />
                </div>
            </div>
		);
	}
}