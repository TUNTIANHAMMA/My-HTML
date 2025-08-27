window.switchPage = function (pageId, linkText) {
    const $targetPage = $('#' + pageId);
    const $mask = $('#pageTransitionMask');

    // 开始遮罩动画：渐入
    $mask
        .css({ 'pointer-events': 'auto' })
        .stop(true, true)
        .animate({ opacity: 1 }, 300, function () {
            // 切换页面内容
            $('.page').hide();
            $targetPage.stop(true, true).fadeIn(300);

            // 激活面包屑
            $('.crumb-link').removeClass('active');
            $('.crumb-link').each(function () {
                if ($(this).text() === linkText) {
                    $(this).addClass('active');
                }
            });

            // 遮罩淡出
            $mask.animate({ opacity: 0 }, 200, function () {
                $mask.css('pointer-events', 'none');
            });
        });

    return pageId;
};




$(function () {
    const currentPageId = 'loginPage'; // 假设你初始化要跳到 loginPage
    window.switchPage(currentPageId, 'Login');

    $('body').addClass('main-color');

    if (currentPageId !== 'loginPage') {
        $('.crumbs').hide();  // ✅ 用 jQuery 选择器
    }

    if (currentPageId !== 'homePage') {
        crumbsManager();
        $('#headerContainer').css('visibility', 'visible');
    } else {
        $('#headerContainer').css('visibility', 'hidden');
    }
});

// 创建盒子元素的函数

let boxCounter = 0; // 用于生成递增的 ID
window.createBox = function (width, height) {
    boxCounter++; // 每次调用都递增
    const boxId = `box-${boxCounter}`;

    const $box = $('<div>', {
        class: 'box',
        id: boxId,
        // text: `BOX ${boxCounter}`
    }).css({
        width: width + 'vw',
        height: height + 'vh'
    });
    return $box;
};





// 页面切换过渡动画
if ($('#pageTransitionMask').length === 0) {
    const $mask = $('<div>', {
        id: 'pageTransitionMask',
        class: 'page-transition-mask'
    });
    $('#main').append($mask); // 只遮住 #main（不遮 headerContainer）
}