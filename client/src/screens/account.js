import React, { Component } from 'react';
import '../assets/css/App.css';
import Navbar from '../components/Navbar';
import Portfolio from '../components/Portfolio';
import Dataflow from '../components/Dataflow';

export default class AccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            id: this.props.match.params.id || null,
        }
    }

    componentDidMount() {
        const { id } = this.state;
        let uid = id ;

        if (!uid) {
            uid = '';
        }
        
        fetch(process.env.REACT_APP_API_URI + `/users/${uid}`, {
            method: 'get',
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((response) => {
            this.setState({
                data: response.user,
            });
        });
	}

    render() {
        const { id, data } = this.state;

		return (
			<div className="App">
				<Navbar />
                { data ? (
                    <Portfolio data={data} />
                ) : (
                    null
                )
                }
                <Dataflow uid={id} />
			</div>
		);
    }
}