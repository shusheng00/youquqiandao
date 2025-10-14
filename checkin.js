const axios = require('axios');

// token
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.22k--z3TwKpeIaXuWrQJRmP93Tn0CAcSqb7bZ4NbeQU';

// 签到配置
const CHECKIN_URL = 'https://api-ic.yonyouauto.com/api/applet/hrempintegralsigninlist/querySignInNowPeriodSignIn?time=' + parseInt(new Date().getTime() / 1000) // 签到 URL
const CONFIG = {
  method: 'get',
  url: CHECKIN_URL,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11581',
    'Authorization': TOKEN,
    xweb_xhr: 1,
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": 'cors',
    "Sec-Fetch-Dest": "empty",
    Referer: "https://servicewechat.com/wx1abe65d77ecccff4/30/page-frame.html",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Content-Type": "application/json",
    "Accept": "*/*",
    Host: "api-ic.yonyouauto.com",
    Connection: "keep-alive"
  },
  timeout: 10000
};

async function checkin() {
  try {
    console.log('开始执行签到...');
    console.log('签到时间:', new Date().toLocaleString('zh-CN'));
    
    const response = await axios(CONFIG);
    
    console.log('签到成功!');
    console.log('状态码:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('签到失败:');
    
    if (error.response) {
      // 服务器响应了错误状态码
      console.error('状态码:', error.response.status);
      console.error('响应数据:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // 请求发送但没有收到响应
      console.error('网络错误:', error.message);
    } else {
      // 其他错误
      console.error('错误信息:', error.message);
    }
    
    return { success: false, error: error.message };
  }
}

// 执行签到
checkin();
