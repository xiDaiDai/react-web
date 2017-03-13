import React from 'react';
import {Card,Tabs,Row,Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsBlock from './pc_news_block';
const TabPane = Tabs.TabPane;
export default class PCUserCenter extends React.Component {
	constructor(props) {
    super(props);
    this.state={
    	usercollection:'',
    	usercomments:'',
    }
  }


  componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});

	};


	render() {
		const {usercomments,usercollection} = this.state;
		const usercollectionList = usercollection.length
		? usercollection.map((collection,index)=>{
			return(
				<Link to={`detail/${collection.uniquekey}`} target="_blank">
					<Card key={index} style={{margin:'5px'}}>
						<p>{collection.Title}</p>
					</Card>
				</Link>
			)
		})
		:'还没有收藏任何新闻';

		const usercommentsList = usercomments.length
		? usercomments.map((comment,index)=>{
			return(
				<Link to={`detail/${comment.uniquekey}`} target="_blank">
					<Card key={index} title={`于 ${comment.datetime} 评论了文章`} style={{margin:'5px'}}>
						<p>{comment.Comments}</p>
					</Card>
				</Link>
			)
		})
		:'还没有收藏任何新闻';

		return (
			<div>
				<PCHeader />
				<Row>
					<Col span={1}></Col>
					<Col span={22}>
						<Tabs>
						 	<TabPane tab="我的收藏" key="1">
						 		{usercollectionList}
						 	</TabPane>
						 	<TabPane tab="我的评论" key="2">
						 		{usercommentsList}
						 	</TabPane>
						 	<TabPane tab="我的设置" key="3">
						 		<PCNewsBlock type="guonei" count={20} width="100%"/>
						 	</TabPane>
						</Tabs>
					</Col>
					<Col span={1}></Col>
				</Row>
				<PCFooter />
			</div>
		);
	};
}