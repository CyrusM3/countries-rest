const header = document.querySelector('.header');
const sticky = header.offsetTop;

// Sticky header
function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

window.onscroll = function () {
  stickyHeader();
};

export { header };
