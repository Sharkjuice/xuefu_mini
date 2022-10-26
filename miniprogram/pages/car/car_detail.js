Page({
    data:{
      message: '',
     car:{}
    },
    getCardType(value){
      let str_val = ""
      switch (value) {
        case 1: str_val =  "地面月卡"; break;
        case 2: str_val =  "地面临时"; break;
        case 3: str_val = "地库月卡"; break;
        case 4: str_val = "地库固定"; break;
      }
      return str_val
    },
    getApproveStatus(value){
      let str_val = ""
      switch (value) {
        case 1: str_val =  "待核实"; break;
        case 2: str_val =  "通过"; break;
        case 3: str_val =  "不通过"; break;
        case 4: str_val =  "无数据"; break;
      }
      return str_val
    },
    onLoad: function(options) {
      if(!options){
        return
      }
      var car = JSON.parse(options.car)
      car.card_type_str = this.getCardType(car.card_type)
      car.approve_status_str = this.getApproveStatus(car.approve_status)
      car.approve_id_str = car.approve_id || ""
      this.setData({ car })  
    }
  })