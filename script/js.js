$(document).ready(function(){
    var selectorTemplate;
    var infoTemplate;
    var targetId;
    var jsonData;
    var result;

    var render = function(template, data){
        var renderer = Handlebars.compile(template);
        result = renderer(data);

        return result;
    };

    var displaySelector = function(){
        $('#container').html(render(selectorTemplate, jsonData));

        $('button').on('click', function(e){
            displayInfo(e.target.id);
        })
    };

    var displayInfo = function(id){
        $('#infoContainer').html(render(infoTemplate, jsonData.character[id]))
    };

    $.when(
        $.getJSON('library/characters.json').then(function(json, status, jqXHR){jsonData = json}),
        $.get('template/selector.hbs').then(function(template, status, jqXHR){ selectorTemplate = template}),
        $.get('template/info.hbs').then(function(template, status, jqXHR){infoTemplate = template})
    ).done(displaySelector)
});