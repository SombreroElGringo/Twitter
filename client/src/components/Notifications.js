import React, { Component } from 'react';
import Notification from './Notification';

export default class Notifications extends Component {
	render() {
        const datas = [
            {
                id: 1,
                post_id: 1,
                type: 'like',
                username: 'nils',
                target: 'my_pseudo',
                text: 'nils liked your tweet',
                createdAt: '2017-10-13T16:13:35.367Z',
            },
            {
                id: 2,
                post_id: 1,
                type: 'unlike',
                username: 'jean',
                target: 'my_pseudo',
                text: 'jean unliked your tweet',
                createdAt: '2017-10-13T16:13:35.367Z',
            }
        ];

		return (
            <div className="_notifications">
            {
                datas.map((data, i) => {
                    return <Notification key={i} data={data} />;
                })
            }
            </div>
		);
	}
}