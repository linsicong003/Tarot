// pages/chat/chat.js
const app = getApp();
let socketOpen = false;
const recordManager = wx.getRecorderManager();
const bgvideo = wx.getBackgroundAudioManager();
const audio = wx.createInnerAudioContext()
var SocketTask,UploadTask;
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
    play:0,
    scrollTop:0,
    voice:0,
    press:0,
    src:'',
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
  },
  auth(){
    const that = this;
    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.showToast({
          title: '授权成功！',
        })
      },
      fail() {
        wx.showToast({
          title: '请正确授权！',
        })
        that.auth();
      }
    })
  },
  websocket(){
    SocketTask = wx.connectSocket({
      url: app.data.socketPath,
      data: JSON.stringify({ name: 'yuepeng' }),
      header: { 'content-type': 'application/json' },
      method:'get',
      success:res=>{
        console.log('WebSocket connect',res);
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
        if(res.tempFilePaths.length > 0){
          let UploadTask = wx.uploadFile({
            url: app.data.serverPath + 'uploadFile',
            filePath: res.tempFilePaths[0],
            name: 'pic',
            formData:{},
            success:function(res){
              console.log(res);
              let tmp = that.data.chatlist;
              let filesrc = res.tempFilePaths[0];
              let data = { 'id': Math.random(), 'send': 'yuepeng', 'sendsrc': '#', 'receive': 'sicong', 'receivesrc': '#', 'type': '2', 'timestamp': '111', 'context': filesrc };

              tmp.push(data);
              // that.setData({
              //   chatlist: tmp
              // })
              // wx.nextTick(res => {
              //   that.setData({
              //     scrollTop: 100000
              //   })
              // })
            },
            fail:err=>{
              console.log(err)
              wx.showToast({
                title: '服务器开小差啦~',
              })
            }
          })

          //上传进度监测
          UploadTask.onProgressUpdate((res) => {
            if (res.progress < 100) {
              wx.showLoading({
                title: '正在发送' + res.progress + '%',
              })
            }
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
          })
        }
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

    //longpress event
    // wx.getSetting({
    //   srccess(res) {
    //     console.log(res.authSetting);
    //   }
    // })
    recordManager.start({duration:60000,format:'mp3'});
  },

  talkover(){
    const that = this;

    recordManager.stop();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;

    //录音开始
    recordManager.onStart(res=>{
      console.log('start record');
      that.setData({
        press: true
      })
    })

    //录音结束
    recordManager.onStop(res=>{
      console.log('stop record');
      console.log(res);
      let fp = res.tempFilePath;
      if(res.tempFilePath){
        console.log('send record')
        let UploadTask = wx.uploadFile({
          url: app.data.serverPath + 'uploadFile',
          filePath: fp,
          name: 'record',
          formData: {},
          success: function (res) {
            console.log(res);
            //插入语音消息
            let temdata = that.data.chatlist;
            console.log(temdata)
            let temmodel = { 'id': Math.random(), 'send': 'yuepeng', 'sendsrc': '#', 'receive': 'sicong', 'receivesrc': '#', 'type': '1', 'timestamp': '111', 'context': fp };
            temdata.push(temmodel);
            that.setData({
              chatlist:temdata,
            })
            wx.nextTick(res=>{
              that.setData({
                scrollTop: 100000
              })
            })
          },
          fail: err => {
            console.log(err)
            wx.showToast({
              title: '服务器开小差啦~',
            })
          }
        })


        //上传进度监测
        UploadTask.onProgressUpdate((res) => {
          if (res.progress < 100) {
            wx.showLoading({
              title: '正在发送' + res.progress + '%',
            })
          }
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      }
      that.setData({
        press: false
      })
    })

    audio.onPlay(res=>{
      wx.hideLoading();
    })
    audio.onError(err=>{
      console.log('play error'+err)
      console.log(err);
      wx.showModal({
        title: 'Error',
        content: '播放错误'+err,
      })
    })
    audio.onStop(res=>{
      console.log('play stop')
      that.setData({
        play: 0
      })
    })
    audio.onEnded(res=>{
      console.log('play end');
      that.setData({
        play: 0
      })
    })
    // that.audio = wx.createAudioContext('myAudio');
  },
  play(e){
    const that = this;
    console.log(e);
    let url = e.currentTarget.dataset.playurl;
    if(!that.data.play){
      //如果不是播放状态
      // that.audio.setSrc(url);
      // that.audio.play();
      audio.src=url;
      audio.play();
      console.log('play');
      that.setData({
        play:1
      })
    }else{
      //如果在播放则停止
      audio.stop();
    }
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
        SocketTask.send({
          data: JSON.stringify({
            'receover': '28B5D786238E216CF4AE0CD3E93F22ED','message':'嘻嘻嘻嘻嘻嘻嘻' }),
          success: res => {
            console.log(res);
            console.log(JSON.stringify({ 'receiver': '28B5D786238E216CF4AE0CD3E93F22ED', 'message': '嘻嘻嘻嘻嘻嘻嘻' }))
          }
        })

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
    let data = e.detail.value;
    console.log('confirm'+e.detail.value);
    let msg = {'id': '20', 'send': 'yuepeng', 'sendsrc': '#', 'receive': 'sicong', 'receivesrc': '#', 'type': '0', 'timestamp': '111', 'context': data
  };
    let content = that.data.chatlist;
    content.push(msg);
    console.log(content)
    that.setData({
      input:'',
      chatlist:content,
    })
    wx.nextTick(res => {
      that.setData({
        scrollTop: 100000
      })
    })
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