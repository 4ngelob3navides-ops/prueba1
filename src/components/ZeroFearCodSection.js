import { ref } from 'vue';
import { SvgIcons } from './SvgIcons.js';

export const ZeroFearCodSection = {
  name: 'ZeroFearCodSection',
  props: {
    config: { type: Object, required: true },
    activeVariant: { type: Object, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    totalCompareAt: { type: Number, required: true },
    totalSavings: { type: Number, required: true },
  },
  emits: ['change-qty', 'select-variant', 'trigger-order'],
  setup() {
    const openFaq = ref(0);
    const quickQtys = [1, 2, 3];
    const faqs = [
      {
        q: '¿Tengo que pagar algo por adelantado o poner mi tarjeta?',
        a: 'No. Seleccionas Pago contra entrega al finalizar tu dirección y pagas en efectivo directamente al repartidor cuando te entregue la caja en tu puerta.',
      },
      {
        q: '¿Se detiene el giro si lo presiono contra los azulejos?',
        a: 'Cuenta con torque estable de 300 RPM diseñado para desprender sarro y jabón acumulado sin necesidad de presionar fuerte; la rotación de las cerdas hace el trabajo.',
      },
      {
        q: '¿Cuánto dura la batería y cómo se carga?',
        a: 'Incluye cable USB-C recargable con autonomía de hasta 90 minutos de limpieza continua, suficiente para lavar baños y cocina completos varias veces con una sola carga.',
      },
      {
        q: '¿Desde dónde despachan el pedido?',
        a: 'Todos los pedidos salen revisados desde nuestra bodega local en Guayaquil con envío a domicilio por transportadora.',
      },
    ];

    const toggleFaq = (idx) => {
      openFaq.value = openFaq.value === idx ? -1 : idx;
    };

    return { openFaq, quickQtys, faqs, toggleFaq, SvgIcons };
  },
  template: `
    <section class="section-block section-block--alt" id="pedir-ahora">
      <!-- Garantía tangible paso a paso -->
      <div class="cod-clean-card">
        <div class="cod-clean-card__media">
          <img :src="config.codTrust.image" alt="Entrega en puerta con pago en efectivo" loading="lazy" />
        </div>

        <div class="cod-clean-card__content">
          <span class="section-eyebrow">COMPRA SIN RIESGO · BODEGA {{ config.warehouseCity.toUpperCase() }}</span>
          <h2 class="cod-clean-title">Así funciona tu entrega a domicilio</h2>

          <div class="cod-steps-list">
            <div v-for="(step, idx) in config.codTrust.steps" :key="idx" class="cod-step-row">
              <div class="cod-step-icon" v-html="SvgIcons[step.iconKey] || SvgIcons.shieldCheck"></div>
              <div class="cod-step-text">
                <strong>{{ step.stepNum }}: {{ step.title }}</strong>
                <p>{{ step.sub }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selector de variantes (si existen en Shopify) y cantidad exacta -->
      <div class="bundle-clean-box">
        <h3 class="bundle-clean-box__title">{{ config.title }}</h3>

        <!-- Variantes reales de Shopify si creaste más de 1 en tu panel -->
        <div v-if="config.hasMultipleVariants" class="bundle-clean-list">
          <div
            v-for="v in config.variants"
            :key="v.id"
            role="button"
            tabindex="0"
            class="bundle-option-clean"
            :class="{ 'bundle-option-clean--active': v.id === activeVariant.id }"
            @click="$emit('select-variant', v.id)"
          >
            <div class="bundle-option-clean__main">
              <div class="radio-circle">
                <span class="radio-circle__inner"></span>
              </div>
              <div class="bundle-option-clean__desc">
                <strong>{{ v.title }}</strong>
                <small>{{ v.available ? 'Disponible para despacho' : 'Agotado' }}</small>
              </div>
              <div class="bundle-option-clean__price">
                <span class="p-now">\${{ v.price.toFixed(2) }}</span>
                <span v-if="v.compareAtPrice > v.price" class="p-old">
                  \${{ v.compareAtPrice.toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Botones rápidos de cantidad (1, 2, 3) + control exacto (- / +) -->
        <div class="qty-quick-grid">
          <button
            v-for="q in quickQtys"
            :key="q"
            type="button"
            class="qty-quick-card"
            :class="{ 'qty-quick-card--active': quantity === q }"
            @click="$emit('change-qty', q)"
          >
            <strong>{{ q }} {{ q === 1 ? 'Unidad' : 'Unidades' }}</strong>
            <span>\${{ (activeVariant.price * q).toFixed(2) }} {{ config.currency }}</span>
          </button>
        </div>

        <div class="qty-selector-row qty-selector-row--boxed">
          <div>
            <span class="qty-control-label">Ajustar unidades:</span>
            <small class="qty-unit-hint">\${{ activeVariant.price.toFixed(2) }} c/u</small>
          </div>
          <div class="qty-stepper">
            <button
              type="button"
              class="qty-stepper__btn"
              :disabled="quantity <= 1"
              aria-label="Restar unidad"
              @click="$emit('change-qty', quantity - 1)"
              v-html="SvgIcons.minus"
            ></button>
            <span class="qty-stepper__val">{{ quantity }}</span>
            <button
              type="button"
              class="qty-stepper__btn"
              aria-label="Sumar unidad"
              @click="$emit('change-qty', quantity + 1)"
              v-html="SvgIcons.plus"
            ></button>
          </div>
        </div>

        <div class="order-summary-line">
          <span>Total del pedido ({{ quantity }} {{ quantity === 1 ? 'ud.' : 'uds.' }}):</span>
          <div class="order-summary-line__prices">
            <span v-if="totalCompareAt > totalPrice" class="p-old">\${{ totalCompareAt.toFixed(2) }}</span>
            <strong>\${{ totalPrice.toFixed(2) }} {{ config.currency }}</strong>
          </div>
        </div>

        <button
          type="button"
          class="btn-eucalyptus"
          :disabled="!activeVariant.available"
          @click="$emit('trigger-order')"
        >
          <span class="btn-eucalyptus__main">{{ config.hero.ctaText }}</span>
          <span class="btn-eucalyptus__sub">
            Ir a finalizar entrega · \${{ totalPrice.toFixed(2) }} {{ config.currency }}
          </span>
        </button>
      </div>

      <!-- Preguntas frecuentes claras -->
      <div class="faq-clean">
        <h3 class="subsection-heading">Preguntas frecuentes</h3>
        <div
          v-for="(f, idx) in faqs"
          :key="idx"
          class="faq-row"
          :class="{ 'faq-row--open': openFaq === idx }"
        >
          <button type="button" class="faq-row__q" @click="toggleFaq(idx)">
            <span>{{ f.q }}</span>
            <span class="faq-row__sign">{{ openFaq === idx ? '−' : '+' }}</span>
          </button>
          <p v-if="openFaq === idx" class="faq-row__a">{{ f.a }}</p>
        </div>
      </div>
    </section>
  `,
};
