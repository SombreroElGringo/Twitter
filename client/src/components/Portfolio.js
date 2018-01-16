import React, { Component } from 'react';

export default class Porfolio extends Component {
	render() {
        const { username, description, createdAt } = this.props.data;
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
                            <span className="_description">{description}</span>
                            <span className="_date">Inscrit en {createdAt}</span>
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
                </div>
            </div>
		);
	}
}