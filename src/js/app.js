import {settings, select, classNames} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';

const app = {
  initPages: function(){
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for(let page of thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for(let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* chang URL hash */
        window.location.hash = '#/' + id;
      })
    }
  },

  activatePage: function(pageId){
    const thisApp = this;

    /* add class "active" to matching page, remove from non-matching */

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links, remove from non-matching */

    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
        );
    }
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.products;

    fetch(url)
    .then(function(rawResponse){
      return rawResponse.json();
    })
    .then(function(parsedResponse){
      // console.log('parsedResponse:', parsedResponse);

      thisApp.data.products = parsedResponse;

      thisApp.initMenu();
    })
      
    // console.log('thisApp.data:', JSON.stringify(thisApp.data));
  },
  
  initMenu: function(){
    const thisApp = this;

    // console.log('thisApp.data:', thisApp.data);

    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    })
  },

  initBooking: function(){
    const thisApp = this;

    const bookingContainer = document.querySelector(select.containerOf.booking);

    thisApp.booking = new Booking(bookingContainer);
  },

  initHome: function(){
    const thisApp = this;

    const homeContainer = document.querySelector(select.containerOf.home);

    thisApp.home = new Home(homeContainer);

    thisApp.order = document.querySelector(select.containerOf.orderBox);
    thisApp.booking = document.querySelector(select.containerOf.bookBox);

    thisApp.order.addEventListener('click', function(event){
      event.preventDefault();
      const clickedElement = event.target;
      const getId = clickedElement.getAttribute("id");
      if(clickedElement.getAttribute('name') === 'order-box'){
        thisApp.activatePage(getId); thisApp.activatePage(getId);
      }
    })

    thisApp.booking.addEventListener('click', function(event){
      event.preventDefault();
      const clickedElement = event.target;
      const getId = clickedElement.getAttribute("id");
      if(clickedElement.getAttribute('name') === 'booking-box'){
        thisApp.activatePage(getId);
      }
    })
  },

  init: function(){
    const thisApp = this;
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);

    thisApp.initData();
    thisApp.initCart();
    thisApp.initPages();
    thisApp.initBooking();
    thisApp.initHome();
  },
};

app.init();