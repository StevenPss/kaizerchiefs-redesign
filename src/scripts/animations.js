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
    const preloaderClass = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('#logo');

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

    // Fixtures Area
    // const fixtureMonth = document.querySelectorAll('.fixtures__header');
    // const fixturesList = document.querySelectorAll('.fixtures-list');

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
    const preloaderTL = gsap.timeline();
    const headerTL = gsap.timeline({paused:true});
    // const fixturesTL = gsap.timeline();
    const standingsTableTL = gsap.timeline();
    const newsletterTL = gsap.timeline();
    const footerTL = gsap.timeline();

    const masterTL = gsap.timeline();


    // Preloader
    if(preloaderLogo && preloaderClass){
        preloaderTL.to(
            preloaderLogo, 
            {
                yPercent: -20,
                opacity: 0,
                delay: 4
            }).to(
            preloaderClass, 
            {
                transform: 'scaleY(0)', 
                transformOrigin: 'top', 
                delay: '-=3'
            }
        )
    }

    // Ball Cursor

    // gsap.set(".ball-cursor", {xPercent: -50, yPercent: -50});

    // const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // const mouse = { x: pos.x, y: pos.y };
    // const speed = 0.35;

    // const xSet = gsap.quickSetter(ballCursor, "x", "px");
    // const ySet = gsap.quickSetter(ballCursor, "y", "px");

    // window.addEventListener("mousemove", e => {    
    //     mouse.x = e.x;
    //     mouse.y = e.y;  
    // });

    // gsap.ticker.add(() => {
    //     // adjust speed for higher refresh monitors
    //     const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio()); 
        
    //     pos.x += (mouse.x - pos.x) * dt;
    //     pos.y += (mouse.y - pos.y) * dt;
    //     xSet(pos.x);
    //     ySet(pos.y);
    // });

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
    
    // Fixtures

    // fixturesTL.from(
    //     fixtureMonth,
    //     {
    //         duration: 0.6,
    //         y: 40,
    //         opacity: 0,
    //         ease: "power3.out",
    //         stagger: 0.2
    //     }
    // ).from(
    //     fixturesList,
    //     {
    //         duration: 0.6,
    //         delay: -0.4,
    //         y: 40,
    //         opacity: 0,
    //         ease: "power3.out",
    //         stagger: 0.2
    //     }
    // )

    // // fixtures scroll trigger
    // ScrollTrigger.create({
    //     autoAlpha: 0,
    //     trigger: ".fixtures",
    //     scroller: "[data-scroll-container]",
    //     start: "0% 60%",
    //     end: "+=300",
    //     // scrub: true,
    //     // markers: true,
    //     animation: fixturesTL
    // });

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
                    autoAlpha: 0,
                    trigger: merch,
                    scroller: "[data-scroll-container]",
                    start: "0% 60%",
                    end: "+=300",
                    scrub: true,
                    // markers: true,
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
                    stagger: 0.3
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

    if(preloaderClass && preloaderLogo){
        masterTL
        .add(preloaderTL)
        .add(headerTL.play())
        // .add(fixturesTL)
        .add(standingsTableTL);
    }else{
        headerTL.play();
    }
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};
  
export default animations;
  