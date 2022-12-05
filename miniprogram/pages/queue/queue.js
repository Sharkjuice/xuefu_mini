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
        let title = ''
        if(e.detail.target.id == "unground_end_btn"){
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/underground'
            title = '地库月卡轮候库(业主第一辆车)'
        }else{
            queue_url = 'https://www.lefan.fun/xuefu/api/queues/underground-2/'
            title = '地库月卡轮候库(业主第二辆车或租客车)'
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
            await app.wxp.navigateTo({            
            url: `/pages/queue/history_list?cars=${JSON.stringify(res.data)}&title=${title}`
            })
        }else{
            this.setData({message:"没有查询到车辆数据"})
        }        
    }
})
