//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    buttonsrc:getApp().data.buttonbg,
    bgsrc: getApp().data.bgsrc,
    logosrc: getApp().data.logosrc,
    selector:[
      {op:'我要占卜',opsrc:'../question/question',buttonbg:'../../pic/button_bg.png'},
      { op: '占卜师来啦', opsrc: '../augur/augur',buttonbg: '../../pic/button_bg.png'},
      { op: '客服登陆', opsrc: '', buttonbg: '../../pic/button_bg.png'}
    ],
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  jump(e){
    const that =this;
    const target = e.currentTarget.dataset.op;

    wx.navigateTo({
      url: target,
    })

    console.log(e);
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
