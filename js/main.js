//Google Trends https://www.google.com/trends/
//National Geographic Photo https://www.npmjs.com/package/nat-geo-api
// https://natgeoapi.herokuapp.com/api/dailyphoto
//Nasa photo https://api.nasa.gov/#live_example
//qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ
//Guardian news key: 4aae3122-5e4e-414b-8341-7a81419b19e5
//http://content.guardianapis.com/search?from-date=2016-07-01&api-key=

var app = {}

//Nasa
var nasaUrl = "https://api.nasa.gov/planetary/apod?api_key=qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ";
// var nasaUrlRandom = "https://api.nasa.gov/planetary/apod?date=" + dateYear + dateMonth + dateDay + "&api_key=qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ";
var $nasaImageTitle = $("#nasaImageTitle");
var $nasaImageCopy = $("#nasaImageCopy");
var $nasaImageDesc = $("#nasaImageDesc");
var $nasaVideo = $("#nasaVideo");
var $nasaImageResult = $("#nasaImageResult");

//"https://api.nasa.gov/planetary/apod?date=2015-09-07&api_key=qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ"
// on click of random button - change the aasaUrl ot the random one.

// var dateYear = Math.floor(Math.random() * 2016) + 1996;
// doesn't work as numbers are too large

// function randomdateYear(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// };

// var dateYear = randomdateYear(1996, 2016);
// var dateMonth = Math.floor(Math.random() * 12) + 1;
// var dateDay = Math.floor(Math.random() * 28) + 1;

app.generateRandom = function(e){
	e.preventDefault();
	
	function randomdateYear(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
	};

	var dateYear = randomdateYear(1996, 2016);
	var dateMonth = Math.floor(Math.random() * 12) + 1;
	var dateDay = Math.floor(Math.random() * 28) + 1;

	var nasaUrlRandom = "https://api.nasa.gov/planetary/apod?date=" + dateYear + "-"
	 + dateMonth + "-" + dateDay + "&api_key=qFJ1pZjIgYVKQO2VyfFgQLVfTd3OmyW8UB8OB9aQ";
	$.ajax({
		url: nasaUrlRandom,
		success: function(result){
		$nasaImageTitle.html(result.title);
		$nasaImageCopy.html(result.copyright);
		$nasaImageDesc.html(result.explanation);
		// toggle for image or video
		if (result.media_type == "video"){
			$nasaVideo.attr('src', result.url)
			$nasaImageResult.toggleClass('is-hidden');
		} else {
			$nasaImageResult.attr('src', result.url);
		};
		}
	});
};

$.ajax({
	url: nasaUrl,
	success: function(result){
	$nasaImageTitle.html(result.title);
	$nasaImageCopy.html(result.copyright);
	$nasaImageDesc.html(result.explanation);
	// toggle for image or video
	if (result.media_type == "video"){
		$nasaVideo.attr('src', result.url)
		$nasaImageResult.toggleClass('is-hidden');
	} else {
		$nasaImageResult.attr('src', result.url);
		$nasaVideo.toggleClass('is-hidden');
	};
	}
});
//toggle hide on description
app.descriptionShow = function(e){
	e.preventDefault();
	$("#nasaImageDesc").toggleClass('is-hidden');
	$("#nasaDesctiption").toggleClass('is-hidden');
};

$('.nasaDescWrap').on('click', app.descriptionShow);
$(".randomButton").on('click', app.generateRandom);




//Nat Geo
var NatGeoUrl = "https://natgeoapi.herokuapp.com/api/dailyphoto"
$.ajax({
	url: NatGeoUrl,
	success: function(result){
		$('#NatGeoImage').attr('src', result.src);
		$('#NatGeoDesc').html(result.alt);
		$('#NatGeoCredit').html(result.credit);
	}
});


//Google


//Guardian


//Reddit