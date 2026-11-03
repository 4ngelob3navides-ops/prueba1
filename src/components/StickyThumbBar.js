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
