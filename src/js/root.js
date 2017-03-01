import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './components/pc_index';
 

export default class Root extends React.Component {
	render() {
		return (
			<div>
				<PCIndex></PCIndex>
			</div>
		);
	};
}

ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));