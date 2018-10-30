Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots:true
  },
  properties: {
    title:{
      type:String,
      value:'标题'
    },
    content:{
      type:String,
      value:'内容'
    },
    btn_yes:{
      type:String,
      value:'确认'
    },
    btn_no:{
      type:String,
      value:'取消'
    },
    hidden:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hide(){
      this.setData({
        flag:!this.data.flag
      })
    },
    show(){
      this.setData({
        flag:true
      })
    },
    __success(){
      this.triggerEvent('success');
      this.hide();
    },
    __cancel(){
      this.triggerEvent('cancel');
      this.hide();
    }
  }
})
