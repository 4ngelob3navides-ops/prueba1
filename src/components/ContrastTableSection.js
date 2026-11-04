export const ContrastTableSection = {
  name: 'ContrastTableSection',
  props: {
    contrast: { type: Object, required: true },
  },
  template: `
    <section class="section-block section-contrast">
      <span class="editorial-kicker">{{ contrast.kicker }}</span>
      <h2 class="section-title">{{ contrast.title }}</h2>
      <p class="section-lead">{{ contrast.lead }}</p>

      <div class="contrast-grid">
        <!-- Columna Mala: Tradicional -->
        <div class="contrast-card contrast-card--bad">
          <div class="contrast-card__header">
            <h3>{{ contrast.bad.title }}</h3>
          </div>
          <ul class="contrast-list">
            <li v-for="(item, idx) in contrast.bad.points" :key="idx">
              <span class="contrast-icon-cross">✕</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Columna Buena: Cepillo 9 en 1 Pro -->
        <div class="contrast-card contrast-card--good">
          <div class="contrast-card__header">
            <span class="contrast-good-badge">La Solución Inteligente</span>
            <h3>{{ contrast.good.title }}</h3>
          </div>
          <ul class="contrast-list">
            <li v-for="(item, idx) in contrast.good.points" :key="idx">
              <span class="contrast-icon-check">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
};
