import { SvgIcons } from './SvgIcons.js';

export const PhysicalReliefSection = {
  name: 'PhysicalReliefSection',
  props: {
    relief: { type: Object, required: true },
  },
  setup() {
    return { SvgIcons };
  },
  template: `
    <section class="section-block section-block--alt">
      <div class="section-header">
        <span class="section-eyebrow">{{ relief.eyebrow }}</span>
        <h2 class="section-title">{{ relief.headline }}</h2>
      </div>

      <div class="relief-stack">
        <!-- Tarjeta 1: El problema real del cepillo/esponja manual -->
        <article class="relief-card relief-card--manual">
          <div class="relief-card__photo">
            <img
              :src="relief.handsPhoto"
              alt="Manos irritadas y resecas por químicos y esponja sucia"
              loading="lazy"
            />
            <span class="relief-card__pill relief-card__pill--muted">
              Con esponja o cepillo manual
            </span>
          </div>
          <ul class="relief-points">
            <li v-for="(item, idx) in relief.manualProblems" :key="idx">
              <span class="point-mark point-mark--cross" v-html="SvgIcons.cross"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <!-- Tarjeta 2: Solución ergonómica a 1 metro de distancia -->
        <article class="relief-card relief-card--solution">
          <div class="relief-card__photo">
            <img
              :src="relief.standingPhoto"
              alt="Limpieza erguida a 1 metro de distancia con Cepillo 9 en 1 Pro"
              loading="lazy"
            />
            <span class="relief-card__pill relief-card__pill--sage">
              Con el Cepillo 9 en 1 Pro
            </span>
          </div>
          <ul class="relief-points">
            <li v-for="(item, idx) in relief.electricSolutions" :key="idx">
              <span class="point-mark point-mark--check" v-html="SvgIcons.check"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  `,
};

