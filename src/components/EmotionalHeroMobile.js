import { ref, computed } from 'vue';
import { SvgIcons } from './SvgIcons.js';
import { QtyStepper } from './QtyStepper.js';

export const EmotionalHeroMobile = {
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
