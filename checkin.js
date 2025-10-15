const axios = require('axios');

// 请求的数据
const Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e30.22k--z3TwKpeIaXuWrQJRmP93Tn0CAcSqb7bZ4NbeQU';

let frequency = 0
async function get() {
    ++frequency
    console.log('frequency', frequency)
    // POS请求的URL
    const url = 'https://api-ic.yonyouauto.com/api/applet/hrempintegralsigninlist/querySignInNowPeriodSignIn?time=' + parseInt(new Date().getTime() / 1000);

    const res = await axios.get(url, {
        headers: {
            'Authorization': Authorization,
            xweb_xhr: 1,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11581",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Mode": 'cors',
            "Sec-Fetch-Dest": "empty",
            Referer: "https://servicewechat.com/wx1abe65d77ecccff4/30/page-frame.html",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Content-Type": "application/json",
            "Accept": "*/*",
            Host: "api-ic.yonyouauto.com",
            Connection: "keep-alive"
        }
    }).then(res => res.data).then(function (data) {
         console.log( data)
        if(data.resultCode !==200 ){
                    axios.get('https://sctapi.ftqq.com/SCT162619TKTRTrkTQMvxATqK7ad2UxiF8.send', {
                        params: {
                            title: "友趣星球",
                            desp: "token失效"
                        }
                    })
        }
    }).catch(err => {
        console.log(err)
    })
    console.log(res, 'res')

}
get()
