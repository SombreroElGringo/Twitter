import React, { Component } from 'react';

export default class SignIn extends Component {

    handleClick() {
        this.props.onSignFormTypeChange('signup');
    }

    handleSubmit() {
        
        console.log('signin - data posted!')
    }

	render() {
		return (
            <div className="_signin">
                <div className="_header">
                    <h1>Vous nous avez manqué!</h1>
                </div>
                <div className="_inputs">
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="text" name="password" placeholder="Mot de passe"/>
                </div>
                <div className="_submit">
                    <input type="button" value="Se connecter" onClick={e => this.handleSubmit()} />
                </div> 
                <div className="_footer">
                    <h3>Vous avez un compte ? <a onClick={e => this.handleClick(e)}>Connectez-vous</a></h3>
                </div>
            </div>
		);
	}
}