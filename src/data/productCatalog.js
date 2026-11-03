import { getProductConfig } from './productConfig.js';
import { getBlenderBunnyConfig } from './blenderBunnyConfig.js';

export function resolveProductConfig() {
  const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
  const handle = (shopify.handle || '').toLowerCase().trim();

  // 1. Mini Licuadora Conejito Portátil
  if (handle === 'mini-licuadora-conejito-portatil' || handle.includes('conejito') || handle.includes('licuadora')) {
    return getBlenderBunnyConfig(shopify);
  }

  // 2. Producto por defecto: Cepillo Eléctrico 9 en 1 Pro
  return getProductConfig();
}

