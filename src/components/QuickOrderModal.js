import { reactive, ref } from 'vue';
import { SvgIcons } from './SvgIcons.js';

export const QuickOrderModal = {
  name: 'QuickOrderModal',
  props: {
    isOpen: { type: Boolean, required: true },
    config: { type: Object, required: true },
    activeVariant: { type: Object, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isSubmitting: { type: Boolean, default: false },
  },
  emits: ['close', 'change-qty', 'proceed-shopify'],
  setup(props, { emit }) {
    const form = reactive({
      fullName: '',
      phone: '',
      city: '',
      address: '',
    });
    const errorMsg = ref('');

    const handleConfirm = () => {
      if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
        errorMsg.value = 'Por favor completa nombre, celular, ciudad y dirección de entrega.';
        return;
      }
      errorMsg.value = '';
      emit('proceed-shopify', { ...form, qty: props.quantity });
    };

    return { form, errorMsg, handleConfirm, SvgIcons };
  },
  template: `
    <transition name="fade-modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-sheet" role="dialog" aria-modal="true">
          <button type="button" class="modal-close" @click="$emit('close')" aria-label="Cerrar">✕</button>

          <div class="modal-head">
            <span class="modal-badge">
              <span class="modal-badge__icon" v-html="SvgIcons.shieldCheck"></span>
              <span>Pago al recibir</span>
            </span>
            <h3>Datos de entrega a domicilio</h3>
          </div>

          <div class="modal-order-box">
            <img :src="config.unboxingKit.flatlayImage" alt="Kit Cepillo 9 en 1 Pro" class="modal-thumb" />
            <div class="modal-order-box__text">
              <strong>{{ config.title }}</strong>
              <span v-if="!activeVariant.isDefaultTitle">{{ activeVariant.title }}</span>
              <span v-else>Bodega {{ config.warehouseCity }}</span>
            </div>
            <div class="modal-order-box__price">\${{ totalPrice.toFixed(2) }}</div>
          </div>

          <!-- También permite cambiar cantidad aquí dentro -->
          <div class="qty-selector-row qty-selector-row--modal">
            <span class="qty-control-label">Cantidad de unidades:</span>
            <div class="qty-stepper">
              <button
                type="button"
                class="qty-stepper__btn"
                :disabled="quantity <= 1"
                @click="$emit('change-qty', quantity - 1)"
                v-html="SvgIcons.minus"
              ></button>
              <span class="qty-stepper__val">{{ quantity }}</span>
              <button
                type="button"
                class="qty-stepper__btn"
                @click="$emit('change-qty', quantity + 1)"
                v-html="SvgIcons.plus"
              ></button>
            </div>
          </div>

          <form class="modal-form" @submit.prevent="handleConfirm">
            <label class="clean-field">
              <span>Nombre y apellido</span>
              <input v-model="form.fullName" type="text" placeholder="Ej. María Fernanda López" autocomplete="name" required />
            </label>

            <label class="clean-field">
              <span>Número de celular / WhatsApp</span>
              <input v-model="form.phone" type="tel" inputmode="tel" placeholder="Ej. 099 123 4567" autocomplete="tel" required />
            </label>

            <label class="clean-field">
              <span>Ciudad y sector</span>
              <input v-model="form.city" type="text" placeholder="Ej. Guayaquil, Urdesa" autocomplete="address-level2" required />
            </label>

            <label class="clean-field">
              <span>Dirección exacta y referencia</span>
              <input v-model="form.address" type="text" placeholder="Calle principal, intersección y referencia" autocomplete="street-address" required />
            </label>

            <p v-if="errorMsg" class="modal-error">{{ errorMsg }}</p>

            <button type="submit" class="btn-eucalyptus" :disabled="isSubmitting">
              <span class="btn-eucalyptus__main">
                {{ isSubmitting ? 'Abriendo resumen...' : 'Continuar con el pedido' }}
              </span>
              <span class="btn-eucalyptus__sub">
                {{ quantity }} {{ quantity === 1 ? 'unidad' : 'unidades' }} · Total \${{ totalPrice.toFixed(2) }} {{ config.currency }}
              </span>
            </button>
          </form>
        </div>
      </div>
    </transition>
  `,
};
