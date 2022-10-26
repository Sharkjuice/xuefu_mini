Page({
    data:{
        cars: []
      },
      onLoad: function(options) {
        if(options){
          var cars = JSON.parse(options.cars);
          //console.log(cars)
          cars.forEach( car => {
              car.status = this.getStatus(car.process_status)
              if(car.complete_date == null ){
                car.complete_date = '--'
              }
          })
          this.setData({cars}) 
        }  
      },
      navDetail(e){
        let my_car = {}
        let id = e.currentTarget.id
        this.data.cars.forEach( (car, index) => {
          if(car.id == id){
            my_car  = car
            my_car.order = index + 1
          }
        })
        //console.log(my_car)
        wx.navigateTo({
          url: '/pages/queue/detail?car=' + JSON.stringify(my_car)
        })
      },
  
    getStatus(value){
        let str_val = ""
        switch (value) {
          case 0: str_val =  "等待中"; break;
          case 1: str_val =  "待办理"; break;
          case 2: str_val = "已办理"; break;
          case 3: str_val = "撤销"; break;
        }
        return str_val
      },      
})