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
				<div class='item-li' key={index}>
					<Link to={`detail/${item.uniquekey}`} target="_blank">
            <div class="item_container">
              <div class="leftImageContainer">
                <img class="leftImage" alt='image' src={item.thumbnail_pic_s}/>
              </div>
              <div class="rightContainer">
                <div class="right_title">{item.title}</div>
                <div class="right_info">
                  <span class="span_author">{item.realtype}</span>
                  <span class="span_time">{item.date}</span>
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
