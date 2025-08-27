const $box3 = $('#box-3');
const $box1 = $('#box-1');

const $text3 = $('<span>', {
  class: 'text3Container',
});

const $left_marks = $('<p>', {
  text: '“'
});
const $text = $('<p>', {
  html: '<i>Present day,&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspPresent time.</i>'
});

const $right_marks = $('<p>', {
  text: '”'
});

$text3.append($left_marks, $text, $right_marks);
$box3.append($text3);



