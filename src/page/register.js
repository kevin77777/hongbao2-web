import React from 'react'
import {browserHistory} from 'react-router';
import {Form, Input, Button} from 'antd';
import {axios, apis, qs} from '../api';
const FormItem = Form.Item;

class Register extends React.Component {
	constructor() {
  		super();
  		this.state = {
  			password: '',
  			passwordError: false,
  			passwordErrorHelp: '',

			repeatPwd: '',
  			repeatPwdError: false,
  			repeatPwdErrorHelp: ''
  		}
	}

	register = data=>{
		if (this.state.passwordError || this.state.repeatPwdError) return;

		data.verificationCode = this.props.location.query.verificationCode;

		axios.post(apis.register, qs.stringify(data))
		.then(data=>{
			if (data.code == 0) {
				localStorage.setItem('token', data.data.token);
				browserHistory.push('/');
			} else {
				alert(data.message);
			}
		})
		.catch(err=>alert(err));
	}

	handleSubmit = e=>{
	    e.preventDefault();
	    let {password, repeatPwd} = this.state;

	    if (this.validatePassword(password) && this.validateRepeatPwd(repeatPwd)) {
			this.register({password});
	    }
	}

	validatePassword = password=>{
		if (!password) {
			this.setState({passwordError: true, passwordErrorHelp: '请输入密码'});
		} else if (password.length < 4 || password.length > 16) {
			this.setState({passwordError: true, passwordErrorHelp: '密码长度在6-16位之间'});
			return false;
		} else {
			this.setState({passwordError: false, passwordErrorHelp: '', password});
			return true;
		}
	}

	validateRepeatPwd = repeatPwd=>{
		let {password} = this.state;

		if (repeatPwd != password) {
			this.setState({repeatPwdError: true, repeatPwdErrorHelp: '两次输入的密码不一致'});
			return false;
		} else {
			this.setState({repeatPwdError: false, repeatPwdErrorHelp: ''});
			return true;
		}
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		let {passwordError, passwordErrorHelp, repeatPwdError, repeatPwdErrorHelp} = this.state;

	    return (
	    	<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					<h2>设置密码</h2>
				</FormItem>
				<FormItem key={2}
					validateStatus={passwordError ? 'error' : ''}
					help={passwordErrorHelp}>
					{getFieldDecorator('password', {
						rules: [{required: true, message: '请输入密码'}],
					})(
						<Input onChange={e=>this.setState({password: e.target.value})} type={'password'} placeholder="请输入密码" />
					)}
				</FormItem>
				<FormItem key={3}
					validateStatus={repeatPwdError ? 'error' : ''}
					help={repeatPwdErrorHelp}>
					{getFieldDecorator('repeatPwd', {
						rules: [{required: true, message: '请输入密码'}],
					})(
						<Input onChange={e=>this.setState({repeatPwd: e.target.value})} type={'password'} placeholder="请确认密码" />
					)}
				</FormItem>
				<FormItem key={4}>
					<Button type="primary" htmlType="submit" className="login-form-button">
						完成注册
					</Button>
				</FormItem>
	    	</Form>
	    );
	}
}

export default Form.create()(Register)
