import { QtyStepper } from './QtyStepper.js';

export const StickyThumbBar = {
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
