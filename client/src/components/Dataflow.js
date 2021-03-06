import React, { Component } from 'react';
import Tweeting from './Tweeting';
import Tweet from './Tweet';
import { auth } from '../firebase';

export default class Dataflow extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: null,
            token: null,
            uid: this.props.uid || null,
            user_uid: null
        }
    }

    handleAction = () => {
        const { uid } = this.state;

        const interval = window.setInterval(async ()=>{

            let user = auth.getCurrentUser();
            if(!user)
                return false;
            clearInterval(interval);
            
            const token = await auth.getCurrentUserToken();
            this.setState({
                token,
                user_uid: user.uid,
            });

            let query = `?token=${token}`;
            query += uid ? `&uid=${uid}` : '';
            
            fetch(process.env.REACT_APP_API_URI + `/posts${query}`, {
                method: 'get',
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((response) => {
                if(response.posts) {
                    this.setState({
                        data: response.posts,
                    });
                }
            });
        }, 1000)
    }

    componentDidMount() {

        const { uid } = this.state;

        const interval = window.setInterval(async ()=>{

            let user = auth.getCurrentUser();
            if(!user)
                return false;
            clearInterval(interval);
            
            const token = await auth.getCurrentUserToken();
            this.setState({
                token,
                user_uid: user.uid,
            });

            let query = `?token=${token}`;
            query += uid ? `&uid=${uid}` : '';
            
            fetch(process.env.REACT_APP_API_URI + `/posts${query}`, {
                method: 'get',
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((response) => {
                if(response.posts) {
                    this.setState({
                        data: response.posts,
                    });
                }
            });
        }, 1000)
    }

	render() {
        const { data, user_uid, token } = this.state;
 
		return (
            <div className="_dataflow">
                <Tweeting onActionReloadDataflow={this.handleAction} />
                {   data ? (
                        data.map((item, i) => {
                            return <Tweet key={i} data={item} token={token} uid={user_uid} onActionReloadDataflow={this.handleAction} />;
                        })
                    ) : (
                        <span className='_error'>No data!</span>
                    )
                }
            </div>
		);
	}
}