var app = getApp()
function getProcessStatus(value){
    let str_val = ""
    switch (value) {
        case 0: str_val =  "等候中"; break;
        case 1: str_val =  "等候办理"; break;
        case 2: str_val =  "已办理"; break;
        case 3: str_val =  "取消"; break;
    }
    return str_val
}
Page({
    data:{
        message: '',
        car:{}
    },
    onLoad: function(options) {
        if(options){
            var car_data = JSON.parse(options.car);
            car_data.process_status_str = getProcessStatus(car_data.process_status)
            car_data.apply_date = car_data.apply_date || ""        
            this.setData({ 
                car: car_data
            }) 
        }
    },
    async navToCar(e){
        let car_id = e.currentTarget.id
        let res = await app.wxp.request({
            url: `https://www.lefan.fun/xuefu/api/cars/${car_id}/`,
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            }
        })
        let car = res.data
        wx.navigateTo({
            url: '/pages/queue/car_detail?car=' + JSON.stringify(car)
        })
    }
})