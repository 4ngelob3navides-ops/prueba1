// Configuración central del producto — Sincronizada en tiempo real con Shopify Admin (Productos)
// Si cambias el precio, precio de comparación, stock o variantes en Shopify, se refleja automáticamente.

export function getProductConfig() {
  const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
  const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

  const resolveImg = (customUrl, filename) => {
    if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
      return customUrl;
    }
    return `${assetsBase}${filename}`;
  };

  // Variantes reales inyectadas desde Shopify (o variante local de vista previa)
  const rawVariants =
    Array.isArray(shopify.variants) && shopify.variants.length > 0
      ? shopify.variants.map((v) => ({
          id: v.id,
          title: v.title === 'Default Title' ? 'Kit Completo Estándar' : v.title,
          isDefaultTitle: v.title === 'Default Title',
          sku: v.sku || shopify.sku || '208333',
          price: Number(v.price ?? shopify.price ?? 35.0),
          compareAtPrice: Number(v.compareAtPrice ?? shopify.compareAtPrice ?? 0),
          available: v.available !== false,
          inventoryQuantity:
            typeof v.inventoryQuantity === 'number' && v.inventoryQuantity > 0
              ? v.inventoryQuantity
              : 99,
        }))
      : [
          {
            id: shopify.variantId || null,
            title: 'Kit Completo Estándar',
            isDefaultTitle: true,
            sku: shopify.sku || '208333',
            price: Number(shopify.price ?? 35.0),
            compareAtPrice: Number(shopify.compareAtPrice ?? 55.0),
            available: true,
            inventoryQuantity: Number(shopify.stockLeft || 100),
          },
        ];

  const firstVar = rawVariants[0];

  return {
    title: shopify.title || 'Cepillo Eléctrico 9 en 1 Pro',
    handle: shopify.handle || 'cepillo-electrico-9-en-1-pro',
    sku: firstVar.sku || '208333',
    currency: shopify.currency || 'USD',
    variants: rawVariants,
    hasMultipleVariants: rawVariants.length > 1,
    stockLeft: Number(shopify.stockLeft || firstVar.inventoryQuantity || 14),
    warehouseCity: shopify.warehouseCity || 'Guayaquil',
    checkoutMode: shopify.checkoutMode || 'direct_checkout', // 'direct_checkout' | 'prefill_modal'
    whatsappNumber: shopify.whatsappNumber || '',

    hero: {
      eyebrow: shopify.heroBadge || 'Cuidado articular y limpieza sin esfuerzo',
      headline:
        shopify.heroHeadline ||
        'Termina de limpiar el baño sin que te duela la cintura ni poner las rodillas en el piso frío.',
      subline:
        shopify.heroSubline ||
        'El cepillo eléctrico que gira a 300 RPM: la máquina hace la fuerza y tú limpias de pie en 10 minutos.',
      ctaText: shopify.ctaText || 'Pedir ahora y pagar al recibir',
      ctaSubtext: 'Despacho desde Guayaquil · Pago contra entrega',
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
      subline: 'Kit completo con motor recargable, 2 tubos de extensión de aluminio y los 9 accesorios de limpieza.',
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
        '1 Mango motorizado inalámbrico (300 RPM)',
        '2 Varas extensibles ajustables hasta 1.20 m',
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
          title: 'Eliges cantidad y pides',
          sub: 'Seleccionas cuántas unidades deseas sin ingresar tarjetas de crédito.',
        },
        {
          iconKey: 'truck',
          stepNum: 'Paso 2',
          title: 'Despacho local',
          sub: 'Preparación y salida rápida desde nuestra bodega en Guayaquil.',
        },
        {
          iconKey: 'cashHand',
          stepNum: 'Paso 3',
          title: 'Revisas y pagas',
          sub: 'El repartidor toca tu puerta, recibes el paquete y pagas al recibir.',
        },
      ],
    },
  };
}
