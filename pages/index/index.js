//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },

  onLoad: function () {
    this.hud = app.hudClass(this).hud;
  },

  loadingTap: function() {
    var that = this;
    this.hud.show("正在加载");
    setTimeout(function() {
      that.hud.showSuccess("加载完成");
    }.bind(this), 1500);
  },

  successTap: function() {
    this.hud.showSuccess("加载完成");
  },

  failTap: function() {
    this.hud.showError("加载失败");
  },

  warnTap: function() {
    this.hud.showWarn("警告信息");
  },

  tipTap: function() {
    this.hud.showInfo("这是一个提示信息");
  },

  progressTap: function() {
    var that = this;
    var i = 0;
    var interval = setInterval(function() {
        that.hud.showProgress(i.toFixed(1)+"%", i+=1.12);
        if(i >= 100) {
          that.hud.showSuccess("加载完成", function() {
            console.log("加载完成回调");
          });
          clearInterval(interval);
        }
      }, 100);
    },
})
