const $curentPage = $('#homePage');


const $scrollbox = $('<div>', { class: 'scrollbox' }).css({
    'position': 'relative',
    'width': '100%',
    'overflow': 'hidden'
});

const $scrollbox_container = $('<div>', { class: 'scrollbox_container' }).css({
    'display': 'flex',
    'position': 'absolute',
    'background-color': 'black',
    'height': '100vh',
    'flex-shrink': 0,
    'top': '0',
    'left': '0'
});

const imageList = [
    '../img/emanon.png',
    '../img/bubu.png',
    '../img/shan.jpg',
    '../img/claymore.png',
    '../img/Clambman.jpg'
];

imageList.forEach((imageSrc) => {
    const $card = $('<div>', { class: 'scrollbox_container_card' });
    const $img = $('<img>', { src: imageSrc, class: 'imageManga' });
    $card.css({
        'position': 'relative',
        'width': '90vw',
        'height': '100vh',
        'border-radius': '5px',
        'margin-left': '5vw',
        'flex-shrink': 0,
        'overflow': 'hidden'
    })
    $img.css({
        'pointer-events': 'none',
        'user-select': 'none'
    })
    $card.append($img);
    $($scrollbox_container).append($card);
});


$scrollbox.append($scrollbox_container);




$($curentPage).append(
    window.createBox(98, 25),
    window.createBox(98, 80),
    window.createBox(80, 40),
    $scrollbox,
    window.createBox(60, 30),
    window.createBox(50, 25)
);




const scrollbox = {
    container: document.querySelector(".scrollbox_container"),
    cards: [...document.querySelectorAll('.scrollbox_container_card')],
    trigger_distance: 0,
    border_distance: 0,
    distance: 0,
    resize() {
        let _scrollbox = document.querySelector('.scrollbox')
        _scrollbox.style.height = `${this.container.offsetWidth}px`;
        this.trigger_distance = _scrollbox.offsetTop;
        this.border_distance = _scrollbox.offsetTop + _scrollbox.offsetHeight - innerHeight;
    },
    move() {
        if (scrollY >= this.trigger_distance &&
            scrollY <= this.border_distance) {
            $('#headerContainer').css('visibility', 'hidden');
            let distance_x =
                this.distance / (this.border_distance - this.trigger_distance) *
                (this.container.offsetWidth - innerWidth);
            this.distance = scrollY - this.trigger_distance;
            this.container.style.transform = `translateY(${this.distance}px)`;
            for (let i = 0; i < this.cards.length; i++) {
                this.cards[i].style.transform = `translateX(${-distance_x}px)`;
            };
        } else {
            $('#headerContainer').css('visibility', 'visible');
        }
    }
};


scrollbox.resize();

window.addEventListener("resize", () => {
    scrollbox.resize();
});

window.addEventListener("scroll", () => {
    scrollbox.move();
});
