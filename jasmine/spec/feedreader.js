/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */

// 调节超时上限
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
         it('every feed has url', function(){
            let len = allFeeds.length;
            let everyHas = true;
            let regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/; 
            for(let i = 0; i < len; i++){
                expect(allFeeds[i].url).toMatch(regularExpressionUrl);
                everyHas = everyHas && !!(allFeeds[i].url);
            }
            expect(everyHas).toBe(true);
         })

        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
         it('every feed has name', function(){
            let len = allFeeds.length;
            let everyHas = true;
            for(let i = 0; i < len; i++){
                everyHas = everyHas && !!(allFeeds[i].name);
            }
            expect(everyHas).toBe(true);
         })
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function(){
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
         it('hide slide menu', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         })
         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
        it('can change show/hide state', function(){
            //make a fake Event
            var icon=$('i.icon-list')[0];
            var event = document.createEvent('MouseEvent');
            event.initMouseEvent('click',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
            
            icon.dispatchEvent(event);
            expect($('body').hasClass('menu-hidden')).toBe(false);

            icon.dispatchEvent(event);
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    })


    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries', function(){
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
        beforeEach(function(done){
            console.log('done',done);
            loadFeed(0 ,done);
        });

        it('loadFeed work', function(){
            expect(!!$('.feed').find('.entry')).toBe(true);
        })
    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    describe('New Feed Selection', function(){
        let first, second;

        beforeEach(function(done){
            loadFeed(1 ,function(){
                first = $('.entry h2').html();
                console.log('first ', first);
                loadFeed(0 ,function(){
                    second = $('.entry h2').html();
                    console.log('second ', second);
                    done();
                })
            })
        });

        it('change content', function(){
            console.log(first, second);
            expect(first == second).toBe(false);
        });
    })
}());
