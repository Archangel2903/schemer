import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper';
import 'lightgallery';

var jQueryBridget = require('jquery-bridget');
var Isotope = require('isotope-layout');
jQueryBridget('isotope', Isotope, $);

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');
});

$(function () {
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }

    let slider = new Swiper('.swiper-container', {
        observer: true,
        observerParents: true,
        // observeSlideChildren: true,
        nested: true,
        effect: 'slide',
        direction: 'horizontal',
        loop: true,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        /*scrollbar: {
            el: '.swiper-scrollbar',
        },*/
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        dynamicBullets: true,
    });

    slider.init();

    $(".lightgallery").lightGallery({
        download: false,
        fullscreen: true,
        thumbnail: true,
        animateThumb: false,
        showThumbByDefault: false
    });

    $(document).on('click', '.btn-burger', function (e) {
        $(this).toggleClass('active');
        $(this).next('.site-menu').toggleClass('active');
        e.stopPropagation();
    });

    $(document).on('click', function (e) {
        $('.btn-burger').removeClass('active');
        $('.site-menu').removeClass('active');
    });
});

$(function () {
// init Isotope
    var $grid = $('.gallery__grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
// filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };
// bind filter button click
    $('.filters-button-group').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });
// change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });

});