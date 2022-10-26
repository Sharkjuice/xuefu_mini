var app = getApp()
Page({
    data: {
        message: '',
        owner: {}
    },
    // 事件处理函数
    async onLoad() {
        console.log("open_id", app.globalData.openid)
        let res = await app.wxp.request({
            url: `https://www.lefan.fun/xuefu/api/owners/?wx_id=${app.globalData.openid}`,
            method: 'GET' })
        console.log(res)
        if(res.data.length > 0){
            this.setData({owner: res.data[0]})
        }        
    },
    async formSubmit(e){
        let owner = {
            room_id:  e.detail.value.room_id, 
            owner_name:  e.detail.value.owner_name, 
            contact: e.detail.value.contact,
            wx_id:  app.globalData.openid,
            created_by: "用户通过微信注册"
        }
        let auth_data = {
            username: "restapi",
            password: "Rest12#$"
        }
        let res = await app.wxp.request({url: 'https://www.lefan.fun/xuefu/api/jwt-auth/',
            method: 'POST',
            data: JSON.stringify(auth_data)})
        res = await app.wxp.request({url: 'https://www.lefan.fun/xuefu/api/owners/',
            method: 'POST',
            header: {
                authorization: 'jwt ' + res.data.token,
            },
            data: JSON.stringify(owner)})
        if(res.statusCode == 400){
            this.setData({
            message: '注册失败, 此号码可能已经注册!',
            })
        }else{
            this.setData({ message: '注册成功!'})
            //console.log("save phone number")
            app.globalData.phone = e.detail.value.contact;
            wx.setStorageSync('phone', e.detail.value.contact)
        }
    }
})
  

