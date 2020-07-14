import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper';
import 'lightgallery';

const jQueryBridget = require('jquery-bridget');
const Isotope = require('isotope-layout');
const imagesLoaded = require('imagesloaded');
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

    if (slider.length) slider.init();

    $(".lightgallery").lightGallery({
        download: false,
        fullscreen: true,
        thumbnail: true,
        animateThumb: false,
        showThumbByDefault: false
    });

    $('.btn-burger').on('click', function (e) {
        $(this).toggleClass('active');
        $(this).next('.site-menu').toggleClass('active');
        e.stopPropagation();
    });

    $('.site-menu, .site-menu a').on('click', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', function (e) {
        $('.btn-burger').removeClass('active');
        $('.site-menu').removeClass('active');
    });

    const trailer_modal = $('#trailer-modal');
    trailer_modal.on('hide.bs.modal', function (e) {
        let source = $(this).find('iframe').attr('src');
        $(this).find('iframe').attr('src', ' ');
        $(this).find('iframe').data('source', source);
    });

    trailer_modal.on('show.bs.modal', function (e) {
        let source = $(this).find('iframe').data('source');
        $(this).find('iframe').attr('src', source);
    });
});

$(function () {
    imagesLoaded.makeJQueryPlugin($);

    /* Gallery Filter */
    var galleryFilter = $('.gallery__filter');
    var galleryGrid = $('.lightgallery');

    galleryGrid.imagesLoaded().done(function () {
        /*-- Filter List --*/
        galleryFilter.on('click', 'button', function () {
            galleryFilter.find('button').removeClass('is-checked');
            $(this).addClass('is-checked');
            var filterValue = $(this).attr('data-filter');

            galleryGrid.isotope({
                filter: filterValue
            });
        });

        galleryGrid.isotope({
            filter: galleryFilter.find('button.is-checked').attr('data-filter'),
            itemSelector: '.element-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.element-item'
            }
        });
    });

    setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
    }, 1000);
});
