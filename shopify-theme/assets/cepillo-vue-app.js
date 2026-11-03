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
    // Selector táctil de cantidad (− N +) reutilizable en Hero, sección de pedido, barra fija y modal
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
        return { change, SvgIcons };
      },
      template: `
        <div class="qty-stepper" :class="{ 'qty-stepper--compact': compact }">
          <button
            type="button"
            class="qty-stepper__btn"
            :disabled="modelValue <= 1"
            aria-label="Quitar una unidad"
            @click="change(-1)"
            v-html="SvgIcons.minus"
          ></button>
          <span class="qty-stepper__val" aria-live="polite">{{ modelValue }}</span>
          <button
            type="button"
            class="qty-stepper__btn"
            :disabled="modelValue >= max"
            aria-label="Agregar una unidad"
            @click="change(1)"
            v-html="SvgIcons.plus"
          ></button>
        </div>
      `,
    };

    // --- productConfig.js ---
    // Configuración central del producto — Neuromarketing & Alta Conversión
    // Bundles con descuento por volumen, anclaje cognitivo y respaldo Guayaquil
    function getProductConfig() {
      const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
      const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

      const resolveImg = (customUrl, filename) => {
        if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
          return customUrl;
        }
        return `${assetsBase}${filename}`;
      };

      // Precio base y precio tachado: vienen del producto en Shopify (Admin → Productos)
      const basePrice = Number(shopify.price || 35.0);
      const baseCompareAt =
        Number(shopify.compareAtPrice) > basePrice ? Number(shopify.compareAtPrice) : 55.0;

      const maxQty = Math.max(1, Math.min(20, Number(shopify.maxQty || 10)));

      const money = (n) => `$${Number(n).toFixed(2)}`;

      // Precio simple: precio de Shopify × cantidad (sin descuentos por volumen)
      const offerForQty = (qty) => {
        const q = Math.max(1, Math.min(maxQty, Number(qty) || 1));
        const price = Number((basePrice * q).toFixed(2));
        const compareAtPrice = Number((baseCompareAt * q).toFixed(2));
        const totalSavings = Math.max(0, compareAtPrice - price);

        return {
          qty: q,
          title: `${q} ${q === 1 ? 'Kit' : 'Kits'} Cepillo 9 en 1 Pro`,
          price,
          compareAtPrice,
          savingsText: `Ahorras ${money(totalSavings)} hoy`,
          unitPriceText: `${money(basePrice)} c/u`,
        };
      };

      return {
        title: shopify.title || 'Cepillo Eléctrico 9 en 1 Pro',
        handle: shopify.handle || 'cepillo-electrico-9-en-1-pro',
        sku: shopify.sku || '208333',
        variantId: shopify.variantId || null,
        currency: shopify.currency || 'USD',
        basePrice,
        baseCompareAt,
        maxQty,
        offerForQty,
        stockLeft: Number(shopify.stockLeft || 14),
        warehouseCity: shopify.warehouseCity || 'Guayaquil',
        whatsappNumber: shopify.whatsappNumber || '',

        hero: {
          eyebrow: 'Cuidado articular y limpieza sin esfuerzo',
          headline:
            'Termina de limpiar el baño sin que te duela la cintura ni poner las rodillas en el piso frío.',
          subline:
            'El cepillo eléctrico que gira a 300 RPM: la máquina hace la fuerza y tú limpias de pie en 10 minutos.',
          socialProof: '4.9/5 ⭐ (Más de 1,200 familias en Ecuador ya lo usan)',
          ctaText: 'Pedir ahora y pagar al recibir',
          ctaSubtext: '🚚 Despacho garantizado en 24-48h desde Bodega Guayaquil · Pagas solo al recibir en casa',
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
          subline: 'Kit completo con motor recargable de 25W, 2 tubos de extensión de aluminio y los 9 accesorios de limpieza.',
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
            '1 Mango motorizado inalámbrico (Motor 25W de alto torque a 300 RPM)',
            '2 Varas extensibles ajustables hasta 1.20 m de largo',
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
              title: 'Haces tu pedido hoy',
              sub: 'Eliges cuántas unidades deseas sin ingresar tarjetas de crédito.',
            },
            {
              iconKey: 'truck',
              stepNum: 'Paso 2',
              title: 'Despacho local 24-48h',
              sub: 'Salida directa desde bodega Guayaquil con stock limitado garantizado hoy.',
            },
            {
              iconKey: 'cashHand',
              stepNum: 'Paso 3',
              title: 'Revisas y pagas en mano',
              sub: 'El repartidor toca tu puerta, verificas tu paquete y pagas en efectivo.',
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
      components: { QtyStepper },
      props: {
        config: { type: Object, required: true },
        selectedBundle: { type: Object, required: true },
      },
      emits: ['trigger-order', 'select-bundle-qty'],
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

          <!-- Bloque editorial claro: Patrón F de eye-tracking -->
          <div class="hero-clean__body">
            <!-- 1. Cuadrante de Primer Impacto: Título + Prueba Social Masiva -->
            <div class="hero-meta-row">
              <span class="clinical-eyebrow">{{ config.hero.eyebrow }}</span>
            </div>

            <h1 class="hero-clean__headline">
              {{ config.hero.headline }}
            </h1>

            <div class="social-proof-bar">
              <span class="social-proof-stars">★★★★★</span>
              <span class="social-proof-text">{{ config.hero.socialProof }}</span>
            </div>

            <p class="hero-clean__subline">
              {{ config.hero.subline }}
            </p>

            <!-- Micro-badges concretos de confianza -->
            <div class="spec-pills">
              <div class="spec-pill">
                <span class="spec-pill__icon" v-html="SvgIcons.spine"></span>
                <span>Extensible hasta 1.2 m (Espalda 100% recta)</span>
              </div>
              <div class="spec-pill">
                <span class="spec-pill__icon" v-html="SvgIcons.battery"></span>
                <span>Motor 25W alto torque · Batería USB-C</span>
              </div>
              <div class="spec-pill">
                <span class="spec-pill__icon" v-html="SvgIcons.shieldCheck"></span>
                <span>Pago al recibir en efectivo en tu puerta</span>
              </div>
            </div>

            <!-- 2. Bloque de Anclaje de Precios (Anchoring Effect) + Cantidad -->
            <div class="price-clean-card">
              <!-- Cantidad libre: cualquier número de unidades -->
              <div class="qty-row">
                <div class="qty-row__text">
                  <strong>Cantidad</strong>
                  <small>{{ selectedBundle.unitPriceText }}</small>
                </div>
                <QtyStepper
                  :model-value="selectedBundle.qty"
                  :max="config.maxQty"
                  @update:model-value="$emit('select-bundle-qty', $event)"
                />
              </div>

              <!-- Total con Anclaje Visual Destacado -->
              <div class="price-anchor-display">
                <div class="price-anchor-display__left">
                  <span class="price-anchor-label">Total a pagar al recibir:</span>
                  <div class="price-numbers-row">
                    <span class="price-anchor-old">\${{ selectedBundle.compareAtPrice.toFixed(2) }}</span>
                    <span class="price-anchor-now">\${{ selectedBundle.price.toFixed(2) }}</span>
                    <span class="price-currency-tag">{{ config.currency }}</span>
                  </div>
                </div>
                <span class="price-savings-pill">{{ selectedBundle.savingsText }}</span>
              </div>

              <!-- Botón Principal Von Restorff (Naranja Cálido de Alto Contraste con Microanimación) -->
              <button
                type="button"
                class="btn-cta-vibrant pulse-gentle"
                @click="$emit('trigger-order')"
              >
                <span class="btn-cta-vibrant__main">{{ config.hero.ctaText }}</span>
                <span class="btn-cta-vibrant__sub">
                  {{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'kit completo' : 'kits completos' }} · Total \${{ selectedBundle.price.toFixed(2) }} {{ config.currency }}
                </span>
              </button>

              <!-- Microcopy de Respaldo y Garantía -->
              <p class="cta-trust-note">
                {{ config.hero.ctaSubtext }}
              </p>
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
      components: { QtyStepper },
      props: {
        config: { type: Object, required: true },
        selectedBundle: { type: Object, required: true },
      },
      emits: ['select-bundle-qty', 'trigger-order'],
      setup() {
        const openFaq = ref(0);
        const faqs = [
          {
            q: '¿Se detiene el giro si lo presiono contra los azulejos?',
            a: 'No. Cuenta con un motor de 25W de alto torque diseñado para mantener la rotación a 300 RPM incluso aplicando presión sobre la superficie, garantizando que la máquina haga la fuerza y no tus brazos.',
          },
          {
            q: '¿Tengo que pagar algo por adelantado o poner mi tarjeta?',
            a: 'No. Seleccionas Pago contra entrega al finalizar tu dirección y pagas en efectivo directamente al repartidor cuando te entregue la caja en tu puerta.',
          },
          {
            q: '¿Cuánto dura la batería y cómo se carga?',
            a: 'Incluye cable USB-C recargable con autonomía de hasta 90 minutos de limpieza continua, suficiente para lavar baños y cocina completos varias veces con una sola carga.',
          },
          {
            q: '¿Desde dónde despachan el pedido?',
            a: 'Todos los pedidos salen revisados desde nuestra bodega local en Guayaquil con envío garantizado en 24-48 horas por transportadora a todo el país.',
          },
        ];

        const toggleFaq = (idx) => {
          openFaq.value = openFaq.value === idx ? -1 : idx;
        };

        return { openFaq, faqs, toggleFaq, SvgIcons };
      },
      template: `
        <section class="section-block section-block--alt" id="pedir-ahora">
          <!-- Garantía tangible paso a paso en Azul Cobalto de Seguridad -->
          <div class="cod-clean-card">
            <div class="cod-clean-card__media">
              <img :src="config.codTrust.image" alt="Entrega en puerta con pago en efectivo" loading="lazy" />
            </div>

            <div class="cod-clean-card__content">
              <span class="trust-badge-blue">COMPRA SIN RIESGO · BODEGA {{ config.warehouseCity.toUpperCase() }}</span>
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

          <!-- Bloque de Pedido Directo: Precio de Shopify × Cantidad -->
          <div class="bundle-clean-box">
            <div class="bundle-clean-header">
              <span class="trust-badge-blue">PRECIO DE OFERTA HOY</span>
              <h3 class="bundle-clean-box__title">{{ config.title }}</h3>
            </div>

            <div class="qty-row qty-row--boxed">
              <div class="qty-row__text">
                <strong>Cantidad de unidades</strong>
                <small>{{ selectedBundle.unitPriceText }} · Kit completo 9 en 1</small>
              </div>
              <QtyStepper
                :model-value="selectedBundle.qty"
                :max="config.maxQty"
                @update:model-value="$emit('select-bundle-qty', $event)"
              />
            </div>

            <div class="price-anchor-display">
              <div class="price-anchor-display__left">
                <span class="price-anchor-label">
                  Total ({{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'unidad' : 'unidades' }}):
                </span>
                <div class="price-numbers-row">
                  <span class="price-anchor-old">\${{ selectedBundle.compareAtPrice.toFixed(2) }}</span>
                  <span class="price-anchor-now">\${{ selectedBundle.price.toFixed(2) }}</span>
                  <span class="price-currency-tag">{{ config.currency }}</span>
                </div>
              </div>
              <span class="price-savings-pill">{{ selectedBundle.savingsText }}</span>
            </div>

            <!-- Gatillo de Escasez y Despacho Inmediato -->
            <div class="urgency-dispatch-notice">
              <span class="dispatch-truck-icon" v-html="SvgIcons.truck"></span>
              <span><strong>Despacho garantizado en 24-48h desde Bodega Guayaquil</strong> (Stock limitado disponible para envío hoy).</span>
            </div>

            <!-- Botón Principal Von Restorff -->
            <button
              type="button"
              class="btn-cta-vibrant pulse-gentle"
              @click="$emit('trigger-order')"
            >
              <span class="btn-cta-vibrant__main">{{ config.hero.ctaText }}</span>
              <span class="btn-cta-vibrant__sub">
                {{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'kit' : 'kits' }} · Total \${{ selectedBundle.price.toFixed(2) }} {{ config.currency }}
              </span>
            </button>

            <p class="cta-trust-note">
              🚚 Sin tarjeta de crédito · Pagas únicamente cuando el mensajero te entregue el producto
            </p>
          </div>

          <!-- Preguntas frecuentes con Objeción del Torque Resuelta -->
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
      components: { QtyStepper },
      props: {
        config: { type: Object, required: true },
        selectedBundle: { type: Object, required: true },
      },
      emits: ['trigger-order', 'select-bundle-qty'],
      template: `
        <div class="sticky-clean-bar" role="region" aria-label="Barra rápida de pedido">
          <div class="sticky-clean-bar__inner">
            <QtyStepper
              compact
              :model-value="selectedBundle.qty"
              :max="config.maxQty"
              @update:model-value="$emit('select-bundle-qty', $event)"
            />

            <div class="sticky-bundle-info">
              <span class="sticky-price-old">\${{ selectedBundle.compareAtPrice.toFixed(2) }}</span>
              <strong class="sticky-price-now">\${{ selectedBundle.price.toFixed(2) }}</strong>
            </div>

            <button
              type="button"
              class="sticky-cta-vibrant pulse-gentle"
              @click="$emit('trigger-order')"
            >
              <span>Pedir ahora</span>
              <small>Pagas en casa</small>
            </button>
          </div>
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
        VisualZoneTapper,
        PhysicalReliefSection,
        RealFeelingsUgc,
        ZeroFearCodSection,
        StickyThumbBar,
      },
      setup() {
        const config = ref(getProductConfig());
        const selectedQty = ref(1);
        const orderSuccessToast = ref(false);

        const selectedBundle = computed(() => config.value.offerForQty(selectedQty.value));

        const selectBundleQty = (qty) => {
          selectedQty.value = Math.max(1, Math.min(config.value.maxQty, Number(qty) || 1));
          const qtyInput = document.getElementById('shopify-native-qty');
          if (qtyInput) qtyInput.value = String(selectedQty.value);
        };

        const triggerOrder = () => {
          // 1. Si en el futuro instalas una app COD en Shopify (ej. Releasit / EasySell), la dispara directo
          const externalCodBtn = document.querySelector(
            '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
          );
          if (externalCodBtn) {
            externalCodBtn.click();
            return;
          }

          // 2. En Shopify: va directo al Checkout oficial en español con la cantidad elegida (sin formularios intermedios)
          const variantId = config.value.variantId;
          const qty = selectedBundle.value.qty;

          if (typeof window !== 'undefined' && variantId) {
            const params = new URLSearchParams();
            params.set('locale', 'es');
            params.set('checkout[shipping_address][country]', 'EC');
            window.location.href = `/cart/${variantId}:${qty}?${params.toString()}`;
            return;
          }

          // 3. Solo en preview-mobile.html local (sin servidor Shopify) muestra aviso informativo
          orderSuccessToast.value = true;
          setTimeout(() => {
            orderSuccessToast.value = false;
          }, 4000);
        };

        return {
          config,
          selectedQty,
          selectedBundle,
          orderSuccessToast,
          selectBundleQty,
          triggerOrder,
        };
      },
      template: `
        <div class="mobile-shell">
          <TopUrgencyTicker :config="config" />

          <main class="mobile-main">
            <!-- Hero: Eye-Tracking en F + Anchoring + Cantidad + Botón Naranja Vibrante -->
            <EmotionalHeroMobile
              :config="config"
              :selected-bundle="selectedBundle"
              @select-bundle-qty="selectBundleQty"
              @trigger-order="triggerOrder"
            />

            <!-- Slider Interactivo: Antes vs Después en Sarro Real -->
            <ThumbCleanInteractive :slider="config.slider" />

            <!-- Unboxing Transparente + 9 Cabezales -->
            <VisualZoneTapper :kit="config.unboxingKit" />

            <!-- Alivio Físico: Manos sin químicos a 1 m -->
            <PhysicalReliefSection :relief="config.physicalRelief" />

            <!-- Prueba Social WhatsApp Guayaquil / Ecuador -->
            <RealFeelingsUgc :reviews="config.whatsappReviews" />

            <!-- Paso a Paso + Selector de Cantidad + FAQ Torque 25W -->
            <ZeroFearCodSection
              :config="config"
              :selected-bundle="selectedBundle"
              @select-bundle-qty="selectBundleQty"
              @trigger-order="triggerOrder"
            />
          </main>

          <footer class="clean-footer">
            <p>Despacho local desde Bodega {{ config.warehouseCity }} · Pago contra entrega</p>
            <small>{{ config.title }} · Ref. {{ config.sku }}</small>
          </footer>

          <!-- Sticky CTA Fijo con Naranja Vibrante Continuo -->
          <StickyThumbBar
            :config="config"
            :selected-bundle="selectedBundle"
            @select-bundle-qty="selectBundleQty"
            @trigger-order="triggerOrder"
          />

          <transition name="fade-modal">
            <div v-if="orderSuccessToast" class="clean-toast">
              Vista previa local: Iría directo al Checkout de Shopify con {{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'unidad' : 'unidades' }} (\${{ selectedBundle.price.toFixed(2) }} {{ config.currency }}).
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
