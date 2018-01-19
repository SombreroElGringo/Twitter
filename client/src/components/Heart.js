import React, { Component } from 'react';
import _ from 'lodash';

export default class Heart extends Component {

    handleClick() {
        const { id, uid } = this.props;
        const payload = `uid=${uid}`;

        fetch(process.env.REACT_APP_API_URI + `/posts/${id}/like`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: payload,
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.status === 'success') {
                console.log(response);
                // TODO: reload dataflow
                this.props.onLike();
            }
        });
    }

	render() {
        const { likes, uid } = this.props;
        let active = _.includes(likes, uid) ? '_liked' : '';
        
		return (
            <div className='_heart'>
                <a className={active}
                    onClick={e => this.handleClick()}
                >
                    <span>{likes.length ? likes.length : 0}</span>
                </a>
            </div>
		);
	}
}