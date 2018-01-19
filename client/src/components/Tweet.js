import React, { Component } from 'react';
import Heart from './Heart';
import moment from 'moment';
import 'moment/locale/fr';

export default class Tweet extends Component {
   
    handleLike = () => {
        this.props.onActionReloadDataflow();
    }

	render() {
        const { id, user_uid, username, text, createdAt, likes} = this.props.data;
        const { uid, token } = this.props;

		return (
            <div className="_tweet">
                <div className="_header"> 
                    <img className="_avatar" src="https://unsplash.it/64?random" alt="avatar" />
                    <span className="_username">
                        <a href={`/account/${user_uid}`}>@{username}</a>
                    </span>
                    <span className="_createdAt">
                        {moment(createdAt).from()}
                    </span>
                </div>
                <div className="_text">
                    {text}
                </div>
                <div className="_footer">
                    <Heart id={id} likes={likes} uid={uid} token={token} onLike={this.handleLike} />
                </div>
            </div>
		);
	}
}