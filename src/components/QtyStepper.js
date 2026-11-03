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
    return { change };
  },
  template: `
    <div class="qty-stepper" :class="{ 'qty-stepper--compact': compact }">
      <button
        type="button"
        class="qty-stepper__btn"
        :disabled="modelValue <= 1"
        aria-label="Quitar una unidad"
        @click="change(-1)"
      >
        −
      </button>
      <span class="qty-stepper__val">{{ modelValue }}</span>
      <button
        type="button"
        class="qty-stepper__btn"
        :disabled="modelValue >= max"
        aria-label="Agregar una unidad"
        @click="change(1)"
      >
        +
      </button>
    </div>
  `,
};
