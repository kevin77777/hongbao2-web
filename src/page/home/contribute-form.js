import React from 'react'
import {Button, Form, Input} from 'antd'
import {axios, apis, qs} from '../../api';

const {TextArea} = Input;
const FormItem = Form.Item;

class ContributeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	handleSubmit = e=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({isLoading: true});
				let params = {
					value: values.value,
					application: this.props.application
				};
				axios.post(apis.cookie, qs.stringify(params))
					.then(data=>{
						if (data.code == 0) {
							alert('贡献成功！');
							this.props.callback();
						} else {
							alert(data.message)
						}
						this.setState({isLoading: false});
					})
			}
		});
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		let {isLoading} = this.state;
		let {application} = this.props;

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem>
					{getFieldDecorator('value', {
						rules: [{required: true, message: '请输入要贡献的 cookie'}]
					})(
						<TextArea placeholder={application ? '请输入微信或 QQ 小号的 cookie（与手机号、饿了么账号无关）' : '请输入微信小号的 cookie（与手机号、美团账号无关）'}
								  autosize={{minRows: 5, maxRows: 5}}
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" loading={isLoading} htmlType="submit" className="login-form-button">
						确定
					</Button>
				</FormItem>
				<ul>
					<li>
						<a href="/tutorial/cookie.html" target="_blank">[一键提取] 美团、饿了么 cookie 一键提取工具</a>
					</li>
					<li>
						<a href="/tutorial/meituan.html" target="_blank">[自己抓包] 如何贡献美团微信 cookie（饿了么也可参考）</a>
					</li>
					<li>
						<a href="/tutorial/ele.html" target="_blank">[暂不可用] 如何贡献饿了么 QQ cookie</a>
					</li>
				</ul>
			</Form>
		);
	}
}

export default Form.create()(ContributeForm);
