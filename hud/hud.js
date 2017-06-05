
import _ from '../vendor/lodash';

class hudClass {
    constructor(scope) {
        Object.assign(this, {scope});
		this._init();
    }

    _init() {

        var clone = _.clone;
        var extend = _.extend;
        var isFunction = _.isFunction;

        const that = this;
        const scope = that.scope;
        var ctx; // 预定义画布上下文
        scope.canvasTouchMove = function() {};
        that.hud = {
            defaults: {
                isShow: false,
                icontype: "", // 默认加载中, 有效值参考icon
                text: "加载中...",
                progress: 0,
                duration: 1500,
                complete: function() {},
            },

            refreshCanvas(value) {
                if (!ctx) ctx = wx.createCanvasContext("canvas_progress");
                ctx.setLineWidth(4);
                ctx.setStrokeStyle("#d2d2d2"); 
                ctx.setLineCap("round") 
                ctx.beginPath();
                ctx.arc(25, 25, 21, 0, 2*Math.PI, false);
                ctx.stroke();
                
                var rate = value/100.0 * 2 - 0.5;
                ctx.setLineWidth(4); 
                ctx.setStrokeStyle("#09BB07"); 
                ctx.setLineCap("round") 
                ctx.beginPath();
                ctx.arc(25, 25, 21, -Math.PI*1/2, Math.PI*rate, false); 
                ctx.stroke();//描边 

                ctx.draw();
            },

            refresh(options) {
                scope.setData({
                    "hud.infos": options,
                });
            },

            // 统一执行
            execute(opts = {}) {
                var options = extend(clone(this.defaults), opts || {});
                options.isShow = true;

                this.refresh(options);
                if(options.icontype.isValid()) {
                    this.hide(options);
                }
            },

            //显示，需要手动调用隐藏
            show() {
                var options = clone(this.defaults);
                options.isShow = true;
                if(arguments[0]) {
                    options.text = arguments[0];
                }
                options.icontype = "";
                this.refresh(options);
            },

            // 显示进度条
            showProgress() {
                var args = Array.prototype.slice.call(arguments);
                var options = clone(this.defaults);
                options.isShow = true;
                options.icontype = "";

                var progress = options.progress,
                    text = options.text;
                for (var obj of args) {
                    if (!isNaN(obj)) { // 数字
                        progress = obj;
                    } else { // 文本
                        text = obj;
                    }
                }
                
                options.text = text;
                options.progress = progress;

                this.refresh(options);
                if (progress > 0) this.refreshCanvas(progress);
            },

            // 完成显示并隐藏
            showComplete(args, itype) {
                args = Array.prototype.slice.call(args);
                var options = clone(this.defaults);
                options.isShow = true;
                options.icontype = itype;

                var duration = options.duration,
                    text = options.text,
                    complete = options.complete;
                for (var obj of args) {
                    if (!isNaN(obj)) { // 数字
                        duration = obj;
                    } else if (isFunction(obj)) {// 函数
                        complete = obj;
                    } else { // 文本
                        text = obj;
                    }
                }

                options.text = text;
                options.duration = duration;
                options.complete = complete;

                this.refresh(options);
                this.hide(options);
            },

            // 成功
            showSuccess() {
                this.showComplete(arguments, "success");
            },

            // 警告
            showWarn() {
                this.showComplete(arguments, "warn");
            },

            // info
            showInfo() {
                this.showComplete(arguments, "info");
            },

            // 错误
            showError() {
                this.showComplete(arguments, "clear");
            },

            // 隐藏
            hide() {
                var args = Array.prototype.slice.call(arguments);
                var that_hud = this;
                var options;
                if(args.length === 0) {
                    options = clone(this.defaults);
                } else {
                    options = args[0];
                }

                options.isShow = false;
                setTimeout(function() {
                    that_hud.refresh(options);
                    // 完成后回调
                    options.complete();
                }.bind(that), options.duration);
            },
        };
    }
}

export default hudClass;