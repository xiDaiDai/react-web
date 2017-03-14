import React from 'react';
import {Card,Tabs,Row,Col,Upload,Modal,Icon} from 'antd';
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
    	previewVisible: false,
    	previewImage: '',
    	fileList: [],
    }
  }


  handleCancel(){this.setState({ previewVisible: false })};

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({fileList}){this.setState({fileList})};


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
				<Link key={index} to={`detail/${collection.uniquekey}`} target="_blank">
					<Card  style={{margin:'5px'}}>
						<p>{collection.Title}</p>
					</Card>
				</Link>
			)
		})
		:'还没有收藏任何新闻';

		const usercommentsList = usercomments.length
		? usercomments.map((comment,index)=>{
			return(
				<Link key={index} to={`detail/${comment.uniquekey}`} target="_blank">
					<Card  title={`于 ${comment.datetime} 评论了文章`} style={{margin:'5px'}}>
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
						 		{this.renderUpload()}
						 	</TabPane>
						</Tabs>
					</Col>
					<Col span={1}></Col>
				</Row>
				<PCFooter />
			</div>
		);
	};

	renderUpload(){
		const {previewVisible, previewImage, fileList} = this.state;
		const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

		return(
			<div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={(file)=>this.handlePreview(file)}
          onChange={(filelist)=>this.handleChange(filelist)}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={()=>this.handleCancel()}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
		);
	}
}














