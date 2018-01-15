import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class Sign extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'signup',
        }
    }

    handleClick() {
        
        console.log('liked!')
    }

    handleSignFormType = (type) => {

        this.setState({
            type,
        });
    }

	render() {
        const { type } = this.state;

		return (
            <div className="_sign">
                { type === 'signin' ? (
                    <SignIn onSignFormTypeChange={this.handleSignFormType}/>
                ) : (
                    <SignUp onSignFormTypeChange={this.handleSignFormType}/>
                )}
            </div>
		);
	}
}