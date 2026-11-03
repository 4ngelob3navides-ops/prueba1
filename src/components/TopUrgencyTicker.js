import { SvgIcons } from './SvgIcons.js';

export const TopUrgencyTicker = {
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
