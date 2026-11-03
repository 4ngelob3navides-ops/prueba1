import { reactive, ref } from 'vue';
import { SvgIcons } from './SvgIcons.js';
import { QtyStepper } from './QtyStepper.js';

export const QuickOrderModal = {
  name: 'QuickOrderModal',
  components: { QtyStepper },
  props: {
    isOpen: { type: Boolean, required: true },
    config: { type: Object, required: true },
    selectedBundle: { type: Object, required: true },
    isSubmitting: { type: Boolean, default: false },
  },
  emits: ['close', 'select-bundle-qty', 'proceed-shopify'],
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
      emit('proceed-shopify', { ...form, qty: props.selectedBundle.qty });
    };

    return { form, errorMsg, handleConfirm, SvgIcons };
  },
  template: `
    <transition name="fade-modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-sheet" role="dialog" aria-modal="true">
          <button type="button" class="modal-close" @click="$emit('close')" aria-label="Cerrar">✕</button>

          <div class="modal-head">
            <span class="trust-badge-blue">
              <span class="modal-badge__icon" v-html="SvgIcons.shieldCheck"></span>
              <span>Pagas solo cuando el repartidor te lo entregue</span>
            </span>
            <h3>Datos de entrega a domicilio</h3>
          </div>

          <div class="modal-order-box">
            <img :src="config.unboxingKit.flatlayImage" alt="Kit Cepillo 9 en 1 Pro" class="modal-thumb" />
            <div class="modal-order-box__text">
              <strong>{{ selectedBundle.title }}</strong>
              <small>{{ selectedBundle.savingsText }}</small>
            </div>
            <div class="modal-order-box__price">\${{ selectedBundle.price.toFixed(2) }}</div>
          </div>

          <div class="qty-row qty-row--boxed">
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
              <input v-model="form.address" type="text" placeholder="Calle principal, intersección y color de casa" autocomplete="street-address" required />
            </label>

            <p v-if="errorMsg" class="modal-error">{{ errorMsg }}</p>

            <button type="submit" class="btn-cta-vibrant pulse-gentle" :disabled="isSubmitting">
              <span class="btn-cta-vibrant__main">
                {{ isSubmitting ? 'Procesando entrega...' : 'Confirmar pedido contraentrega' }}
              </span>
              <span class="btn-cta-vibrant__sub">
                Total a pagar al recibir: \${{ selectedBundle.price.toFixed(2) }} {{ config.currency }}
              </span>
            </button>

            <p class="cta-trust-note">
              🚚 Despacho garantizado en 24-48h desde Bodega Guayaquil
            </p>
          </form>
        </div>
      </div>
    </transition>
  `,
};
