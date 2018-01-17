import React, { Component } from 'react';

export default class Porfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onEdit: null,
        }
    }

    handleEditProfile() {
        let newVal = this.state.onEdit ? null : true;
        this.setState({
            onEdit: newVal,
        });
    }

	render() {
        const { username, description, createdAt } = this.props.data;
        const { onEdit } = this.state;
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
                                <input type="text" defaultValue={description} name="description" maxLength="65" />
                            ):(
                                <span className="_description">{description}</span>
                            )}
                            <span className="_date"><span />Inscrit en {createdAt}</span>
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
                        <input type="button" value="Éditer le profil" onClick={e => this.handleEditProfile()} />
                    </div>
                </div>
            </div>
		);
	}
}