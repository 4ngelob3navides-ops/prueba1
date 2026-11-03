import { ref } from 'vue';
import { SvgIcons } from './SvgIcons.js';

export const VisualZoneTapper = {
  name: 'VisualZoneTapper',
  props: {
    kit: { type: Object, required: true },
  },
  setup(props) {
    const selectedHeadId = ref(props.kit.mainHeads[0]?.id || 'cone');
    return { selectedHeadId, SvgIcons };
  },
  template: `
    <section class="section-block">
      <div class="section-header">
        <span class="section-eyebrow">{{ kit.eyebrow }}</span>
        <h2 class="section-title">{{ kit.headline }}</h2>
        <p class="section-desc">{{ kit.subline }}</p>
      </div>

      <!-- Foto transparente de Unboxing sobre mesa de madera clara -->
      <figure class="unboxing-card">
        <div class="unboxing-card__photo-wrap">
          <img
            :src="kit.flatlayImage"
            alt="Contenido real de la caja Cepillo 9 en 1 Pro sobre mesa"
            loading="lazy"
          />
          <span class="unboxing-badge">
            <span class="unboxing-badge__icon" v-html="SvgIcons.boxOpen"></span>
            <span>Foto del kit completo incluido</span>
          </span>
        </div>

        <ul class="unboxing-checklist">
          <li v-for="(line, i) in kit.boxChecklist" :key="i">
            <span class="check-dot" v-html="SvgIcons.check"></span>
            <span>{{ line }}</span>
          </li>
        </ul>
      </figure>

      <!-- Uso cotidiano de los cabezales en acción real -->
      <div class="heads-usage-wrap">
        <h3 class="subsection-heading">Para qué usarás cada cabezal en casa:</h3>

        <div class="heads-accordion-cards">
          <article
            v-for="(head, idx) in kit.mainHeads"
            :key="head.id"
            class="head-use-card"
            :class="{ 'head-use-card--open': selectedHeadId === head.id }"
            @click="selectedHeadId = head.id"
          >
            <div class="head-use-card__top">
              <span class="head-num">{{ idx + 1 }}</span>
              <span class="head-svg" v-html="SvgIcons[head.iconKey] || SvgIcons.disc"></span>
              <div class="head-use-card__titles">
                <strong>{{ head.name }}</strong>
                <p>{{ head.desc }}</p>
              </div>
            </div>

            <div v-if="selectedHeadId === head.id" class="head-use-card__media">
              <img :src="head.actionImage" :alt="head.name" loading="lazy" />
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
