let app = getApp(); //这句是引入
Page({
    data: {
        message:"",
        cars: []
    },
    onLoad() {
    },
    async formSubmit(e){
        let queue_url = ""
        let list_type = 'list'
        if(e.detail.target.id == "ground_btn"){
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/ground/?status=0'
        }else
        if(e.detail.target.id == "ground_end_btn") {
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/ground/'
            list_type = 'history_list'
        }else
        if(e.detail.target.id == "unground_btn"){
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/underground/?status=0'
        }else
        if(e.detail.target.id == "unground_end_btn"){
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/underground'
            list_type = 'history_list'
        }else
        if(e.detail.target.id == "unground_btn_2"){
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/underground-2/?status=0'
        }else{
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/underground-2/'
            list_type = 'history_list'
        }

        let res = await app.wxp.request({
            url: queue_url,
            method: 'GET',
            header: {
               'content-type': 'application/json' // 默认值
            }
        })
        if (res.data && res.data.length > 0){
            this.setData({message:""})
            wx.navigateTo({            
            url: `/pages/queue/${list_type}?cars=${JSON.stringify(res.data)}`
            })
        }else{
            this.setData({message:"没有查询到车辆数据"})
        }        
    }
})
