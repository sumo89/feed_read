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
//Reddit
app.redditAdd = function(e){
	var searchWord = $('#redditSearch').val();
		$.ajax({
			url: "https://www.reddit.com/r/pics/search.json?q=" + searchWord + "&sort=new&restrict_sr=on&t=all",
			success: function(result){
				for (var i = 0; i < 5; i++){
					var searchResultImage = result.data.children[i].data.preview.images[0].source.url;
					$('#redditImageWrap').addClass('hasImages')
					$('#redditImageWrap').append('<img class="redditImage" src=' + searchResultImage + '>');
				};
			}
		});
};
app.redditSearch = function(e){
	e.preventDefault();
	if($('#redditImageWrap').hasClass('hasImages')){
		$('.redditImage').remove();
		app.redditAdd();
	} else {
		app.redditAdd();
	};
};
app.redditClear = function(e){
	e.preventDefault();
	$('.redditImage').remove();
};
$('#redditSubmit').on('click', app.redditSearch);

// "https://www.reddit.com/r/pics/search.json?q=kittens&sort=new"

//Guardian
// 4aae3122-5e4e-414b-8341-7a81419b19e5
//http://content.guardianapis.com/search?from-date=2016-07-01&api-key=
// top newest news articles
// webTitle - title
// sectionName - type of news
// webUrl - link

var getDate = new Date();
var month = getDate.getMonth()+1;
var day = getDate.getDate();

var dateOutput = getDate.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
var guardianUrl = "http://content.guardianapis.com/search?from-date=" + dateOutput + "&api-key=4aae3122-5e4e-414b-8341-7a81419b19e5";
$.ajax({
	url: guardianUrl,
	success: function(result){
		var resultsRe = result.response.results;

		$.each(resultsRe, function(key, value){
			resultsRe.val = value;
			var linkButton = '<div class="guardianLink"><a href="' + resultsRe.val.webUrl + '"</a> View on The Guardian</div>';
			console.log("link-> " + linkButton);
			$('#guardianWrap').append("<div class='guardianTitle'>" + resultsRe.val.webTitle + "</div>" + "<div class='guardianSection'>" + resultsRe.val.sectionName + "</div>" + linkButton);
		});
	}
// response - results (array) - webTitle - sectionName - webUrl
});


