// Import all plugins
import * as bootstrap from 'bootstrap'; 
import '@fortawesome/fontawesome-free/css/all.css';

// Usage: datatables
import '../js/load.dataTables';



let el_jsMainNav = document.querySelector('.js-main-nav');

if(el_jsMainNav){
    var last_scroll_top = 0;
    window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
         if(scroll_top < last_scroll_top) {
              el_jsMainNav.classList.remove('scrolled-down');
              el_jsMainNav.classList.remove('bg-transparent');
              el_jsMainNav.classList.add('scrolled-up');
              el_jsMainNav.classList.add('bg-dark');
          }
          else {
              el_jsMainNav.classList.remove('scrolled-up');
              el_jsMainNav.classList.add('scrolled-down');
          }

          if (scroll_top == 0) {
              el_jsMainNav.classList.add('bg-transparent');
          }
          last_scroll_top = scroll_top;
    }); 
}