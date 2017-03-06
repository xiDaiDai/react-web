import React from 'react';
import {Row,Col} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class MobileList extends React.Component {
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
				<div key={index}>
					<Link to={'detail/${item.uniquekey}'} target="_blank">
						<div>
							<div class='m_image_info'>
								<img alt='' style={{width:'100px',height:'100px'}} src={item.thumbnail_pic_s}/>
							</div>
							<div class='m_artile_info'>
								<div class='m_title'>
									<span>{item.title}</span>
								</div>
								<div>
									<span>{item.realtype}</span>
									<span>{item.date}</span>
								</div>
							</div>
						</div>
					</Link>
				</div>
			)
		})
		:'没有加载到数据';

		return (
			<div>
				<Row>
					<Col>
						{newList}
					</Col>
				</Row>
			</div>
		);
	};
}