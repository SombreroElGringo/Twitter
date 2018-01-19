import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

export default class Notification extends Component {
	render() {
        const { user_uid, post_id, target_uid, target_username, type, createdAt} = this.props.data;

		return (
            <div className="_notification">
                <div className="_header"> 
                    <span className="_username">
                        <a href={`/account/${target_uid}`}>@{target_username}</a>
                    </span>
                    <span className="_createdAt">
                        {moment(createdAt).from()}
                    </span>
                </div>
                <div className="_text">
                  <a href={`/account/${user_uid}`}>User</a>{` ${type} your `}<a href={`/tweet/${post_id}`}>tweet</a>
                </div>
            </div>
		);
	}
}