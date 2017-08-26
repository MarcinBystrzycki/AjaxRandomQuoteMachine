var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
	$.getJSON(prefix +quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });
}

function createTweet(input) {
	var data = input[0];

	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = "Unknown author";
	}

	var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
}


$(function() {
	getQuote();

	$('.trigger').click(function() {
		getQuote();
	});

	$('header, .div2').hide();
	$('header, .div2').fadeIn(1500);
	if ($(window).width() > 1200) {
		$('.trigger').animate({left: '38%'}, 500);
		$('.tweet').animate({right: '38%'}, 850);
	} else if ($(window).width() > 900) {
		$('.trigger').animate({left: '35%'}, 500);
		$('.tweet').animate({right: '35%'}, 850);
	} else if ($(window).width() > 525) {
		$('.trigger').animate({left: '25%'}, 500);
		$('.tweet').animate({right: '25%'}, 850);
	} else {
		$('.trigger').animate({left: '10%'}, 500);
		$('.tweet').animate({right: '10%'}, 850);
	}
	
});