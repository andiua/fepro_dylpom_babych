$(document).ready(function(){
 	$('.toure__content-wrap').slick({
  // dots: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: false,
	arrows: true,	
	responsive: [
		{
			breakpoint: 1299,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 739,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 479,
			settings: {
				slidesToShow: 1,
			}
		}
	]
	});
	$('.feedback__wrap').slick({
  	dots: true,
	slidesToShow: 2,
	slidesToScroll: 1,
	autoplay: true,
	speed: 1000,
	responsive: [
		{
			breakpoint: 479,
			settings: {
				slidesToShow: 1
			}
		}
	]
	});
});

