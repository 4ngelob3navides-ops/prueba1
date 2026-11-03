export const StickyThumbBar = {
  name: 'StickyThumbBar',
  props: {
    config: { type: Object, required: true },
    selectedBundle: { type: Object, required: true },
  },
  emits: ['trigger-order'],
  template: `
    <div class="sticky-editorial-bar" role="region" aria-label="Barra fija de pedido rápido">
      <div class="sticky-price-info">
        <span>Total al recibir</span>
        <strong>\${{ selectedBundle.price.toFixed(2) }} USD</strong>
      </div>
      <button
        type="button"
        class="sticky-btn"
        @click="$emit('trigger-order')"
      >
        Pedir y Pagar en Casa
      </button>
    </div>
  `,
};
