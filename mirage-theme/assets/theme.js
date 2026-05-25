/**
 * Mirage Cosmetics — Theme JS v2.0
 */
(function () {
  'use strict';

  /* ============================================================
     Utilitaires
  ============================================================ */
  function $(selector, ctx) { return (ctx || document).querySelector(selector); }
  function $$(selector, ctx) { return Array.from((ctx || document).querySelectorAll(selector)); }

  /* ============================================================
     Header: Barre de recherche
  ============================================================ */
  var searchToggle = $('#search-toggle');
  var searchBar = $('#search-bar');
  var searchClose = $('#search-close');

  function openSearch() {
    if (!searchBar) return;
    searchBar.removeAttribute('hidden');
    searchToggle && searchToggle.setAttribute('aria-expanded', 'true');
    var input = searchBar.querySelector('.search-bar__input');
    if (input) setTimeout(function() { input.focus(); }, 50);
  }

  function closeSearch() {
    if (!searchBar) return;
    searchBar.setAttribute('hidden', '');
    searchToggle && searchToggle.setAttribute('aria-expanded', 'false');
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', function() {
      searchBar && searchBar.hasAttribute('hidden') ? openSearch() : closeSearch();
    });
  }
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  /* ============================================================
     Header: Menu mobile
  ============================================================ */
  var menuToggle = $('.site-header__menu-toggle');
  var mobileMenu = $('#mobile-menu');
  var mobileMenuClose = $('.mobile-menu__close');
  var cartOverlay = $('#cart-overlay');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.removeAttribute('hidden');
    mobileMenu.classList.add('open');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'true');
    cartOverlay && cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
    cartOverlay && cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(function() { mobileMenu.setAttribute('hidden', ''); }, 300);
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (cartOverlay) cartOverlay.addEventListener('click', closeMobileMenu);

  /* ============================================================
     Keyboard navigation
  ============================================================ */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearch();
      closeMobileMenu();
    }
  });

  /* ============================================================
     Sélecteur de quantité (générique)
  ============================================================ */
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.quantity-selector__btn');
    if (!btn) return;
    var action = btn.dataset.action;
    var input = btn.parentElement.querySelector('.quantity-selector__input');
    if (!input) return;
    var val = parseInt(input.value, 10) || 1;
    if (action === 'plus') val += 1;
    else if (action === 'minus') val = Math.max(0, val - 1);
    input.value = val;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ============================================================
     Page Produit: Miniatures
  ============================================================ */
  var thumbBtns = $$('.product-media__thumb');
  var mainImg = $('#main-product-image');

  thumbBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (mainImg && btn.dataset.src) {
        mainImg.style.opacity = '0';
        setTimeout(function() {
          mainImg.src = btn.dataset.src;
          mainImg.style.opacity = '1';
        }, 160);
      }
      thumbBtns.forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  /* ============================================================
     Page Produit: Variantes
  ============================================================ */
  var variantBtns = $$('.variant-btn');

  variantBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var optionIndex = btn.dataset.optionIndex;
      $$('.variant-btn[data-option-index="' + optionIndex + '"]').forEach(function(b) {
        b.classList.remove('variant-btn--selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('variant-btn--selected');
      btn.setAttribute('aria-pressed', 'true');
      var group = btn.closest('.product-variant-group');
      if (group) {
        var selectedSpan = group.querySelector('.product-variant-group__selected');
        if (selectedSpan) selectedSpan.textContent = btn.dataset.optionValue;
      }
    });
  });

  /* ============================================================
     Ajout au panier: Feedback visuel
  ============================================================ */
  var productForm = $('#product-form');
  if (productForm) {
    productForm.addEventListener('submit', function() {
      var addBtn = productForm.querySelector('.btn--add-to-cart');
      if (addBtn && !addBtn.disabled) {
        var orig = addBtn.innerHTML;
        addBtn.innerHTML = '<span>⏳ Ajout en cours...</span>';
        addBtn.disabled = true;
        setTimeout(function() {
          addBtn.innerHTML = '<span>✓ Ajouté au panier !</span>';
          addBtn.style.background = '#2d8a4e';
          setTimeout(function() {
            addBtn.innerHTML = orig;
            addBtn.style.background = '';
            addBtn.disabled = false;
          }, 2200);
        }, 700);
      }
    });
  }

  /* ============================================================
     Quick-add: Feedback visuel
  ============================================================ */
  document.addEventListener('submit', function(e) {
    var form = e.target;
    if (!form.classList.contains('product-card__quick-add')) return;
    var btn = form.querySelector('.product-card__add-btn');
    if (!btn) return;
    var orig = btn.innerHTML;
    btn.innerHTML = '✓ Ajouté !';
    btn.style.background = '#2d8a4e';
    btn.style.color = '#fff';
    btn.style.borderColor = '#2d8a4e';
    setTimeout(function() {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  });

  /* ============================================================
     Header: Classe scrolled
  ============================================================ */
  var siteHeader = $('.site-header--sticky');
  if (siteHeader) {
    window.addEventListener('scroll', function() {
      siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ============================================================
     Announcement bar: Auto-scroll (si plusieurs messages)
  ============================================================ */
  var announcementBar = $('.announcement-bar');
  if (announcementBar && announcementBar.children.length > 1) {
    var items = announcementBar.querySelectorAll('[data-announcement]');
    var current = 0;
    if (items.length > 1) {
      setInterval(function() {
        items[current].setAttribute('hidden', '');
        current = (current + 1) % items.length;
        items[current].removeAttribute('hidden');
      }, 4000);
    }
  }

  /* ============================================================
     Sort select: Redirect sur changement
  ============================================================ */
  var sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  /* ============================================================
     Smooth reveal d'éléments au scroll
  ============================================================ */
  if ('IntersectionObserver' in window) {
    var revealElements = $$('.product-card, .category-card, .testimonial-card, .trust-badge');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      observer.observe(el);
    });
  }

})();
