import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCNewsBlock extends React.Component {
	constructor(props) {
    super(props);
    this.state={
    	news:[],
    }
  }

  componentWillMount(){
  	let myFetchOptions = {
  		method:'GET'
  	};
  	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="
  	+ this.props.type 
  	+ "&count="+ this.props.count, myFetchOptions)
  	.then(response => response.json())
  	.then(json => this.setState({news: json}));
  }


	render() {
		const news = this.state.news;
		const newList = news.length
		? news.map((item,index)=>{
			return(
				<li key={index}>
					<Link to={`detail/${item.uniquekey}`} target="_blank">
						{item.title}
					</Link>
				</li>
			)
		})
		:'没有加载到数据';

		return (
			<div>
				<Card>
					<ul>
						{newList}
					</ul>
				</Card>
			</div>
		);
	};
}