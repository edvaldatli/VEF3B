$(document).ready(function(){
    var model = {
        cats: [['Skotta', 'https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header', 0],
            ['Fúsi', 'http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg', 0]]
    };

    var octopus = {
        catClicked: function (id) {
            model.cats[id][2] = model.cats[id][2] += 1;
            console.log("Cat clicked");
            view.render();
        },
        getCatPicture: function () {
            var pictures = [];
            for (var i = 0; i < model.cats.length; i++) {
                pictures.push(model.cats[i][1]);
            }
            return pictures;
        },
        getCatName: function () {
            var names = [];
            for (var i = 0; i < model.cats.length; i++) {
                names.push(model.cats[i][0]);
            }
            return names;
        },
        assignOnClick: function (id, selector) {
            $('#' + selector).on('click', function () {
                octopus.catClicked(id);
            });
        },
        getClickCount: function () {
            var counts = [];
            for (var i = 0; i < model.cats.length; i++) {
                counts.push(model.cats[i][2]);
            }
            return counts;
        },
    };

    var view = {
        init: function(){
            var loadCats = (function(){
                for(var i = 0; i < model.cats.length; i++){
                    var selector = 'cat'+i;
                    $('body').append('<div class="col s6" id="' + selector + '">' +
                        '<span class="name">' + octopus.getCatName()[i] + '</span>' +
                        '<img src="' + octopus.getCatPicture()[i] + '">' +
                        '<span class="counter">' + octopus.getClickCount()[i] + '</span>' +
                        '</div>');
                    octopus.assignOnClick(i, selector);
                }
            });
            loadCats();
        },
        render: function(){
            $('body').html("");
            view.init();
            console.log("DOM rendered");
        }
    };

    view.init();
});

