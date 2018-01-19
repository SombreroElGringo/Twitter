import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';

export default class Porfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onEdit: null,
            username: this.props.data.username || 'Anonymous',
            description: this.props.data.description || 'My description!',
            createdAt: this.props.data.createdAt || 1516299116,
        }
    }

    handleEditProfile(e) {
        e.preventDefault();
        
        let newVal = this.state.onEdit ? null : true;

        this.setState({
            onEdit: newVal,
        });

        if(this.state.onEdit) {
            let description = this.description.value;
            const uid = this.props.uid;
            const payload = `description=${description}`;

            fetch(process.env.REACT_APP_API_URI + `/users/${uid}/description`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: payload,
            })
            .then((res) => res.json())
            .then((response) => {
                if (response.status === 'success') {
                    console.log(response);
                    this.onActionReloadPortfolio();
                }
            });
        }
    }

    onActionReloadPortfolio = () => {
        const { uid } = this.props;
        
        fetch(process.env.REACT_APP_API_URI + `/users/${uid}`, {
            method: 'get',
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((response) => {
            
            this.setState({
                description: response.user.description,
            });
        });
    }

	render() {

        const { username, description, createdAt, onEdit } = this.state;

		return (
            <div className="_portfolio">
                <div className="_banner"> 
                    <img src="https://source.unsplash.com/1600x400/?japan" alt="banner" />
                </div>
                <div className="_subnavbar">
                    <div className="_avatar">
                        <img src="https://unsplash.it/200?random" alt="avatar"/>
                        <div className="_informations">
                            <span className="_username">@{username}</span>
                            { onEdit ? (
                                <input type="text" defaultValue={description} name="description" maxLength="65" ref={(ref) => {this.description = ref}}/>
                            ):(
                                <span className="_description">{description}</span>
                            )}
                            <span className="_date"><span />Inscrit en {moment(createdAt).format('MMMM YYYY')}</span>
                        </div>
                    </div>
                    <div className="_navigation">
                        <ul>
                            <li>
                                <span>
                                    <a>Tweets</a>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <a>J'aime</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="_edit">
                        <input type="button" value="Éditer le profil" onClick={e => this.handleEditProfile(e)} />
                    </div>
                </div>
            </div>
		);
	}
}