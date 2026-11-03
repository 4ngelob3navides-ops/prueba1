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
    VisualZoneTapper,
    PhysicalReliefSection,
    RealFeelingsUgc,
    ZeroFearCodSection,
    StickyThumbBar,
  },
  setup() {
    const config = ref(getProductConfig());
    const selectedQty = ref(1);
    const orderSuccessToast = ref(false);

    const selectedBundle = computed(() => config.value.offerForQty(selectedQty.value));

    const selectBundleQty = (qty) => {
      selectedQty.value = Math.max(1, Math.min(config.value.maxQty, Number(qty) || 1));
      const qtyInput = document.getElementById('shopify-native-qty');
      if (qtyInput) qtyInput.value = String(selectedQty.value);
    };

    const triggerOrder = () => {
      // 1. Si en el futuro instalas una app COD en Shopify (ej. Releasit / EasySell), la dispara directo
      const externalCodBtn = document.querySelector(
        '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
      );
      if (externalCodBtn) {
        externalCodBtn.click();
        return;
      }

      // 2. En Shopify: va directo al Checkout oficial en español con la cantidad elegida (sin formularios intermedios)
      const variantId = config.value.variantId;
      const qty = selectedBundle.value.qty;

      if (typeof window !== 'undefined' && variantId) {
        const params = new URLSearchParams();
        params.set('locale', 'es');
        params.set('checkout[shipping_address][country]', 'EC');
        window.location.href = `/cart/${variantId}:${qty}?${params.toString()}`;
        return;
      }

      // 3. Solo en preview-mobile.html local (sin servidor Shopify) muestra aviso informativo
      orderSuccessToast.value = true;
      setTimeout(() => {
        orderSuccessToast.value = false;
      }, 4000);
    };

    return {
      config,
      selectedQty,
      selectedBundle,
      orderSuccessToast,
      selectBundleQty,
      triggerOrder,
    };
  },
  template: `
    <div class="mobile-shell">
      <TopUrgencyTicker :config="config" />

      <main class="mobile-main">
        <!-- Hero: Eye-Tracking en F + Anchoring + Cantidad + Botón Naranja Vibrante -->
        <EmotionalHeroMobile
          :config="config"
          :selected-bundle="selectedBundle"
          @select-bundle-qty="selectBundleQty"
          @trigger-order="triggerOrder"
        />

        <!-- Slider Interactivo: Antes vs Después en Sarro Real -->
        <ThumbCleanInteractive :slider="config.slider" />

        <!-- Unboxing Transparente + 9 Cabezales -->
        <VisualZoneTapper :kit="config.unboxingKit" />

        <!-- Alivio Físico: Manos sin químicos a 1 m -->
        <PhysicalReliefSection :relief="config.physicalRelief" />

        <!-- Prueba Social WhatsApp Guayaquil / Ecuador -->
        <RealFeelingsUgc :reviews="config.whatsappReviews" />

        <!-- Paso a Paso + Selector de Cantidad + FAQ Torque 25W -->
        <ZeroFearCodSection
          :config="config"
          :selected-bundle="selectedBundle"
          @select-bundle-qty="selectBundleQty"
          @trigger-order="triggerOrder"
        />
      </main>

      <footer class="clean-footer">
        <p>Despacho local desde Bodega {{ config.warehouseCity }} · Pago contra entrega</p>
        <small>{{ config.title }} · Ref. {{ config.sku }}</small>
      </footer>

      <!-- Sticky CTA Fijo con Naranja Vibrante Continuo -->
      <StickyThumbBar
        :config="config"
        :selected-bundle="selectedBundle"
        @select-bundle-qty="selectBundleQty"
        @trigger-order="triggerOrder"
      />

      <transition name="fade-modal">
        <div v-if="orderSuccessToast" class="clean-toast">
          Vista previa local: Iría directo al Checkout de Shopify con {{ selectedBundle.qty }} {{ selectedBundle.qty === 1 ? 'unidad' : 'unidades' }} (\${{ selectedBundle.price.toFixed(2) }} {{ config.currency }}).
        </div>
      </transition>
    </div>
  `,
};
