function crumbsManager() {

    const $main = $('#main');
    const $logo = $('<img>', {
        src: '../img/LainHead.gif',
        // src: '../img/LainPrism4.gif',
        alt: 'Logo',
        id: 'logo'
    });
    const $headerContainer = $('<div>', { id: 'headerContainer' });

    const $crumbs = $('<nav>', { class: 'crumbs' });
    const $ol = $('<ol>', { class: 'olcrumbs' });
    const links = [
        { pageId: 'loginPage', text: 'Login' },
        { pageId: 'homePage', text: 'Index' },
        { pageId: 'blogPage', text: 'Blog' }
    ];

    links.forEach(link => {
        const $li = $('<li>', { class: 'crumb' });
        const $a = $('<a>', {
            href: '#',
            class: 'crumb-link',
            text: link.text,
            'data-page': link.pageId
        });
        $a.on('click', function (e) {
            e.preventDefault();
            window.switchPage(link.pageId, link.text);
        });
        $li.append($a);
        $ol.append($li);
    });

    const $lia = $('<li>', { class: 'crumb' });
    const $aa = $('<a>', {
        class: 'crumb-link',
        text: 'Message',
        href: '../html/dashboad.html'
    });
    $lia.append($aa);
    $ol.append($lia);

    $crumbs.append($ol);
    $headerContainer.append($logo).append($crumbs);
    $main.prepend($headerContainer);

    $logo.on('click', function () {
        window.switchPage('loginPage', 'Login');
    });

    // 滚动逻辑
    const scrollThreshold = 100;
    let isFixed = false;

    $(window).on('scroll', function () {

        const $header = $('#header');
        const $homePage = $('#homePage');

        if ($(window).scrollTop() > scrollThreshold) {
            if (!isFixed) {
                isFixed = true;
                $header.fadeOut(0, function () {
                    $crumbs.removeClass('crumbs');
                    $crumbs.addClass('crumbs-scholled');
                    $header.addClass('header-appended');
                    $header.appendTo($headerContainer).fadeIn(0, function () {
                        $headerContainer
                            .addClass('headerContainer-fixed')
                            .addClass('shrinked');
                        scrollbox.resize();
                    });
                });
            }
        } else {
            if (isFixed) {
                isFixed = false;
                $header.fadeOut(150, function () {

                    $crumbs.removeClass('crumbs-scholled');
                    $crumbs.addClass('crumbs');
                    $header.removeClass('header-appended');
                    $header.prependTo($homePage).fadeIn(0, function () {
                        $headerContainer
                            .removeClass('headerContainer-fixed')
                            .removeClass('shrinked');
                        scrollbox.resize();
                    });
                });
            }
        }
    });
}