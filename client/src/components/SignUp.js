import React, { Component } from 'react';

export default class SignUp extends Component {
    handleClick(e) {
        this.props.onSignFormTypeChange('signin');
    }

    handleSubmit() {
        
        console.log('signup - data posted!')
    }

	render() {
		return (
            <div className="_signup">
                <div className="_header">
                    <h1>Rejoignez Twitter aujourd'hui.</h1>
                </div>
                <div className="_inputs">
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="text" name="username" placeholder="Nom d'utilisateur"/>
                    <input type="text" name="password" placeholder="Mot de passe"/>
                </div>
                <div className="_submit">
                    <input type="button" value="S'inscrire" onClick={e => this.handleSubmit()} />
                </div> 
                <div className="_footer">
                    <h3>Vous n'avez pas de compte ? <a onClick={e => this.handleClick(e)}>Inscrivez-vous</a></h3>
                </div>
            </div>
		);
	}
}