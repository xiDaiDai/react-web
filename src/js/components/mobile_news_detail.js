import React from 'react';
import {BackTop} from 'antd';
export default class MobileNewsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ''
    };
  };
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
      this.setState({newsItem: json});
      document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
    });
  };
  createMarkup() {
    return {__html: this.state.newsItem.pagecontent};
  };
  render() {
    return (
      <div>
        <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
      </div>
    );
  };
}
