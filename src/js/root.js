import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<PCIndex></PCIndex>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<MobileIndex></MobileIndex>
				</MediaQuery>
			</div>
		);
	};
}

ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));