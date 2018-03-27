import React from 'react'
import {Button, Collapse, Form, Input, Table} from 'antd'
import {axios, apis, qs} from '../../api';
import dateFormat from '../../util/date-format'

const FormItem = Form.Item;
const {TextArea} = Input;
const Panel = Collapse.Panel;

class GetHongbaoForm extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			mobile: localStorage.getItem('mobile') || ''
		}
	}

	getHongbao = params=>{
		axios.post(apis.getHongbao, qs.stringify(params))
			.then(res=>{
				let {data} = res;
				this.props.callback(data);
			})
			.catch(err=>console.log(err));
	}

	handleSubmit = e=>{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				this.getHongbao(values);
				localStorage.setItem('mobile', values.phone)
			}
		});
	}

	renderHistoryTable = e=>{
		let renderGmtCreate = (text)=>{
			let temp = text.split(' ');
			return <span>{temp[1]}<br/>{temp[0]}</span>;
		}

		let renderStatus = (text, r)=>{
			let color = {0: '', 1: '#5bab60', 2: '#dd2323'}[r.status];
			return <span style={{color}}>{text}</span>;
		}

		const columns = [
			{title: '领取时间', dataIndex: 'time', key: 'time', width: 110},
			{title: '金额(元)', dataIndex: 'price', key: 'price', width: 100},
			{title: '状态', dataIndex: 'message', key: 'message', render: renderStatus},
		];

		let {historyList} = this.props;

		historyList.map((o, i)=>{
			o.time = dateFormat(new Date(o.gmtCreate));
			if (o.status == 1) {
				o.message =  '领取成功';
			} else if (o.status == 0) {
				o.message =  `正在领取...`;
			} else if (o.status == 2) {
				o.price = 0;
			}
			o.key = i;
		});

		return <Table dataSource={this.props.historyList} columns={columns} />;
	}

	render() {
		const {getFieldDecorator} = this.props.form;

		let disableBtn = this.props.historyList.some(o=>o.status == 0);

		return (
			<Form onSubmit={this.handleSubmit} className="login-form">
				<div style={{color: '#dd2323', paddingBottom: '10px'}}>请先仔细阅读规则再来领取，以免浪费次数</div>
				<FormItem>
					{getFieldDecorator('phone', {
						rules: [{required: true, message: '请输入要领取最大红包的手机号码'}],
						initialValue: this.state.mobile
					})(
						<Input placeholder="请输入要领取最大红包的手机号码" maxLength={11} />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('url', {
						rules: [{required: true, message: '请输入美团、饿了么拼手气红包链接'}]
					})(
						<TextArea placeholder="请输入美团、饿了么拼手气红包链接（不知道怎么复制链接？请到页面底部查看方法）" autosize={{minRows: 5, maxRows: 5}} />
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" disabled={disableBtn} htmlType="submit" className="login-form-button">
						领取
					</Button>
					{
						disableBtn && <span style={{color: '#dd2323', marginLeft: '12px'}}>请等待上一个红包领取完成</span>
					}
				</FormItem>
				{
					this.renderHistoryTable()
				}
				{
					this.renderDescription()
				}
			</Form>
		);
	}

	renderDescription = e=>{
		return <div>
			<Collapse defaultActiveKey={['1', '2', '3']}>
				<Panel header="红包链接说明" key="1">
					1. 饿了么红包：https://h5.ele.me/hongbao/开头的链接。<br/>
					链接不带 lucky_number 的不是拼手气，不能用。<br/>
					2. 美团红包：https://activity.waimai.meituan.com/coupon/开头的链接。
				</Panel>
				<Panel header="如何获取拼手气红包？" key="2">
					1. 好友下单后，分享到群里的红包。<br/>
					2. 饿了么 APP 买过的订单点进去，分享红包。
				</Panel>
				<Panel header="如何复制红包链接？" key="3">
					1. 分享到 QQ，选择 “我的电脑”，PC 版 QQ 复制链接。<br/>
					2. 分享到微信，PC 版微信右键用浏览器打开，复制链接。<br/>
					3. 长按微信分享的卡片 - 点击更多 - 发送邮件 - 复制链接。（如果看不到链接，在微信的设置 - 通用 - 功能 - 开启邮箱提醒）
				</Panel>
			</Collapse>
		</div>
	}
}

export default Form.create()(GetHongbaoForm);
