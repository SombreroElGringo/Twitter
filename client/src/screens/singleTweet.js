import React, { Component } from 'react';
import '../assets/css/App.css';
import Tweet from '../components/Tweet';
import { auth } from '../firebase';

export default class SingleTweetScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            uid: null,
            token: null,
            id: this.props.match.params.id,
        }
    }

    componentDidMount() {

        const interval = window.setInterval(async ()=>{

            let user = auth.getCurrentUser();
            if(!user)
                return false;
            clearInterval(interval);
            
            const token = await auth.getCurrentUserToken();
            const { id } = this.state;

            this.setState({
                token,
                uid: user.uid,
            });

            
            fetch(process.env.REACT_APP_API_URI + `/posts/${id}`, {
                method: 'get',
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((response) => {
                if(response.post) {
                    this.setState({
                        data: response.post,
                    });
                }
            });
        }, 1000)
    }

    render() {
        const { uid, token, data } = this.state;
        return (
            <div className="App">
                <div className="_single">
                {   data ? (
                    <Tweet data={data} token={token} uid={uid}/>
                ) : (
                    <span className='_error'>No data!</span>
                )
                }
                </div>
            </div>
        );
    }
}