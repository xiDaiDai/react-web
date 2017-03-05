import React from 'react';
import { Row,Col,Menu, Icon,Form,Button,Input,Modal,Tabs,message} from 'antd';
import 'antd/dist/antd.css';
import {Router, Route, Link, browserHistory} from 'react-router';
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class PCHeader extends React.Component {
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
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		})
		message.success('请求成功');
		this.setModalVisible(false);
		this.state.action=='login'&&this.setState({hasLogined:true});

  }

  logout(){
  	localStorage.userNickName='';
  	localStorage.userid = '';
  	this.setState({hasLogined:false});
  }

  callback(key){
  	 if(key =='1'){
  	 		this.setState({action:'login'});
  	 }else if(key =='2'){
				this.setState({action:'register'});  	 	
  	 }
  }

	render() {
		const {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined
		? <Menu.Item key="logout" class="register">
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
				<Link style={{display:'inline-block'}} target="_blank" to={`/usercenter`}>
						<Button type="dashed" htmlType="button">个人中心</Button>
				</Link>
				&nbsp;&nbsp;
				<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
			</Menu.Item>
		: <Menu.Item key="register" class="register">
				<Icon type="appstore"/>登录/注册
			</Menu.Item>
		return (
			<header>
				<Row>
					<Col span={1}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>React News</span>
						</a>
					</Col>
					<Col span={18}>
						<Menu 
							onClick={(e)=>{this.handleClick(e)}}
							selectedKeys={[this.state.currentTab]}
							mode="horizontal">
							<Menu.Item key="top">
								<Icon type="appstore"/>头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="appstore"/>社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>时尚
							</Menu.Item>
							{userShow}
						</Menu>
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
					</Col>
					<Col span={1}></Col>
				</Row>
				
			</header>
		);
	};
}

export default PCHeader = Form.create({})(PCHeader);