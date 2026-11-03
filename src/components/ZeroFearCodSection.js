import { ref } from 'vue';
import { SvgIcons } from './SvgIcons.js';
import { QtyStepper } from './QtyStepper.js';

export const ZeroFearCodSection = {
  name: 'ZeroFearCodSection',
  components: { QtyStepper },
  props: {
    config: { type: Object, required: true },
    selectedBundle: { type: Object, required: true },
  },
  emits: ['select-bundle-qty', 'trigger-order'],
  setup() {
    const openFaq = ref(0);
    const faqs = [
      {
        q: '¿Se detiene el giro si lo presiono contra los azulejos?',
        a: 'No. Cuenta con un motor de 25W de alto torque diseñado para mantener la rotación a 300 RPM incluso aplicando presión sobre la superficie, garantizando que la máquina haga la fuerza y no tus brazos.',
      },
      {
        q: '¿Tengo que pagar algo por adelantado o poner mi tarjeta?',
        a: 'No. Seleccionas Pago contra entrega al finalizar tu dirección y pagas en efectivo directamente al repartidor cuando te entregue la caja en tu puerta.',
      },
      {
        q: '¿Cuánto dura la batería y cómo se carga?',
        a: 'Incluye cable USB-C recargable con autonomía de hasta 90 minutos de limpieza continua, suficiente para lavar baños y cocina completos varias veces con una sola carga.',
      },
      {
        q: '¿Desde dónde despachan el pedido?',
        a: 'Todos los pedidos salen revisados desde nuestra bodega local en Guayaquil con envío garantizado en 24-48 horas por transportadora a todo el país.',
      },
    ];

    const toggleFaq = (idx) => {
      openFaq.value = openFaq.value === idx ? -1 : idx;
    };

    return { openFaq, faqs, toggleFaq, SvgIcons };
  },
  template: `
    <section class="section-block section-block--alt" id="pedir-ahora">
      <!-- Garantía tangible paso a paso en Azul Cobalto de Seguridad -->
      <div class="cod-clean-card">
        <div class="cod-clean-card__media">
          <img :src="config.codTrust.image" alt="Entrega en puerta con pago en efectivo" loading="lazy" />
        </div>

        <div class="cod-clean-card__content">
          <span class="trust-badge-blue">COMPRA SIN RIESGO · BODEGA {{ config.warehouseCity.toUpperCase() }}</span>
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

      <!-- Bloque de Pedido Directo: Precio de Shopify × Cantidad -->
      <div class="bundle-clean-box">
        <div class="bundle-clean-header">
          <span class="trust-badge-blue">PRECIO DE OFERTA HOY</span>
          <h3 class="bundle-clean-box__title">{{ config.title }}</h3>
        </div>

        <div class="qty-row qty-row--boxed">
          <div class="qty-row__text">
            <strong>Cantidad de unidades</strong>
            <small>{{ selectedBundle.unitPriceText }} · Kit completo 9 en 1</small>
          </div>
          <QtyStepper
            :model-value="selectedBundle.qty"
            :max="config.maxQty"
            @update:model-value="$emit('select-bundle-qty', $event)"
          />
        </div>

        <div class="price-anchor-display">
          <div class="price-anchor-display__left">
            <span class="price-anchor-label">
              Total ({{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'unidad' : 'unidades' }}):
            </span>
            <div class="price-numbers-row">
              <span class="price-anchor-old">\${{ selectedBundle.compareAtPrice.toFixed(2) }}</span>
              <span class="price-anchor-now">\${{ selectedBundle.price.toFixed(2) }}</span>
              <span class="price-currency-tag">{{ config.currency }}</span>
            </div>
          </div>
          <span class="price-savings-pill">{{ selectedBundle.savingsText }}</span>
        </div>

        <!-- Gatillo de Escasez y Despacho Inmediato -->
        <div class="urgency-dispatch-notice">
          <span class="dispatch-truck-icon" v-html="SvgIcons.truck"></span>
          <span><strong>Despacho garantizado en 24-48h desde Bodega Guayaquil</strong> (Stock limitado disponible para envío hoy).</span>
        </div>

        <!-- Botón Principal Von Restorff -->
        <button
          type="button"
          class="btn-cta-vibrant pulse-gentle"
          @click="$emit('trigger-order')"
        >
          <span class="btn-cta-vibrant__main">{{ config.hero.ctaText }}</span>
          <span class="btn-cta-vibrant__sub">
            {{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'kit' : 'kits' }} · Total \${{ selectedBundle.price.toFixed(2) }} {{ config.currency }}
          </span>
        </button>

        <p class="cta-trust-note">
          🚚 Sin tarjeta de crédito · Pagas únicamente cuando el mensajero te entregue el producto
        </p>
      </div>

      <!-- Preguntas frecuentes con Objeción del Torque Resuelta -->
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
