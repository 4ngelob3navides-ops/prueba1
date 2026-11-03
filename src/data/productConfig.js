// Configuración central del producto — Edición Editorial Hogar & Alivio

export function getProductConfig() {
  const shopify = (typeof window !== 'undefined' && window.__SHOPIFY_DATA__) || {};
  const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

  const resolveImg = (customUrl, filename) => {
    if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
      return customUrl;
    }
    return `${assetsBase}${filename}`;
  };

  const basePrice = Number(shopify.price || 35.0);
  const baseCompareAt =
    Number(shopify.compareAtPrice) > basePrice ? Number(shopify.compareAtPrice) : 55.0;

  const maxQty = Math.max(1, Math.min(20, Number(shopify.maxQty || 10)));
  const money = (n) => `$${Number(n).toFixed(2)}`;

  const offers = [
    {
      id: 1,
      qty: 1,
      title: '1x Kit Cepillo 9 en 1 Pro',
      sub: '9 cabezales + Vara extensible + Envío Gratis',
      price: basePrice,
      compareAtPrice: baseCompareAt,
      savingsText: 'Ahorras $20 hoy',
      badge: 'Oferta de hoy',
    },
    {
      id: 2,
      qty: 2,
      title: '2x Kits (Pack Familiar / Mamá)',
      sub: 'Uno para baño y otro para cocina ($29.50 c/u)',
      price: 59.0,
      compareAtPrice: 110.0,
      savingsText: 'Ahorras $51 hoy',
      badge: 'Pack Familiar',
    },
  ];

  const offerForQty = (qty) => {
    const q = Math.max(1, Math.min(maxQty, Number(qty) || 1));
    let price = 0;
    let compareAtPrice = 0;
    let title = '';
    let sub = '';

    if (q === 1) {
      price = basePrice;
      compareAtPrice = baseCompareAt;
      title = '1x Kit Cepillo 9 en 1 Pro';
      sub = '9 cabezales + Vara extensible + Envío Gratis';
    } else if (q === 2) {
      price = 59.0;
      compareAtPrice = 110.0;
      title = '2x Kits (Pack Familiar / Mamá)';
      sub = 'Uno para baño y otro para cocina ($29.50 c/u)';
    } else {
      price = Number((29.5 * q).toFixed(2));
      compareAtPrice = Number((baseCompareAt * q).toFixed(2));
      title = `${q}x Kits Cepillo 9 en 1 Pro`;
      sub = `$29.50 cada kit + Envío Gratis a todo Ecuador`;
    }

    const totalSavings = Math.max(0, compareAtPrice - price);

    return {
      id: q,
      qty: q,
      title,
      sub,
      price,
      compareAtPrice,
      savingsText: `Ahorras ${money(totalSavings)} hoy`,
      badge: q > 1 ? `${q} Kits` : 'Oferta de hoy',
    };
  };

  return {
    brandName: 'CASA ALIVIO™',
    title: shopify.title || 'Cepillo 9 en 1 Pro — Edición Hogar & Alivio',
    handle: shopify.handle || 'cepillo-electrico-9-en-1-pro',
    sku: shopify.sku || '208333',
    variantId: shopify.variantId || null,
    currency: shopify.currency || 'USD',
    basePrice,
    baseCompareAt,
    maxQty,
    offers,
    offerForQty,
    stockLeft: Number(shopify.stockLeft || 14),
    warehouseCity: shopify.warehouseCity || 'Guayaquil',

    announcement: {
      text: 'Envío Contraentrega · Bodega Guayaquil',
      tag: 'Ahorras $20',
    },

    hero: {
      image: resolveImg(shopify.hero_image, 'relief_standing_clean.jpg'),
      floatingPill: 'Kit Completo 9 en 1',
      kicker: 'Cuidado articular & hogar',
      headlineStart: 'Limpia tu baño desde arriba hasta el piso ',
      headlineEm: 'sin doblar la espalda.',
      subline:
        'Un motor rotativo de 300 RPM acoplado a un brazo extensible de 1.20 metros. Él hace la presión contra el sarro y el moho; tú solo lo guías de pie.',
      specs: [
        { strong: '100% de pie', span: 'Cero dolor lumbar' },
        { strong: '300 RPM', span: 'Sin frotar a mano' },
        { strong: '90 Minutos', span: 'Batería sin cables' },
      ],
      priceBadge: 'Oferta de hoy',
      ctaMain: 'Pedir Ahora — Pagar al Recibir',
      ctaSub: 'Despacho rápido desde Guayaquil a todo Ecuador',
    },

    trustStrip: [
      '✓ 9 Cabezales Incluidos',
      '✓ Resistente al Agua',
      '✓ Pago en Efectivo',
    ],

    slider: {
      kicker: 'Prueba física en 30 segundos',
      title: 'El moho negro de las juntas no sale con trapo.',
      lead:
        'Desliza con el dedo para ver cómo las cerdas de alta densidad arrancan el hongo incrustado en la esquina de la ducha.',
      beforeImg: resolveImg(shopify.slider_before_image, 'before_dirty_tiles.jpg'),
      afterImg: resolveImg(shopify.slider_after_image, 'after_clean_tiles.jpg'),
      caption: 'Fotografía real en cerámica de ducha sin retoques digitales.',
    },

    pains: {
      kicker: 'Por qué cambiar el cepillo manual',
      title: 'Tres problemas cotidianos que damos por normales.',
      lead:
        'Limpiar la casa no debería costarte salud en las manos, en los pulmones ni en la cintura.',
      cards: [
        {
          num: 'Problema 01 · Contacto directo',
          title: 'Manos agrietadas por cloro y esponjas con bacterias',
          desc:
            'Exprimir a mano una esponja llena de grasa o moho del inodoro reseca la piel, rompe las uñas y te obliga a respirar vapores químicos de cerca.',
          solution:
            'Solución: Mantén tus manos a 1.20 m de distancia de la suciedad y los químicos.',
          image: resolveImg(shopify.pain_image_1, 'fear_disgust_germs.jpg'),
        },
        {
          num: 'Problema 02 · Rincones imposibles',
          title: 'El sarro acumulado detrás del grifo y rieles de ducha',
          desc:
            'Ni los trapos ni las esponjas entran en las ranuras estrechas. Terminas usando cepillos de dientes viejos y lastimándote los nudillos.',
          solution:
            'Solución: El cabezal cónico penetra en esquinas de 90° y bordes de grifería en segundos.',
          image: resolveImg(shopify.pain_image_2, 'zone_cone_corner.jpg'),
        },
      ],
    },

    zones: {
      kicker: 'Un cabezal para cada superficie',
      title: 'Cómo funciona en cada rincón de tu casa.',
      list: [
        {
          tabLabel: 'Cocina y Grasa',
          img: resolveImg(shopify.zone_image_1, 'zone_stove_grease.jpg'),
          tool: 'Cabezal Plano de Cerdas Duras',
          title: 'Despega grasa quemada de estufas y sartenes',
          text:
            'El torque constante levanta los restos pegados en hornillas, campanas extractoras y mesones de acero sin rayar la superficie.',
        },
        {
          tabLabel: 'Grifos y Esquinas',
          img: resolveImg(shopify.zone_image_2, 'zone_cone_corner.jpg'),
          tool: 'Cabezal Cónico de Precisión',
          title: 'Elimina el sarro en bordes de grifos y rieles',
          text:
            'Diseñado en punta para entrar detrás de las llaves de agua, esquinas de ducha y rieles de ventanas corredizas.',
        },
        {
          tabLabel: 'Ducha y Paredes Altas',
          img: resolveImg(shopify.zone_image_3, 'relief_standing_clean.jpg'),
          tool: 'Brazo Telescópico de 1.20 m',
          title: 'Alcanza azulejos altos y pisos sin agacharte',
          text:
            'Ajusta el largo en un clic para limpiar desde el techo de la ducha hasta el piso manteniendo tu columna totalmente recta.',
        },
      ],
      kitGrid: [
        { name: 'Cepillo Ancho', sub: 'Pisos y tinas' },
        { name: 'Punta Cónica', sub: 'Juntas y rieles' },
        { name: 'Domo Curvo', sub: 'Inodoro y lavabo' },
        { name: 'Fibra Verde', sub: 'Ollas y parrillas' },
        { name: 'Esponja Suave', sub: 'Platos y mesón' },
        { name: 'Microfibra', sub: 'Vidrios y espejos' },
        { name: 'Paño Pulidor', sub: 'Acero y auto' },
        { name: 'Cepillo Fino', sub: 'Grifería delicada' },
        { name: 'Vara 1.20 m', sub: '3 tramos + USB-C' },
      ],
    },

    reviews: [
      {
        id: 1,
        stars: '★★★★★',
        text:
          '"Tengo hernia discal y limpiar la cerámica de la ducha era un suplicio cada sábado. Con el tubo largo limpio hasta arriba parada recta."',
        author: 'Patricia M. — Guayaquil',
        tag: 'Compra verificada',
      },
      {
        id: 2,
        stars: '★★★★★',
        text:
          '"El cepillo en punta sacó el sarro negro que estaba pegado detrás de las llaves del lavamanos. Llegó en 24 horas y pagué en efectivo."',
        author: 'Gabriela R. — Quito',
        tag: 'Compra verificada',
      },
    ],

    codCard: {
      image: resolveImg(shopify.cod_image, 'cod_door_delivery.jpg'),
      title: 'Compra 100% libre de riesgo',
      desc:
        'No pedimos tarjetas. Despachamos desde nuestra bodega en Guayaquil y pagas al recibir.',
    },
  };
}
