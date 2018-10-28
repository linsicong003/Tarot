// pages/detail/detail.js
const app =getApp();
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
        {cid:1,src:'#',rate:5,text:'真的辣鸡'},
        { cid: 2, src: '#', rate: 5, text: '真的辣鸡' },
        { cid: 3,src: '#', rate: 5, text: '真的辣鸡' },
        { cid: 4,src: '#', rate: 5, text: '真的辣鸡辣鸡真的辣鸡辣鸡辣鸡辣鸡真的辣鸡辣鸡鸡辣鸡真的辣鸡辣鸡辣鸡辣鸡真的辣鸡辣鸡' },
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that= this;
    console.log(options.id);

    //取基本信息
    wx.request({
      url: app.data.serverPath + 'tarot/getTarotDetails',
      data:{tarotId:options.id},
      success:res=>{
        console.log(res);
        let tem = res.data.DATA;
        let newd = {
          imgsrc: tem.avatarUrl,
          name: tem.nickName,
          rate: tem.rate,
          introduce: tem.introduce,
          comment:tem.comment}
        that.setData({
          data:newd
        })
      }
    })
    // wx.request({
    //   url: app.data.serverPath+'',
    // })
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