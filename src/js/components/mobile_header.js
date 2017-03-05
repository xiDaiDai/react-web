import React from 'react';
import { Row,Col,Menu, Icon,Form,Button,Input,Modal,Tabs,message} from 'antd';
import 'antd/dist/antd.css';
import {Router, Route, Link, browserHistory} from 'react-router';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class MobileHeader extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	currentTab:'top',
    	hasLogined:false,
    	modalVisible:false,
    	userid:'',
    	userNickName:'',
    	action:'login'
    };
  }

  componentWillMount(){
  	if (localStorage.userid!='') {
			this.setState({hasLogined:true});
			this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
		}
  }

  setModalVisible(visible){
  	this.setState({modalVisible:visible});
  }

  handleClick(e){
  	if(e.key=="register"){
  		this.setState({currentTab:'register'});
  		this.setModalVisible(true);
  	}else{
  		this.setState({currentTab:e.key});
  	}
  }
  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions={
  		method:'GET'
  	};
  	const formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json()).then(json=>{
			this.setState({userNickName:json.NickUserName,userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		})
		message.success('请求成功');
		this.setModalVisible(false);
		this.state.action=='login'&&this.setState({hasLogined:true});
  }

  login(){
  	this.setModalVisible(true);
  }

  logout(){
  	localStorage.userNickName='';
  	localStorage.userid = '';
  	this.setState({hasLogined:false});
  }

  callback(key){
  	 if(key == '1'){
  	 		this.setState({action:'login'});
  	 }else if(key == '2'){
				this.setState({action:'register'});  	 	
  	 }
  }

	render() {
		const {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined
		? <Link  target="_blank">
				<Icon type="inbox" onClick={this.logout.bind(this)}/>
			</Link>
		: <Icon type="setting" onClick={this.login.bind(this)}/>;
			
		return (
			<div id="mobileheader">
				<header>
					<img src="./src/images/logo.png" alt="logo"/>
					<span>React News</span>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
					onCancel={()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)}>
					<Tabs type="card" onChange={(e)=>this.callback(e)}>
							<TabPane tab="登录" key="1">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
								<TabPane tab="注册" key="2">
									<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
										</FormItem>
										<FormItem label="确认密码">
											<Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
				</Modal>
			</div>
		);
	};
}

export default MobileHeader = Form.create({})(MobileHeader);