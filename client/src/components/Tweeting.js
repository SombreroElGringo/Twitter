import React, { Component } from 'react';
import { auth } from '../firebase';

export default class Tweeting extends Component {

    async handleClick() {

        const text = this.text.value;
        const user = auth.getCurrentUser();
        const user_uid = user.uid;
        const token = await auth.getCurrentUserToken();
        const payload = `text=${text}&user_uid=${user_uid}`;
        
        fetch(process.env.REACT_APP_API_URI + `/posts?token=${token}`, {
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
                this.text.value = '';
                this.props.onActionReloadDataflow();
            }
        });
    }

	render() {
        const { username } = this.props;
		return (
            <div className="_tweeting">
                <div className="_input">
                    <input  type="text" 
                            name="text" 
                            placeholder="What's happening?"
                            ref={
                                (ref) => {
                                    this.text = ref
                                }
                            }
                    />
                </div>
                <div className="_submit">
                    <input type="submit" value="Tweet" onClick={e => this.handleClick(e)}/>
                </div>
            </div>
		);
	}
}