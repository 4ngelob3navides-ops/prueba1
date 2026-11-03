// Configuración central del producto — Neuromarketing & Alta Conversión
// Bundles con descuento por volumen, anclaje cognitivo y respaldo Guayaquil

export function getProductConfig() {
  const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
  const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

  const resolveImg = (customUrl, filename) => {
    if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
      return customUrl;
    }
    return `${assetsBase}${filename}`;
  };

  // Precio base y precio tachado: vienen del producto en Shopify (Admin → Productos)
  const basePrice = Number(shopify.price || 35.0);
  const baseCompareAt =
    Number(shopify.compareAtPrice) > basePrice ? Number(shopify.compareAtPrice) : 55.0;

  // Precios de los packs: editables en el Personalizador de Shopify
  const pack2Price = Number(shopify.bundle2Price || 59.9);
  const pack3Price = Number(shopify.bundle3Price || 79.9);
  const pack3Unit = pack3Price / 3;
  const maxQty = Math.max(1, Math.min(20, Number(shopify.maxQty || 10)));

  const money = (n) => `$${Number(n).toFixed(2)}`;

  // Precio total para CUALQUIER cantidad:
  // 1 = precio normal · 2 = pack 2 · 3 o más = precio unitario del pack 3
  const priceForQty = (qty) => {
    const q = Math.max(1, Number(qty) || 1);
    if (q === 1) return basePrice;
    if (q === 2) return pack2Price;
    return Number((pack3Unit * q).toFixed(2));
  };

  // Código de descuento de Shopify que corresponde a cada cantidad
  const discountCodeForQty = (qty) => {
    if (qty >= 3) return shopify.discountCode3 || '';
    if (qty === 2) return shopify.discountCode2 || '';
    return '';
  };

  // Construye la oferta para cualquier cantidad elegida
  const offerForQty = (qty) => {
    const q = Math.max(1, Math.min(maxQty, Number(qty) || 1));
    const price = priceForQty(q);
    const compareAtPrice = Number((baseCompareAt * q).toFixed(2));
    const totalSavings = Math.max(0, compareAtPrice - price);
    const volumeSavings = Math.max(0, basePrice * q - price);
    const badges = { 1: 'Individual', 2: 'MÁS POPULAR ⭐', 3: 'OFERTA FAMILIAR 🔥' };
    const subtitles = {
      1: 'Mango motorizado + 2 varas aluminio + 8 accesorios + USB-C',
      2: 'Ideal para regalar a tu mamá o tener uno en cada piso',
      3: 'Máximo ahorro para toda la casa, cocina y familia',
    };

    return {
      qty: q,
      badge: badges[q] || 'PRECIO MAYORISTA 🔥',
      isPopular: q === 2,
      title: `${q} ${q === 1 ? 'Kit' : 'Kits'} Cepillo 9 en 1 Pro`,
      subtitle: subtitles[q] || `Mismo precio por unidad que el pack familiar (${money(pack3Unit)} c/u)`,
      price,
      compareAtPrice,
      savingsText:
        volumeSavings > 0.009
          ? `Ahorras ${money(totalSavings)} (Ganas ${money(volumeSavings)} extra)`
          : `Ahorras ${money(totalSavings)} hoy`,
      unitPriceText: `${money(price / q)} c/u`,
      discountCode: discountCodeForQty(q),
    };
  };

  // Los 3 packs destacados (atajos de 1 toque)
  const bundles = [1, 2, 3].map(offerForQty);

  return {
    title: shopify.title || 'Cepillo Eléctrico 9 en 1 Pro',
    handle: shopify.handle || 'cepillo-electrico-9-en-1-pro',
    sku: shopify.sku || '208333',
    variantId: shopify.variantId || null,
    currency: shopify.currency || 'USD',
    basePrice,
    baseCompareAt,
    bundles,
    maxQty,
    offerForQty,
    stockLeft: Number(shopify.stockLeft || 14),
    warehouseCity: shopify.warehouseCity || 'Guayaquil',
    whatsappNumber: shopify.whatsappNumber || '',

    hero: {
      eyebrow: 'Cuidado articular y limpieza sin esfuerzo',
      headline:
        'Termina de limpiar el baño sin que te duela la cintura ni poner las rodillas en el piso frío.',
      subline:
        'El cepillo eléctrico que gira a 300 RPM: la máquina hace la fuerza y tú limpias de pie en 10 minutos.',
      socialProof: '4.9/5 ⭐ (Más de 1,200 familias en Ecuador ya lo usan)',
      ctaText: 'Pedir ahora y pagar al recibir',
      ctaSubtext: '🚚 Despacho garantizado en 24-48h desde Bodega Guayaquil · Pagas solo al recibir en casa',
      gallery: [
        {
          id: 'standing',
          label: 'De pie (1.2 m)',
          caption: 'Vara extensible hasta 1.2 m: alcanzas duchas altas y pisos con la espalda recta.',
          image: resolveImg(shopify.heroImage, 'relief_standing_clean.jpg'),
        },
        {
          id: 'faucet',
          label: 'Sarro en grifos',
          caption: '300 RPM reales arrancando moho y sarro acumulado en la base del grifo.',
          image: resolveImg(shopify.zoneCornersImage, 'zone_cone_corner.jpg'),
        },
        {
          id: 'stove',
          label: 'Grasa de cocina',
          caption: 'Remueve grasa quemada de hornillas sin hacer presión con la muñeca.',
          image: resolveImg(shopify.zoneStoveImage, 'zone_stove_grease.jpg'),
        },
      ],
    },

    slider: {
      eyebrow: 'PRUEBA DE RENDIMIENTO EN JUNTAS REALES',
      headline: 'El antes y después en el sarro que todos tenemos en casa',
      subline: 'Arrastra la barra central sobre el azulejo para comparar el resultado.',
      footnote: '30 segundos con el cabezal cónico vs. 20 minutos frotando con esponja manual.',
      beforeImage: resolveImg(shopify.beforeImage, 'before_dirty_tiles.jpg'),
      afterImage: resolveImg(shopify.afterImage, 'after_clean_tiles.jpg'),
    },

    unboxingKit: {
      eyebrow: 'CONTENIDO EXACTO DE TU PAQUETE',
      headline: 'Lo que realmente llega en tu caja',
      subline: 'Kit completo con motor recargable de 25W, 2 tubos de extensión de aluminio y los 9 accesorios de limpieza.',
      flatlayImage: resolveImg(shopify.unboxingImage, 'unboxing_flatlay_9in1.jpg'),
      mainHeads: [
        {
          id: 'cone',
          iconKey: 'cone',
          name: 'Cabezal de punta cónica',
          desc: 'Llega detrás del inodoro, a los rieles de la ventana y al borde del grifo donde ningún trapo entra.',
          actionImage: resolveImg(shopify.zoneCornersImage, 'zone_cone_corner.jpg'),
        },
        {
          id: 'flat',
          iconKey: 'disc',
          name: 'Cabezal plano ancho',
          desc: 'Cubre pisos, paredes completas de ducha y tinas en pasadas rápidas sin agacharte.',
          actionImage: resolveImg(shopify.reliefImage, 'relief_standing_clean.jpg'),
        },
        {
          id: 'hard',
          iconKey: 'bristles',
          name: 'Cepillo de cerdas duras y fibra',
          desc: 'Desprende grasa quemada de hornillas, sartenes y manchas secas en cocina.',
          actionImage: resolveImg(shopify.zoneStoveImage, 'zone_stove_grease.jpg'),
        },
        {
          id: 'sponge',
          iconKey: 'sparklesClean',
          name: 'Esponja, microfibra y paño pulidor',
          desc: 'Limpia espejos, mamparas de vidrio y carrocería del auto sin dejar rayones.',
          actionImage: resolveImg(shopify.afterImage, 'after_clean_tiles.jpg'),
        },
      ],
      boxChecklist: [
        '1 Mango motorizado inalámbrico (Motor 25W de alto torque a 300 RPM)',
        '2 Varas extensibles ajustables hasta 1.20 m de largo',
        '4 Cepillos de cerdas (plano XXL, plano chico, domo curvo y punta cónica)',
        '4 Discos de acabado (esponja, fibra abrasiva, microfibra y paño pulidor)',
        '1 Cable de carga USB-C + soporte de pared',
      ],
    },

    physicalRelief: {
      eyebrow: 'PROTECCIÓN PARA TUS MANOS Y TU COLUMNA',
      headline: 'Olvídate de toser por el olor a cloro y de terminar con las manos agrietadas por restregar.',
      handsPhoto: resolveImg(shopify.fear3Image, 'fear_disgust_germs.jpg'),
      standingPhoto: resolveImg(shopify.reliefImage, 'relief_standing_clean.jpg'),
      manualProblems: [
        'Inhalas vapores fuertes de cloro y desengrasante al estar encorvada dentro de la ducha.',
        'Te quemas y cuartea la piel de los nudillos con detergentes agresivos.',
        'El agua turbia del inodoro y del moho te salpica directo en los dedos.',
      ],
      electricSolutions: [
        'El mango extensible mantiene tus manos y tu rostro a 1 metro de los químicos y bacterias.',
        'La columna queda recta y la muñeca relajada: solo apoyas el cabezal y dejas que gire.',
        'Cabezales lavables bajo el grifo en segundos sin exprimir esponjas sucias.',
      ],
    },

    whatsappReviews: [
      {
        id: 1,
        name: 'Mariana C.',
        location: 'Urdesa, Guayaquil',
        time: '10:42 a. m.',
        image: resolveImg(shopify.ugc1Image, 'after_clean_tiles.jpg'),
        message:
          'Me llegó ayer por Servientrega aquí a Urdesa, todo bien empacado. Lo probé en la junta de la ducha que tenía moho de meses y salió al toque. Ya no me duele la columna.',
      },
      {
        id: 2,
        name: 'Roberto A.',
        location: 'La Carolina, Quito',
        time: '3:18 p. m.',
        image: resolveImg(shopify.ugc2Image, 'unboxing_flatlay_9in1.jpg'),
        message:
          'Tenía duda de qué venía en la caja y llegó completito con los tubos largos de aluminio y todos los cepillos. Revisé el paquete en la puerta y ahí pagué en efectivo.',
      },
      {
        id: 3,
        name: 'Patricia V.',
        location: 'Cuenca',
        time: '6:05 p. m.',
        image: resolveImg(shopify.zoneStoveImage, 'zone_stove_grease.jpg'),
        message:
          'Se lo compré a mi mamá para que no siga haciendo fuerza en las hornillas ni arrodillándose a lavar el piso del baño. Tiene buena potencia y es liviano.',
      },
    ],

    codTrust: {
      image: resolveImg(shopify.codImage, 'cod_door_delivery.jpg'),
      steps: [
        {
          iconKey: 'formCheck',
          stepNum: 'Paso 1',
          title: 'Eliges tu promo y pides',
          sub: 'Seleccionas tu pack con descuento sin ingresar tarjetas de crédito.',
        },
        {
          iconKey: 'truck',
          stepNum: 'Paso 2',
          title: 'Despacho local 24-48h',
          sub: 'Salida directa desde bodega Guayaquil con stock limitado garantizado hoy.',
        },
        {
          iconKey: 'cashHand',
          stepNum: 'Paso 3',
          title: 'Revisas y pagas en mano',
          sub: 'El repartidor toca tu puerta, verificas tu paquete y pagas en efectivo.',
        },
      ],
    },
  };
}
