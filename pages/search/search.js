// pages/search/search.js
const app = getApp();
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
    tem:[],
    augur: [{ id:1,img: '#', status: 0, name: '越鹏大哥' ,select:true}, 
            { id:2,img: '#', status: 1, name: '雨财大哥',select:true }, 
            { id:3,img: '#', status: 2, name: '都是大哥', select: true }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const userId = wx.getStorageSync('userInfo');
    console.log(userId);
    wx.request({
      url: app.data.serverPath + 'tarot/getAllTarotList',
      // method:'POST',
      data: {'securityToken':userId},
      success:res=>{
        console.log(res);
        let newstr = [];
        let op = res.data.DATA;
        for(let i=0;i<op.length;i++){
          newstr.push({'id':op[i].tarotId,'img':op[i].avatarUrl,'status':parseInt(op[i].status)||0,'name':op[i].nickName,'select':true})
        }
        that.setData({
          augur:newstr,
          tem:newstr
        })
      }
    })
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
      url: '../detail/detail?id='+id,
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
  __cancel(){
    let change = 'modal.hidden';
    this.setData({
      [change]:true
    })
    },

  search(e){
    const that = this;
    let input = e.detail.value;
    let now = that.data.tem;
    let change = [];
    let re = new RegExp(".*"+input.toUpperCase()||'*'+"*.","g");
    let data;

    for(let i=0;i<now.length;i++){
      if (re.exec(now[i].name.toUpperCase())){
        change.push(now[i]);
      }
    }
    if(input){data=change;}else{data=now;}
    that.setData({
      augur:data
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