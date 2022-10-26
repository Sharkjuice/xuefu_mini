var app = getApp(); //这句是引入
Page({
    data: {
        message: "",
        car_id: ""
    },
    onLoad() {},  
    async formSubmit(e){
        this.setData({
            car_id:  e.detail.value.car_id
        })
        if(this.data.car_id.length < 5 ){
            this.setData({message:"请输入5位车牌号, 可以不包括粵B"})
            return
        }
        let res = await app.wxp.request({
            url: `https://www.lefan.fun/xuefu/api/cars/?car_id=${this.data.car_id}`,
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            }
        })
        if (res.data && res.data.length > 0){
            this.setData({message:""})
            console.log(res.data)
            wx.navigateTo({            
                url: '/pages/car/car_detail?car=' + JSON.stringify(res.data[0])
            })
        }else{
            this.setData({message:"没有本车牌号的数据"})
        }
    }  
})
