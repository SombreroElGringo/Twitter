import React, { Component } from 'react';
import { auth } from '../firebase';

export default class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uid: null,
		}
	}

	componentDidMount() {
        const { uid } = this.state;
        const interval = window.setInterval(async ()=>{

            let user = auth.getCurrentUser();
            if(!user)
                return false;
            clearInterval(interval);
            
            this.setState({
                uid: user.uid,
            });
        }, 1000)
	}
	
	render() {
		const { uid } = this.state;

		return (
		<div className="_navbar">
			<div className="_menu">
				<div className="_navigation">
					<ul>
						<li>
							<span>
								<a href="/">Accueil</a>
							</span>
						</li>
						<li>
							<span>
								<a href="/notifications">Notifications</a>
							</span>
						</li>
						<li>
							<span>
								<a href="/#">Messages</a>
							</span>
						</li>
					</ul>
				</div>
				<div className="_logo">
					<span/>
				</div>
				<div className="_avatar">
					<a href={`/account/${uid}`}>My account</a>
				</div>
			</div>
		</div>
		);
	}
}