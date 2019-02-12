require('../less/index.less')
// import $ from 'jquery';
require('../js/jquery');
var fanye = require('../js/fanye'),
    slider = require('../js/slider');
fanye($);
slider($);

// import { join } from 'path';
(function (){
    var start = 0;
    var value= null;
    function head () {
        var $input = $('input'),
        $ul = $('.nav-search-cont ul');
        bindEvent();
        $input.on('input',function (e){
            var timer = null;
            // value = e.target.value;
            return function (e) {
                var self = this;
                clearTimeout(timer);
                e.preventDefault();
                value = e.target.value;
                timer = setTimeout(function () {
                $.ajax({
                    type:'GET',
                    // url:'http://localhost/web/doubanmusic/src/js/data.text',
                    url:'https://api.douban.com/v2/music/search',
                //    url:'./data.text',
                    data:'q='+ e.target.value,
                    cache:false,
                    dataType:'jsonp',
                    success :getData,
                })
                },500)
            }
        }())
        function bindEvent () {
           
            $('.first-title').on('click',function() {
                $(this).addClass('big');
                $('.second-title').removeClass('big');
                $('.cont-items-second').css('display','none');
                $('.cont-items-first').css('display','block');
            })
            $('.second-title').on('click',function() {
                $(this).addClass('big');
                $('.first-title').removeClass('big');
                $('.cont-items-first').css('display','none');
                $('.cont-items-second').css('display','block');
            })

            $('.nav-search-cont').on('mouseleave',function(){
                $('.nav-search-cont ul').hide(300,'linear',function() {})
            })
            $('.min-logo').on('click',function(){
                window.location.href='index.html?p='+value
            })
        }
        function getData (data) {
            console.log(data)
            var str = '';
            $ul.empty();
            for(var i = 0; i <= 6; i++){
                var oImg = data.musics[i].image || '',
                    otitle =  data.musics[i].attrs.title[0] || '',
                    osinger = '表演者 : ' + data.musics[i].attrs.singer[0] || '',
                    id = data.musics[i].id
                str = '<a href ="index.html?id= '+ id +'"><li><img src='+ oImg +'><div class ="info">\
                        <span class="info-title">'+otitle+'</span>\
                        <span class="info-name">'+ osinger +'</span></div></li></a>';
                
                $ul.append(str)
                
            }
            $ul.show(300,'linear',function(){
                
            })
        }
    }
    function init () {
        head()
        contentrender();
        getData()
    }
    function getData () {
       if(location.search.slice(1,3) == 'id'){
           $('.content').remove()
           value = decodeURIComponent(location.search.slice(7));
           if(value !=='undefined'){
                $.ajax({
                    type:'GET',
                //    data: 'id=' + value,
                    url : 'https://api.douban.com/v2/music/'+ value,
                    success:getId,
                    dataType:'jsonp',
                    cache:false,
                })
           }
       }else if(location.search.slice(1,2) == 'p'){
           var value = decodeURIComponent(location.search.slice(3));
           $('.content').remove();
          
           if(value !== 'undefined'){
            
               $.ajax({
                    type:'GET',
                    url:'https://api.douban.com/v2/music/search',
                    data:'q=' + value + '&start=' + start + '&count= 15',
                    dataType: 'jsonp',
                    success:getPage,
                    cache:false,
               })
           }
       }
       function getId (data){
           var title = data.title,
                image = data.image,
                tags = data.tags,
                attrs = data.attrs,
                rating = data.rating,
                str = `<div class="wrapper">
                        <h1>${title}</h1>
                        <div class="news-cont-left">
                            <div class="news-right">
                                <div class="right-img">
                                    <a href= ${image} target="_blank"><img src=${image} alt="" class ='imager'></a>
                                    <a href= '#'><div class="news-similar">听相似歌曲</div></a>
                                </div>
                                <div class="right-news">
                                    <p>表演者 : <span class ='singer'>${attrs.singer}</span></p>
                                    <p>流派 : <span>民谣</span></p>
                                    <p>专辑类型 : <span>${attrs.version}</span></p>
                                    <p>介质 : <span>民谣</span></p>
                                    <p>发行时间 : <span>${attrs.pubdate}</span></p>
                                    <p>出版者 : <span>${attrs.publisher}</span></p>
                                </div>
                            </div>
                            <div class="news-left">
                                <p>豆瓣评分</p>
                                <strong>${rating.average}</strong>
                                <div class="right-rating">
                                    <span class='xingxing'></span>
                                    <span class='peoples'>${rating.numRaters}评价</span>
                                </div>
                                <div class="bottom-rating">
                                    <p><span class='xing'>5星</span><span class='zhong'></span><span class='Percentage'>56%</span></p>
                                    <p><span class='xing'>4星</span><span class='zhong'></span><span class='Percentage'>29.4%</span></p>
                                    <p><span class='xing'>3星</span><span class='zhong'></span><span class='Percentage'>12.5%</span></p>
                                    <p><span class='xing'>2星</span><span class='zhong'></span><span class='Percentage'>3.5%</span></p>
                                    <p><span class='xing'>1星</span><span class='zhong'></span><span class='Percentage'>2.9%</span></p>
                                </div>
                            </div>
                            <div class="news-zhong">
                                <span class ='zhong-text'>想 听</span>
                                <span class ='zhong-text'>在 听</span>
                                <span class ='zhong-text'>听 过</span>
                                <div class='evaluate'>评 价 : <div class='zhong-xingxing'></div></div>
                                <div class="rec-sec">
                                    <ul>
                                        <li><span class='sec-text'>写短评</span></li>
                                        <li><span class='sec-text'>写乐评</span></li>
                                        <li><span class='sec-text'>加入豆列</span></li>
                                        <li><span class='sec-text'>分享到</span></li>
                                    </ul>
                                    <p class = 'sec-tui'>推荐</p>
                                </div>
                                <div class="zhong-jianjie">
                                    <h2 class='jianjie-title'>简介  · · · · · ·</h2>
                                    <p class='jianjie-text'>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                                        我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                                    </p>
                                    <p class='jianjie-text'>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                                        我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                                    </p>
                                    <p class='jianjie-text'>我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                                        我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="news-cont-right">
                                <h2 class='right-title-name'>豆瓣成员常用的标签(共139个)  · · · · · ·</h2>
                            <div class="right-cont">
                                <ul class='cont-items'>
                                    
                                </ul>
                                <div class="cont-tuijie">
                                    <h2 class ='tuijie-title'>以下豆列推荐  · · · · · ·<span class='over'>(全部)</span></h2>
                                    <ul class='tuijie-items'>
                                        <li class='tuijie-cont-item'><a href="https://www.douban.com/doulist/1155263/"><span>电视节目,广告,网络视频的背景配乐 </span></a>(VAN)</li>
                                        <li class='tuijie-cont-item'><a href="https://www.douban.com/doulist/35898502/"><span>热门唱片 </span></a>(豆瓣音乐)</li>
                                        <li class='tuijie-cont-item'><a href="https://www.douban.com/doulist/35898500/"><span>新碟上架 </span></a>(豆瓣音乐)</li>
                                        <li class='tuijie-cont-item'><a href="https://www.douban.com/doulist/128074/"><span>感谢有了Repeat 1这个功能 </span></a>(蜗牛擰發條)</li>
                                        <li class='tuijie-cont-item'><a href="https://www.douban.com/doulist/42106885/"><span>听一曲民谣,押一口清酒 </span></a>(信徒)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`;
            $('body').append(str);
            render(tags,rating.average)
       }
       function render (data,average) {
           var len = data.length;
           for(var i = 0; i < len; i++){
                var $items = $('<li></li>');
                $items.addClass('cont-item');
                $items.text(data[i].name);
                $('.cont-items').append($items);
           }
            xingPosi('.xingxing',15,average)
        }
        function xingPosi (dom,num,average){
            var onum =  Math.round(average) * num + num ;
            $(dom).css('backgroundPosition','0px '+ onum + 'px');
        }
       function getPage (data) {
            var len = data.musics.length,  
                $cont = $('<div></div>'),
                value = decodeURIComponent(location.search.slice(3)),
                total = data.total,
                page = Math.ceil(total / 15),
                $page = $('<div></div>');
                $page.addClass('page');
                $cont.addClass('searchcont');
            $('body').append($cont)
           
            $cont.html()
            for(var i = 0; i < len; i++){
                var value = value,
                    image = data.musics[i].image,
                    attr = data.musics[i].attrs,
                    rating = data.musics[i].rating,
                    id = data.musics[i].id,
                    singer = attr.singer == undefined ? '' : attr.singer + ' /',
                    pubdate = attr.pubdate == undefined ? '' : attr.pubdate + ' /',
                    version = attr.version == undefined ? '' : attr.version + ' /',
                    media = attr.media == undefined ? '' : attr.media + ' /',
                    publisher = attr.publisher == undefined ? '' : attr.publisher + ' /',
                    floot = $('<div><div>'),
                    str = '';
                    if(i == 0){
                        str = `<h1>搜索 : ${value}</h1>
                                <ul class = 'cont-items'>
                                    <li class='cont-item'>
                                    <a href=${image}> <img src=${image} alt=""></a>
                                        <div class = 'cont-right'>
                                            <p class='right-title'><a href ='index.html?id=  ${id}'>${attr.title}</a></p>
                                            <p class='right-item'>
                                                <span class = 'item-xing'></span>
                                                <span class='item-num'>${rating.average}</span>
                                                <span>(${rating.numRaters}评价)</span>
                                            </p>
                                            <p class='right-news'>
                                                ${singer }  ${pubdate} ${version } ${media} 
                                            </p>
                                        </div>
                                    </li>
                                </ul>`;
                        $cont.append(str)
                        xingPosi($('.item-xing').eq(i),11,rating.average)
                    }else{
                        str = ` <li class='cont-item'>
                                <a href=${image}> <img src=${image} alt=""></a>
                                <div class = 'cont-right'>
                                <p class='right-title'><a href ='index.html?id=  ${id}'>${attr.title}</a></p>
                                    <p class='right-item'>
                                        <span class = 'item-xing'></span>
                                        <span class='item-num'>${rating.average}</span>
                                        <span>(${rating.numRaters}评价)</span>
                                    </p>
                                    <p class='right-news'>
                                        ${singer} ${pubdate}  ${version} ${media} 
                                    </p>
                                </div>`;
                        $('.cont-items').append(str);
                        xingPosi($('.item-xing').eq(i),11,rating.average)
                    }
            }
            $('.searchcont').append($page);
         
            floot.addClass('floot').html(
                `<div class="floot-left">
                    <span>© 2005－2018 douban.com, all rights reserved 北京豆网科技有限公司</span>
                </div>
                <div class="floot-right">
                    <span>关于豆瓣</span><span>在豆瓣工作</span><span>联系我们</span><span>免责声明</span><span帮助中心></span><span>移动应用</span><span> 豆瓣广告</span>
                </right>`
            )
           
            $('.page').createPage({
                current:1,
                pageCount:page,
                callback : function(data){
                    start = 15 * (data - 1);
                    $('.searchcont').remove();
                    getData ()
                }
            })
            $('.searchcont').append(floot);
        }
           
    }
    function contentrender () {
        if(location.search){
            $('content').remove();
        }else{
            $('.img-slider').Broadcast({time: 3000,auto:true});
        }
    }
    
    return init();
}())