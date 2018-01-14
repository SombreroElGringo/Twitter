import React, { Component } from 'react';
import Tweeting from './Tweeting';
import Tweet from './Tweet';

export default class Dataflow extends Component {
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