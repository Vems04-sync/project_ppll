// Ambil elemen burger icon dan nav links dengan fallback id yang ada di HTML
const burgerIcon = document.getElementById('burger') || document.getElementById('burger-icon');
const navLinks = document.getElementById('nav-links') || document.getElementById('sidebar');

const MOBILE_BREAKPOINT = 1028; // harus sesuai dengan CSS media query

function openNav() {
  burgerIcon.classList.add('toggle');
  navLinks.classList.add('nav-active');
  navLinks.classList.remove('nav-close');
}

function closeNav() {
  burgerIcon.classList.remove('toggle');
  navLinks.classList.remove('nav-active');
  navLinks.classList.add('nav-close');
}

function isNavOpen() {
  return navLinks.classList.contains('nav-active');
}

// Pastikan elemen ada sebelum menambahkan event listener
if (burgerIcon && navLinks) {
  // Toggle saat burger diklik
  burgerIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isNavOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Tutup saat klik di luar menu pada tampilan mobile
  document.addEventListener('click', function (e) {
    const clickedInsideMenu = navLinks.contains(e.target) || burgerIcon.contains(e.target);
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    if (isMobile && isNavOpen() && !clickedInsideMenu) {
      closeNav();
    }
  });

  // Tutup saat salah satu link di menu diklik (untuk UX yang baik di mobile)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      if (isMobile) {
        closeNav();
      }
    });
  });

  // Reset state saat resize ke desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      burgerIcon.classList.remove('toggle');
      navLinks.classList.remove('nav-active', 'nav-close');
    }
  });
}
