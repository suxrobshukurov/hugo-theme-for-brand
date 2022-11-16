const tpl = `<ol class="lwptoc_itemWrap">{{contents}}</ol>`;
let contents = '';
const elHeaders = document.querySelectorAll('h2');
const elSubheader = document.querySelectorAll('h3');

elHeaders.forEach((el, index) => {
  if (!el.id) {
    el.id = `id-${index}`;
  }
  const url = `${location.href.split('#')[0]}#${el.id}`;
  contents += `<li class="lwptoc_item"><a href="#${el.id}" class="anchor-link"> 
      <span class="lwptoc_item_label">${el.textContent}</span> 
    </a>
  </li>`;
});

// lwptoc_items
if (document.querySelector('.lwptoc_items')) {
  document
    .querySelector('.lwptoc_items')
    .insertAdjacentHTML('afterbegin', tpl.replace('{{contents}}', contents));
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// $('a.anchor-link').click(function (t) {
//   t.preventDefault(),
//     (t = $(this).attr('href')),
//     console.log(t),
//     $('html,body').animate({ scrollTop: $(t).offset().top - 40 }, 'slow');
// });
// $("a[href='#top']").click(function () {
//   return $('html, body').animate({ scrollTop: 0 }, 'slow'), !1;
// });

const $header = document.querySelector('#main-nav');
const $sidebar = document.querySelector('.sidebar.is-sticky');
const sticky = $header.offsetTop;
const skinBtn = document.querySelector('.change-skin');
const menuBtn = document.querySelector('.tie-mobile-menu-icon');
const closeBtn = document.querySelector('.close-side-aside');
const tiaContainer = document.querySelector('#tie-container');
const allButtons = document.querySelectorAll('[data-link]');

menuBtn.addEventListener('click', () => {
  tiaContainer.classList.add('side-aside-open');
});
closeBtn.addEventListener('click', () => {
  tiaContainer.classList.remove('side-aside-open');
});

skinBtn.addEventListener('click', () => {
  document.querySelector('html').classList.toggle('dark-skin');
  document.querySelector('html').classList.toggle('tie-skin-inverted');
});

window.onscroll = function () {
  stickyHeader();
};

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    $header.classList.add('fixed-nav');
  } else {
    $header.classList.remove('fixed-nav');
  }
}

var sidebar = new StickySidebar('.sidebar', {
  topSpacing: 20,
  bottomSpacing: 20,
  containerSelector: '.main-content',
  innerWrapperSelector: '.theiaStickySidebar',
});

allButtons.forEach((btn) => {
  if (btn.hasAttribute('data-link')) {
    btn.addEventListener('mouseup', (e) => {
      window.open(e.target.dataset.link, '_blank');
    });
  } else {
    return;
  }
});
