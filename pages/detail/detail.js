// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsrc: getApp().data.buttonbg,
    bgsrc: getApp().data.bgsrc,
    logosrc: getApp().data.logosrc,
    data:{
      imgsrc:'#',           //头像src
      name:'越鹏大哥' ,      //名字
      rate: 4.8,             //评分
      introduce:'我就说说不服打我',   //介绍
      moreclick:false,        //加载更多点击标志
      comment:[
        {src:'#',rate:5,text:'真的辣鸡'},
        { src: '#', rate: 5, text: '真的辣鸡' },
        { src: '#', rate: 5, text: '真的辣鸡' },
        { src: '#', rate: 5, text: '真的辣鸡辣鸡真的辣鸡辣鸡辣鸡辣鸡真的辣鸡辣鸡鸡辣鸡真的辣鸡辣鸡辣鸡辣鸡真的辣鸡辣鸡' },
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  more(){
    this.setData({
      moreclick:true
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