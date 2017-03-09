import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCNewsImageBlock extends React.Component {
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
		const styleImage={
				display: 'block',
				width:this.props.imageWidth,
				height:'90px',
		};
		const styleH3={
			width:this.props.imageWidth,
			whiteSpace:'nowrap',
			overflow:'hidden',
			textOverflow:'ellipsis'
		};

		const news = this.state.news;
		const newList = news.length
		? news.map((item,index)=>{
			return(
				<div key={index} class='imageblock'>
					<Link to={`detail/${item.uniquekey}`} target="_blank">
						<div class='custom-image'>
							<img alt='' style={styleImage} src={item.thumbnail_pic_s}></img>
						</div>
						<div class='custome-card'>
							<h3 style={styleH3}>{item.title}</h3>
							<p style={styleH3}>{item.author_name}</p>
						</div>
					</Link>
				</div> 
			)
		})
		:'没有加载到数据';

		return (
			<div class='topNewsList'>
				<Card title={this.props.cardTitle} bodyStyle={{ padding: 0 }} style={{width:this.props.width}}>
				 	{newList}
				</Card>
			</div>
		);
	};
}