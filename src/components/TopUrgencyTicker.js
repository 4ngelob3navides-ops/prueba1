export const TopUrgencyTicker = {
  name: 'TopUrgencyTicker',
  props: {
    config: { type: Object, required: true },
  },
  template: `
    <div>
      <!-- 1. Barra de anuncio superior (estilo boutique) -->
      <div class="announcement-bar">
        <span>{{ config.announcement.text }}</span>
        <span class="announcement-bar__tag">{{ config.announcement.tag }}</span>
      </div>

      <!-- Cabecera de marca minimalista -->
      <header class="brand-header">
        <div class="brand-logo">{{ config.brandName }}</div>
        <div class="brand-location">Stock: {{ config.stockLeft }} uds</div>
      </header>
    </div>
  `,
};
