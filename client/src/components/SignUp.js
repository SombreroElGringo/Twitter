import React, { Component } from 'react';
import { auth } from '../firebase';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isAuth: null,
            isValid: true,
            error: null,
        }
    }

    handleClick(e) {
        this.props.onSignFormTypeChange('signin');
    }

    async handleSubmit(e) {
        e.preventDefault();

        const email = this.email.value;
        const username = this.username.value;
        const password = this.password.value;
        let payload = {email, username, password};

        if (this.emailIsValid(email) && username.length > 0 && password.length > 5 ) {
            
            auth.doCreateUserWithEmailAndPassword(email, password)
            .then(() => {

                let data = new FormData();
                data.append('json', JSON.stringify( payload ));

                await fetch(process.env.REACT_APP_API_URI, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data,
                })
                .then((res) => res.json())
                .then((response) => {
                    if (response.status === 'success') {
                        console.log('success');
                        this.setState({
                            isAuth: true,
                        });
                    }
                });
            })
            .catch(err => {
                console.log(`[ERROR][SIGNUP] : ${err}`);
            });
        } else {

            let error = this.emailIsValid(email) ? '' : 'Email';
            error += username.length > 0 ? '' : error === '' ? 'Username' : ', username';
            error += password.length > 5 ? '' : error === '' ? 'Password (6 char at least)' : ', password (6 char at least)';
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
        const { isValid, error } = this.state;
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
                <div className="_signup">
                    <div className="_header">
                        <h1>Rejoignez Twitter aujourd'hui.</h1>
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
                        <input  type="text" 
                                name="username" 
                                placeholder="Nom d'utilisateur"
                                ref={
                                    (ref) => {
                                        this.username = ref
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
                        <input type="button" value="S'inscrire" onClick={e => this.handleSubmit(e)} />
                    </div> 
                    <div className="_footer">
                        <h3>Vous avez un compte ? <a onClick={e => this.handleClick(e)}>Connectez-vous</a></h3>
                    </div>
                </div>
            </div>
		);
	}
}