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
import { QuickOrderModal } from './components/QuickOrderModal.js';

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
    QuickOrderModal,
  },
  setup() {
    const config = ref(getProductConfig());
    // Por defecto bundle de 1 unidad
    const selectedQty = ref(1);
    const isModalOpen = ref(false);
    const isSubmitting = ref(false);
    const orderSuccessToast = ref(false);

    const selectedBundle = computed(() => config.value.offerForQty(selectedQty.value));

    const selectBundleQty = (qty) => {
      selectedQty.value = Math.max(1, Math.min(config.value.maxQty, Number(qty) || 1));
      const qtyInput = document.getElementById('shopify-native-qty');
      if (qtyInput) qtyInput.value = String(selectedQty.value);
    };

    // Checkout permalink hacia Shopify con la cantidad elegida
    const goToShopifyCheckout = (prefill = null) => {
      const variantId = config.value.variantId;
      const qty = selectedBundle.value.qty;

      if (typeof window !== 'undefined' && variantId) {
        isSubmitting.value = true;
        const params = new URLSearchParams();
        params.set('locale', 'es');
        params.set('checkout[shipping_address][country]', 'EC');

        if (prefill) {
          const parts = (prefill.fullName || '').trim().split(/\s+/);
          const firstName = parts[0] || '';
          const lastName = parts.slice(1).join(' ') || parts[0] || '';
          if (firstName) params.set('checkout[shipping_address][first_name]', firstName);
          if (lastName) params.set('checkout[shipping_address][last_name]', lastName);
          if (prefill.phone) params.set('checkout[shipping_address][phone]', prefill.phone);
          if (prefill.city) params.set('checkout[shipping_address][city]', prefill.city);
          if (prefill.address) params.set('checkout[shipping_address][address1]', prefill.address);
        }

        window.location.href = `/cart/${variantId}:${qty}?${params.toString()}`;
        return true;
      }
      return false;
    };

    const triggerOrder = () => {
      // 1. Si hay una app de formulario COD (Releasit / EasySell / Dropi) instalada
      const externalCodBtn = document.querySelector(
        '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
      );
      if (externalCodBtn) {
        externalCodBtn.click();
        return;
      }

      // 2. Si hay WhatsApp configurado
      if (config.value.whatsappNumber && config.value.whatsappNumber.trim() !== '') {
        isModalOpen.value = true;
        return;
      }

      // 3. Ir directo al Checkout de Shopify en español
      const redirected = goToShopifyCheckout(null);
      if (!redirected) {
        // En vista previa local abrimos modal demostrativo
        isModalOpen.value = true;
      }
    };

    const handleModalConfirm = (customerData) => {
      const { fullName, phone, city, address } = customerData;

      if (config.value.whatsappNumber && config.value.whatsappNumber.trim() !== '') {
        const cleanPhone = config.value.whatsappNumber.replace(/\D/g, '');
        const msg = encodeURIComponent(
          `Hola, deseo pedir con Pago al Recibir:\n` +
            `• Promoción: ${selectedBundle.value.title} (${selectedBundle.value.qty} ${selectedBundle.value.qty === 1 ? 'unidad' : 'unidades'})\n` +
            `• Total a pagar: $${selectedBundle.value.price.toFixed(2)} ${config.value.currency}\n` +
            `• Nombre: ${fullName}\n` +
            `• Celular: ${phone}\n` +
            `• Ciudad: ${city}\n` +
            `• Dirección: ${address}`
        );
        window.location.href = `https://wa.me/${cleanPhone}?text=${msg}`;
        return;
      }

      const redirected = goToShopifyCheckout(customerData);
      if (!redirected) {
        isModalOpen.value = false;
        orderSuccessToast.value = true;
        setTimeout(() => {
          orderSuccessToast.value = false;
        }, 5000);
      }
    };

    return {
      config,
      selectedQty,
      selectedBundle,
      isModalOpen,
      isSubmitting,
      orderSuccessToast,
      selectBundleQty,
      triggerOrder,
      handleModalConfirm,
    };
  },
  template: `
    <div class="mobile-shell">
      <TopUrgencyTicker :config="config" />

      <main class="mobile-main">
        <!-- Hero: Eye-Tracking en F + Anchoring + Botón Naranja Vibrante -->
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

        <!-- Bundles con Descuento por Volumen + FAQ Torque 25W -->
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

      <QuickOrderModal
        :is-open="isModalOpen"
        :config="config"
        :selected-bundle="selectedBundle"
        :is-submitting="isSubmitting"
        @close="isModalOpen = false"
        @select-bundle-qty="selectBundleQty"
        @proceed-shopify="handleModalConfirm"
      />

      <transition name="fade-modal">
        <div v-if="orderSuccessToast" class="clean-toast">
          Pedido de prueba registrado: {{ selectedBundle.title }} por \${{ selectedBundle.price.toFixed(2) }}.
        </div>
      </transition>
    </div>
  `,
};
