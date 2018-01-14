import React, { Component } from 'react';

export default class Tweeting extends Component {

    handleClick() {
        
        console.log('tweeted!')
    }

	render() {
        const { username } = this.props;
		return (
            <div className="_tweeting">
                <div className="_input">
                    <input type="text" name="text" placeholder="What's happening?"/>
                </div>
                <div className="_submit">
                    <input type="submit" value="Tweet" onClick={e => this.handleClick()}/>
                </div>
            </div>
		);
	}
}