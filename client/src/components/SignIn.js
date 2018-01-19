import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import { auth } from '../firebase';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isAuth: null,
            isValid: true,
            error: null,
        }
    }

    handleClick() {
        this.props.onSignFormTypeChange('signup');
    }

    async handleSubmit(e) {
        e.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        if (this.emailIsValid(email) && password.length > 5 ) {
           
            auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Signin - success');
                this.setState({
                    isAuth: true,
                });     
            })
            .catch(err => {
                console.log(`[ERROR][SIGNIN] : ${err}`);
            });
        } else {

            let error = this.emailIsValid(email) ? '' : 'Email';
            error += password.length > 0 ? '' : error === '' ? 'Password' : ' & password';
            error += error.length > 9 ? ' are' : ' is';

            this.setState({
                isValid: false,
                error,
            });
        }
    }

    emailIsValid(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

	render() {
        const { isAuth, isValid, error } = this.state;

        if(isAuth) {
            return <Redirect to='/'  />
        }

		return (
            <div>
                { isValid ? (
                    ''
                ): (
                    <div className="_errors">
                        <ul>
                            <li>{error} not valid!</li>
                        </ul>
                    </div>
                )}
                <div className="_signin">
                    <div className="_header">
                        <h1>Vous nous avez manqué!</h1>
                    </div>
                    <div className="_inputs">
                        <input  type="email" 
                                name="email" 
                                placeholder="Email"
                                ref={
                                    (ref) => {
                                        this.email = ref
                                    }
                                }
                        />
                        <input  type="password" 
                                name="password" 
                                placeholder="Mot de passe"
                                ref={
                                    (ref) => {
                                        this.password = ref
                                    }
                                }
                        />
                    </div>
                    <div className="_submit">
                        <input type="button" value="Se connecter" onClick={e => this.handleSubmit(e)} />
                    </div> 
                    <div className="_footer">
                        <h3>Vous n'avez pas de compte ? <a onClick={e => this.handleClick(e)}>Inscrivez-vous</a></h3>
                    </div>
                </div>
            </div>
		);
	}
}