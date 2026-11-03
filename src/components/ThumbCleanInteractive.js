import { ref, onMounted, onUnmounted } from 'vue';

export const ThumbCleanInteractive = {
  name: 'ThumbCleanInteractive',
  props: {
    slider: { type: Object, required: true },
  },
  setup() {
    const pos = ref(50);
    const isDragging = ref(false);
    const wrapperRef = ref(null);
    let autoplayTimer = null;
    let hasInteracted = false;

    const moveSlider = (clientX) => {
      if (!wrapperRef.value) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      let p = ((clientX - rect.left) / rect.width) * 100;
      pos.value = Math.max(5, Math.min(95, Math.round(p)));
    };

    const onPointerDown = (e) => {
      hasInteracted = true;
      isDragging.value = true;
      moveSlider(e.clientX);
    };

    const onPointerMove = (e) => {
      if (!isDragging.value) return;
      moveSlider(e.clientX);
    };

    const onPointerUp = () => {
      isDragging.value = false;
    };

    onMounted(() => {
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointermove', onPointerMove);

      // Sutil animación introductoria si no ha interactuado
      let dir = -1;
      autoplayTimer = setInterval(() => {
        if (hasInteracted || isDragging.value) return;
        pos.value += dir * 0.8;
        if (pos.value <= 35) dir = 1;
        if (pos.value >= 65) dir = -1;
      }, 50);
    });

    onUnmounted(() => {
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      if (autoplayTimer) clearInterval(autoplayTimer);
    });

    return {
      pos,
      wrapperRef,
      onPointerDown,
    };
  },
  template: `
    <!-- 4. Slider Antes / Después (La mugre real de las juntas) -->
    <section class="section-block section-block--white">
      <span class="editorial-kicker">{{ slider.kicker }}</span>
      <h2 class="section-title">{{ slider.title }}</h2>
      <p class="section-lead">{{ slider.lead }}</p>

      <div
        ref="wrapperRef"
        class="ba-wrapper"
        @pointerdown="onPointerDown"
      >
        <!-- Imagen ANTES (Fondo) -->
        <img
          :src="slider.beforeImg"
          alt="Azulejo con moho antes"
          loading="lazy"
        />

        <!-- Imagen DESPUÉS (Recorte dinámico) -->
        <div
          class="ba-after-layer"
          :style="{ clipPath: 'inset(0 ' + (100 - pos) + '% 0 0)' }"
        >
          <img
            :src="slider.afterImg"
            alt="Azulejo limpio después"
            loading="lazy"
          />
        </div>

        <span class="ba-tag ba-tag--clean">Después (30 seg)</span>
        <span class="ba-tag ba-tag--dirty">Antes</span>

        <div class="ba-handle" :style="{ left: pos + '%' }">
          <div class="ba-circle">↔</div>
        </div>
      </div>

      <p class="ba-caption">{{ slider.caption }}</p>
    </section>
  `,
};
