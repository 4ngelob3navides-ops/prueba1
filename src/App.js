import { ref, computed } from 'vue';
import { getProductConfig } from './data/productConfig.js';
import { TopUrgencyTicker } from './components/TopUrgencyTicker.js';
import { EmotionalHeroMobile } from './components/EmotionalHeroMobile.js';
import { ThumbCleanInteractive } from './components/ThumbCleanInteractive.js';
import { VisualZoneTapper } from './components/VisualZoneTapper.js';
import { PhysicalReliefSection } from './components/PhysicalReliefSection.js';
import { RealFeelingsUgc } from './components/RealFeelingsUgc.js';
import { ZeroFearCodSection } from './components/ZeroFearCodSection.js';
import { StickyThumbBar } from './components/StickyThumbBar.js';

export const App = {
  name: 'CepilloMobileLandingApp',
  components: {
    TopUrgencyTicker,
    EmotionalHeroMobile,
    ThumbCleanInteractive,
    PhysicalReliefSection,
    VisualZoneTapper,
    RealFeelingsUgc,
    ZeroFearCodSection,
    StickyThumbBar,
  },
  setup() {
    const config = ref(getProductConfig());
    const selectedQty = ref(1);
    const isModalOpen = ref(false);
    const orderToast = ref(false);

    const formData = ref({
      name: '',
      phone: '',
      address: '',
    });

    const selectedBundle = computed(() => config.value.offerForQty(selectedQty.value));

    const selectBundleQty = (qty) => {
      selectedQty.value = Math.max(1, Math.min(config.value.maxQty, Number(qty) || 1));
      const qtyInput = document.getElementById('shopify-native-qty');
      if (qtyInput) qtyInput.value = String(selectedQty.value);
    };

    const triggerOrder = () => {
      // 1. Si existe app COD instalada en Shopify (Releasit / EasySell)
      const externalCodBtn = document.querySelector(
        '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
      );
      if (externalCodBtn) {
        externalCodBtn.click();
        return;
      }

      // 2. En Shopify: va directo al checkout sin parámetros conflictivos que causen 404
      const variantId = config.value.variantId;
      const qty = selectedBundle.value.qty;

      if (typeof window !== 'undefined' && variantId) {
        // Enlace de carrito directo nativo (sin prefijo /es que causa error en tiendas sin subdominio regional)
        window.location.href = `/cart/${variantId}:${qty}`;
        return;
      }

      // 3. En entorno de vista previa local (preview-mobile.html): abre modal editorial de prueba
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const submitOrder = (e) => {
      if (e) e.preventDefault();
      closeModal();
      orderToast.value = true;
      setTimeout(() => {
        orderToast.value = false;
      }, 4000);
    };

    return {
      config,
      selectedQty,
      selectedBundle,
      isModalOpen,
      orderToast,
      formData,
      selectBundleQty,
      triggerOrder,
      closeModal,
      submitOrder,
    };
  },
  template: `
    <div class="editorial-shell">
      <!-- 1. Barra de anuncio superior + Cabecera de marca -->
      <TopUrgencyTicker :config="config" />

      <!-- 2. Hero Editorial con selector de cantidad + 3. Cinta de Valores -->
      <EmotionalHeroMobile
        :config="config"
        :selected-bundle="selectedBundle"
        @select-bundle-qty="selectBundleQty"
        @trigger-order="triggerOrder"
      />

      <!-- 4. Slider Antes / Después en moho real -->
      <ThumbCleanInteractive :slider="config.slider" />

      <!-- 5. Dolores Reales y Tangibles -->
      <PhysicalReliefSection :pains="config.pains" />

      <!-- 6. Demostración por Zonas y los 9 Cabezales -->
      <VisualZoneTapper :zones="config.zones" />

      <!-- 7. Reseñas Editoriales (Quote Cards) -->
      <RealFeelingsUgc :reviews="config.reviews" />

      <!-- 8. Oferta de Packs y Pago Contraentrega con selector de cantidad -->
      <ZeroFearCodSection
        :config="config"
        :selected-bundle="selectedBundle"
        @select-bundle-qty="selectBundleQty"
        @trigger-order="triggerOrder"
      />

      <!-- Barra fija inferior editorial con stepper directo -->
      <StickyThumbBar
        :config="config"
        :selected-bundle="selectedBundle"
        @select-bundle-qty="selectBundleQty"
        @trigger-order="triggerOrder"
      />

      <!-- Modal Contraentrega Editorial (para vista previa local) -->
      <div
        class="modal-overlay"
        :class="{ open: isModalOpen }"
        @click.self="closeModal"
      >
        <div class="modal-sheet">
          <button
            type="button"
            class="modal-close"
            @click="closeModal"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
          <span class="editorial-kicker">Pago Contraentrega Ecuador</span>
          <h3 style="font-family: var(--font-serif); font-size: 24px; color: var(--text-espresso); margin-bottom: 16px;">
            Datos para el repartidor
          </h3>

          <form @submit="submitOrder">
            <div class="form-group">
              <label>Nombre y Apellido</label>
              <input
                v-model="formData.name"
                type="text"
                required
                placeholder="Ej. María Fernanda Gómez"
              />
            </div>
            <div class="form-group">
              <label>WhatsApp / Celular</label>
              <input
                v-model="formData.phone"
                type="tel"
                required
                placeholder="Ej. 099 123 4567"
              />
            </div>
            <div class="form-group">
              <label>Ciudad y Dirección Exacta</label>
              <input
                v-model="formData.address"
                type="text"
                required
                placeholder="Ciudad, sector, calle principal y referencia"
              />
            </div>
            <button
              type="submit"
              class="btn-editorial-primary"
              style="margin-top: 10px;"
            >
              <span>Finalizar Pedido (\${{ selectedBundle.price.toFixed(2) }})</span>
              <small>Te confirmaremos el despacho por WhatsApp</small>
            </button>
          </form>
        </div>
      </div>

      <!-- Toast informativo -->
      <div v-if="orderToast" class="editorial-toast">
        <span>✓ ¡Pedido registrado con éxito! Preparando despacho desde Guayaquil.</span>
      </div>
    </div>
  `,
};
