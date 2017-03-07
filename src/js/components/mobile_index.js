import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs,Carousel} from 'antd';
import MobileList from './mobile_list';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
						 
	render() {
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		}
		
		return (
			<div>
			 	<MobileHeader></MobileHeader>
			 	<Tabs>
			 		<TabPane tab="头条" key="1">
			 			<div class="carousel">
						 		<Carousel {...settings}>
						 			<div><img class="carousel_img" src="./src/images/carousel_1.jpg"/></div>
						 			<div><img class="carousel_img" src="./src/images/carousel_2.jpg"/></div>
						 			<div><img class="carousel_img" src="./src/images/carousel_3.jpg"/></div>
						 			<div><img class="carousel_img" src="./src/images/carousel_4.jpg"/></div>
						 		</Carousel>
					 	</div>
			 			<MobileList count={10} type='top'/>
			 		</TabPane>
			 		<TabPane tab="社会" key="2">
			 			<MobileList count={10} type='shehui'/>
			 		</TabPane>
			 		<TabPane tab="国内" key="3">
						<MobileList count={10} type='guonei'/>
			 		</TabPane>
			 		<TabPane tab="国际" key="4">
			 			<MobileList count={10} type='guoji'/>
			 		</TabPane>
			 		<TabPane tab="体育" key="5">
			 			<MobileList count={10} type='tiyu'/>
			 		</TabPane>
			 		<TabPane tab="科技" key="6">
			 			<MobileList count={10} type='keji'/>
			 		</TabPane>
			 		<TabPane tab="时尚" key="7">
			 			<MobileList count={10} type='shishang'/>
			 		</TabPane>
			 	</Tabs>
			 	<MobileFooter></MobileFooter>
			</div>
		);
	};
}