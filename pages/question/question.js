// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsrc: getApp().data.buttonbg,
    bgsrc: getApp().data.bgsrc,
    logosrc: getApp().data.logosrc,
    holder:'最近的情感问题很严重不知道该怎么去面对，也不知道该如何去解决，希望得到一些指引。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  go(){
    wx.navigateTo({
      url: '../pickaugur/pickaugur',
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