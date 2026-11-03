export const PhysicalReliefSection = {
  name: 'PhysicalReliefSection',
  props: {
    pains: { type: Object, required: true },
  },
  template: `
    <!-- 5. Dolores Reales y Tangibles (Sin melodrama) -->
    <section class="section-block">
      <span class="editorial-kicker">{{ pains.kicker }}</span>
      <h2 class="section-title">{{ pains.title }}</h2>
      <p class="section-lead">{{ pains.lead }}</p>

      <div class="pain-editorial-grid">
        <article
          v-for="(card, idx) in pains.cards"
          :key="idx"
          class="pain-editorial-card"
        >
          <div class="pain-editorial-card__img">
            <img :src="card.image" :alt="card.title" loading="lazy" />
          </div>
          <div class="pain-editorial-card__body">
            <span class="pain-number">{{ card.num }}</span>
            <h3 class="pain-editorial-card__title">{{ card.title }}</h3>
            <p class="pain-editorial-card__desc">{{ card.desc }}</p>
            <div class="relief-solution-bar">
              {{ card.solution }}
            </div>
          </div>
        </article>
      </div>
    </section>
  `,
};
