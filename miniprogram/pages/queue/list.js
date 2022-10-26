Page({
    data:{
      cars: []
    },
    onLoad: function(options) {
      if(options){
        var cars = JSON.parse(options.cars);
        //console.log(cars)
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
    }
})