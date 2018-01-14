import React, { Component } from 'react';

export default class Heart extends Component {

    handleClick() {
        
        console.log('liked!')
    }

	render() {
        const { user_id, id, likes} = this.props;
		return (
            <div className="_heart">
                <a 
                    href="#"
                    onClick={e => this.handleClick()}
                >
                    <span>{likes}</span>
                </a>
            </div>
		);
	}
}