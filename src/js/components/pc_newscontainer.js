import React from 'react';
import { Row,Col,Carousel,Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
export default class PCNewsContainer extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		}

		return (
			<div>
				<Row>
					<Col span={1}></Col>
					<Col span={22} class="container">
					 	<div class="leftContainer">
					 		<div class="carousel">
						 		<Carousel {...settings}>
						 			<div><img class="carousel_img" src="./src/images/carousel_1.jpg"/></div>
						 			<div><img class="carousel_img" src="./src/images/carousel_2.jpg"/></div>
						 			<div><img class="carousel_img" src="./src/images/carousel_3.jpg"/></div>
						 			<div><img class="carousel_img" src="./src/images/carousel_4.jpg"/></div>
						 		</Carousel>
					 		</div>
					 		<PCNewsImageBlock cardTitle='国内新闻' type='guonei' count={6} width='400px' imageWidth='100px'></PCNewsImageBlock>
					 	</div>
					 	<Tabs class="tabs_news">
					 		<TabPane tab="热门新闻" key="1">
					 			<PCNewsBlock type="top" count={20} width="100%"/>
					 		</TabPane>
					 		<TabPane tab="国内新闻" key="2">
					 			<PCNewsBlock type="guonei" count={10} width="100%"/>
					 		</TabPane>
					 	</Tabs>
					 	<div>
					 		<PCNewsImageBlock cardTitle='娱乐新闻' type='yule' count={18} width='100%' imageWidth='100px'></PCNewsImageBlock>
					 	</div>
					</Col>
					<Col span={1}></Col>
				</Row>
			</div>
		);
	};
}