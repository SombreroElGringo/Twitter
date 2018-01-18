import React, { Component } from 'react';

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
            }
        });
    }

	render() {
        const { uid, id, token, likes } = this.props;
		return (
            <div className="_heart">
                <a 
                    onClick={e => this.handleClick()}
                >
                    <span>{likes}</span>
                </a>
            </div>
		);
	}
}