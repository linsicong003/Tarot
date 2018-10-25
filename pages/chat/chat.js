// pages/chat/chat.js
const app = getApp();
let socketOpen = false;
var SocketTask;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsrc: getApp().data.buttonbg,
    bgsrc: getApp().data.bgsrc,
    logosrc: getApp().data.logosrc,
    returnsrc: getApp().data.returnsrc,
    voicesrc:getApp().data.voicesrc,
    keyboardsrc: getApp().data.keyboardsrc,
    pickimgsrc: getApp().data.pickimgsrc,
    micsrc: getApp().data.micsrc,
    voice:0,
    press:0,
    user:'yuepeng',
    augur:{
      src:'#',
      name:'Helen',
      introduce:'这是介绍',
      rate:4.8
    },
    chatlist:[
      {'id':'1','send':'yuepeng','sendsrc':'#','receive':'sicong','receivesrc':'#','type':'0','timestamp':'111','context':'过分'},
      { 'id': '2', 'send': 'yuepeng', 'sendsrc': '#', 'receive': 'sicong', 'receivesrc': '#', 'type': '0', 'timestamp': '111', 'context': '过分' },
      { 'id': '3', 'send': 'sicong', 'sendsrc': '#', 'receive': 'yuepeng', 'receivesrc': '#', 'type': '0', 'timestamp': '111', 'context': '过分hahahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeloo' },
      { 'id': '3', 'send': 'sicong', 'sendsrc': '#', 'receive': 'yuepeng', 'receivesrc': '#', 'type': '0', 'timestamp': '111', 'context': '过分hahahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeloo' },
      { 'id': '3', 'send': 'sicong', 'sendsrc': '#', 'receive': 'yuepeng', 'receivesrc': '#', 'type': '0', 'timestamp': '111', 'context': '过分hahahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeloo' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;

    if (!socketOpen) {
      that.websocket();
    }

    // wx.onSocketOpen(res=>{
    //   wx.sendSocketMessage({
    //     data: [{'msg':'嘻嘻'}],
    //   });
    //   console.log(res);
    // })
  },
  rf(){
    return false;
  },
  websocket(){
    SocketTask = wx.connectSocket({
      url: app.data.socketPath,
      data: { 'msg': 'hello' },
      header: { 'content-type': 'application/json' },
      method:'post',
      success:res=>{
        console.log('WebSocket成功连接！',res);
      },
      fail:res=>{
        console.log('出现错误啦！！'+res);
        wx.showToast({
          title: '网络异常！',
        })
      }
    })
    
  },
  touchvoice(){
    let voice = !this.data.voice;
    this.setData({
      voice:voice
    })
  },
  pickimg(){
    const that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res);
        let tmp = that.data.chatlist;
        let filesrc = res.tempFilePaths[0];
        let data = { 'id': '2', 'send': 'yuepeng', 'sendsrc': '#', 'receive': 'sicong', 'receivesrc': '#', 'type': '2', 'timestamp': '111', 'context': filesrc };

        tmp.push(data);
        that.setData({
          chatlist:tmp
        })
      },
    })
  },
  preview(e){
    const that = this;
    console.log(e);
    let arr = [];
    arr.push(e.currentTarget.dataset.imgsrc);
    wx.previewImage({
      urls: arr,
    })
  },
  talk(){
    const that = this;
    let press = !that.data.press;

    that.setData({
      press:press
    })
  },
  talkover(){
    const that = this;
    let press = !that.data.press;
    that.setData({
      press: press
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    console.log(SocketTask)
    SocketTask.onOpen(res=>{
      socketOpen = true;
      console.log('WebSocket is opening.....');
    })

    SocketTask.onClose(onClose =>{
      console.log('Websocket closed!',onClose);
      socketOpen = true;
      that.websocket();
    })

    SocketTask.onError(err =>{
      console.log(err);
      socketOpen = false;
    })

    SocketTask.onMessage(mes=>{
      console.log(mes);
    })
  },
  input(e){
    const that = this;

    console.log(e);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})