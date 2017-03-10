import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './components/pc_index';
import PCNewsDetail from './components/pc_news_detail';
import MobileNewsDetail from './components/mobile_news_detail';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';
import {Router, Route, hashHistory} from 'react-router';

export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<Router history={hashHistory}>
						<Route path="/" component={PCIndex}></Route>
						<Route path="/detail/:uniquekey" component={PCNewsDetail}></Route>
					</Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<Router history={hashHistory}>
						<Route path="/" component={MobileIndex}></Route>
						<Route path="/detail/:uniquekey" component={MobileNewsDetail}></Route>
					</Router>
				</MediaQuery>
			</div>
		);
	};
}

ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
