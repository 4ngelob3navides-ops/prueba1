import { SvgIcons } from './SvgIcons.js';

export const StickyThumbBar = {
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
