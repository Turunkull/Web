// Определяем наборы изображений
var images = {
    'Набор 1' : [
        'pic1.jpg',
        'pic2.jpg',
        'pic3.jpg',
        'pic4.jpg',
        'pic5.jpg',
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg',
        'pic9.jpg',
        'pic10.jpg'
    ],
    'Набор 2' : [
        'pic2.jpg',
        'pic3.jpg',
        'pic4.jpg',
        'pic5.jpg',
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg',
        'pic9.jpg',
        'pic10.jpg',
        'pic11.jpg',
        'pic12.jpg',
        'pic5.jpg',
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg'
    ],
    'Набор 3' : [
        'pic1.jpg',
        'pic2.jpg',
        'pic3.jpg',
        'pic4.jpg',
        'pic5.jpg',
        'pic6.jpg',
        'pic7.jpg',
        'pic8.jpg',
        'pic9.jpg',
        'pic10.jpg',
        'pic11.jpg',
        'pic12.jpg',
        'pic4.jpg',
        'pic5.jpg',
        'pic6.jpg'
    ]
};

$(document).ready(function(){ // Когда документ готов
    $('#gallery').gallery();
});


$.fn.gallery = function() {
    var self = this;
    var setimgs;

    this.each(function() {
        var g = this;

        g.load_sets = function(el) { // Функция - загружаем набор изображений
            $.each(images, function(key, value) { 
                $(el).append('<li><a id="'+key+'" href="#" title="'+key+'">'+key+'</a></li>');
            });

            var sets = $(el).find('li a');
            $(sets).click(function() { // Функция - привязываем событие click к набору
                var set = $(this).attr('id');
                g.setimgs = images[set];
                $(g).find('#thumbs').html('');
                g.load_thumbs($(g).find('#thumbs')[0], 0);
            });

            sets[0].click();
        }

        g.load_thumbs = function(el, index) { // Функция - загрузка миниатюр
            $(el).append('<li><img id="' + g.setimgs[index] + '" src="images/thumb_' + g.setimgs[index] + '" /></li>');

            var tn = new Image();
            $(tn).load(function() {
                var a = $($(el).find('li')[index]).find('img')[0];
                $(a).append(this);
                $(a).click(function() { // Функция привязываем событие click к миниатюрам
		$("#photo").attr('src','images/'+$(this).attr('id'));
                    return false;
                });

                if ((index + 1) < g.setimgs.length) {
                    g.load_thumbs(el, (index + 1));
                } else {
                    $($(g).find('#thumbs li img')[0]).click();
                }
            });
            tn.src = 'images/thumb_' + g.setimgs[index];
        }

        // Инициализация - загружаем набры для галаереи 
        g.load_sets($(g).find('#sets')[0]);
    });
};