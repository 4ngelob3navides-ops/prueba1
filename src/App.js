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
    const selectedVariantId = ref(config.value.variants[0]?.id || null);
    const quantity = ref(1);
    const isModalOpen = ref(false);
    const isSubmitting = ref(false);
    const orderSuccessToast = ref(false);

    const activeVariant = computed(
      () =>
        config.value.variants.find((v) => v.id === selectedVariantId.value) ||
        config.value.variants[0]
    );

    const totalPrice = computed(() => Number((activeVariant.value.price * quantity.value).toFixed(2)));
    const totalCompareAt = computed(() =>
      activeVariant.value.compareAtPrice > activeVariant.value.price
        ? Number((activeVariant.value.compareAtPrice * quantity.value).toFixed(2))
        : 0
    );
    const totalSavings = computed(() =>
      totalCompareAt.value > totalPrice.value
        ? Number((totalCompareAt.value - totalPrice.value).toFixed(2))
        : 0
    );

    const syncNativeShopifyForm = () => {
      const idInput = document.getElementById('shopify-native-variant-id');
      const qtyInput = document.getElementById('shopify-native-qty');
      if (idInput && activeVariant.value.id) idInput.value = String(activeVariant.value.id);
      if (qtyInput) qtyInput.value = String(quantity.value);
    };

    const selectVariant = (variantId) => {
      selectedVariantId.value = variantId;
      syncNativeShopifyForm();
    };

    const changeQty = (nextQty) => {
      const maxAllowed = Math.min(20, activeVariant.value.inventoryQuantity || 20);
      const clamped = Math.max(1, Math.min(maxAllowed, Number(nextQty) || 1));
      quantity.value = clamped;
      syncNativeShopifyForm();
    };

    // Construye el Permalink oficial de Shopify (/cart/VARIANT_ID:QTY?locale=es...)
    // Reemplaza la cantidad exacta en 1 solo paso y abre el Checkout en español.
    const goToShopifyCheckout = (prefill = null) => {
      const variantId = activeVariant.value.id;
      const qty = quantity.value;

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
      syncNativeShopifyForm();

      // 1. Si tienes instalada una App de Formulario Contraentrega (Releasit / EasySell / Dropi COD)
      const externalCodBtn = document.querySelector(
        '.rsi-cod-form-button, [data-rsi-cod-btn], .es-popup-button, #rsi-cod-form-open'
      );
      if (externalCodBtn) {
        externalCodBtn.click();
        return;
      }

      // 2. Si tienes configurado WhatsApp directo o modal pre-llenado
      if (
        (config.value.whatsappNumber && config.value.whatsappNumber.trim() !== '') ||
        config.value.checkoutMode === 'prefill_modal'
      ) {
        isModalOpen.value = true;
        return;
      }

      // 3. Por defecto en Shopify: Ir directo al Checkout oficial en español con la cantidad exacta seleccionada
      const redirected = goToShopifyCheckout(null);
      if (!redirected) {
        // En preview-mobile.html local (donde no existe servidor Shopify) abrimos el modal demostrativo
        isModalOpen.value = true;
      }
    };

    const handleModalConfirm = (customerData) => {
      const { fullName, phone, city, address } = customerData;

      if (config.value.whatsappNumber && config.value.whatsappNumber.trim() !== '') {
        const cleanPhone = config.value.whatsappNumber.replace(/\D/g, '');
        const msg = encodeURIComponent(
          `Hola, deseo pedir con Pago al Recibir:\n` +
            `• Producto: ${config.value.title}${!activeVariant.value.isDefaultTitle ? ' (' + activeVariant.value.title + ')' : ''}\n` +
            `• Cantidad: ${quantity.value} ${quantity.value === 1 ? 'unidad' : 'unidades'}\n` +
            `• Total: $${totalPrice.value.toFixed(2)} ${config.value.currency}\n` +
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
      activeVariant,
      quantity,
      totalPrice,
      totalCompareAt,
      totalSavings,
      isModalOpen,
      isSubmitting,
      orderSuccessToast,
      selectVariant,
      changeQty,
      triggerOrder,
      handleModalConfirm,
    };
  },
  template: `
    <div class="mobile-shell">
      <TopUrgencyTicker :config="config" />

      <main class="mobile-main">
        <!-- A. Hero con Enfoque en la Demostración + Precio y Cantidad reales -->
        <EmotionalHeroMobile
          :config="config"
          :active-variant="activeVariant"
          :quantity="quantity"
          :total-price="totalPrice"
          :total-compare-at="totalCompareAt"
          :total-savings="totalSavings"
          @change-qty="changeQty"
          @select-variant="selectVariant"
          @trigger-order="triggerOrder"
        />

        <!-- B. Módulo Interactivo: El Antes y Después que Satisface -->
        <ThumbCleanInteractive :slider="config.slider" />

        <!-- C. Demostración Visual del Kit: Lo que realmente llega en tu caja -->
        <VisualZoneTapper :kit="config.unboxingKit" />

        <!-- D. Desactivación del Miedo Físico (Las manos y la espalda) -->
        <PhysicalReliefSection :relief="config.physicalRelief" />

        <!-- E. Prueba Social estilo WhatsApp + Bodega Local Guayaquil -->
        <RealFeelingsUgc :reviews="config.whatsappReviews" />

        <!-- Garantía Tangible + Selector de Cantidad y Variantes -->
        <ZeroFearCodSection
          :config="config"
          :active-variant="activeVariant"
          :quantity="quantity"
          :total-price="totalPrice"
          :total-compare-at="totalCompareAt"
          :total-savings="totalSavings"
          @change-qty="changeQty"
          @select-variant="selectVariant"
          @trigger-order="triggerOrder"
        />
      </main>

      <footer class="clean-footer">
        <p>Despacho local desde Bodega {{ config.warehouseCity }} · Pago contra entrega</p>
        <small>{{ config.title }} · Ref. {{ activeVariant.sku }}</small>
      </footer>

      <StickyThumbBar
        :config="config"
        :quantity="quantity"
        :total-price="totalPrice"
        :total-compare-at="totalCompareAt"
        @change-qty="changeQty"
        @trigger-order="triggerOrder"
      />

      <QuickOrderModal
        :is-open="isModalOpen"
        :config="config"
        :active-variant="activeVariant"
        :quantity="quantity"
        :total-price="totalPrice"
        :is-submitting="isSubmitting"
        @close="isModalOpen = false"
        @change-qty="changeQty"
        @proceed-shopify="handleModalConfirm"
      />

      <transition name="fade-modal">
        <div v-if="orderSuccessToast" class="clean-toast">
          Vista previa local: {{ quantity }} {{ quantity === 1 ? 'unidad' : 'unidades' }} (\${{ totalPrice.toFixed(2) }}). En Shopify lleva directo al Checkout en español con esa cantidad exacta.
        </div>
      </transition>
    </div>
  `,
};
