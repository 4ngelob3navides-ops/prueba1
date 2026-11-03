export const ZeroFearCodSection = {
  name: 'ZeroFearCodSection',
  props: {
    config: { type: Object, required: true },
    selectedBundle: { type: Object, required: true },
  },
  emits: ['select-bundle-qty', 'trigger-order'],
  template: `
    <!-- 8. Oferta y Pago Contraentrega Editorial -->
    <section class="section-block section-block--white" id="pedir-ahora">
      <span class="editorial-kicker">Selecciona tu kit</span>
      <h2 class="section-title">Recíbelo en tu puerta sin pagos anticipados.</h2>

      <div class="bundle-selector">
        <div
          v-for="pack in config.offers"
          :key="pack.id"
          class="bundle-option"
          :class="{ selected: selectedBundle.qty === pack.qty }"
          @click="$emit('select-bundle-qty', pack.qty)"
        >
          <div class="bundle-left">
            <div class="radio-dot"></div>
            <div>
              <span class="bundle-title">{{ pack.title }}</span>
              <span class="bundle-sub">{{ pack.sub }}</span>
            </div>
          </div>
          <div class="bundle-price-col">
            <span class="bundle-price-now">\${{ pack.price.toFixed(2) }}</span>
            <span class="bundle-price-old">\${{ pack.compareAtPrice.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="btn-editorial-primary"
        @click="$emit('trigger-order')"
      >
        <span>Confirmar Pedido Contraentrega</span>
        <small>Pagas únicamente cuando el repartidor te entregue la caja</small>
      </button>

      <div class="cod-editorial-card">
        <img
          :src="config.codCard.image"
          alt="Entrega en puerta"
          loading="lazy"
        />
        <div class="cod-editorial-card__text">
          <strong>{{ config.codCard.title }}</strong>
          <p>{{ config.codCard.desc }}</p>
        </div>
      </div>
    </section>
  `,
};
