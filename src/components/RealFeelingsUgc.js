import { SvgIcons } from './SvgIcons.js';

export const RealFeelingsUgc = {
  name: 'RealFeelingsUgc',
  props: {
    reviews: { type: Array, required: true },
  },
  setup() {
    return { SvgIcons };
  },
  template: `
    <section class="section-block">
      <div class="section-header">
        <span class="section-eyebrow">CLIENTES EN GUAYAQUIL, QUITO Y CUENCA</span>
        <h2 class="section-title">Mensajes de quienes ya lo recibieron en casa</h2>
        <p class="section-desc">Desliza hacia el lado para leer sus comentarios.</p>
      </div>

      <div class="wa-carousel">
        <article v-for="rev in reviews" :key="rev.id" class="wa-card">
          <div class="wa-card__top-bar">
            <div class="wa-avatar">{{ rev.name.charAt(0) }}</div>
            <div class="wa-contact-info">
              <strong>{{ rev.name }}</strong>
              <span>
                <span class="wa-pin" v-html="SvgIcons.mapPin"></span>
                {{ rev.location }}
              </span>
            </div>
            <span class="wa-verified-tag">Entrega verificada</span>
          </div>

          <!-- Lienzo estilo captura real de conversación WhatsApp -->
          <div class="wa-chat-canvas">
            <div class="wa-bubble">
              <div class="wa-bubble__photo">
                <img :src="rev.image" :alt="'Foto enviada por ' + rev.name" loading="lazy" />
              </div>
              <p class="wa-bubble__text">{{ rev.message }}</p>
              <div class="wa-bubble__meta">
                <span>{{ rev.time }}</span>
                <span class="wa-dblcheck" v-html="SvgIcons.doubleCheck"></span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
};
