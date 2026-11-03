import { SvgIcons } from './SvgIcons.js';

// Selector táctil de cantidad (− N +) reutilizable en Hero, sección de pedido, barra fija y modal
export const QtyStepper = {
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
