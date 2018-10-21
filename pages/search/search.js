// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonsrc: getApp().data.buttonbg,
    bgsrc: getApp().data.bgsrc,
    logosrc: getApp().data.logosrc,
    returnsrc: getApp().data.returnsrc,
    click:0,
    input:'',
    modal: { title: '确认选择', content: '占卜师正在路上！', btn_yes: '马上就去', btn_no: '我再看看', hidden: true },
    augur: [{ id:1,img: '#', status: 0, name: '越鹏大哥' ,select:true}, 
            { id:2,img: '#', status: 1, name: '雨财大哥',select:true }, 
            { id:3,img: '#', status: 2, name: '都是大哥', select: true }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  choose(e){
    const that = this;
    let data = that.data.augur;
    let flag;
    let select = e.currentTarget.dataset.id;

    for(let i in data){
      if(data[i].id == select){
        data[i].select = false;
        flag = i;
      }else{
        data[i].select = true;
      }
    }

    that.setData({
      augur:data,
      click:parseInt(flag)
    })
  },

  detail(e){
    const that = this;
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  submit(){
    const that = this;
    let hid = that.data.modal;
    hid.hidden = !hid.hidden;
    that.setData({
      modal:hid
    })
  },
  __success(){
    wx.navigateTo({
      url: '../beforepay/beforepay',
    })
  },
  __cancel(){},

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