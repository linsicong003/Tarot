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
              console.log(res);
              if(res.data.CODE == '00'){
                wx.setStorageSync('userId', res.data.DATA.userId);
                wx.navigateTo({
                  url: "../index/index",
                })
              }
            }
          })
        }
      })
    }
    console.log(e);
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