import { ref, onMounted, onUnmounted } from 'vue';
import { SvgIcons } from './SvgIcons.js';

export const ThumbCleanInteractive = {
  name: 'ThumbCleanInteractive',
  props: {
    slider: { type: Object, required: true },
  },
  setup() {
    // Izquierda: Antes (moho negro acumulado) | Derecha: Después (azulejo blanco limpio)
    const position = ref(50);
    const hasInteracted = ref(false);
    const containerRef = ref(null);
    let demoTimer = null;

    const updateFromClientX = (clientX) => {
      if (!containerRef.value) return;
      const rect = containerRef.value.getBoundingClientRect();
      const raw = ((clientX - rect.left) / rect.width) * 100;
      position.value = Math.min(94, Math.max(6, Math.round(raw)));
    };

    const onPointerDown = (e) => {
      hasInteracted.value = true;
      updateFromClientX(e.clientX);
    };

    const onPointerMove = (e) => {
      if (e.buttons !== 1) return;
      hasInteracted.value = true;
      updateFromClientX(e.clientX);
    };

    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      hasInteracted.value = true;
      updateFromClientX(e.touches[0].clientX);
    };

    onMounted(() => {
      let dir = -1;
      demoTimer = setInterval(() => {
        if (hasInteracted.value) return;
        position.value += dir * 1.1;
        if (position.value <= 30) dir = 1;
        if (position.value >= 68) dir = -1;
      }, 50);
    });

    onUnmounted(() => {
      if (demoTimer) clearInterval(demoTimer);
    });

    return {
      position,
      hasInteracted,
      containerRef,
      onPointerDown,
      onPointerMove,
      onTouchMove,
      SvgIcons,
    };
  },
  template: `
    <section class="section-block section-block--alt" id="demo-juntas">
      <div class="section-header">
        <span class="section-eyebrow">{{ slider.eyebrow }}</span>
        <h2 class="section-title">{{ slider.headline }}</h2>
        <p class="section-desc">{{ slider.subline }}</p>
      </div>

      <div
        ref="containerRef"
        class="ba-frame"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @touchstart.passive="hasInteracted = true"
        @touchmove.passive="onTouchMove"
      >
        <!-- Fondo completo: LADO DERECHO (Después: Azulejo blanco limpio) -->
        <img
          :src="slider.afterImage"
          alt="Después: azulejo limpio con agua limpia"
          class="ba-frame__img"
        />

        <!-- Recorte izquierdo: LADO IZQUIERDO (Antes: Moho negro y silicona manchada) -->
        <div
          class="ba-frame__before-clip"
          :style="{ clipPath: 'inset(0 ' + (100 - position) + '% 0 0)' }"
        >
          <img
            :src="slider.beforeImage"
            alt="Antes: esquina con moho negro acumulado"
            class="ba-frame__img"
          />
        </div>

        <span class="ba-tag ba-tag--left">Antes · Moho en junta</span>
        <span class="ba-tag ba-tag--right">Después · 30 seg</span>

        <!-- Barra divisoria limpia -->
        <div class="ba-line" :style="{ left: position + '%' }">
          <div class="ba-handle" aria-hidden="true" v-html="SvgIcons.sliderArrows"></div>
        </div>
      </div>

      <p class="ba-caption">
        {{ slider.footnote }}
      </p>
    </section>
  `,
};
