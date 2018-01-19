import React, { Component } from 'react';
import Notification from './Notification';
import { auth } from '../firebase';

export default class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: null,
            datas: null,
        };
    }
    componentDidMount() {

        const interval = window.setInterval(async ()=>{

            let user = auth.getCurrentUser();
            if(!user)
                return false;
            clearInterval(interval);

            const token = await auth.getCurrentUserToken();
            this.setState({
                token,
                uid: user.uid,
            });

            const { uid } = this.state;

            // let query = `?token=${token}`;
            // query += uid ? `&uid=${uid}` : '';
            let query = `?uid=${uid}`;
            
            fetch(process.env.REACT_APP_API_URI + `/notifications${query}`, {
                method: 'get',
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((response) => {
                if(response.notifications && response.notifications.length > 0) {
                    this.setState({
                        datas: response.notifications,
                    });
                }
            });
        }, 1000)
    }
    
	render() {
        const { datas } = this.state;

		return (
            <div className="_notifications">
            { 
                datas ? (
                    datas.map((data, i) => {
                        return <Notification key={i} data={data} />;
                    })
                ) : (
                    <span className='_error'>No data!</span>
                )
            }
            </div>
		);
	}
}