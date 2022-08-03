/* ========================================================================= */
/*	Preloader
/* ========================================================================= */

jQuery(window).load(function(){

	$("#preloader").fadeOut("slow");

});


$(document).ready(function(){

	/* ========================================================================= */
	/*	Menu item highlighting
	/* ========================================================================= */

	jQuery('#nav').singlePageNav({
		offset: jQuery('#nav').outerHeight(),
		filter: ':not(.external)',
		speed: 1200,
		currentClass: 'current',
		easing: 'easeInOutExpo',
		updateHash: true,
		beforeStart: function() {
			console.log('begin scrolling');
		},
		onComplete: function() {
			console.log('done scrolling');
		}
	});

    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#navigation").css("background-color","#0EB493");
        } else {
            $("#navigation").css("background-color","rgba(16, 22, 54, 0.2)");
        }
    });

	/* ========================================================================= */
	/*	Fix Slider Height
	/* ========================================================================= */

	var slideHeight = $(window).height();

	$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#slider, .carousel.slide, .carousel-inner, .carousel-inner .item').css('height',slideHeight);
	});


	/* ========================================================================= */
	/*	Portfolio Filtering
	/* ========================================================================= */


    // portfolio filtering

    $(".project-wrapper").mixItUp();


	$(".fancybox").fancybox({
		padding: 0,

		openEffect : 'elastic',
		openSpeed  : 650,

		closeEffect : 'elastic',
		closeSpeed  : 550,

		closeClick : true,
	});

	/* ========================================================================= */
	/*	Parallax
	/* ========================================================================= */

	$('#facts').parallax("50%", 0.3);

	/* ========================================================================= */
	/*	Timer count
	/* ========================================================================= */

	"use strict";
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 50,
                to: e,
                speed: 3e3,
                refreshInterval: 50
            })
        })
    });

	/* ========================================================================= */
	/*	Back to Top
	/* ========================================================================= */


    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#back-top").fadeIn(200)
        } else {
            $("#back-top").fadeOut(200)
        }
    });
    $("#back-top").click(function () {
        $("html, body").stop().animate({
            scrollTop: 0
        }, 1500, "easeInOutExpo")
    });

});


// ==========  START GOOGLE MAP ========== //
function initialize() {
    var myLatLng = new google.maps.LatLng(22.402789, 91.822156);

    var mapOptions = {
        zoom: 14,
        center: myLatLng,
        disableDefaultUI: true,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'roadatlas']
        }
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'img/location-icon.png',
        title: '',
    });

}

google.maps.event.addDomListener(window, "load", initialize);
// ========== END GOOGLE MAP ========== //

// ========== PARTICAL ========== //
var canvas = document.querySelector("#scene"),
    ctx = canvas.getContext("2d"),
    particles = [],
    amount = 0,
    mouse = {x:0,y:0},
    radius = 1;

var colors = ["#26d7a2","#FFF0A5", "#ffd401","#ff3dc9", "#1f93ff"];

var copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x,y){
    this.x =  Math.random()*ww;
    this.y =  Math.random()*wh;
    this.dest = {
        x : x,
        y: y
    };
    this.r =  Math.random()*5 + 2;
    this.vx = (Math.random()-0.5)*20;
    this.vy = (Math.random()-0.5)*20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random()*0.05 + 0.94;

    this.color = colors[Math.floor(Math.random()*6)];
}

Particle.prototype.render = function() {


    this.accX = (this.dest.x - this.x)/1000;
    this.accY = (this.dest.y - this.y)/1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y +=  this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    var a = this.x - mouse.x;
    var b = this.y - mouse.y;

    var distance = Math.sqrt( a*a + b*b );
    if(distance<(radius*70)){
        this.accX = (this.x - mouse.x)/100;
        this.accY = (this.y - mouse.y)/100;
        this.vx += this.accX;
        this.vy += this.accY;
    }

}

function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchMove(e){
    if(e.touches.length > 0 ){
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}

function onTouchEnd(e){
    mouse.x = -9999;
    mouse.y = -9999;
}

function initScene(){
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold "+(ww/10)+"px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(copy.value, ww/2, wh/2);

    var data  = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    particles = [];
    for(var i=0;i<ww;i+=Math.round(ww/150)){
        for(var j=0;j<wh;j+=Math.round(ww/150)){
            if(data[ ((i + j*ww)*4) + 3] > 150){
                particles.push(new Particle(i,j));
            }
        }
    }
    amount = particles.length;

}

function onMouseClick(){
    radius++;
    if(radius ===5){
        radius = 0;
    }
}

function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);
// ========== END PARTICAL ========== //