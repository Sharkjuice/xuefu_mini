var app = getApp()
Page({
    data: {
        message: "",
        room_id: "",
        code: ""
    },
  
    async formSubmit(e){
        this.setData({
            room_id: e.detail.value.room_id, 
            code:  e.detail.value.code})
        if(!this.data.room_id || this.data.room_id.length < 4){
            this.setData({message:"房间号码错误"})
            return
        }
        if(!this.data.code || this.data.code.length < 4){
            this.setData({message:"输入电话号码后4位"})
            return
        }

        let res = await app.wxp.request({
            url: `https://www.lefan.fun/xuefu/api/fees/?room_id=${e.detail.value.room_id}&code=${e.detail.value.code}&wx_id=${app.globalData.openid}`,
            method: 'GET',
            header: {
            'content-type': 'application/json' // 默认值
            }
        })
        if(res.statusCode == 400){
            this.setData({message:"请确认房号/校验码是否正确,以及是否登记了'我的信息'"})
            return
        }
        if (res.data && res.data.length > 0){
            //console.log("query", res.data[0])
            wx.navigateTo({            
                url: '/pages/fee/detail?fee_list=' + JSON.stringify(res.data)
            })
        }else{
            this.setData({message:"本房号没有欠费数据"})
            return
        }        
      }
})
