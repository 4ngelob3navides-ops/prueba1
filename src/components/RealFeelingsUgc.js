export const RealFeelingsUgc = {
  name: 'RealFeelingsUgc',
  props: {
    reviews: { type: Array, required: true },
  },
  template: `
    <!-- 7. Reseñas Editoriales (Estilo Quote Cards) -->
    <section class="section-block section-block--sand">
      <span class="editorial-kicker">Hogares reales en Ecuador</span>
      <h2 class="section-title">Lo que dicen quienes dejaron de limpiar de rodillas.</h2>

      <div class="editorial-quotes">
        <article
          v-for="rev in reviews"
          :key="rev.id"
          class="quote-card"
        >
          <div>
            <div class="quote-stars">{{ rev.stars }}</div>
            <p class="quote-text">{{ rev.text }}</p>
          </div>
          <div class="quote-meta">
            <strong>{{ rev.author }}</strong>
            <span>{{ rev.tag }}</span>
          </div>
        </article>
      </div>
    </section>
  `,
};
