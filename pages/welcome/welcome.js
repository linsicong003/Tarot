// pages/welcome/welcome.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsrc: app.data.buttonbg,
    bgsrc: app.data.bgsrc,
    biglogosrc:app.data.biglogo,
    logosrc: app.data.logosrc,
    bigball:app.data.bigball,
    returnsrc: app.data.returnsrc,
    errorsrc: app.data.errorsrc,
    regsuccess: app.data.sussrc,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            },
            fail() {
              // wx.showToast({
              //   title: '请正确授权！',
              //   success:res=>{
              //     wx.redirectTo({
              //       url: '../chat/chat',
              //     })
              //     wx.hideToast();
              //   }
              // })
            }
          })
        }
      }
    })
  },

  go(e){
    let post = e.detail;
    if(e.detail.errMsg == 'getUserInfo:ok'){
      wx.login({
        success: res => {
          //自动登录
          post.code = res.code;
          console.log(post);
          wx.request({
            url: app.data.serverPath + 'userLogin',
            data:post,
            success:res=>{
              //登录成功将自定义登录态存进storage
              console.log(res.data.DATA.securityToken);
              if(res.data.CODE == '00'){
                wx.setStorageSync('userInfo', res.data.DATA.securityToken);
                let info = wx.getStorageSync('userInfo');
                wx.request({
                  // 判断有无占卜过
                  url: app.data.serverPath + 'tarot/getDivination',
                  method:'POST',
                  data: {'securityToken':info},
                  success:au=>{
                    console.log(au);
                    wx.navigateTo({
                      url: "../index/index",
                    })
                  }
                })
              }
            }
          })
        }
      })
    }
    console.log(e);
  },
  atStr(atStr) {
    var dataAt = atStr.replace(/(\r\n)|(\n)/g, '');
    return dataAt;
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