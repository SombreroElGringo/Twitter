import React, { Component } from 'react';

export default class Navbar extends Component {
	render() {
		return (
		<div className="_navbar">
			<div className="_menu">
				<div className="_navigation">
					<ul>
						<li>
							<span>
								<a href="/">Acceuil</a>
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
					<span className="_twitter">Twitter ❤️</span>
				</div>
				<div className="_avatar">
					<a href="/account">My account</a>
				</div>
			</div>
		</div>
		);
	}
}