// app.js
import regeneratorRuntime from './utils/runtime'
import wxp from './utils/wxp'

import { addDefaultInterceptor } from './utils/request'

addDefaultInterceptor()

App({
    globalData: {
        openid: "",
        phone: ""
    },
    regeneratorRuntime,
    wxp,
    async onLaunch() {        
        try{
            let res = await wxp.getStorage({'key': "openid"})
            console.log("get openid locally:", res)
            this.globalData.openid = res.data
        }catch{
            console.log("get saved open failed, login")
            let res = await wxp.login()
            wx.showLoading({title: '请稍后'})
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log("get openid remotely")
            res = await wxp.request({
                url: 'https://www.lefan.fun/xuefu/api/on-wx-login',
                    data: {code: res.code},
                    method: 'GET'})
            this.globalData.openid = res.data.openid
            console.log("save open id",res.data.openid)
            await wx.setStorage({'key': 'openid', 'data': res.data.openid})
            wx.hideLoading()
        }
    }
})
