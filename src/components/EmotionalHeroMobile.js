import { ref, computed } from 'vue';
import { SvgIcons } from './SvgIcons.js';

export const EmotionalHeroMobile = {
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
