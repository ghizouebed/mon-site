/**
 * Mirage Cosmetics — Theme JS v3.0
 * Zero-bug edition
 */
(function () {
  'use strict';

  /* ============================================================
     Utilitaires
  ============================================================ */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function on(el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts || false); }

  /**
   * Formate un montant en centimes selon le format monétaire Shopify
   * Ex: moneyFormat = "{{ amount }} DA", price = 3500 → "35.00 DA"
   */
  function formatMoney(cents, moneyFormat) {
    if (!moneyFormat || isNaN(cents)) return '';
    var amount = (cents / 100).toFixed(2);
    var amountNoDecimal = String(Math.round(cents / 100));
    var amountWithComma = amount.replace('.', ',');
    return moneyFormat
      .replace('{{amount}}', amount)
      .replace('{{amount_no_decimals}}', amountNoDecimal)
      .replace('{{amount_with_comma_separator}}', amountWithComma)
      .replace('{{amount_no_decimals_with_comma_separator}}', amountNoDecimal);
  }

  /* ============================================================
     Header: Barre de recherche
  ============================================================ */
  var searchToggle = $('#search-toggle');
  var searchBar = $('#search-bar');
  var searchClose = $('#search-close');

  function openSearch() {
    if (!searchBar) return;
    searchBar.removeAttribute('hidden');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'true');
    var input = searchBar.querySelector('.search-bar__input');
    if (input) { setTimeout(function () { input.focus(); }, 60); }
  }

  function closeSearch() {
    if (!searchBar) return;
    searchBar.setAttribute('hidden', '');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
  }

  on(searchToggle, 'click', function () {
    searchBar && searchBar.hasAttribute('hidden') ? openSearch() : closeSearch();
  });
  on(searchClose, 'click', closeSearch);

  /* ============================================================
     Header: Menu mobile
  ============================================================ */
  var menuToggle = $('.site-header__menu-toggle');
  var mobileMenu = $('#mobile-menu');
  var mobileMenuClose = $('.mobile-menu__close');
  var cartOverlay = $('#cart-overlay');

  function openMobileMenu() {
    if (!mobileMenu) return;
    // Supprimer hidden AVANT d'ajouter open pour permettre la transition CSS
    mobileMenu.removeAttribute('hidden');
    // Forcer un reflow pour que la transition s'applique
    void mobileMenu.offsetHeight;
    mobileMenu.classList.add('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Attendre la fin de la transition CSS (300ms) avant de cacher
    setTimeout(function () {
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.setAttribute('hidden', '');
      }
    }, 320);
  }

  on(menuToggle, 'click', openMobileMenu);
  on(mobileMenuClose, 'click', closeMobileMenu);
  on(cartOverlay, 'click', closeMobileMenu);

  /* ============================================================
     Keyboard: Escape ferme search + menu
  ============================================================ */
  on(document, 'keydown', function (e) {
    if (e.key === 'Escape') {
      closeSearch();
      if (mobileMenu && mobileMenu.classList.contains('open')) closeMobileMenu();
    }
  });

  /* ============================================================
     Sélecteur de quantité (générique)
  ============================================================ */
  on(document, 'click', function (e) {
    var btn = e.target.closest('.quantity-selector__btn');
    if (!btn) return;
    var action = btn.dataset.action;
    var input = btn.parentElement ? btn.parentElement.querySelector('.quantity-selector__input') : null;
    if (!input) return;
    var val = parseInt(input.value, 10) || 1;
    var max = parseInt(input.max, 10) || 99;
    var min = parseInt(input.min, 10) || 0;
    if (action === 'plus') val = Math.min(max, val + 1);
    else if (action === 'minus') val = Math.max(min, val - 1);
    input.value = val;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ============================================================
     PAGE PRODUIT: Variantes + Prix + Disponibilité
  ============================================================ */
  var productJsonEl = $('#product-json');

  if (productJsonEl) {
    var productData = null;
    try { productData = JSON.parse(productJsonEl.textContent); } catch (e) { productData = null; }

    if (productData && productData.variants && productData.variants.length) {

      var moneyFormat = productData.moneyFormat || '{{ amount }} DA';
      var variantBtns = $$('.variant-btn');

      // Obtenir les options actuellement sélectionnées depuis les boutons marqués "selected"
      var selectedOptions = [];
      $$('.product-variant-group').forEach(function (group, i) {
        var activeBtn = group.querySelector('.variant-btn--selected');
        selectedOptions[i] = activeBtn ? activeBtn.dataset.optionValue : null;
      });

      /**
       * Trouver la variante correspondant aux options sélectionnées
       */
      function findVariant(opts) {
        return productData.variants.find(function (v) {
          return opts.every(function (opt, idx) {
            return opt === null || v.options[idx] === opt;
          });
        }) || null;
      }

      /**
       * Mettre à jour l'interface selon la variante choisie
       */
      function updateProductUI(variant) {
        if (!variant) return;

        // 1. Mettre à jour l'ID dans le formulaire
        var variantIdInput = $('#variant-id');
        if (variantIdInput) variantIdInput.value = variant.id;

        // 2. Mettre à jour le prix
        var priceContainer = $('#product-price');
        if (priceContainer) {
          if (variant.compareAtPrice > variant.price && variant.compareAtPrice > 0) {
            var saving = Math.round((variant.compareAtPrice - variant.price) * 100 / variant.compareAtPrice);
            priceContainer.innerHTML =
              '<span class="price price--sale" id="price-sale">' + formatMoney(variant.price, moneyFormat) + '</span>' +
              '<span class="price price--compare" id="price-compare">' + formatMoney(variant.compareAtPrice, moneyFormat) + '</span>' +
              '<span class="price-badge" id="price-badge">-' + saving + '%</span>';
          } else {
            priceContainer.innerHTML =
              '<span class="price" id="price-regular">' + formatMoney(variant.price, moneyFormat) + '</span>';
          }
        }

        // 3. Mettre à jour le bouton "Ajouter au panier"
        var addBtn = $('#add-to-cart-btn');
        var addBtnText = $('#add-to-cart-text');
        if (addBtn && addBtnText) {
          if (variant.available) {
            addBtn.disabled = false;
            addBtn.classList.remove('btn--disabled');
            addBtnText.textContent = 'Ajouter au panier';
          } else {
            addBtn.disabled = true;
            addBtn.classList.add('btn--disabled');
            addBtnText.textContent = 'Rupture de stock';
          }
        }

        // 4. Mettre à jour le badge de stock
        var stockEl = $('#product-stock');
        if (stockEl) {
          stockEl.innerHTML = variant.available
            ? '<span class="stock-badge stock-badge--in">✓ En stock</span>'
            : '<span class="stock-badge stock-badge--out">Rupture de stock</span>';
        }

        // 5. Mettre à jour l'image si la variante a une image spécifique
        if (variant.featuredImage) {
          var mainImg = $('#main-product-image');
          if (mainImg) {
            mainImg.style.opacity = '0';
            setTimeout(function () {
              mainImg.src = variant.featuredImage;
              mainImg.style.opacity = '1';
            }, 160);
          }
        }

        // 6. Mettre à jour l'URL sans rechargement
        if (window.history && window.history.replaceState) {
          var url = new URL(window.location.href);
          url.searchParams.set('variant', variant.id);
          window.history.replaceState({}, '', url.toString());
        }
      }

      // Gestionnaire de clic sur les boutons variante
      variantBtns.forEach(function (btn) {
        on(btn, 'click', function () {
          var optionIndex = parseInt(btn.dataset.optionIndex, 10);
          var optionValue = btn.dataset.optionValue;

          // Mettre à jour la sélection visuelle pour ce groupe d'options
          $$('.variant-btn[data-option-index="' + optionIndex + '"]').forEach(function (b) {
            b.classList.remove('variant-btn--selected');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('variant-btn--selected');
          btn.setAttribute('aria-pressed', 'true');

          // Mettre à jour le label affiché
          var group = btn.closest('.product-variant-group');
          if (group) {
            var labelSpan = group.querySelector('.product-variant-group__selected');
            if (labelSpan) labelSpan.textContent = optionValue;
          }

          // Mettre à jour l'option sélectionnée
          selectedOptions[optionIndex] = optionValue;

          // Trouver et appliquer la nouvelle variante
          var newVariant = findVariant(selectedOptions);

          // Si pas de variante exacte, trouver la plus proche disponible
          if (!newVariant) {
            newVariant = productData.variants.find(function (v) {
              return v.options[optionIndex] === optionValue;
            }) || productData.variants[0];
            // Mettre à jour selectedOptions pour qu'ils correspondent à la variante trouvée
            if (newVariant) {
              newVariant.options.forEach(function (opt, idx) {
                selectedOptions[idx] = opt;
                // Mettre à jour visuellement les autres groupes
                $$('.variant-btn[data-option-index="' + idx + '"]').forEach(function (b) {
                  var isSelected = b.dataset.optionValue === opt;
                  b.classList.toggle('variant-btn--selected', isSelected);
                  b.setAttribute('aria-pressed', String(isSelected));
                });
                var grp = $('.product-variant-group[data-option-index="' + idx + '"]');
                if (grp) {
                  var lbl = grp.querySelector('.product-variant-group__selected');
                  if (lbl) lbl.textContent = opt;
                }
              });
            }
          }

          if (newVariant) updateProductUI(newVariant);
        });
      });
    }
  }

  /* ============================================================
     PAGE PRODUIT: Miniatures d'images
  ============================================================ */
  var thumbBtns = $$('.product-media__thumb');
  var mainImg = $('#main-product-image');

  thumbBtns.forEach(function (btn) {
    on(btn, 'click', function () {
      var newSrc = btn.dataset.src;
      if (mainImg && newSrc) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
        }, 160);
      }
      thumbBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });

    on(btn, 'keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  /* ============================================================
     PAGE PRODUIT: Feedback ajout au panier
  ============================================================ */
  var productForm = $('#product-form');
  if (productForm) {
    on(productForm, 'submit', function () {
      var addBtn = $('#add-to-cart-btn');
      var addBtnText = $('#add-to-cart-text');
      if (addBtn && !addBtn.disabled && addBtnText) {
        var origText = addBtnText.textContent;
        var origBg = addBtn.style.background;
        addBtnText.textContent = '⏳ Ajout en cours…';
        addBtn.disabled = true;
        setTimeout(function () {
          addBtnText.textContent = '✓ Ajouté au panier !';
          addBtn.style.background = '#1a7a40';
          setTimeout(function () {
            addBtnText.textContent = origText;
            addBtn.style.background = origBg;
            addBtn.disabled = false;
          }, 2500);
        }, 800);
      }
    });
  }

  /* ============================================================
     Quick-add: Feedback visuel
  ============================================================ */
  on(document, 'submit', function (e) {
    var form = e.target;
    if (!form || !form.classList.contains('product-card__quick-add')) return;
    var btn = form.querySelector('.product-card__add-btn');
    if (!btn) return;
    var origHTML = btn.innerHTML;
    btn.innerHTML = '✓ Ajouté !';
    btn.style.cssText = 'background:#1a7a40;color:#fff;border-color:#1a7a40;';
    setTimeout(function () {
      btn.innerHTML = origHTML;
      btn.style.cssText = '';
    }, 2200);
  });

  /* ============================================================
     COLLECTION: Tri (sans inline onchange)
  ============================================================ */
  var sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    on(sortSelect, 'change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  /* ============================================================
     Header sticky: classe au scroll
  ============================================================ */
  var siteHeader = $('.site-header--sticky');
  if (siteHeader) {
    var ticking = false;
    on(window, 'scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          siteHeader.classList.toggle('scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     Reveal au scroll (Intersection Observer)
  ============================================================ */
  if ('IntersectionObserver' in window) {
    var revealEls = $$('.product-card, .category-card, .testimonial-card, .trust-badge, .image-with-text__grid > *');

    if (revealEls.length > 0) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

      revealEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        revealObserver.observe(el);
      });
    }
  }

  /* ============================================================
     Accordion (détails produit)
  ============================================================ */
  $$('.product-accordion').forEach(function (details) {
    var trigger = details.querySelector('.product-accordion__trigger');
    if (trigger) {
      on(trigger, 'click', function () {
        // Le comportement natif <details> gère l'open/close
        // On synchronise juste l'icône
        setTimeout(function () {
          var icon = trigger.querySelector('.product-accordion__icon');
          if (icon) {
            icon.style.transform = details.open ? 'rotate(45deg)' : 'rotate(0deg)';
          }
        }, 10);
      });
    }
  });

})();
