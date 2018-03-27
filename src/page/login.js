import React from 'react'
import {Form, Input, Button} from 'antd';
import {axios, apis, qs} from '../api';
import {browserHistory} from 'react-router';
const FormItem = Form.Item;

class Login extends React.Component {
	constructor() {
	  super();
	  this.state = {};
	}

	login = data=>{
		axios.post(apis.login, qs.stringify(data))
		.then(data=>{
			if (data.code == 0) {
				localStorage.setItem('token', data.data.token);
		    	browserHistory.push('/');
			} else {
				alert(data.message)
			}
		})
		.catch(err=>alert(err));
	}

	handleSubmit = e=>{
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
      		if (!err) {
	    		console.log('Received values of form: ', values);
				this.login(values);
	    	}
	    });
	}

	render() {
		const {getFieldDecorator} = this.props.form;

	    return (
	    	<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					<h2>登录</h2>
					<span className={'subTitle'}>登录并贡献小号即可一键手气最佳红包</span>
				</FormItem>
				<FormItem>
					{getFieldDecorator('account', {
						rules: [{required: true, message: '请输入帐号'}]
					})(
						<Input placeholder="请输入帐号" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请输入密码'}]
					})(
						<Input type='password' placeholder="请输入密码" />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登录
					</Button>
					<a href="javascript:void(0)" onClick={e=>browserHistory.push('/apply/')}
						style={{marginLeft: '12px'}}>还没有帐号，马上注册</a>
				</FormItem>
				<a href="https://github.com/game-helper/hongbao2/issues/new"
					target="_blank"
					style={{display: 'inline-block', margin: '12px 0'}}>
					有问题要反馈？点这里
				</a>
	    	</Form>
	    );
  	}
}

export default Form.create()(Login)
