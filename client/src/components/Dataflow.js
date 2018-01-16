import React, { Component } from 'react';
import Tweeting from './Tweeting';
import Tweet from './Tweet';

export default class Dataflow extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: null,
            username: this.props.username || null,
        }
    }

	render() {
        const data = {
            id: 1,
            username: 'michel',
            text: 'lalalalal ddddd',
            createdAt: '12h',
            likes: 2,
        }

		return (
            <div className="_dataflow">
                <Tweeting username="me" />
                <Tweet data={data} />
            </div>
		);
	}
}