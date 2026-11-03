/* Cepillo 9 en 1 Pro - Clean Home & Relief Vue 3 Bundle para Shopify OS 2.0 */
(function () {
  'use strict';
  function bootCepilloVue() {
    if (!window.Vue) {
      setTimeout(bootCepilloVue, 40);
      return;
    }
    const { createApp, ref, computed, reactive, onMounted, onUnmounted } = window.Vue;

    // --- SvgIcons.js ---
    // Micro-iconos vectoriales limpios y sobrios (estilo clínico / hogar ergonómico)
    // Trazo uniforme 1.75px, sin saturación ni emojis genéricos
    const SvgIcons = {
      spine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M9 6h6"/><path d="M8.5 10h7"/><path d="M8.5 14h7"/><path d="M9 18h6"/></svg>`,
      wand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20L17 7"/><path d="M15 5l4 4"/><circle cx="18.5" cy="5.5" r="2.5"/><path d="M3 15v5h5"/></svg>`,
      battery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M7 10v4"/><path d="M11 10v4"/><path d="M15 10v4"/></svg>`,
      shieldCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
      cone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L5 19h14L12 3z"/><path d="M5 19c0 1.2 3.1 2 7 2s7-.8 7-2"/></svg>`,
      disc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>`,
      sparklesClean: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>`,
      bristles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v6"/><path d="M8.5 12v6"/><path d="M12 12v6"/><path d="M15.5 12v6"/><path d="M19 12v6"/><path d="M12 4v4"/></svg>`,
      boxOpen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
      truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="14" height="12" rx="1"/><path d="M15 8h4l4 4v4h-8V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
      cashHand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="12" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M6 11h.01M18 11h.01"/></svg>`,
      formCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 12l2 2 4-4"/><path d="M8 7h8"/></svg>`,
      check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
      cross: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
      doubleCheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L7 17l-5-5"/><path d="M22 10l-7.5 7.5L13 16"/></svg>`,
      sliderArrows: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/></svg>`,
      mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
      minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
      plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
    };

    // --- productConfig.js ---
    // Configuración central del producto — Sincronizada en tiempo real con Shopify Admin (Productos)
    // Si cambias el precio, precio de comparación, stock o variantes en Shopify, se refleja automáticamente.
    function getProductConfig() {
      const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
      const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

      const resolveImg = (customUrl, filename) => {
        if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
          return customUrl;
        }
        return `${assetsBase}${filename}`;
      };

      // Variantes reales inyectadas desde Shopify (o variante local de vista previa)
      const rawVariants =
        Array.isArray(shopify.variants) && shopify.variants.length > 0
          ? shopify.variants.map((v) => ({
              id: v.id,
              title: v.title === 'Default Title' ? 'Kit Completo Estándar' : v.title,
              isDefaultTitle: v.title === 'Default Title',
              sku: v.sku || shopify.sku || '208333',
              price: Number(v.price ?? shopify.price ?? 35.0),
              compareAtPrice: Number(v.compareAtPrice ?? shopify.compareAtPrice ?? 0),
              available: v.available !== false,
              inventoryQuantity:
                typeof v.inventoryQuantity === 'number' && v.inventoryQuantity > 0
                  ? v.inventoryQuantity
                  : 99,
            }))
          : [
              {
                id: shopify.variantId || null,
                title: 'Kit Completo Estándar',
                isDefaultTitle: true,
                sku: shopify.sku || '208333',
                price: Number(shopify.price ?? 35.0),
                compareAtPrice: Number(shopify.compareAtPrice ?? 55.0),
                available: true,
                inventoryQuantity: Number(shopify.stockLeft || 100),
              },
            ];

      const firstVar = rawVariants[0];

      return {
        title: shopify.title || 'Cepillo Eléctrico 9 en 1 Pro',
        handle: shopify.handle || 'cepillo-electrico-9-en-1-pro',
        sku: firstVar.sku || '208333',
        currency: shopify.currency || 'USD',
        variants: rawVariants,
        hasMultipleVariants: rawVariants.length > 1,
        stockLeft: Number(shopify.stockLeft || firstVar.inventoryQuantity || 14),
        warehouseCity: shopify.warehouseCity || 'Guayaquil',
        checkoutMode: shopify.checkoutMode || 'direct_checkout', // 'direct_checkout' | 'prefill_modal'
        whatsappNumber: shopify.whatsappNumber || '',

        hero: {
          eyebrow: shopify.heroBadge || 'Cuidado articular y limpieza sin esfuerzo',
          headline:
            shopify.heroHeadline ||
            'Termina de limpiar el baño sin que te duela la cintura ni poner las rodillas en el piso frío.',
          subline:
            shopify.heroSubline ||
            'El cepillo eléctrico que gira a 300 RPM: la máquina hace la fuerza y tú limpias de pie en 10 minutos.',
          ctaText: shopify.ctaText || 'Pedir ahora y pagar al recibir',
          ctaSubtext: 'Despacho desde Guayaquil · Pago contra entrega',
          gallery: [
            {
              id: 'standing',
              label: 'De pie (1.2 m)',
              caption: 'Vara extensible hasta 1.2 m: alcanzas duchas altas y pisos con la espalda recta.',
              image: resolveImg(shopify.heroImage, 'relief_standing_clean.jpg'),
            },
            {
              id: 'faucet',
              label: 'Sarro en grifos',
              caption: '300 RPM reales arrancando moho y sarro acumulado en la base del grifo.',
              image: resolveImg(shopify.zoneCornersImage, 'zone_cone_corner.jpg'),
            },
            {
              id: 'stove',
              label: 'Grasa de cocina',
              caption: 'Remueve grasa quemada de hornillas sin hacer presión con la muñeca.',
              image: resolveImg(shopify.zoneStoveImage, 'zone_stove_grease.jpg'),
            },
          ],
        },

        slider: {
          eyebrow: 'PRUEBA DE RENDIMIENTO EN JUNTAS REALES',
          headline: 'El antes y después en el sarro que todos tenemos en casa',
          subline: 'Arrastra la barra central sobre el azulejo para comparar el resultado.',
          footnote: '30 segundos con el cabezal cónico vs. 20 minutos frotando con esponja manual.',
          beforeImage: resolveImg(shopify.beforeImage, 'before_dirty_tiles.jpg'),
          afterImage: resolveImg(shopify.afterImage, 'after_clean_tiles.jpg'),
        },

        unboxingKit: {
          eyebrow: 'CONTENIDO EXACTO DE TU PAQUETE',
          headline: 'Lo que realmente llega en tu caja',
          subline: 'Kit completo con motor recargable, 2 tubos de extensión de aluminio y los 9 accesorios de limpieza.',
          flatlayImage: resolveImg(shopify.unboxingImage, 'unboxing_flatlay_9in1.jpg'),
          mainHeads: [
            {
              id: 'cone',
              iconKey: 'cone',
              name: 'Cabezal de punta cónica',
              desc: 'Llega detrás del inodoro, a los rieles de la ventana y al borde del grifo donde ningún trapo entra.',
              actionImage: resolveImg(shopify.zoneCornersImage, 'zone_cone_corner.jpg'),
            },
            {
              id: 'flat',
              iconKey: 'disc',
              name: 'Cabezal plano ancho',
              desc: 'Cubre pisos, paredes completas de ducha y tinas en pasadas rápidas sin agacharte.',
              actionImage: resolveImg(shopify.reliefImage, 'relief_standing_clean.jpg'),
            },
            {
              id: 'hard',
              iconKey: 'bristles',
              name: 'Cepillo de cerdas duras y fibra',
              desc: 'Desprende grasa quemada de hornillas, sartenes y manchas secas en cocina.',
              actionImage: resolveImg(shopify.zoneStoveImage, 'zone_stove_grease.jpg'),
            },
            {
              id: 'sponge',
              iconKey: 'sparklesClean',
              name: 'Esponja, microfibra y paño pulidor',
              desc: 'Limpia espejos, mamparas de vidrio y carrocería del auto sin dejar rayones.',
              actionImage: resolveImg(shopify.afterImage, 'after_clean_tiles.jpg'),
            },
          ],
          boxChecklist: [
            '1 Mango motorizado inalámbrico (300 RPM)',
            '2 Varas extensibles ajustables hasta 1.20 m',
            '4 Cepillos de cerdas (plano XXL, plano chico, domo curvo y punta cónica)',
            '4 Discos de acabado (esponja, fibra abrasiva, microfibra y paño pulidor)',
            '1 Cable de carga USB-C + soporte de pared',
          ],
        },

        physicalRelief: {
          eyebrow: 'PROTECCIÓN PARA TUS MANOS Y TU COLUMNA',
          headline: 'Olvídate de toser por el olor a cloro y de terminar con las manos agrietadas por restregar.',
          handsPhoto: resolveImg(shopify.fear3Image, 'fear_disgust_germs.jpg'),
          standingPhoto: resolveImg(shopify.reliefImage, 'relief_standing_clean.jpg'),
          manualProblems: [
            'Inhalas vapores fuertes de cloro y desengrasante al estar encorvada dentro de la ducha.',
            'Te quemas y cuartea la piel de los nudillos con detergentes agresivos.',
            'El agua turbia del inodoro y del moho te salpica directo en los dedos.',
          ],
          electricSolutions: [
            'El mango extensible mantiene tus manos y tu rostro a 1 metro de los químicos y bacterias.',
            'La columna queda recta y la muñeca relajada: solo apoyas el cabezal y dejas que gire.',
            'Cabezales lavables bajo el grifo en segundos sin exprimir esponjas sucias.',
          ],
        },

        whatsappReviews: [
          {
            id: 1,
            name: 'Mariana C.',
            location: 'Urdesa, Guayaquil',
            time: '10:42 a. m.',
            image: resolveImg(shopify.ugc1Image, 'after_clean_tiles.jpg'),
            message:
              'Me llegó ayer por Servientrega aquí a Urdesa, todo bien empacado. Lo probé en la junta de la ducha que tenía moho de meses y salió al toque. Ya no me duele la columna.',
          },
          {
            id: 2,
            name: 'Roberto A.',
            location: 'La Carolina, Quito',
            time: '3:18 p. m.',
            image: resolveImg(shopify.ugc2Image, 'unboxing_flatlay_9in1.jpg'),
            message:
              'Tenía duda de qué venía en la caja y llegó completito con los tubos largos de aluminio y todos los cepillos. Revisé el paquete en la puerta y ahí pagué en efectivo.',
          },
          {
            id: 3,
            name: 'Patricia V.',
            location: 'Cuenca',
            time: '6:05 p. m.',
            image: resolveImg(shopify.zoneStoveImage, 'zone_stove_grease.jpg'),
            message:
              'Se lo compré a mi mamá para que no siga haciendo fuerza en las hornillas ni arrodillándose a lavar el piso del baño. Tiene buena potencia y es liviano.',
          },
        ],

        codTrust: {
          image: resolveImg(shopify.codImage, 'cod_door_delivery.jpg'),
          steps: [
            {
              iconKey: 'formCheck',
              stepNum: 'Paso 1',
              title: 'Eliges cantidad y pides',
              sub: 'Seleccionas cuántas unidades deseas sin ingresar tarjetas de crédito.',
            },
            {
              iconKey: 'truck',
              stepNum: 'Paso 2',
              title: 'Despacho local',
              sub: 'Preparación y salida rápida desde nuestra bodega en Guayaquil.',
            },
            {
              iconKey: 'cashHand',
              stepNum: 'Paso 3',
              title: 'Revisas y pagas',
              sub: 'El repartidor toca tu puerta, recibes el paquete y pagas al recibir.',
            },
          ],
        },
      };
    }

    // --- TopUrgencyTicker.js ---
    const TopUrgencyTicker = {
      name: 'TopUrgencyTicker',
      props: {
        config: { type: Object, required: true },
      },
      setup() {
        return { SvgIcons };
      },
      template: `
        <header class="top-bar" role="banner">
          <div class="top-bar__inner">
            <span class="top-bar__icon" v-html="SvgIcons.truck"></span>
            <p class="top-bar__text">
              Despacho local desde <strong>{{ config.warehouseCity }}</strong>
              <span class="top-bar__sep">·</span>
              <span>Pago en efectivo al recibir</span>
            </p>
          </div>
        </header>
      `,
    };

    // --- EmotionalHeroMobile.js ---
    const EmotionalHeroMobile = {
      name: 'EmotionalHeroMobile',
      props: {
        config: { type: Object, required: true },
        activeVariant: { type: Object, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        totalCompareAt: { type: Number, required: true },
        totalSavings: { type: Number, required: true },
      },
      emits: ['trigger-order', 'change-qty', 'select-variant'],
      setup(props) {
        const activeIdx = ref(0);
        const activeSlide = computed(
          () => props.config.hero.gallery[activeIdx.value] || props.config.hero.gallery[0]
        );
        return { activeIdx, activeSlide, SvgIcons };
      },
      template: `
        <section class="hero-clean">
          <!-- Galería de demostración real en uso -->
          <div class="hero-gallery">
            <div class="hero-gallery__main">
              <img
                :src="activeSlide.image"
                :alt="config.title"
                class="hero-gallery__img"
                fetchpriority="high"
              />
              <div class="hero-gallery__caption-bar">
                <span class="hero-live-dot"></span>
                <span>{{ activeSlide.caption }}</span>
              </div>
            </div>

            <div class="hero-gallery__thumbs" role="tablist" aria-label="Demostraciones en uso">
              <button
                v-for="(slide, idx) in config.hero.gallery"
                :key="slide.id"
                type="button"
                class="hero-thumb-btn"
                :class="{ 'hero-thumb-btn--active': idx === activeIdx }"
                @click="activeIdx = idx"
              >
                <img :src="slide.image" :alt="slide.label" />
                <span>{{ slide.label }}</span>
              </button>
            </div>
          </div>

          <!-- Bloque editorial claro y creíble -->
          <div class="hero-clean__body">
            <div class="hero-meta-row">
              <span class="clinical-eyebrow">{{ config.hero.eyebrow }}</span>
              <span class="rating-sober"><strong>4.9/5</strong> · Ecuador</span>
            </div>

            <h1 class="hero-clean__headline">
              {{ config.hero.headline }}
            </h1>

            <p class="hero-clean__subline">
              {{ config.hero.subline }}
            </p>

            <!-- Micro-badges concretos con iconos vectoriales limpios -->
            <div class="spec-pills">
              <div class="spec-pill">
                <span class="spec-pill__icon" v-html="SvgIcons.spine"></span>
                <span>Extensible hasta 1.2 m</span>
              </div>
              <div class="spec-pill">
                <span class="spec-pill__icon" v-html="SvgIcons.battery"></span>
                <span>Sin cables (Batería USB-C)</span>
              </div>
              <div class="spec-pill">
                <span class="spec-pill__icon" v-html="SvgIcons.shieldCheck"></span>
                <span>Pago al recibir en casa</span>
              </div>
            </div>

            <!-- Tarjeta limpia de precio sincronizado con Shopify + Cantidad -->
            <div class="price-clean-card">
              <!-- Si el producto en Shopify tiene múltiples variantes creadas -->
              <div v-if="config.hasMultipleVariants" class="variant-pills-wrap">
                <span class="qty-control-label">Presentación:</span>
                <div class="variant-pills">
                  <button
                    v-for="v in config.variants"
                    :key="v.id"
                    type="button"
                    class="variant-pill-btn"
                    :class="{ 'variant-pill-btn--active': v.id === activeVariant.id }"
                    :disabled="!v.available"
                    @click="$emit('select-variant', v.id)"
                  >
                    <span>{{ v.title }}</span>
                    <strong>\${{ v.price.toFixed(2) }}</strong>
                  </button>
                </div>
              </div>

              <div class="price-clean-card__row">
                <div>
                  <span class="price-clean__label">
                    {{ quantity > 1 ? 'Total por ' + quantity + ' unidades' : 'Precio unitario' }}
                  </span>
                  <div class="price-clean__numbers">
                    <span class="price-clean__now">\${{ totalPrice.toFixed(2) }}</span>
                    <span class="price-clean__curr">{{ config.currency }}</span>
                    <span v-if="totalCompareAt > totalPrice" class="price-clean__old">
                      \${{ totalCompareAt.toFixed(2) }}
                    </span>
                  </div>
                </div>

                <span v-if="totalSavings > 0" class="price-clean__save">
                  Ahorras \${{ totalSavings.toFixed(2) }}
                </span>
              </div>

              <!-- Selector táctil de Cantidad (- 1 +) -->
              <div class="qty-selector-row">
                <span class="qty-control-label">Cantidad:</span>
                <div class="qty-stepper">
                  <button
                    type="button"
                    class="qty-stepper__btn"
                    :disabled="quantity <= 1"
                    aria-label="Disminuir cantidad"
                    @click="$emit('change-qty', quantity - 1)"
                    v-html="SvgIcons.minus"
                  ></button>
                  <span class="qty-stepper__val">{{ quantity }}</span>
                  <button
                    type="button"
                    class="qty-stepper__btn"
                    aria-label="Aumentar cantidad"
                    @click="$emit('change-qty', quantity + 1)"
                    v-html="SvgIcons.plus"
                  ></button>
                </div>
              </div>

              <button
                type="button"
                class="btn-eucalyptus"
                :disabled="!activeVariant.available"
                @click="$emit('trigger-order')"
              >
                <span class="btn-eucalyptus__main">
                  {{ activeVariant.available ? config.hero.ctaText : 'Agotado temporalmente' }}
                </span>
                <span class="btn-eucalyptus__sub">
                  {{ quantity }} {{ quantity === 1 ? 'unidad' : 'unidades' }} · \${{ totalPrice.toFixed(2) }} {{ config.currency }}
                </span>
              </button>
            </div>
          </div>
        </section>
      `,
    };

    // --- ThumbCleanInteractive.js ---
    const ThumbCleanInteractive = {
      name: 'ThumbCleanInteractive',
      props: {
        slider: { type: Object, required: true },
      },
      setup() {
        // Izquierda: Antes (moho negro acumulado) | Derecha: Después (azulejo blanco limpio)
        const position = ref(50);
        const hasInteracted = ref(false);
        const containerRef = ref(null);
        let demoTimer = null;

        const updateFromClientX = (clientX) => {
          if (!containerRef.value) return;
          const rect = containerRef.value.getBoundingClientRect();
          const raw = ((clientX - rect.left) / rect.width) * 100;
          position.value = Math.min(94, Math.max(6, Math.round(raw)));
        };

        const onPointerDown = (e) => {
          hasInteracted.value = true;
          updateFromClientX(e.clientX);
        };

        const onPointerMove = (e) => {
          if (e.buttons !== 1) return;
          hasInteracted.value = true;
          updateFromClientX(e.clientX);
        };

        const onTouchMove = (e) => {
          if (!e.touches || !e.touches[0]) return;
          hasInteracted.value = true;
          updateFromClientX(e.touches[0].clientX);
        };

        onMounted(() => {
          let dir = -1;
          demoTimer = setInterval(() => {
            if (hasInteracted.value) return;
            position.value += dir * 1.1;
            if (position.value <= 30) dir = 1;
            if (position.value >= 68) dir = -1;
          }, 50);
        });

        onUnmounted(() => {
          if (demoTimer) clearInterval(demoTimer);
        });

        return {
          position,
          hasInteracted,
          containerRef,
          onPointerDown,
          onPointerMove,
          onTouchMove,
          SvgIcons,
        };
      },
      template: `
        <section class="section-block section-block--alt" id="demo-juntas">
          <div class="section-header">
            <span class="section-eyebrow">{{ slider.eyebrow }}</span>
            <h2 class="section-title">{{ slider.headline }}</h2>
            <p class="section-desc">{{ slider.subline }}</p>
          </div>

          <div
            ref="containerRef"
            class="ba-frame"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @touchstart.passive="hasInteracted = true"
            @touchmove.passive="onTouchMove"
          >
            <!-- Fondo completo: LADO DERECHO (Después: Azulejo blanco limpio) -->
            <img
              :src="slider.afterImage"
              alt="Después: azulejo limpio con agua limpia"
              class="ba-frame__img"
            />

            <!-- Recorte izquierdo: LADO IZQUIERDO (Antes: Moho negro y silicona manchada) -->
            <div
              class="ba-frame__before-clip"
              :style="{ clipPath: 'inset(0 ' + (100 - position) + '% 0 0)' }"
            >
              <img
                :src="slider.beforeImage"
                alt="Antes: esquina con moho negro acumulado"
                class="ba-frame__img"
              />
            </div>

            <span class="ba-tag ba-tag--left">Antes · Moho en junta</span>
            <span class="ba-tag ba-tag--right">Después · 30 seg</span>

            <!-- Barra divisoria limpia -->
            <div class="ba-line" :style="{ left: position + '%' }">
              <div class="ba-handle" aria-hidden="true" v-html="SvgIcons.sliderArrows"></div>
            </div>
          </div>

          <p class="ba-caption">
            {{ slider.footnote }}
          </p>
        </section>
      `,
    };

    // --- VisualZoneTapper.js ---
    const VisualZoneTapper = {
      name: 'VisualZoneTapper',
      props: {
        kit: { type: Object, required: true },
      },
      setup(props) {
        const selectedHeadId = ref(props.kit.mainHeads[0]?.id || 'cone');
        return { selectedHeadId, SvgIcons };
      },
      template: `
        <section class="section-block">
          <div class="section-header">
            <span class="section-eyebrow">{{ kit.eyebrow }}</span>
            <h2 class="section-title">{{ kit.headline }}</h2>
            <p class="section-desc">{{ kit.subline }}</p>
          </div>

          <!-- Foto transparente de Unboxing sobre mesa de madera clara -->
          <figure class="unboxing-card">
            <div class="unboxing-card__photo-wrap">
              <img
                :src="kit.flatlayImage"
                alt="Contenido real de la caja Cepillo 9 en 1 Pro sobre mesa"
                loading="lazy"
              />
              <span class="unboxing-badge">
                <span class="unboxing-badge__icon" v-html="SvgIcons.boxOpen"></span>
                <span>Foto del kit completo incluido</span>
              </span>
            </div>

            <ul class="unboxing-checklist">
              <li v-for="(line, i) in kit.boxChecklist" :key="i">
                <span class="check-dot" v-html="SvgIcons.check"></span>
                <span>{{ line }}</span>
              </li>
            </ul>
          </figure>

          <!-- Uso cotidiano de los cabezales en acción real -->
          <div class="heads-usage-wrap">
            <h3 class="subsection-heading">Para qué usarás cada cabezal en casa:</h3>

            <div class="heads-accordion-cards">
              <article
                v-for="(head, idx) in kit.mainHeads"
                :key="head.id"
                class="head-use-card"
                :class="{ 'head-use-card--open': selectedHeadId === head.id }"
                @click="selectedHeadId = head.id"
              >
                <div class="head-use-card__top">
                  <span class="head-num">{{ idx + 1 }}</span>
                  <span class="head-svg" v-html="SvgIcons[head.iconKey] || SvgIcons.disc"></span>
                  <div class="head-use-card__titles">
                    <strong>{{ head.name }}</strong>
                    <p>{{ head.desc }}</p>
                  </div>
                </div>

                <div v-if="selectedHeadId === head.id" class="head-use-card__media">
                  <img :src="head.actionImage" :alt="head.name" loading="lazy" />
                </div>
              </article>
            </div>
          </div>
        </section>
      `,
    };

    // --- PhysicalReliefSection.js ---
    const PhysicalReliefSection = {
      name: 'PhysicalReliefSection',
      props: {
        relief: { type: Object, required: true },
      },
      setup() {
        return { SvgIcons };
      },
      template: `
        <section class="section-block section-block--alt">
          <div class="section-header">
            <span class="section-eyebrow">{{ relief.eyebrow }}</span>
            <h2 class="section-title">{{ relief.headline }}</h2>
          </div>

          <div class="relief-stack">
            <!-- Tarjeta 1: El problema real del cepillo/esponja manual -->
            <article class="relief-card relief-card--manual">
              <div class="relief-card__photo">
                <img
                  :src="relief.handsPhoto"
                  alt="Manos irritadas y resecas por químicos y esponja sucia"
                  loading="lazy"
                />
                <span class="relief-card__pill relief-card__pill--muted">
                  Con esponja o cepillo manual
                </span>
              </div>
              <ul class="relief-points">
                <li v-for="(item, idx) in relief.manualProblems" :key="idx">
                  <span class="point-mark point-mark--cross" v-html="SvgIcons.cross"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>

            <!-- Tarjeta 2: Solución ergonómica a 1 metro de distancia -->
            <article class="relief-card relief-card--solution">
              <div class="relief-card__photo">
                <img
                  :src="relief.standingPhoto"
                  alt="Limpieza erguida a 1 metro de distancia con Cepillo 9 en 1 Pro"
                  loading="lazy"
                />
                <span class="relief-card__pill relief-card__pill--sage">
                  Con el Cepillo 9 en 1 Pro
                </span>
              </div>
              <ul class="relief-points">
                <li v-for="(item, idx) in relief.electricSolutions" :key="idx">
                  <span class="point-mark point-mark--check" v-html="SvgIcons.check"></span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </article>
          </div>
        </section>
      `,
    };

    // --- RealFeelingsUgc.js ---
    const RealFeelingsUgc = {
      name: 'RealFeelingsUgc',
      props: {
        reviews: { type: Array, required: true },
      },
      setup() {
        return { SvgIcons };
      },
      template: `
        <section class="section-block">
          <div class="section-header">
            <span class="section-eyebrow">CLIENTES EN GUAYAQUIL, QUITO Y CUENCA</span>
            <h2 class="section-title">Mensajes de quienes ya lo recibieron en casa</h2>
            <p class="section-desc">Desliza hacia el lado para leer sus comentarios.</p>
          </div>

          <div class="wa-carousel">
            <article v-for="rev in reviews" :key="rev.id" class="wa-card">
              <div class="wa-card__top-bar">
                <div class="wa-avatar">{{ rev.name.charAt(0) }}</div>
                <div class="wa-contact-info">
                  <strong>{{ rev.name }}</strong>
                  <span>
                    <span class="wa-pin" v-html="SvgIcons.mapPin"></span>
                    {{ rev.location }}
                  </span>
                </div>
                <span class="wa-verified-tag">Entrega verificada</span>
              </div>

              <!-- Lienzo estilo captura real de conversación WhatsApp -->
              <div class="wa-chat-canvas">
                <div class="wa-bubble">
                  <div class="wa-bubble__photo">
                    <img :src="rev.image" :alt="'Foto enviada por ' + rev.name" loading="lazy" />
                  </div>
                  <p class="wa-bubble__text">{{ rev.message }}</p>
                  <div class="wa-bubble__meta">
                    <span>{{ rev.time }}</span>
                    <span class="wa-dblcheck" v-html="SvgIcons.doubleCheck"></span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      `,
    };

    // --- ZeroFearCodSection.js ---
    const ZeroFearCodSection = {
      name: 'ZeroFearCodSection',
      props: {
        config: { type: Object, required: true },
        activeVariant: { type: Object, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        totalCompareAt: { type: Number, required: true },
        totalSavings: { type: Number, required: true },
      },
      emits: ['change-qty', 'select-variant', 'trigger-order'],
      setup() {
        const openFaq = ref(0);
        const quickQtys = [1, 2, 3];
        const faqs = [
          {
            q: '¿Tengo que pagar algo por adelantado o poner mi tarjeta?',
            a: 'No. Seleccionas Pago contra entrega al finalizar tu dirección y pagas en efectivo directamente al repartidor cuando te entregue la caja en tu puerta.',
          },
          {
            q: '¿Se detiene el giro si lo presiono contra los azulejos?',
            a: 'Cuenta con torque estable de 300 RPM diseñado para desprender sarro y jabón acumulado sin necesidad de presionar fuerte; la rotación de las cerdas hace el trabajo.',
          },
          {
            q: '¿Cuánto dura la batería y cómo se carga?',
            a: 'Incluye cable USB-C recargable con autonomía de hasta 90 minutos de limpieza continua, suficiente para lavar baños y cocina completos varias veces con una sola carga.',
          },
          {
            q: '¿Desde dónde despachan el pedido?',
            a: 'Todos los pedidos salen revisados desde nuestra bodega local en Guayaquil con envío a domicilio por transportadora.',
          },
        ];

        const toggleFaq = (idx) => {
          openFaq.value = openFaq.value === idx ? -1 : idx;
        };

        return { openFaq, quickQtys, faqs, toggleFaq, SvgIcons };
      },
      template: `
        <section class="section-block section-block--alt" id="pedir-ahora">
          <!-- Garantía tangible paso a paso -->
          <div class="cod-clean-card">
            <div class="cod-clean-card__media">
              <img :src="config.codTrust.image" alt="Entrega en puerta con pago en efectivo" loading="lazy" />
            </div>

            <div class="cod-clean-card__content">
              <span class="section-eyebrow">COMPRA SIN RIESGO · BODEGA {{ config.warehouseCity.toUpperCase() }}</span>
              <h2 class="cod-clean-title">Así funciona tu entrega a domicilio</h2>

              <div class="cod-steps-list">
                <div v-for="(step, idx) in config.codTrust.steps" :key="idx" class="cod-step-row">
                  <div class="cod-step-icon" v-html="SvgIcons[step.iconKey] || SvgIcons.shieldCheck"></div>
                  <div class="cod-step-text">
                    <strong>{{ step.stepNum }}: {{ step.title }}</strong>
                    <p>{{ step.sub }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Selector de variantes (si existen en Shopify) y cantidad exacta -->
          <div class="bundle-clean-box">
            <h3 class="bundle-clean-box__title">{{ config.title }}</h3>

            <!-- Variantes reales de Shopify si creaste más de 1 en tu panel -->
            <div v-if="config.hasMultipleVariants" class="bundle-clean-list">
              <div
                v-for="v in config.variants"
                :key="v.id"
                role="button"
                tabindex="0"
                class="bundle-option-clean"
                :class="{ 'bundle-option-clean--active': v.id === activeVariant.id }"
                @click="$emit('select-variant', v.id)"
              >
                <div class="bundle-option-clean__main">
                  <div class="radio-circle">
                    <span class="radio-circle__inner"></span>
                  </div>
                  <div class="bundle-option-clean__desc">
                    <strong>{{ v.title }}</strong>
                    <small>{{ v.available ? 'Disponible para despacho' : 'Agotado' }}</small>
                  </div>
                  <div class="bundle-option-clean__price">
                    <span class="p-now">\${{ v.price.toFixed(2) }}</span>
                    <span v-if="v.compareAtPrice > v.price" class="p-old">
                      \${{ v.compareAtPrice.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botones rápidos de cantidad (1, 2, 3) + control exacto (- / +) -->
            <div class="qty-quick-grid">
              <button
                v-for="q in quickQtys"
                :key="q"
                type="button"
                class="qty-quick-card"
                :class="{ 'qty-quick-card--active': quantity === q }"
                @click="$emit('change-qty', q)"
              >
                <strong>{{ q }} {{ q === 1 ? 'Unidad' : 'Unidades' }}</strong>
                <span>\${{ (activeVariant.price * q).toFixed(2) }} {{ config.currency }}</span>
              </button>
            </div>

            <div class="qty-selector-row qty-selector-row--boxed">
              <div>
                <span class="qty-control-label">Ajustar unidades:</span>
                <small class="qty-unit-hint">\${{ activeVariant.price.toFixed(2) }} c/u</small>
              </div>
              <div class="qty-stepper">
                <button
                  type="button"
                  class="qty-stepper__btn"
                  :disabled="quantity <= 1"
                  aria-label="Restar unidad"
                  @click="$emit('change-qty', quantity - 1)"
                  v-html="SvgIcons.minus"
                ></button>
                <span class="qty-stepper__val">{{ quantity }}</span>
                <button
                  type="button"
                  class="qty-stepper__btn"
                  aria-label="Sumar unidad"
                  @click="$emit('change-qty', quantity + 1)"
                  v-html="SvgIcons.plus"
                ></button>
              </div>
            </div>

            <div class="order-summary-line">
              <span>Total del pedido ({{ quantity }} {{ quantity === 1 ? 'ud.' : 'uds.' }}):</span>
              <div class="order-summary-line__prices">
                <span v-if="totalCompareAt > totalPrice" class="p-old">\${{ totalCompareAt.toFixed(2) }}</span>
                <strong>\${{ totalPrice.toFixed(2) }} {{ config.currency }}</strong>
              </div>
            </div>

            <button
              type="button"
              class="btn-eucalyptus"
              :disabled="!activeVariant.available"
              @click="$emit('trigger-order')"
            >
              <span class="btn-eucalyptus__main">{{ config.hero.ctaText }}</span>
              <span class="btn-eucalyptus__sub">
                Ir a finalizar entrega · \${{ totalPrice.toFixed(2) }} {{ config.currency }}
              </span>
            </button>
          </div>

          <!-- Preguntas frecuentes claras -->
          <div class="faq-clean">
            <h3 class="subsection-heading">Preguntas frecuentes</h3>
            <div
              v-for="(f, idx) in faqs"
              :key="idx"
              class="faq-row"
              :class="{ 'faq-row--open': openFaq === idx }"
            >
              <button type="button" class="faq-row__q" @click="toggleFaq(idx)">
                <span>{{ f.q }}</span>
                <span class="faq-row__sign">{{ openFaq === idx ? '−' : '+' }}</span>
              </button>
              <p v-if="openFaq === idx" class="faq-row__a">{{ f.a }}</p>
            </div>
          </div>
        </section>
      `,
    };

    // --- StickyThumbBar.js ---
    const StickyThumbBar = {
      name: 'StickyThumbBar',
      props: {
        config: { type: Object, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        totalCompareAt: { type: Number, required: true },
      },
      emits: ['change-qty', 'trigger-order'],
      setup() {
        return { SvgIcons };
      },
      template: `
        <div class="sticky-clean-bar" role="region" aria-label="Barra rápida de pedido">
          <div class="sticky-clean-bar__inner">
            <!-- Control rápido de cantidad directo en la barra inferior -->
            <div class="sticky-qty-mini">
              <button
                type="button"
                class="sticky-qty-mini__btn"
                :disabled="quantity <= 1"
                aria-label="Menos"
                @click="$emit('change-qty', quantity - 1)"
                v-html="SvgIcons.minus"
              ></button>
              <span class="sticky-qty-mini__num">{{ quantity }}</span>
              <button
                type="button"
                class="sticky-qty-mini__btn"
                aria-label="Más"
                @click="$emit('change-qty', quantity + 1)"
                v-html="SvgIcons.plus"
              ></button>
            </div>

            <div class="sticky-clean-bar__info">
              <span class="sticky-clean-bar__kicker">Total ({{ quantity }} {{ quantity === 1 ? 'ud' : 'uds' }})</span>
              <div class="sticky-clean-bar__price-row">
                <strong>\${{ totalPrice.toFixed(2) }}</strong>
                <span v-if="totalCompareAt > totalPrice" class="sticky-clean-bar__old">
                  \${{ totalCompareAt.toFixed(2) }}
                </span>
              </div>
            </div>

            <button
              type="button"
              class="sticky-eucalyptus-btn"
              @click="$emit('trigger-order')"
            >
              <span>Pedir ahora</span>
            </button>
          </div>
        </div>
      `,
    };

    // --- QuickOrderModal.js ---
    const QuickOrderModal = {
      name: 'QuickOrderModal',
      props: {
        isOpen: { type: Boolean, required: true },
        config: { type: Object, required: true },
        activeVariant: { type: Object, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isSubmitting: { type: Boolean, default: false },
      },
      emits: ['close', 'change-qty', 'proceed-shopify'],
      setup(props, { emit }) {
        const form = reactive({
          fullName: '',
          phone: '',
          city: '',
          address: '',
        });
        const errorMsg = ref('');

        const handleConfirm = () => {
          if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
            errorMsg.value = 'Por favor completa nombre, celular, ciudad y dirección de entrega.';
            return;
          }
          errorMsg.value = '';
          emit('proceed-shopify', { ...form, qty: props.quantity });
        };

        return { form, errorMsg, handleConfirm, SvgIcons };
      },
      template: `
        <transition name="fade-modal">
          <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
            <div class="modal-sheet" role="dialog" aria-modal="true">
              <button type="button" class="modal-close" @click="$emit('close')" aria-label="Cerrar">✕</button>

              <div class="modal-head">
                <span class="modal-badge">
                  <span class="modal-badge__icon" v-html="SvgIcons.shieldCheck"></span>
                  <span>Pago al recibir</span>
                </span>
                <h3>Datos de entrega a domicilio</h3>
              </div>

              <div class="modal-order-box">
                <img :src="config.unboxingKit.flatlayImage" alt="Kit Cepillo 9 en 1 Pro" class="modal-thumb" />
                <div class="modal-order-box__text">
                  <strong>{{ config.title }}</strong>
                  <span v-if="!activeVariant.isDefaultTitle">{{ activeVariant.title }}</span>
                  <span v-else>Bodega {{ config.warehouseCity }}</span>
                </div>
                <div class="modal-order-box__price">\${{ totalPrice.toFixed(2) }}</div>
              </div>

              <!-- También permite cambiar cantidad aquí dentro -->
              <div class="qty-selector-row qty-selector-row--modal">
                <span class="qty-control-label">Cantidad de unidades:</span>
                <div class="qty-stepper">
                  <button
                    type="button"
                    class="qty-stepper__btn"
                    :disabled="quantity <= 1"
                    @click="$emit('change-qty', quantity - 1)"
                    v-html="SvgIcons.minus"
                  ></button>
                  <span class="qty-stepper__val">{{ quantity }}</span>
                  <button
                    type="button"
                    class="qty-stepper__btn"
                    @click="$emit('change-qty', quantity + 1)"
                    v-html="SvgIcons.plus"
                  ></button>
                </div>
              </div>

              <form class="modal-form" @submit.prevent="handleConfirm">
                <label class="clean-field">
                  <span>Nombre y apellido</span>
                  <input v-model="form.fullName" type="text" placeholder="Ej. María Fernanda López" autocomplete="name" required />
                </label>

                <label class="clean-field">
                  <span>Número de celular / WhatsApp</span>
                  <input v-model="form.phone" type="tel" inputmode="tel" placeholder="Ej. 099 123 4567" autocomplete="tel" required />
                </label>

                <label class="clean-field">
                  <span>Ciudad y sector</span>
                  <input v-model="form.city" type="text" placeholder="Ej. Guayaquil, Urdesa" autocomplete="address-level2" required />
                </label>

                <label class="clean-field">
                  <span>Dirección exacta y referencia</span>
                  <input v-model="form.address" type="text" placeholder="Calle principal, intersección y referencia" autocomplete="street-address" required />
                </label>

                <p v-if="errorMsg" class="modal-error">{{ errorMsg }}</p>

                <button type="submit" class="btn-eucalyptus" :disabled="isSubmitting">
                  <span class="btn-eucalyptus__main">
                    {{ isSubmitting ? 'Abriendo resumen...' : 'Continuar con el pedido' }}
                  </span>
                  <span class="btn-eucalyptus__sub">
                    {{ quantity }} {{ quantity === 1 ? 'unidad' : 'unidades' }} · Total \${{ totalPrice.toFixed(2) }} {{ config.currency }}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </transition>
      `,
    };

    // --- App.js ---
    const App = {
      name: 'CepilloMobileLandingApp',
      components: {
        TopUrgencyTicker,
        EmotionalHeroMobile,
        ThumbCleanInteractive,
        VisualZoneTapper,
        PhysicalReliefSection,
        RealFeelingsUgc,
        ZeroFearCodSection,
        StickyThumbBar,
        QuickOrderModal,
      },
      setup() {
        const config = ref(getProductConfig());
        const selectedVariantId = ref(config.value.variants[0]?.id || null);
        const quantity = ref(1);
        const isModalOpen = ref(false);
        const isSubmitting = ref(false);
        const orderSuccessToast = ref(false);

        const activeVariant = computed(
          () =>
            config.value.variants.find((v) => v.id === selectedVariantId.value) ||
            config.value.variants[0]
        );

        const totalPrice = computed(() => Number((activeVariant.value.price * quantity.value).toFixed(2)));
        const totalCompareAt = computed(() =>
          activeVariant.value.compareAtPrice > activeVariant.value.price
            ? Number((activeVariant.value.compareAtPrice * quantity.value).toFixed(2))
            : 0
        );
        const totalSavings = computed(() =>
          totalCompareAt.value > totalPrice.value
            ? Number((totalCompareAt.value - totalPrice.value).toFixed(2))
            : 0
        );

        const syncNativeShopifyForm = () => {
          const idInput = document.getElementById('shopify-native-variant-id');
          const qtyInput = document.getElementById('shopify-native-qty');
          if (idInput && activeVariant.value.id) idInput.value = String(activeVariant.value.id);
          if (qtyInput) qtyInput.value = String(quantity.value);
        };

        const selectVariant = (variantId) => {
          selectedVariantId.value = variantId;
          syncNativeShopifyForm();
        };

        const changeQty = (nextQty) => {
          const maxAllowed = Math.min(20, activeVariant.value.inventoryQuantity || 20);
          const clamped = Math.max(1, Math.min(maxAllowed, Number(nextQty) || 1));
          quantity.value = clamped;
          syncNativeShopifyForm();
        };

        // Construye el Permalink oficial de Shopify (/cart/VARIANT_ID:QTY?locale=es...)
        // Reemplaza la cantidad exacta en 1 solo paso y abre el Checkout en español.
        const goToShopifyCheckout = (prefill = null) => {
          const variantId = activeVariant.value.id;
          const qty = quantity.value;

          if (typeof window !== 'undefined' && variantId) {
            isSubmitting.value = true;
            const params = new URLSearchParams();
            params.set('locale', 'es');
            params.set('checkout[shipping_address][country]', 'EC');

            if (prefill) {
              const parts = (prefill.fullName || '').trim().split(/\s+/);
              const firstName = parts[0] || '';
              const lastName = parts.slice(1).join(' ') || parts[0] || '';
              if (firstName) params.set('checkout[shipping_address][first_name]', firstName);
              if (lastName) params.set('checkout[shipping_address][last_name]', lastName);
              if (prefill.phone) params.set('checkout[shipping_address][phone]', prefill.phone);
              if (prefill.city) params.set('checkout[shipping_address][city]', prefill.city);
              if (prefill.address) params.set('checkout[shipping_address][address1]', prefill.address);
            }

            window.location.href = `/cart/${variantId}:${qty}?${params.toString()}`;
            return true;
          }
          return false;
        };

        const triggerOrder = () => {
          syncNativeShopifyForm();

          // 1. Si tienes instalada una App de Formulario Contraentrega (Releasit / EasySell / Dropi COD)
          const externalCodBtn = document.querySelector(
            '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
          );
          if (externalCodBtn) {
            externalCodBtn.click();
            return;
          }

          // 2. Si tienes configurado WhatsApp directo o modal pre-llenado
          if (
            (config.value.whatsappNumber && config.value.whatsappNumber.trim() !== '') ||
            config.value.checkoutMode === 'prefill_modal'
          ) {
            isModalOpen.value = true;
            return;
          }

          // 3. Por defecto en Shopify: Ir directo al Checkout oficial en español con la cantidad exacta seleccionada
          const redirected = goToShopifyCheckout(null);
          if (!redirected) {
            // En preview-mobile.html local (donde no existe servidor Shopify) abrimos el modal demostrativo
            isModalOpen.value = true;
          }
        };

        const handleModalConfirm = (customerData) => {
          const { fullName, phone, city, address } = customerData;

          if (config.value.whatsappNumber && config.value.whatsappNumber.trim() !== '') {
            const cleanPhone = config.value.whatsappNumber.replace(/\D/g, '');
            const msg = encodeURIComponent(
              `Hola, deseo pedir con Pago al Recibir:\n` +
                `• Producto: ${config.value.title}${!activeVariant.value.isDefaultTitle ? ' (' + activeVariant.value.title + ')' : ''}\n` +
                `• Cantidad: ${quantity.value} ${quantity.value === 1 ? 'unidad' : 'unidades'}\n` +
                `• Total: $${totalPrice.value.toFixed(2)} ${config.value.currency}\n` +
                `• Nombre: ${fullName}\n` +
                `• Celular: ${phone}\n` +
                `• Ciudad: ${city}\n` +
                `• Dirección: ${address}`
            );
            window.location.href = `https://wa.me/${cleanPhone}?text=${msg}`;
            return;
          }

          const redirected = goToShopifyCheckout(customerData);
          if (!redirected) {
            isModalOpen.value = false;
            orderSuccessToast.value = true;
            setTimeout(() => {
              orderSuccessToast.value = false;
            }, 5000);
          }
        };

        return {
          config,
          activeVariant,
          quantity,
          totalPrice,
          totalCompareAt,
          totalSavings,
          isModalOpen,
          isSubmitting,
          orderSuccessToast,
          selectVariant,
          changeQty,
          triggerOrder,
          handleModalConfirm,
        };
      },
      template: `
        <div class="mobile-shell">
          <TopUrgencyTicker :config="config" />

          <main class="mobile-main">
            <!-- A. Hero con Enfoque en la Demostración + Precio y Cantidad reales -->
            <EmotionalHeroMobile
              :config="config"
              :active-variant="activeVariant"
              :quantity="quantity"
              :total-price="totalPrice"
              :total-compare-at="totalCompareAt"
              :total-savings="totalSavings"
              @change-qty="changeQty"
              @select-variant="selectVariant"
              @trigger-order="triggerOrder"
            />

            <!-- B. Módulo Interactivo: El Antes y Después que Satisface -->
            <ThumbCleanInteractive :slider="config.slider" />

            <!-- C. Demostración Visual del Kit: Lo que realmente llega en tu caja -->
            <VisualZoneTapper :kit="config.unboxingKit" />

            <!-- D. Desactivación del Miedo Físico (Las manos y la espalda) -->
            <PhysicalReliefSection :relief="config.physicalRelief" />

            <!-- E. Prueba Social estilo WhatsApp + Bodega Local Guayaquil -->
            <RealFeelingsUgc :reviews="config.whatsappReviews" />

            <!-- Garantía Tangible + Selector de Cantidad y Variantes -->
            <ZeroFearCodSection
              :config="config"
              :active-variant="activeVariant"
              :quantity="quantity"
              :total-price="totalPrice"
              :total-compare-at="totalCompareAt"
              :total-savings="totalSavings"
              @change-qty="changeQty"
              @select-variant="selectVariant"
              @trigger-order="triggerOrder"
            />
          </main>

          <footer class="clean-footer">
            <p>Despacho local desde Bodega {{ config.warehouseCity }} · Pago contra entrega</p>
            <small>{{ config.title }} · Ref. {{ activeVariant.sku }}</small>
          </footer>

          <StickyThumbBar
            :config="config"
            :quantity="quantity"
            :total-price="totalPrice"
            :total-compare-at="totalCompareAt"
            @change-qty="changeQty"
            @trigger-order="triggerOrder"
          />

          <QuickOrderModal
            :is-open="isModalOpen"
            :config="config"
            :active-variant="activeVariant"
            :quantity="quantity"
            :total-price="totalPrice"
            :is-submitting="isSubmitting"
            @close="isModalOpen = false"
            @change-qty="changeQty"
            @proceed-shopify="handleModalConfirm"
          />

          <transition name="fade-modal">
            <div v-if="orderSuccessToast" class="clean-toast">
              Vista previa local: {{ quantity }} {{ quantity === 1 ? 'unidad' : 'unidades' }} (\${{ totalPrice.toFixed(2) }}). En Shopify lleva directo al Checkout en español con esa cantidad exacta.
            </div>
          </transition>
        </div>
      `,
    };

    // --- main.js ---
    const mountEl = document.getElementById('cepillo-vue-root');
    if (mountEl) {
      createApp(App).mount(mountEl);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCepilloVue);
  } else {
    bootCepilloVue();
  }
})();
