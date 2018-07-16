var oexport = function() {
    var $allTires = $('.container.item');
    var tiresCSV = '';
    $allTires.each(function(idx, tire) {
        var $tire = $(tire);
        var tireClass = $tire.find('.class').text();
        var producer = $tire.find('.producer').text();
        var model = $tire.find('.model').text();
        var size = $tire.find('.size').text();
        var load = $($tire.find('.extra em')[0]).text();
        var speed = $($tire.find('.extra em')[1]).text();
        var fuel = $tire.find('.icon-fuel').next().text().replace('|', '').trim();
        var rain = $tire.find('.icon-rain').next().text().replace('|', '').trim();
        var noise = $tire.find('.icon-noise').next().text();
        var userRating = $tire.find('.rate .note').text().replace(',', '.');
        var userReviewsCount = $tire.find('.rate .counted').text();
        var price = $tire.find('span.price').text();
        var tireCSVrecord = `${producer}, ${model}, ${tireClass}, ${size}, ${load}, ${speed}, ${fuel}, ${rain}, ${noise}, ${userRating}, ${userReviewsCount}, ${price}`; 
        tiresCSV += `${tireCSVrecord}\n`;
        console.log(`found tire: ${tireCSVrecord}`);
    });
    console.log(`found ${$allTires.length} in total`);
    $.post('https://localhost:8080/store.json', tiresCSV);
    return tiresCSV;
};
