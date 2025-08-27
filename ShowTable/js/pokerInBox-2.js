(function createPokerDeckAndLogic() {
    const $target = $('#box-2');

    const $pokerContainer = $('<div>', { class: 'pokerContainer' });

    // 动态创建扑克结构
    for (let i = 4; i >= 0; i--) {
        const $poker = $('<div>', {
            class: `poker poker${5 - i}`
        });
        const $img = $('<img>', {
            src: `../img/photo(${i}).jpg`
        });
        $poker.append($img);
        $pokerContainer.append($poker);
    }

    // 添加最顶层的可点击层
    const $pokerTop = $('<div>', {
        class: 'poker_top poker5'
    }).on('click', function () {
        if (window.poker && typeof window.poker.move === 'function') {
            window.poker.move();
        }
    });

    $pokerContainer.append($pokerTop);
    $target.append($pokerContainer);

    // 定义扑克牌切换逻辑对象
    window.poker = {
        imgs: [],
        img_index: 0,
        poker_eles: [],
        transform_datas: [
            "rotate(-50deg) translate(15%, 1%)",
            "rotate(-40deg) translate(35%, -5%)",
            "rotate(-10deg) translate(30%, -20%)",
            "rotate(5deg) translate(95%, -26%)",
            "rotate(10deg) translate(125%, -23%)"
        ],
        init() {
            for (let i = 0; i < 9; i++) {
                const img = new Image();
                img.src = `../img/photo(${i}).jpg`;
                this.imgs.push(img);
            }

            this.poker_eles = [...document.getElementsByClassName("poker")];
            this.poker_eles.forEach((ele, index) => {
                ele.nums = index;
                ele.style.zIndex = index;
                ele.style.transform = this.transform_datas[index];
            });

            this.img_index = this.poker_eles.length;
        },
        move() {
            this.poker_eles.forEach((ele) => {
                let nums = ele.nums;
                if (nums + 1 >= this.poker_eles.length) {
                    nums = 0;
                    ele.style.transition = "";
                    ele.querySelector("img").src = this.imgs[this.img_index].src;
                    this.img_index++;
                    if (this.img_index >= this.imgs.length) this.img_index = 0;
                } else {
                    nums += 1;
                    ele.style.transition = "transform 0.3s ease";
                }
                ele.style.zIndex = nums;
                ele.style.transform = this.transform_datas[nums];
                ele.nums = nums;
            });
        }
    };

    // 初始化扑克逻辑
    window.poker.init();
})();
