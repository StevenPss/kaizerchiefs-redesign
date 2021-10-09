import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animations = () => {
    //Locomotive scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: { smooth: false },
        tablet: { smooth: false },
        // getDirection: true
    });

    gsap.config({
        nullTargetWarn: false // don't display warnings
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "[data-scroll-container]" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    const preloaderPercent = document.querySelector('.preloader #percent');
    const preloaderBar = document.querySelector('.preloader #bar');
    const preloaderBarCon = document.querySelector('.preloader #bar #barconfrm');
    const firstChild = 1;
    const lastChild = 2;
    const boxFC = document.querySelector(`.preloader .box:nth-child(${firstChild})`);
    const boxLC = document.querySelector(`.preloader .box:nth-child(${lastChild})`);

    //[TODO run the preloader using gsap instead of css]

    // Cursor
    // const ballCursor = document.querySelector('.ball-cursor');

    // navbar
    const navbar = document.querySelector('.js-main-nav');
    // alert
    const alertNotification = document.querySelector('.covid-19-information');
    // carousel content
    const carouselh2 = document.querySelectorAll('.featured-article .featured-article__title');
    const carouselbtn = document.querySelectorAll('.featured-article .featured-article__btn');
    const carouselControls = document.querySelectorAll('.carousel-controls');
    const carouselItem = document.querySelectorAll('.carousel-item');
     // Standings Area
    const standingsTableH2 = document.querySelectorAll('.standings-wrapper h2');
    const standingsTableHead = document.querySelectorAll('#teamStandingsTable thead tr');
    const standingsTableBody = document.querySelectorAll('#teamStandingsTable tbody tr');
    // Newsletter Area
    const newsletterTitle = document.querySelectorAll('.newsletter__header .newsletter__title');
    const newsletterSubTitle = document.querySelectorAll('.newsletter__header .newsletter__subtitle');
    const newsletterFormGrp = document.querySelectorAll('#newsletter__form');
    // Footer Area
    const footerSponserLi = document.querySelectorAll('.footer__sponsors-list');
    const footerSponserDiv = document.querySelectorAll('.footer__sitemap');
    // Timelines
    const preloaderTL = gsap.timeline({paused:true});
    const headerTL = gsap.timeline({paused:true});
    // const fixturesTL = gsap.timeline();
    const standingsTableTL = gsap.timeline();
    const newsletterTL = gsap.timeline();
    const footerTL = gsap.timeline();
    const masterTL = gsap.timeline();

    // Preloader
    var animPlayed = localStorage.getItem("loadingAnimPlayed");
    if(!animPlayed){
        if(preloader && preloaderPercent && preloaderBar){
            preloaderTL.to(
                [preloaderPercent,preloaderBar],
                {
                    duration: 0.2,
                    opacity: 0,
                    zIndex: -1
                }
            ).to(
                boxFC,
                {
                    duration: 1.2,
                    y: "-50vh",
                    stagger: 0.3
                },
                'start'
            ).to(
                boxLC,
                {
                    duration: 1.2,
                    y: "50vh",
                    stagger: 0.3
                },
                'start'
            ).from(
                preloader,
                {
                    duration: 0.2,
                    opacity: 1,
                    visibility: 'visible'
                }
            ).from(
                carouselItem,
                {
                    duration: 1.4,
                    scale: 1.6,
                    ease: "power2.easeInOut",
                    delay: -1.4,
                    onComplete() {
                        localStorage.setItem("loadingAnimPlayed", true)
                    }
                }
            )
    
            let width = 1;
            let id;
            let move = () =>{
                id = setInterval(frame,10);
            }
            let frame = () => {
                if(width>=100){
                    clearInterval(id);
                    masterTL
                    .add(preloaderTL.play())
                    .add(headerTL.play())
                    .add(standingsTableTL);
                }
                else{
                    width++;
                    preloaderBarCon.style.width = width + "%";
                    preloaderPercent.innerHTML = width + "%";
                }
            }
            window.onload = function (){move();};
        }
    }else{
        preloaderTL.to(
            preloader,
            {   
                duration: 0,
                opacity:0, 
                display:"none"
            }
        )
        masterTL
        .add(preloaderTL.play())
        .add(headerTL.play())
        .add(standingsTableTL);
    }
    // window.onbeforeunload = function (){localStorage.clear();};
    // Header
    if(navbar || (carouselh2 && carouselbtn && carouselControls) || alertNotification){
        headerTL.from(
            navbar,
            {
                duration: 0.7,
                y: -30,
                opacity: 0,
                ease: "power3.inOut"
            }
        ).from(
            [carouselh2, carouselbtn],
            {
                duration: 0.8,
                delay: -0.4,
                y: 80,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.1
            }
        ).from(
            carouselControls,
            {
                duration: 0.8,
                delay: -0.8,
                y: -40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        ).from(
            alertNotification,
            {
                duration: 0.8,
                delay: -0.8,
                x: 60,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        )
    }
    // Toggle navbar based on scroll direction [navbar]
    if(navbar){
        const showAnim = gsap.from(navbar, { 
            yPercent: -100,
            paused: true,
            duration: 0.2,
        }).progress(1);

        ScrollTrigger.create({
            scroller: "[data-scroll-container]",
            start: "top top",
            end: "100%",
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });  
    }      
    // Merch
    const merch = document.querySelectorAll('.merch');
    if(merch){
        gsap.utils.toArray(merch).forEach((merch) => {
            // Merch Area
            const merchPromoP = merch.querySelectorAll('.merch__promo div p');
            const merchPromoA = merch.querySelectorAll('.merch__promo div a');
            const merchImg = merch.querySelectorAll('.merch__img');
    
            var merchTL = gsap.timeline({
                scrollTrigger:{
                    // autoAlpha: 0,
                    trigger: merch,
                    scroller: "[data-scroll-container]",
                    start: "0% 60%",
                    end: "+=300",
                    animation: merchTL
                }
            });
    
            merchTL.from(
                merchPromoP,
                {
                    duration: 0.8,
                    x: -80,
                    opacity: 0,
                    ease: "power3.out"
                }
            ).from(
                merchPromoA,
                {
                    duration: 0.8,
                    delay: -0.7,
                    x: 40,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.2
                }
            ).from(
                merchImg,
                {
                    duration: 0.6,
                    delay: -0.6,
                    x: 40,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.2
                }
            )
        });
    }
    // Standings
    if(standingsTableH2 || (standingsTableHead && standingsTableBody)){
        standingsTableTL.from(
            standingsTableH2,
            {
                duration: 0.6,
                y: 40,
                opacity: 0,
                ease: "power3.out"
            }
        ).from(
            standingsTableHead,
            {
                duration: 0.6,
                delay: -0.5,
                y: 40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        ).from(
            standingsTableBody,
            {
                duration: 0.8,
                delay: -0.1,
                y: 40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.3
            }
        )
    }
    // Latest Addition
    const latestAddition = document.querySelectorAll('.latest-addition');
    if(latestAddition){
        gsap.utils.toArray(latestAddition).forEach((latestAddition) => {
            // Latest Addition Area
            const latestAdditionH2 = latestAddition.querySelectorAll('h2');
            const latestAdditionCard = latestAddition.querySelectorAll('.latest-addition__card');
    
            var latestAdditionTL = gsap.timeline({
                scrollTrigger:{
                    autoAlpha: 0,
                    trigger: latestAddition,
                    scroller: "[data-scroll-container]",
                    start: "0% 50%",
                    end: "+=600",
                    // markers: true,
                    animation: latestAdditionTL
                }
            });
    
            latestAdditionTL.from(
                latestAdditionH2,
                {
                    duration: 0.6,
                    y: 40,
                    opacity: 0,
                    ease: "power3.out"
                }
            ).from(
                latestAdditionCard,
                {
                    duration: 1.3,
                    delay: -0.3,
                    y: 65,
                    opacity: 0,
                    ease: "expo.out",
                    stagger: 0.13
                }
            )
        });
    }
    // Newsletter
    if(newsletterTitle && newsletterSubTitle && newsletterFormGrp){
        newsletterTL.from(
            newsletterTitle,
            {
                duration: 0.6,
                y: 40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        ).from(
            newsletterSubTitle,
            {
                duration: 0.6,
                delay: -0.5,
                y: 40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        ).from(
            newsletterFormGrp,
            {
                duration: 0.6,
                delay: -0.5,
                y: 60,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        )

        // newsletter scroll trigger
        ScrollTrigger.create({
            autoAlpha: 0,
            trigger: ".newsletter",
            scroller: "[data-scroll-container]",
            start: "0% 40%",
            end: "+=300",
            // markers: true,
            animation: newsletterTL
        });
    }
    // Footer
    if(footerSponserLi && footerSponserDiv){
        footerTL.from(
            footerSponserLi,
            {
                duration: 0.8,
                x: -80,
                opacity: 0,
                ease: "power3.out"
            }
        ).from(
            footerSponserDiv,
            {
                duration: 0.6,
                delay: -0.6,
                x: 40,
                opacity: 0,
                ease: "power3.out",
                stagger: 0.2
            }
        )

        // footer scroll trigger
        ScrollTrigger.create({
            autoAlpha: 0,
            trigger: "#footer",
            scroller: "[data-scroll-container]",
            start: "0% 45%",
            end: "+=300",
            // markers: true,
            animation: footerTL
        });
    }

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
};
  
export default animations;
  