import React from 'react';
import { Row,Col,Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileHeader extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo"/>
					<span>React News</span>
				</header>
			</div>
		);
	};
}