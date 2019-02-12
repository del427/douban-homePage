module.exports = function (jQuery) {
    (function ($) {
        // ele->this,{time->时间,auto->自动播放}
        function Broadcast (ele,option) {
            this.default = {
                time : 1000,
                auto : true,
                rate : 300,
            };
            this.option = $.extend({},this.default,option);
            this.time = this.option.time;
            this.auto = this.option.auto;
            this.timer = null;
            this.ele = ele;
            this.rate = this.option.rate;
            this.oul = this.ele.find('ul');
            this.oliArr = this.ele.find('li');
            this.width = this.ele.width();
            this.len = this.oliArr.length;
            this.key = true;
            this.index = 0;
            this.flag = true;
            this.render();
            this.btnliArr = $('.btnli');
            this.olilen = $('.btnli').length;
            this.bindEvent();
            this.autoplay();
            
        }
        Broadcast.prototype.render = function () {
            var odiv = $('<div></div>'),
                left = $('<div></div>'),
                right = $('<div></div>'),
                oul = $('<ul></ul>'),
                oulw = Math.floor(this.ele.width() * 0.08),
                oulh = Math.floor(this.ele.height() * 0.11),
                fontSize = Math.floor(this.ele.width() * 0.04);
            odiv.attr('class','btnbox');
            left.attr('class','left');
            right.attr('class','right');
            odiv.css({
                'position':'absolute',
                'left':'0%',
                'top':'50%',
                'marginTop':-(oulh/2)+ 'px',
                'width': '100%',
                'display':'block'
            })
            odiv.append(left,right)
            left.add(right).css({'width':oulw + 'px','height':oulh + 'px','fontSize':fontSize + 'px','color':'#fff','fontWeight':'100','borderRadius':oulw + 'px','backgroundColor':'rgba(100,100,100,0.5)','line-height':Math.abs(oulw/2) +'px'});
            left.css({
                'float':'left',
                'padding-right': '10px',
                'textAlign':'right',
                'marginLeft':-(oulw/2) - 10+'px',
            }).text('<');right.css({
                'float':'right',
                'padding-left': '10px',
                'textAlign':'left',
                'marginRight':-(oulw/2)- 10+'px',
            }).text('>')
            this.ele.append(odiv);
            this.ele.css({'textAlign':'center'})
            oul.css({
                'position':'relative',
                'bottom':'40px',
                'backgroundColor':'rgba(100,100,100,0.5)',
                'display':'inline-block',
                'borderRadius':'10px',
            })
            oul.attr('class','btnList')
            for(var i = 0; i < this.len - 1; i++){
                var oli = $('<li></li>')
                if( i == 0){
                    var oli = $('<li></li>').attr('class','active');
                    oli.css({
                    'width':'15px',
                    'height':'15px',
                    'borderRadius':'50%',
                    'backgroundColor':'#072',
                    'display':'inline-block',
                    'margin':'3px 3px',
                    })
                }else{
                    oli.css({
                    'width':'15px',
                    'height':'15px',
                    'borderRadius':'50%',
                    'backgroundColor':'#fff',
                    'display':'inline-block',
                    'margin':'3px 3px',
                    })
                }
                oli.addClass('btnli')
                oul.append(oli);
                
            }
            $('.btnList li').eq(0).attr('class','active')
            this.ele.append(oul)
        }
        Broadcast.prototype.bindEvent = function () {
            var self = this,
                time = null;
              
            this.ele.find($('.left')).add($('.right')).add($('.btnList .btnli')).on('click',function () {
                if($(this).attr('class') == 'left'){
                    clearTimeout(self.timer)
                    self.move('left');
                    self.autoplay()
                }else if($(this).attr('class') == 'right'){
                    clearTimeout(self.timer)
                    self.move('right')
                    self.autoplay()
                }else{
                    clearTimeout(self.timer)
                    var value = $(this).index();
                    self.move(value)
                    self.autoplay()
                }
            })
            $(this.ele).on('mouseenter',function (e) {
                clearTimeout(self.timer)
                $('.btnbox').css({'display':'block'})
            }).on('mouseleave',function (e) {
                
                clearTimeout(self.timer)
                $('.btnbox').css({'display':'block'})
                $('.left').add($('.right')).css({'backgroundColor':'rgba(100,100,100,0.5)'})
                self.autoplay()
            })
            $('.imgbox').on('mouseenter',function () {
                clearTimeout(self.timer)
            })
            $('.btnbox').on('mouseenter',function (e) {
                e.stopPropagation()
                clearTimeout(self.timer)
                $('.left').add($('.right')).css({'backgroundColor':'rgba(100,100,100,1)'})
                self.autoplay()
            }).on('mouseleave',function (){
                $('.left').add($('.right')).css({'backgroundColor':'rgba(100,100,100,0.5)'})
            })
        }
        Broadcast.prototype.getIndex = function (direction) {
            var self = this;
            if(direction == 'left'){
                if(this.index == 0){
                    this.oul.css({
                        'left': -(this.olilen  * this.width) + 'px',
                    })
                    self.flag = true;
                    this.index = this.olilen -1;
                }else{
                    this.index -= 1;
                }
            }else if(direction == 'right'){
                if(this.index == this.olilen - 1 ){
                    self.flag = false;
                    this.oul.animate({
                        'left':  -(this.olilen  * this.width) + 'px',
                    },function () {
                        $(this).css({
                            'left':'0px',
                        });
                        self.key = true;
                        self.flag = true;
                        clearTimeout(self.timer)
                        self.autoplay();
                    })
                    this.index = 0;
                }else{
                    this.index += 1;
                }
            }else{
                this.index = direction;
            }
        }
        Broadcast.prototype.move = function (direction) {
            if(this.key){
                this.key = false;
                var self = this;
                this.getIndex(direction);
                this.changli(this.index)
                if(this.flag){
                    this.oul.animate({
                    'left': -(this.index * this.width) + 'px',
                    },function(){
                        self.key = true;
                        clearTimeout(self.timer)
                        self.autoplay();
                    })
                }
            }
        }
        Broadcast.prototype.changli = function (index){
            $('.btnli').css({'backgroundColor':'#fff'})
            $('.active').removeClass('active')
            $('.btnli').eq(index).addClass('active').css({'backgroundColor':'#072'})
          
        }
        Broadcast.prototype.autoplay = function () {
            var self = this;
            
            if(this.auto){
               this.timer = setTimeout(function () {
                   self.move('right')
               },this.time)
               
            }
        }
        $.fn.extend({
            Broadcast : function (option) {
                new Broadcast(this,option)
            }
        })
    }(jQuery))
}