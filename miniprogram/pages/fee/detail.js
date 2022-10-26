Page({
    data:{
     fee_list:[]
    },
    onLoad: function(options) {
      if(options){
        var fee_data = JSON.parse(options.fee_list);
        this.setData({ fee_list: fee_data}) 
      }
    }
  })