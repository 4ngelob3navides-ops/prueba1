import { QtyStepper } from './QtyStepper.js';

export const EmotionalHeroMobile = {
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

          <!-- Micro-copys de seguridad y confianza inmediata (Auditoría CRO) -->
          <div class="hero-trust-badges" v-if="config.trustBadges">
            <div
              v-for="(badge, bIdx) in config.trustBadges"
              :key="bIdx"
              class="hero-trust-badge-item"
            >
              <span class="hero-trust-badge-icon">✓</span>
              <div class="hero-trust-badge-text">
                <strong>{{ badge.title }}:</strong> {{ badge.text }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Cinta de Valores -->
      <div class="trust-strip">
        <span v-for="(val, idx) in config.trustStrip" :key="idx">{{ val }}</span>
      </div>
    </div>
  `,
};
