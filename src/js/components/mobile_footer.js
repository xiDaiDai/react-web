import React from 'react';
import { Row,Col} from 'antd';
import 'antd/dist/antd.css';

export default class MobileFooter extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<footer class="footer">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						&copy;&nbsp;2017 React News. All Rights Reserved.
					</Col>
					<Col span={2}></Col>
				</Row>
			</footer>
		);
	};
}