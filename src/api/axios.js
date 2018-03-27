import axios from 'axios';
import {browserHistory} from 'react-router';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(res=>{
	let {data} = res;

	//0: 正常
	//1：cookie 不正确或失效
	//10003： 验证码错误
	//10004：邮箱已被注册
	//10005：cookie 已存在
	let codes = [0, 1, 10003, 10004, 10005];

	if (codes.includes(data.code)) {
		return data;
	} else if (data.code == 10000) {
		localStorage.clear();
		browserHistory.push('/login/');
	} else {
		alert(data.message);
		return new Promise(()=>{});
	}
	
}, err=>Promise.reject(err));

export default axios;