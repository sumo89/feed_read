//Google Trends https://www.google.com/trends/
//National Geographic Photo https://www.npmjs.com/package/nat-geo-api
// https://natgeoapi.herokuapp.com/api/dailyphoto
//Nasa photo https://api.nasa.gov/#live_example
//qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ
//Guardian news key: 4aae3122-5e4e-414b-8341-7a81419b19e5
//http://content.guardianapis.com/search?from-date=2016-07-01&api-key=

var app = {}

//Nasa
var NasaUrl = "https://api.nasa.gov/planetary/apod?api_key=qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ";

$.ajax({
	url: NasaUrl,
	success: function(result){
		$("#nasaImageResult").attr('src', result.url);
		$("#nasaImageTitle").html(result.title);
		$("#nasaImageCopy").html(result.copyright);
		$("#nasaImageDesc").html(result.explanation);
	}
});

//toggle hide on description
app.descriptionShow = function(e){
	e.preventDefault();
	$("#nasaImageDesc").toggleClass('is-hidden');
	$("#nasaDesctiption").toggleClass('is-hidden');
};
$('.nasaDescWrap').on('click', app.descriptionShow);

		

//Nat Geo


//Google


//Guardian


//Reddit