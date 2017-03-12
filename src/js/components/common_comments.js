import React from 'react';
import {
	Form,
	Input,
	Row,
	Col,
	Button,
	Icon,
	Card,
	notification
} from 'antd';
import 'antd/dist/antd.css';
const FormItem = Form.Item;
class CommonComments extends React.Component {
	constructor(props) {
    super(props);
    this.state={
    	comments:''
    }
  }

  componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({comments: json});
		});
	};

	handleSubmit(e) {
		e.preventDefault();
		let myFetchOptions = {	
			method: 'GET'
		};
		let formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		})
	};

	 addUserCollection(){
  	let myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const {comments} = this.state;
		const commentList = comments.length ? comments.map((comment,index)=>{return(
			<Card style={{margin:'5px'}} key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
				<p>{comment.Comments}</p>
			</Card>
			)}):'没有加载到任何评论';

		return (
			<div class="comments">
				<Row>
					{commentList}
					<Col style={{margin:'5px'}} span={24}>
						<Form onSubmit={(e)=>{this.handleSubmit(e)}}>
							<FormItem>
          		{getFieldDecorator('remark')(
            	<Input type="textarea"   placeholder="请输入评论" />
          		)}
        			</FormItem>
       			 	<Button type="primary" htmlType="submit">提交评论</Button>
       			 	&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={()=>this.addUserCollection()}>收藏该文章</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	};
}

export default CommonComments = Form.create({})(CommonComments);