/**
 * Mirage Cosmetics — Theme JS
 */

(function () {
  'use strict';

  // ============================================================
  // Header: Toggle de recherche
  // ============================================================
  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  const searchClose = document.getElementById('search-close');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', function () {
      const isHidden = searchBar.hasAttribute('hidden');
      if (isHidden) {
        searchBar.removeAttribute('hidden');
        searchBar.querySelector('.search-bar__input')?.focus();
        searchToggle.setAttribute('aria-expanded', 'true');
      } else {
        searchBar.setAttribute('hidden', '');
        searchToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (searchClose && searchBar) {
    searchClose.addEventListener('click', function () {
      searchBar.setAttribute('hidden', '');
      if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Fermer la recherche avec Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchBar && !searchBar.hasAttribute('hidden')) {
      searchBar.setAttribute('hidden', '');
      if (searchToggle) {
        searchToggle.setAttribute('aria-expanded', 'false');
        searchToggle.focus();
      }
    }
  });

  // ============================================================
  // Header: Menu mobile
  // ============================================================
  const menuToggle = document.querySelector('.site-header__menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu__close');
  const cartOverlay = document.getElementById('cart-overlay');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.removeAttribute('hidden');
    menuToggle?.setAttribute('aria-expanded', 'true');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.setAttribute('hidden', '');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (cartOverlay) cartOverlay.addEventListener('click', closeMobileMenu);

  // ============================================================
  // Sélecteur de quantité (générique)
  // ============================================================
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.quantity-selector__btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const input = btn.parentElement.querySelector('.quantity-selector__input');
    if (!input) return;

    let val = parseInt(input.value, 10) || 1;
    if (action === 'plus') {
      val += 1;
    } else if (action === 'minus') {
      val = Math.max(0, val - 1);
    }
    input.value = val;

    // Déclencher change pour mise à jour prix
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // ============================================================
  // Page Produit: Miniatures d'images
  // ============================================================
  const thumbBtns = document.querySelectorAll('.product-media__thumb');
  const mainImg = document.getElementById('main-product-image');

  thumbBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const newSrc = btn.dataset.src;
      if (mainImg && newSrc) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 150);
      }
      thumbBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  // ============================================================
  // Page Produit: Variantes
  // ============================================================
  const variantBtns = document.querySelectorAll('.variant-btn');
  const variantIdInput = document.getElementById('variant-id');

  if (variantBtns.length > 0) {
    // Données des variantes encodées dans la page (Shopify standard)
    const productJSON = document.getElementById('product-json');
    let productData = null;
    if (productJSON) {
      try { productData = JSON.parse(productJSON.textContent); } catch (e) {}
    }

    variantBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const optionIndex = parseInt(btn.dataset.optionIndex, 10);
        const optionValue = btn.dataset.optionValue;

        // Mise à jour sélection visuelle
        document.querySelectorAll(`.variant-btn[data-option-index="${optionIndex}"]`).forEach(function (b) {
          b.classList.remove('variant-btn--selected');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('variant-btn--selected');
        btn.setAttribute('aria-pressed', 'true');

        // Mise à jour du label
        const group = btn.closest('.product-variant-group');
        if (group) {
          const selectedSpan = group.querySelector('.product-variant-group__selected');
          if (selectedSpan) selectedSpan.textContent = optionValue;
        }
      });
    });
  }

  // ============================================================
  // Ajout au panier via form (feedback UX)
  // ============================================================
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', function (e) {
      const addBtn = productForm.querySelector('.btn--add-to-cart');
      if (addBtn) {
        const originalText = addBtn.innerHTML;
        addBtn.innerHTML = '<span>Ajout en cours...</span>';
        addBtn.disabled = true;
        setTimeout(function () {
          addBtn.innerHTML = '<span>✓ Ajouté au panier</span>';
          setTimeout(function () {
            addBtn.innerHTML = originalText;
            addBtn.disabled = false;
          }, 2000);
        }, 600);
      }
    });
  }

  // ============================================================
  // Header sticky: classe au scroll
  // ============================================================
  const siteHeader = document.querySelector('.site-header--sticky');
  if (siteHeader) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY > 60) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ============================================================
  // Lazy load images polyfill (navigateurs sans support natif)
  // ============================================================
  if ('IntersectionObserver' in window) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    });
    lazyImgs.forEach(function (img) { observer.observe(img); });
  }

})();
