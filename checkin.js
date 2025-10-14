const axios = require('axios');

const CONFIG = {
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.22k--z3TwKpeIaXuWrQJRmP93Tn0CAcSqb7bZ4NbeQU', // token
  checkinUrl: 'https://api-ic.yonyouauto.com/api/applet/hrempintegralsigninlist/querySignInNowPeriodSignIn?time=' + parseInt(new Date().getTime() / 1000), // 签到 URL
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11581'
};

function logMessage(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

async function checkin() {
  try {
    logMessage('开始签到...');
    const headers = {
      'User-Agent': CONFIG.userAgent,
      'Authorization': CONFIG.token,
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
    };

    // 发送 POST 请求进行签到
    const response = await axios.post(CONFIG.checkinUrl, {}, { headers });

    if (response.status === 200) {
      logMessage('✅ 签到成功');
      logMessage(`响应数据: ${JSON.stringify(response.data)}`);
      return { success: true, data: response.data };
    } else {
      logMessage(`❌ 签到失败，状态码: ${response.status}`);
      return { success: false, error: `HTTP ${response.status}` };
    }

  } catch (error) {
    logMessage(`💥 签到过程中出现错误: ${error.message}`);
    if (error.response) {
      logMessage(`错误响应: ${JSON.stringify(error.response.data)}`);
    }
    return { success: false, error: error.message };
  }
}

async function main() {
  logMessage('🚀 开始执行自动签到任务');
  const result = await checkin();
  if (result.success) {
    logMessage('🎉 签到任务完成 - 成功');
  } else {
    logMessage('💥 签到任务完成 - 失败');
  }
  logMessage('🏁 自动签到任务结束');
}

// 执行主函数
main().catch(console.error);
