$(document).ready( function () {
    var masonryOptions = {
        itemSelector: '.grid-item',
        gutter: 20,
        transitionDuration: '0.2s'
    };
    var $grid = $('.grid').masonry( masonryOptions );
    var img;
    var apiKey = '2854710-5117c4f86589aa6e407f62b7b';

    function startRandomImg() {
        $('.grid-item').remove();
        randomImg();
        $grid.masonry( masonryOptions);
    }

    startRandomImg();

    /*install slider*/

    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: false,
        prevText: "",
        nextText: ""
    });

    function randomImg() {
        var page =  Math.floor(Math.random() * (3 - 0)) + 0;
            $.ajax({
                url: "https://pixabay.com/api/?key="+apiKey+"&q=&page=" + page +  "&per_page=200",
         dataType: 'jsonp',
                success: function(data) {
                    for (var i = 0; i < 7; i++) {
                        var count =  Math.floor(Math.random() * (200 - 0)) + 0;

                        if (i == 4 || i == 5) {
                            img =  '<a href="' + data.hits[count].pageURL + '" class="grid-item grid-item--width2" title="' + data.hits[count].tags +  '"><img src="' + data.hits[count].webformatURL + '"><p>' + data.hits[count].tags + '</p></a>';
                        } else {
                            img =  '<a href="' + data.hits[count].pageURL + '" class="grid-item" title="' + data.hits[count].tags +  '"><img src="' + data.hits[count].webformatURL + '"><p>' + data.hits[count].tags + '</p></a>';
                        }
                        $grid.append( img ).masonry( 'appended', img ).masonry('destroy').masonry( masonryOptions);
                }}
            })
    }

    function search() {
        var $request = $('.search__input').val();

        $.ajax({
            url: "https://pixabay.com/api/?key="+apiKey+"&q=" + $request + "",
            dataType: 'jsonp',
            success: function(data) {
                if (parseInt(data.totalHits) > 0) {
                    for (var i=0; i < 7; i++) {
                        if (i == 4 || i == 5) {
                            img =  '<a href="' + data.hits[i].pageURL + '" class="grid-item grid-item--width2" title="' + data.hits[i].tags +  '"><img src="' + data.hits[i].webformatURL + '"><p>' + data.hits[i].tags + '</p></a>';
                        } else {
                            img =  '<a href="' + data.hits[i].pageURL + '" class="grid-item" title="' + data.hits[i].tags +  '"><img src="' + data.hits[i].webformatURL + '"><p>' + data.hits[i].tags + '</p></a>';
                        }
                        $grid.append( img ).masonry( 'appended', img ).masonry('destroy').masonry( masonryOptions);
                    }
                } else {
                    alert('По этому запросу не найдено изображений');
                }
            },
            error: function () {
                alert('Ошибка поиска, попробуйте ещё раз');
            }
        });
    }

    /*add event*/

    $('.search__button').on('click', function (e) {
        e.preventDefault();
        $('.grid-item').remove();
        search();
    });

    $('.search__input').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $('.grid-item').remove();
            search();
        }
    });
});