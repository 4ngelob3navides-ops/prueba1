import { ref } from 'vue';

export const VisualZoneTapper = {
  name: 'VisualZoneTapper',
  props: {
    zones: { type: Object, required: true },
  },
  setup(props) {
    const activeZoneIdx = ref(0);
    return { activeZoneIdx };
  },
  template: `
    <!-- 6. Demostración por Zonas y los 9 Cabezales -->
    <section class="section-block section-block--white">
      <span class="editorial-kicker">{{ zones.kicker }}</span>
      <h2 class="section-title">{{ zones.title }}</h2>

      <div class="zone-pills" role="tablist">
        <button
          v-for="(zone, idx) in zones.list"
          :key="idx"
          type="button"
          class="zone-pill-btn"
          :class="{ active: idx === activeZoneIdx }"
          @click="activeZoneIdx = idx"
        >
          {{ zone.tabLabel }}
        </button>
      </div>

      <div class="zone-showcase">
        <div class="zone-showcase__img">
          <img
            :src="zones.list[activeZoneIdx].img"
            :alt="zones.list[activeZoneIdx].title"
            loading="lazy"
          />
        </div>
        <div class="zone-showcase__info">
          <span class="zone-showcase__tool">{{ zones.list[activeZoneIdx].tool }}</span>
          <h3 class="zone-showcase__title">{{ zones.list[activeZoneIdx].title }}</h3>
          <p class="zone-showcase__text">{{ zones.list[activeZoneIdx].text }}</p>
        </div>
      </div>

      <!-- Grilla Minimalista de los 9 Cabezales -->
      <div class="kit-minimal-box">
        <span class="editorial-kicker">Qué incluye tu caja</span>
        <h3 style="font-family: var(--font-serif); font-size: 20px; color: var(--text-espresso); margin-bottom: 4px;">
          Los 9 accesorios intercambiables a presión
        </h3>
        <div class="kit-minimal-grid">
          <div
            v-for="(item, i) in zones.kitGrid"
            :key="i"
            class="kit-cell"
          >
            <strong>{{ item.name }}</strong>
            <span>{{ item.sub }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
};
