$(document).ready(function(){

	//Slick
 	$('.toure__content-wrap').slick({
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


//Mask
	$(function(){
		$("input[name='phone']").mask("+38(999) 999-9999");
	});
	$(function(){
		$("input[name='name']").attr("pattern", ".{4,60}");
		$("input[name='name']").attr("oninvalid", "this.setCustomValidity('Мінімум 4 символи')");
	});
	$(function(){
		$("form").on("submit", function(e){
		  e.preventDefault();
		  var userName =$(this).find('input[name=name]').val();
		function toTitleCase(str)
		{
		    return str.replace(/\w\S*/g, function(txt){
		    	return txt.charAt(0).toUpperCase() + 
		    	txt.substr(1).toLowerCase();});
		}
		  var succsessMassege = toTitleCase(userName) + ', ви успішно підписались! ';
		alert(succsessMassege);
		})
	});



});

//Raiting
var rating = document.querySelector('.tour-item__raiting'),
    ratingItem = document.querySelectorAll('.tour-item__raiting-item');

rating.onclick = function(e){
  var target = e.target;
  if(target.classList.contains('tour-item__raiting-item')){
    removeClass(ratingItem,'tour-item__raiting-item--active')
    target.classList.add('tour-item__raiting-item--active');
  }
}

function removeClass(elements, className) {
  for (var i = 0; i < elements.length; i++) {
     elements[i].classList.remove(className);
  }
}