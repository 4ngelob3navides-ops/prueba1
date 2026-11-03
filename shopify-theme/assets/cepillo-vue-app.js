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

    // --- QtyStepper.js ---
    const QtyStepper = {
      name: 'QtyStepper',
      props: {
        modelValue: { type: Number, required: true },
        max: { type: Number, default: 10 },
        compact: { type: Boolean, default: false },
      },
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        const change = (delta) => {
          const next = Math.max(1, Math.min(props.max, props.modelValue + delta));
          if (next !== props.modelValue) emit('update:modelValue', next);
        };
        return { change };
      },
      template: `
        <div class="qty-stepper" :class="{ 'qty-stepper--compact': compact }">
          <button
            type="button"
            class="qty-stepper__btn"
            :disabled="modelValue <= 1"
            aria-label="Quitar una unidad"
            @click="change(-1)"
          >
            −
          </button>
          <span class="qty-stepper__val">{{ modelValue }}</span>
          <button
            type="button"
            class="qty-stepper__btn"
            :disabled="modelValue >= max"
            aria-label="Agregar una unidad"
            @click="change(1)"
          >
            +
          </button>
        </div>
      `,
    };

    // --- productConfig.js ---
    // Configuración central del producto — Edición Editorial Hogar & Alivio
    function getProductConfig() {
      const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
      const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

      const resolveImg = (customUrl, filename) => {
        if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
          return customUrl;
        }
        return `${assetsBase}${filename}`;
      };

      const basePrice = Number(shopify.price || 35.0);
      const baseCompareAt =
        Number(shopify.compareAtPrice) > basePrice ? Number(shopify.compareAtPrice) : 55.0;

      const maxQty = Math.max(1, Math.min(20, Number(shopify.maxQty || 10)));
      const money = (n) => `$${Number(n).toFixed(2)}`;

      const offers = [
        {
          id: 1,
          qty: 1,
          title: '1x Kit Cepillo 9 en 1 Pro',
          sub: '9 cabezales + Vara extensible + Envío Gratis',
          price: basePrice,
          compareAtPrice: baseCompareAt,
          savingsText: 'Ahorras $20 hoy',
          badge: 'Oferta de hoy',
        },
        {
          id: 2,
          qty: 2,
          title: '2x Kits (Pack Familiar / Mamá)',
          sub: 'Uno para baño y otro para cocina ($29.50 c/u)',
          price: 59.0,
          compareAtPrice: 110.0,
          savingsText: 'Ahorras $51 hoy',
          badge: 'Pack Familiar',
        },
      ];

      const offerForQty = (qty) => {
        const q = Math.max(1, Math.min(maxQty, Number(qty) || 1));
        let price = 0;
        let compareAtPrice = 0;
        let title = '';
        let sub = '';

        if (q === 1) {
          price = basePrice;
          compareAtPrice = baseCompareAt;
          title = '1x Kit Cepillo 9 en 1 Pro';
          sub = '9 cabezales + Vara extensible + Envío Gratis';
        } else if (q === 2) {
          price = 59.0;
          compareAtPrice = 110.0;
          title = '2x Kits (Pack Familiar / Mamá)';
          sub = 'Uno para baño y otro para cocina ($29.50 c/u)';
        } else {
          price = Number((29.5 * q).toFixed(2));
          compareAtPrice = Number((baseCompareAt * q).toFixed(2));
          title = `${q}x Kits Cepillo 9 en 1 Pro`;
          sub = `$29.50 cada kit + Envío Gratis a todo Ecuador`;
        }

        const totalSavings = Math.max(0, compareAtPrice - price);

        return {
          id: q,
          qty: q,
          title,
          sub,
          price,
          compareAtPrice,
          savingsText: `Ahorras ${money(totalSavings)} hoy`,
          badge: q > 1 ? `${q} Kits` : 'Oferta de hoy',
        };
      };

      return {
        brandName: 'CASA ALIVIO™',
        title: shopify.title || 'Cepillo 9 en 1 Pro — Edición Hogar & Alivio',
        handle: shopify.handle || 'cepillo-electrico-9-en-1-pro',
        sku: shopify.sku || '208333',
        variantId: shopify.variantId || null,
        currency: shopify.currency || 'USD',
        basePrice,
        baseCompareAt,
        maxQty,
        offers,
        offerForQty,
        stockLeft: Number(shopify.stockLeft || 14),
        warehouseCity: shopify.warehouseCity || 'Guayaquil',

        announcement: {
          text: 'Envío Contraentrega · Bodega Guayaquil',
          tag: 'Ahorras $20',
        },

        hero: {
          image: resolveImg(shopify.hero_image, 'relief_standing_clean.jpg'),
          floatingPill: 'Kit Completo 9 en 1',
          kicker: 'Cuidado articular & hogar',
          headlineStart: 'Limpia tu baño desde arriba hasta el piso ',
          headlineEm: 'sin doblar la espalda.',
          subline:
            'Un motor rotativo de 300 RPM acoplado a un brazo extensible de 1.20 metros. Él hace la presión contra el sarro y el moho; tú solo lo guías de pie.',
          specs: [
            { strong: '100% de pie', span: 'Cero dolor lumbar' },
            { strong: '300 RPM', span: 'Sin frotar a mano' },
            { strong: '90 Minutos', span: 'Batería sin cables' },
          ],
          priceBadge: 'Oferta de hoy',
          ctaMain: 'Pedir Ahora — Pagar al Recibir',
          ctaSub: 'Despacho rápido desde Guayaquil a todo Ecuador',
        },

        trustStrip: [
          '✓ 9 Cabezales Incluidos',
          '✓ Resistente al Agua',
          '✓ Pago en Efectivo',
        ],

        slider: {
          kicker: 'Prueba física en 30 segundos',
          title: 'El moho negro de las juntas no sale con trapo.',
          lead:
            'Desliza con el dedo para ver cómo las cerdas de alta densidad arrancan el hongo incrustado en la esquina de la ducha.',
          beforeImg: resolveImg(shopify.slider_before_image, 'before_dirty_tiles.jpg'),
          afterImg: resolveImg(shopify.slider_after_image, 'after_clean_tiles.jpg'),
          caption: 'Fotografía real en cerámica de ducha sin retoques digitales.',
        },

        pains: {
          kicker: 'Por qué cambiar el cepillo manual',
          title: 'Tres problemas cotidianos que damos por normales.',
          lead:
            'Limpiar la casa no debería costarte salud en las manos, en los pulmones ni en la cintura.',
          cards: [
            {
              num: 'Problema 01 · Contacto directo',
              title: 'Manos agrietadas por cloro y esponjas con bacterias',
              desc:
                'Exprimir a mano una esponja llena de grasa o moho del inodoro reseca la piel, rompe las uñas y te obliga a respirar vapores químicos de cerca.',
              solution:
                'Solución: Mantén tus manos a 1.20 m de distancia de la suciedad y los químicos.',
              image: resolveImg(shopify.pain_image_1, 'fear_disgust_germs.jpg'),
            },
            {
              num: 'Problema 02 · Rincones imposibles',
              title: 'El sarro acumulado detrás del grifo y rieles de ducha',
              desc:
                'Ni los trapos ni las esponjas entran en las ranuras estrechas. Terminas usando cepillos de dientes viejos y lastimándote los nudillos.',
              solution:
                'Solución: El cabezal cónico penetra en esquinas de 90° y bordes de grifería en segundos.',
              image: resolveImg(shopify.pain_image_2, 'zone_cone_corner.jpg'),
            },
          ],
        },

        zones: {
          kicker: 'Un cabezal para cada superficie',
          title: 'Cómo funciona en cada rincón de tu casa.',
          list: [
            {
              tabLabel: 'Cocina y Grasa',
              img: resolveImg(shopify.zone_image_1, 'zone_stove_grease.jpg'),
              tool: 'Cabezal Plano de Cerdas Duras',
              title: 'Despega grasa quemada de estufas y sartenes',
              text:
                'El torque constante levanta los restos pegados en hornillas, campanas extractoras y mesones de acero sin rayar la superficie.',
            },
            {
              tabLabel: 'Grifos y Esquinas',
              img: resolveImg(shopify.zone_image_2, 'zone_cone_corner.jpg'),
              tool: 'Cabezal Cónico de Precisión',
              title: 'Elimina el sarro en bordes de grifos y rieles',
              text:
                'Diseñado en punta para entrar detrás de las llaves de agua, esquinas de ducha y rieles de ventanas corredizas.',
            },
            {
              tabLabel: 'Ducha y Paredes Altas',
              img: resolveImg(shopify.zone_image_3, 'relief_standing_clean.jpg'),
              tool: 'Brazo Telescópico de 1.20 m',
              title: 'Alcanza azulejos altos y pisos sin agacharte',
              text:
                'Ajusta el largo en un clic para limpiar desde el techo de la ducha hasta el piso manteniendo tu columna totalmente recta.',
            },
          ],
          kitGrid: [
            { name: 'Cepillo Ancho', sub: 'Pisos y tinas' },
            { name: 'Punta Cónica', sub: 'Juntas y rieles' },
            { name: 'Domo Curvo', sub: 'Inodoro y lavabo' },
            { name: 'Fibra Verde', sub: 'Ollas y parrillas' },
            { name: 'Esponja Suave', sub: 'Platos y mesón' },
            { name: 'Microfibra', sub: 'Vidrios y espejos' },
            { name: 'Paño Pulidor', sub: 'Acero y auto' },
            { name: 'Cepillo Fino', sub: 'Grifería delicada' },
            { name: 'Vara 1.20 m', sub: '3 tramos + USB-C' },
          ],
        },

        reviews: [
          {
            id: 1,
            stars: '★★★★★',
            text:
              '"Tengo hernia discal y limpiar la cerámica de la ducha era un suplicio cada sábado. Con el tubo largo limpio hasta arriba parada recta."',
            author: 'Patricia M. — Guayaquil',
            tag: 'Compra verificada',
          },
          {
            id: 2,
            stars: '★★★★★',
            text:
              '"El cepillo en punta sacó el sarro negro que estaba pegado detrás de las llaves del lavamanos. Llegó en 24 horas y pagué en efectivo."',
            author: 'Gabriela R. — Quito',
            tag: 'Compra verificada',
          },
        ],

        codCard: {
          image: resolveImg(shopify.cod_image, 'cod_door_delivery.jpg'),
          title: 'Compra 100% libre de riesgo',
          desc:
            'No pedimos tarjetas. Despachamos desde nuestra bodega en Guayaquil y pagas al recibir.',
        },
      };
    }

    // --- TopUrgencyTicker.js ---
    const TopUrgencyTicker = {
      name: 'TopUrgencyTicker',
      props: {
        config: { type: Object, required: true },
      },
      template: `
        <div>
          <!-- 1. Barra de anuncio superior (estilo boutique) -->
          <div class="announcement-bar">
            <span>{{ config.announcement.text }}</span>
            <span class="announcement-bar__tag">{{ config.announcement.tag }}</span>
          </div>

          <!-- Cabecera de marca minimalista -->
          <header class="brand-header">
            <div class="brand-logo">{{ config.brandName }}</div>
            <div class="brand-location">Stock: {{ config.stockLeft }} uds</div>
          </header>
        </div>
      `,
    };

    // --- EmotionalHeroMobile.js ---
    const EmotionalHeroMobile = {
      name: 'EmotionalHeroMobile',
      components: { QtyStepper },
      props: {
        config: { type: Object, required: true },
        selectedBundle: { type: Object, required: true },
      },
      emits: ['trigger-order', 'select-bundle-qty'],
      template: `
        <div>
          <!-- 2. Hero Editorial: Cero melodrama, 100% postura y alivio real -->
          <section class="hero-editorial">
            <div class="hero-media">
              <img
                :src="config.hero.image"
                alt="Limpieza de baño de pie sin agacharse"
                fetchpriority="high"
              />
              <span class="hero-floating-pill">{{ config.hero.floatingPill }}</span>
            </div>

            <div class="hero-content">
              <span class="editorial-kicker">{{ config.hero.kicker }}</span>
              <h1 class="editorial-headline">
                {{ config.hero.headlineStart }}<em>{{ config.hero.headlineEm }}</em>
              </h1>
              <p class="editorial-subline">
                {{ config.hero.subline }}
              </p>

              <div class="clean-specs-row">
                <div
                  v-for="(spec, i) in config.hero.specs"
                  :key="i"
                  class="clean-spec"
                >
                  <strong>{{ spec.strong }}</strong>
                  <span>{{ spec.span }}</span>
                </div>
              </div>

              <div class="price-editorial-row">
                <div class="price-main-group">
                  <span class="price-current">\${{ selectedBundle.price.toFixed(2) }}</span>
                  <span class="price-compare">\${{ selectedBundle.compareAtPrice.toFixed(2) }} USD</span>
                </div>
                <span class="price-badge-save">{{ selectedBundle.badge || config.hero.priceBadge }}</span>
              </div>

              <!-- Selector táctil de cantidad en el Hero -->
              <div class="qty-stepper-row">
                <div class="qty-stepper-label">
                  <strong>Cantidad a pedir:</strong>
                  <span>{{ selectedBundle.qty === 1 ? '1 unidad (Kit completo)' : selectedBundle.qty + ' unidades' }}</span>
                </div>
                <QtyStepper
                  :model-value="selectedBundle.qty"
                  :max="config.maxQty"
                  @update:model-value="$emit('select-bundle-qty', $event)"
                />
              </div>

              <button
                type="button"
                class="btn-editorial-primary"
                @click="$emit('trigger-order')"
              >
                <span>{{ config.hero.ctaMain }}</span>
                <small>{{ config.hero.ctaSub }}</small>
              </button>
            </div>
          </section>

          <!-- 3. Cinta de Valores -->
          <div class="trust-strip">
            <span v-for="(val, idx) in config.trustStrip" :key="idx">{{ val }}</span>
          </div>
        </div>
      `,
    };

    // --- ThumbCleanInteractive.js ---
    const ThumbCleanInteractive = {
      name: 'ThumbCleanInteractive',
      props: {
        slider: { type: Object, required: true },
      },
      setup() {
        const pos = ref(50);
        const isDragging = ref(false);
        const wrapperRef = ref(null);
        let autoplayTimer = null;
        let hasInteracted = false;

        const moveSlider = (clientX) => {
          if (!wrapperRef.value) return;
          const rect = wrapperRef.value.getBoundingClientRect();
          let p = ((clientX - rect.left) / rect.width) * 100;
          pos.value = Math.max(5, Math.min(95, Math.round(p)));
        };

        const onPointerDown = (e) => {
          hasInteracted = true;
          isDragging.value = true;
          moveSlider(e.clientX);
        };

        const onPointerMove = (e) => {
          if (!isDragging.value) return;
          moveSlider(e.clientX);
        };

        const onPointerUp = () => {
          isDragging.value = false;
        };

        onMounted(() => {
          window.addEventListener('pointerup', onPointerUp);
          window.addEventListener('pointermove', onPointerMove);

          // Sutil animación introductoria si no ha interactuado
          let dir = -1;
          autoplayTimer = setInterval(() => {
            if (hasInteracted || isDragging.value) return;
            pos.value += dir * 0.8;
            if (pos.value <= 35) dir = 1;
            if (pos.value >= 65) dir = -1;
          }, 50);
        });

        onUnmounted(() => {
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointermove', onPointerMove);
          if (autoplayTimer) clearInterval(autoplayTimer);
        });

        return {
          pos,
          wrapperRef,
          onPointerDown,
        };
      },
      template: `
        <!-- 4. Slider Antes / Después (La mugre real de las juntas) -->
        <section class="section-block section-block--white">
          <span class="editorial-kicker">{{ slider.kicker }}</span>
          <h2 class="section-title">{{ slider.title }}</h2>
          <p class="section-lead">{{ slider.lead }}</p>

          <div
            ref="wrapperRef"
            class="ba-wrapper"
            @pointerdown="onPointerDown"
          >
            <!-- Imagen ANTES (Fondo) -->
            <img
              :src="slider.beforeImg"
              alt="Azulejo con moho antes"
              loading="lazy"
            />

            <!-- Imagen DESPUÉS (Recorte dinámico) -->
            <div
              class="ba-after-layer"
              :style="{ clipPath: 'inset(0 ' + (100 - pos) + '% 0 0)' }"
            >
              <img
                :src="slider.afterImg"
                alt="Azulejo limpio después"
                loading="lazy"
              />
            </div>

            <span class="ba-tag ba-tag--clean">Después (30 seg)</span>
            <span class="ba-tag ba-tag--dirty">Antes</span>

            <div class="ba-handle" :style="{ left: pos + '%' }">
              <div class="ba-circle">↔</div>
            </div>
          </div>

          <p class="ba-caption">{{ slider.caption }}</p>
        </section>
      `,
    };

    // --- VisualZoneTapper.js ---
    const VisualZoneTapper = {
      name: 'VisualZoneTapper',
      props: {
        zones: { type: Object, required: true },
      },
      setup(props) {
        const activeZoneIdx = ref(0);
        return { activeZoneIdx };
      },
      template: `
        <!-- 6. Demostración por Zonas y los 9 Cabezales -->
        <section class="section-block section-block--white">
          <span class="editorial-kicker">{{ zones.kicker }}</span>
          <h2 class="section-title">{{ zones.title }}</h2>

          <div class="zone-pills" role="tablist">
            <button
              v-for="(zone, idx) in zones.list"
              :key="idx"
              type="button"
              class="zone-pill-btn"
              :class="{ active: idx === activeZoneIdx }"
              @click="activeZoneIdx = idx"
            >
              {{ zone.tabLabel }}
            </button>
          </div>

          <div class="zone-showcase">
            <div class="zone-showcase__img">
              <img
                :src="zones.list[activeZoneIdx].img"
                :alt="zones.list[activeZoneIdx].title"
                loading="lazy"
              />
            </div>
            <div class="zone-showcase__info">
              <span class="zone-showcase__tool">{{ zones.list[activeZoneIdx].tool }}</span>
              <h3 class="zone-showcase__title">{{ zones.list[activeZoneIdx].title }}</h3>
              <p class="zone-showcase__text">{{ zones.list[activeZoneIdx].text }}</p>
            </div>
          </div>

          <!-- Grilla Minimalista de los 9 Cabezales -->
          <div class="kit-minimal-box">
            <span class="editorial-kicker">Qué incluye tu caja</span>
            <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--text-espresso); margin-bottom: 4px;">
              Los 9 accesorios intercambiables a presión
            </h3>
            <div class="kit-minimal-grid">
              <div
                v-for="(item, i) in zones.kitGrid"
                :key="i"
                class="kit-cell"
              >
                <strong>{{ item.name }}</strong>
                <span>{{ item.sub }}</span>
              </div>
            </div>
          </div>
        </section>
      `,
    };

    // --- PhysicalReliefSection.js ---
    const PhysicalReliefSection = {
      name: 'PhysicalReliefSection',
      props: {
        pains: { type: Object, required: true },
      },
      template: `
        <!-- 5. Dolores Reales y Tangibles (Sin melodrama) -->
        <section class="section-block">
          <span class="editorial-kicker">{{ pains.kicker }}</span>
          <h2 class="section-title">{{ pains.title }}</h2>
          <p class="section-lead">{{ pains.lead }}</p>

          <div class="pain-editorial-grid">
            <article
              v-for="(card, idx) in pains.cards"
              :key="idx"
              class="pain-editorial-card"
            >
              <div class="pain-editorial-card__img">
                <img :src="card.image" :alt="card.title" loading="lazy" />
              </div>
              <div class="pain-editorial-card__body">
                <span class="pain-number">{{ card.num }}</span>
                <h3 class="pain-editorial-card__title">{{ card.title }}</h3>
                <p class="pain-editorial-card__desc">{{ card.desc }}</p>
                <div class="relief-solution-bar">
                  {{ card.solution }}
                </div>
              </div>
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
      template: `
        <!-- 7. Reseñas Editoriales (Estilo Quote Cards) -->
        <section class="section-block section-block--sand">
          <span class="editorial-kicker">Hogares reales en Ecuador</span>
          <h2 class="section-title">Lo que dicen quienes dejaron de limpiar de rodillas.</h2>

          <div class="editorial-quotes">
            <article
              v-for="rev in reviews"
              :key="rev.id"
              class="quote-card"
            >
              <div>
                <div class="quote-stars">{{ rev.stars }}</div>
                <p class="quote-text">{{ rev.text }}</p>
              </div>
              <div class="quote-meta">
                <strong>{{ rev.author }}</strong>
                <span>{{ rev.tag }}</span>
              </div>
            </article>
          </div>
        </section>
      `,
    };

    // --- ZeroFearCodSection.js ---
    const ZeroFearCodSection = {
      name: 'ZeroFearCodSection',
      components: { QtyStepper },
      props: {
        config: { type: Object, required: true },
        selectedBundle: { type: Object, required: true },
      },
      emits: ['select-bundle-qty', 'trigger-order'],
      template: `
        <!-- 8. Oferta y Pago Contraentrega Editorial -->
        <section class="section-block section-block--white" id="pedir-ahora">
          <span class="editorial-kicker">Selecciona tu kit</span>
          <h2 class="section-title">Recíbelo en tu puerta sin pagos anticipados.</h2>

          <div class="bundle-selector">
            <div
              v-for="pack in config.offers"
              :key="pack.id"
              class="bundle-option"
              :class="{ selected: selectedBundle.qty === pack.qty }"
              @click="$emit('select-bundle-qty', pack.qty)"
            >
              <div class="bundle-left">
                <div class="radio-dot"></div>
                <div>
                  <span class="bundle-title">{{ pack.title }}</span>
                  <span class="bundle-sub">{{ pack.sub }}</span>
                </div>
              </div>
              <div class="bundle-price-col">
                <span class="bundle-price-now">\${{ pack.price.toFixed(2) }}</span>
                <span class="bundle-price-old">\${{ pack.compareAtPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Selector manual de cantidad para agregar más unidades -->
          <div class="qty-stepper-row">
            <div class="qty-stepper-label">
              <strong>¿Deseas agregar más productos?</strong>
              <span>{{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'kit seleccionado' : 'kits seleccionados' }}</span>
            </div>
            <QtyStepper
              :model-value="selectedBundle.qty"
              :max="config.maxQty"
              @update:model-value="$emit('select-bundle-qty', $event)"
            />
          </div>

          <button
            type="button"
            class="btn-editorial-primary"
            @click="$emit('trigger-order')"
          >
            <span>Confirmar Pedido (\${{ selectedBundle.price.toFixed(2) }})</span>
            <small>Pagas únicamente cuando el repartidor te entregue la caja</small>
          </button>

          <div class="cod-editorial-card">
            <img
              :src="config.codCard.image"
              alt="Entrega en puerta"
              loading="lazy"
            />
            <div class="cod-editorial-card__text">
              <strong>{{ config.codCard.title }}</strong>
              <p>{{ config.codCard.desc }}</p>
            </div>
          </div>
        </section>
      `,
    };

    // --- StickyThumbBar.js ---
    const StickyThumbBar = {
      name: 'StickyThumbBar',
      components: { QtyStepper },
      props: {
        config: { type: Object, required: true },
        selectedBundle: { type: Object, required: true },
      },
      emits: ['trigger-order', 'select-bundle-qty'],
      template: `
        <div class="sticky-editorial-bar" role="region" aria-label="Barra fija de pedido rápido">
          <QtyStepper
            compact
            :model-value="selectedBundle.qty"
            :max="config.maxQty"
            @update:model-value="$emit('select-bundle-qty', $event)"
          />

          <div class="sticky-price-info">
            <span>Total al recibir</span>
            <strong>\${{ selectedBundle.price.toFixed(2) }} USD</strong>
          </div>

          <button
            type="button"
            class="sticky-btn"
            @click="$emit('trigger-order')"
          >
            Pedir
          </button>
        </div>
      `,
    };

    // --- App.js ---
    const App = {
      name: 'CepilloMobileLandingApp',
      components: {
        TopUrgencyTicker,
        EmotionalHeroMobile,
        ThumbCleanInteractive,
        PhysicalReliefSection,
        VisualZoneTapper,
        RealFeelingsUgc,
        ZeroFearCodSection,
        StickyThumbBar,
      },
      setup() {
        const config = ref(getProductConfig());
        const selectedQty = ref(1);
        const isModalOpen = ref(false);
        const orderToast = ref(false);

        const formData = ref({
          name: '',
          phone: '',
          address: '',
        });

        const selectedBundle = computed(() => config.value.offerForQty(selectedQty.value));

        const selectBundleQty = (qty) => {
          selectedQty.value = Math.max(1, Math.min(config.value.maxQty, Number(qty) || 1));
          const qtyInput = document.getElementById('shopify-native-qty');
          if (qtyInput) qtyInput.value = String(selectedQty.value);
        };

        const triggerOrder = () => {
          // 1. Si existe app COD instalada en Shopify (Releasit / EasySell)
          const externalCodBtn = document.querySelector(
            '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
          );
          if (externalCodBtn) {
            externalCodBtn.click();
            return;
          }

          // 2. En Shopify: va directo al checkout sin parámetros conflictivos que causen 404
          const variantId = config.value.variantId;
          const qty = selectedBundle.value.qty;

          if (typeof window !== 'undefined' && variantId) {
            // Enlace de carrito directo nativo (sin prefijo /es que causa error en tiendas sin subdominio regional)
            window.location.href = `/cart/${variantId}:${qty}`;
            return;
          }

          // 3. En entorno de vista previa local (preview-mobile.html): abre modal editorial de prueba
          isModalOpen.value = true;
        };

        const closeModal = () => {
          isModalOpen.value = false;
        };

        const submitOrder = (e) => {
          if (e) e.preventDefault();
          closeModal();
          orderToast.value = true;
          setTimeout(() => {
            orderToast.value = false;
          }, 4000);
        };

        return {
          config,
          selectedQty,
          selectedBundle,
          isModalOpen,
          orderToast,
          formData,
          selectBundleQty,
          triggerOrder,
          closeModal,
          submitOrder,
        };
      },
      template: `
        <div class="editorial-shell">
          <!-- 1. Barra de anuncio superior + Cabecera de marca -->
          <TopUrgencyTicker :config="config" />

          <!-- 2. Hero Editorial con selector de cantidad + 3. Cinta de Valores -->
          <EmotionalHeroMobile
            :config="config"
            :selected-bundle="selectedBundle"
            @select-bundle-qty="selectBundleQty"
            @trigger-order="triggerOrder"
          />

          <!-- 4. Slider Antes / Después en moho real -->
          <ThumbCleanInteractive :slider="config.slider" />

          <!-- 5. Dolores Reales y Tangibles -->
          <PhysicalReliefSection :pains="config.pains" />

          <!-- 6. Demostración por Zonas y los 9 Cabezales -->
          <VisualZoneTapper :zones="config.zones" />

          <!-- 7. Reseñas Editoriales (Quote Cards) -->
          <RealFeelingsUgc :reviews="config.reviews" />

          <!-- 8. Oferta de Packs y Pago Contraentrega con selector de cantidad -->
          <ZeroFearCodSection
            :config="config"
            :selected-bundle="selectedBundle"
            @select-bundle-qty="selectBundleQty"
            @trigger-order="triggerOrder"
          />

          <!-- Barra fija inferior editorial con stepper directo -->
          <StickyThumbBar
            :config="config"
            :selected-bundle="selectedBundle"
            @select-bundle-qty="selectBundleQty"
            @trigger-order="triggerOrder"
          />

          <!-- Modal Contraentrega Editorial (para vista previa local) -->
          <div
            class="modal-overlay"
            :class="{ open: isModalOpen }"
            @click.self="closeModal"
          >
            <div class="modal-sheet">
              <button
                type="button"
                class="modal-close"
                @click="closeModal"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
              <span class="editorial-kicker">Pago Contraentrega Ecuador</span>
              <h3 style="font-family: var(--font-serif); font-size: 24px; color: var(--text-espresso); margin-bottom: 16px;">
                Datos para el repartidor
              </h3>

              <form @submit="submitOrder">
                <div class="form-group">
                  <label>Nombre y Apellido</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    required
                    placeholder="Ej. María Fernanda Gómez"
                  />
                </div>
                <div class="form-group">
                  <label>WhatsApp / Celular</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    required
                    placeholder="Ej. 099 123 4567"
                  />
                </div>
                <div class="form-group">
                  <label>Ciudad y Dirección Exacta</label>
                  <input
                    v-model="formData.address"
                    type="text"
                    required
                    placeholder="Ciudad, sector, calle principal y referencia"
                  />
                </div>
                <button
                  type="submit"
                  class="btn-editorial-primary"
                  style="margin-top: 10px;"
                >
                  <span>Finalizar Pedido (\${{ selectedBundle.price.toFixed(2) }})</span>
                  <small>Te confirmaremos el despacho por WhatsApp</small>
                </button>
              </form>
            </div>
          </div>

          <!-- Toast informativo -->
          <div v-if="orderToast" class="editorial-toast">
            <span>✓ ¡Pedido registrado con éxito! Preparando despacho desde Guayaquil.</span>
          </div>
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
