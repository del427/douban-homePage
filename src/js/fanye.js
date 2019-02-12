module.exports = function (jquery) {
    (function ($){
        function CreatePage (ele,options) {
            this.default = {
                current : 1,//当前页
                pageCount : 9,//总页数
                callback:function (data){console.log(data)}
            }//默认回调函数
            this.options = $.extend({},this.default,options);
            this.current = this.options.current;
            this.pageCount = this.options.pageCount;
            this.ele = ele;
            this.callback = this.options.callback;
            this.render(this.current);
            this.bindEvent();
        }
        CreatePage.prototype.render = function (current){
            if(current > this.pageCount){
                alert('页数有错误')
            }
            this.ele.empty();
            var start = current - 2,
                end = current + 2;
            if(current > 1){//当前页大于
                this.ele.append( "<a href='#' class = 'prevPage'>上一页</a>" )
            }else{
                this.ele.append( "<span class = 'disabled'>上一页</span>" )
            }
            if(current != 1 && current >= 4){//当前页大于等于4
                this.ele.append("<a href = '#' class='pageNumber'>" + 1 +"</a>")
            }
            if(start > 2 && this.pageCount >= 5 && current <= this.pageCount){
                //当前页起码是=5的情况下,并且小于总页数,才能有
                this.ele.append('<span >...</span>')
            }
            //生成中间的页数5页
            for(;start <= end; start++){
                if(start <= this.pageCount && start >= 1){
                    //start 小于等于 总页数 并且 start 也大于1
                    if(start != current){//不等于当前页的
                        this.ele.append("<a href = '#' class='pageNumber'>" + start +"</a>")
                    }else{
                        this.ele.append("<span class = 'current'>"+start+"</span>")
                    }
                }
            }
            if(end < this.pageCount -1 && this.pageCount >= 5){//end 小于总页数- 1 并且总页数大于等于5
                this.ele.append('<span>...</span>')
            }
            if(current != this.pageCount && current < this.pageCount - 2){//当前页不等于总页数并且 当前页小于总页数-2
               this.ele.append("<a href = '#' class='pageNumber'>" + this.pageCount +"</a>")
            }
            if(current < this.pageCount){//当前也小于总页数,插入下一页
                this.ele.append( "<a href='#' class = 'nextPage'>下一页</a>" )
            }else{
                this.ele.append("<span class = 'disabled'>下一页</span>")
            }
        }
        CreatePage.prototype.bindEvent = function () {
            var self = this;
            this.ele.on('click','.pageNumber',function () {
                var value = parseInt($(this).text())
                self.render(value);
                if(typeof self.callback == 'function') {
                    self.callback(value) 
                }
            })
            this.ele.on('click','.prevPage',function (){
                var value = parseInt($('.current').text())- 1
                self.render(value)
            
                if(typeof self.callback == 'function') {
                    self.callback(value) 
                }
            })
            this.ele.on('click','.nextPage',function (){
                var value = parseInt($('.current').text())  + 1
                self.render(value);
                if(typeof self.callback == 'function') {
                    self.callback(value) 
                }
            })
        }
        $.fn.extend({
            createPage : function (options) {
                new CreatePage(this,options)
            }
        })
    }(jquery))
}