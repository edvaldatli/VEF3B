$('.button-collapse').sideNav(); // Function call sem er tengt við Materialize

var model = {"cats":[       // Model sér um öll gögn forritisins og talar einugis við octipus
    {"id": 0, "name": "Skotta", "age": "3 y/o", "numberOfClicks": 0, "color": "White", "img": "http://2.bp.blogspot.com/-pATX0YgNSFs/VP-82AQKcuI/AAAAAAAALSU/Vet9e7Qsjjw/s1600/Cat-hd-wallpapers.jpg"},
    {"id": 1, "name": "Fúsi", "age": "1 y/o", "numberOfClicks": 0, "color": "Black", "img": "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx"},
    {"id": 2, "name": "Chloe", "age": "6 y/o", "numberOfClicks": 0, "color": "White", "img": "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-senior-landing-hero.ashx"},
    {"id": 3, "name": "Tigger", "age": "1 y/o", "numberOfClicks": 0, "color": "Black", "img": "https://www.petfinder.com/wp-content/uploads/2012/11/152177319-declawing-cats-632x475-e1354303246526-632x353.jpg"},
    {"id": 4, "name": "Shadow", "age": "2 y/o", "numberOfClicks": 0, "color": "Brown", "img": "http://www.petsworld.in/blog/wp-content/uploads/2014/09/lovely-white-cat-image.jpg"},
    {"id": 5, "name": "Molly", "age": "4 y/o", "numberOfClicks": 0, "color": "Brown", "img": "https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header"},
    {"id": 6, "name": "Elele", "age": "3 y/o", "numberOfClicks": 0, "color": "Black", "img": "https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header"}
]};

var octipus = {             // Octipus sér um allar aðgerðir forritisins og talar við Model og View
    infoTemplate: function(data){                               // Function sem nær í template í html og býr til nýja templateið með gögnum
        var template = Handlebars.compile($('#catInfo').html());// Nær í template frá html
        return template(data);                                  // Skilar template sem er með gögnum úr model
    },
    listTemplate: function(data){                               // Function sem nær í template í html og býr til nýja templateið með gögnum
        var template = Handlebars.compile($('#catList').html());// Nær í template frá html
        return template(data);                                  // Skilar template sem er með gögnum úr model
    },
    getCats: function(){                    // Function sem skilar öllum model partinum
        return model;                       // Skilar model þegar það er kallað á getCats()
    },
    liOnClick: function(){                  // Þessi function mun assigna onClick á li til að birta fleiri upplýsingar
        $('li').on('click', function(e){    // Setur listener á li sem mun keyra function sem fer með event object í parameter
            view.render(e.target.id);       // Kallar í render sem er í view partinum. Flytur id sem smellt var á
        });
    },
    assignClickOnCat: function(id) {        // Þessi function assignar onClick á img. Biður um id sem parameter
        $('img').on('click', function () {  // Setur listener á li sem mun keyra function
            octipus.incrementClick(id);     // Kallar í function sem mun hækka numberOfClicks í model partinum.
            view.render(id);                // Update-ar html til að "Clicks:" hækki fyrir user
        });
    },
    incrementClick: function(id){                       // Þessi function hækkar numberOfClicks í model partinum
        octipus.getCats().cats[id].numberOfClicks += 1; // Hækkar numberOfClicks í model partinum
    }
};

var view = {                // View sér um allt sem userinn sér og talar einungis við Octipus
    init: function(){                                                       // Inistialize, þetta mun aðeins keyra einusinni
        var loadList =  function(){                                         // Þetta mun loada alla kettina í listann
            $(".side-nav").html(octipus.listTemplate(octipus.getCats()));   // Lætur listTemplate með gögnum inn í .side-nav
            octipus.liOnClick();                                            // Assignar onClick á li til að birta meira um kettina
        };
        loadList();                                                         // Exctutar þessu fyrir ofan
    },
    render: function(id){                                                       // Function sem biður um id sem parameter
            $('.info').html(octipus.infoTemplate(octipus.getCats().cats[id]));  // Lætur infoTemplateið með gögnum inn í .info
            octipus.assignClickOnCat(id);                                       // Kallar í function sem er í octipus partinum sem biður um id
    }
};
// Forritið byrjar á að initialize-a
view.init();