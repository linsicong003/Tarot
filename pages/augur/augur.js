// pages/augur/augur.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsrc: app.data.buttonbg,
    bgsrc: app.data.bgsrc,
    logosrc: app.data.logosrc,
    returnsrc:app.data.returnsrc,
    errorsrc:app.data.errorsrc,
    regsuccess:app.data.sussrc,
    reg:1,
    reg_err:0,
    reg_success:0,
    augur_work:0,
    count:5,
    input:'',
    selector: [
      { op: '上线占卜', opsrc: '' },
      { op: '我下班咯', opsrc: '' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;

      let t = setInterval(function(){
        // 倒计时
          let num = that.data.count - 1;
          that.setData({
            count:num
          })
          if(!num){
            clearInterval(t)
          }
      },1000,that);
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