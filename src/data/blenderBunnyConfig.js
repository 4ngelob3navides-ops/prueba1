// Configuración para: MINI LICUADORA CONEJITO PORTÁTIL
// Neuromarketing: Hábitos saludables sin pereza, cero trastes que lavar, batidos frescos donde sea

export function getBlenderBunnyConfig(shopify = {}) {
  const assetsBase = shopify.assetsBase || './shopify-theme/assets/';

  const resolveImg = (customUrl, filename) => {
    if (customUrl && typeof customUrl === 'string' && customUrl.trim() !== '') {
      return customUrl;
    }
    return `${assetsBase}${filename}`;
  };

  // Precio dinámico desde Shopify (Admin > Productos)
  const basePrice = Number(shopify.price || 29.90);
  const baseCompareAt =
    Number(shopify.compareAtPrice) > basePrice
      ? Number(shopify.compareAtPrice)
      : 49.90;

  const maxQty = Math.max(1, Math.min(20, Number(shopify.maxQty || 10)));
  const money = (n) => `$${Number(n).toFixed(2)}`;

  const offers = [
    {
      id: 1,
      qty: 1,
      title: '1x Mini Licuadora Conejito Portátil',
      sub: 'Vaso Tritán 350ml + Tapa Orejitas + Cable USB-C + Envío Gratis',
      price: basePrice,
      compareAtPrice: baseCompareAt,
      savingsText: `Ahorras ${money(baseCompareAt - basePrice)} hoy`,
      badge: 'Oferta Individual',
    },
    {
      id: 2,
      qty: 2,
      title: '2x Mini Licuadoras (Pack Dúo / Regalo)',
      sub: 'Para ti y una amiga ($24.95 c/u — Ahorro Máximo)',
      price: 49.90,
      compareAtPrice: 59.80,
      savingsText: 'Ahorras $9.90 hoy',
      badge: 'Pack Dúo ⭐',
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
      title = '1x Mini Licuadora Conejito Portátil';
      sub = 'Vaso Tritán 350ml + Tapa Orejitas + Cable USB-C + Envío Gratis';
    } else if (q === 2) {
      price = 49.90;
      compareAtPrice = 59.80;
      title = '2x Mini Licuadoras (Pack Dúo / Regalo)';
      sub = 'Una para ti y otra para regalar o para la oficina ($24.95 c/u)';
    } else {
      const unit = 24.95;
      price = Number((unit * q).toFixed(2));
      compareAtPrice = Number((baseCompareAt * q).toFixed(2));
      title = `${q}x Mini Licuadoras Conejito Portátiles`;
      sub = `${money(unit)} cada una + Envío Gratis a todo Ecuador`;
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
      badge: q > 1 ? `${q} Unidades` : 'Oferta de hoy',
    };
  };

  return {
    brandName: 'CASA VITA™',
    title: shopify.title || 'MINI LICUADORA CONEJITO PORTÁTIL',
    handle: 'mini-licuadora-conejito-portatil',
    sku: shopify.sku || 'MIV000319',
    variantId: shopify.variantId || null,
    currency: shopify.currency || 'USD',
    basePrice,
    baseCompareAt,
    maxQty,
    offers,
    offerForQty,
    stockLeft: Number(shopify.stockLeft || 100),
    warehouseCity: shopify.warehouseCity || 'Guayaquil',

    announcement: {
      text: 'Envío Contraentrega · Bodega Guayaquil',
      tag: 'Ahorras $15',
    },

    hero: {
      image: resolveImg(shopify.hero_image, 'blender_bunny_hero.jpg'),
      floatingPill: 'Edición Portátil USB-C',
      kicker: 'Nutrición & hábitos sin pereza',
      headlineStart: 'Tus batidos frescos y espumosos en 30 segundos ',
      headlineEm: 'sin lavar la licuadora gigante de casa.',
      subline:
        'Licúa y toma directamente del mismo vaso de 350ml. Motor de 18.000 RPM con 6 cuchillas de acero inoxidable que trituran fruta fresca y hielo. Ponle agua con una gota de jabón 5 segundos y se auto-lava sola.',
      specs: [
        { strong: '30 Segundos', span: 'Sin grumos ni trozos' },
        { strong: 'Tomas del Vaso', span: 'Cero loza que fregar' },
        { strong: '15 Batidos', span: 'Por carga USB-C' },
      ],
      priceBadge: 'Oferta de hoy',
      ctaMain: 'Pedir Ahora — Pagar al Recibir',
      ctaSub: 'Despacho rápido desde Guayaquil a todo Ecuador',
    },

    trustStrip: [
      '✓ Cuchillas Acero Inoxidable',
      '✓ Libre de BPA (Tritán)',
      '✓ Pago en Efectivo',
    ],

    slider: {
      kicker: 'Demostración en 30 segundos',
      title: 'Un jugo preparado horas antes se oxida y pierde sabor.',
      lead:
        'Desliza con el dedo para ver cómo la Mini Licuadora Conejito transforma fruta entera en un smoothie cremoso y oxigenado recién hecho.',
      beforeImg: resolveImg(shopify.slider_before_image, 'blender_heavy_pain.jpg'),
      afterImg: resolveImg(shopify.slider_after_image, 'blender_bunny_hero.jpg'),
      caption: 'Textura cremosa en 30 segundos sin trozos pegados en el fondo.',
    },

    pains: {
      kicker: 'Por qué dejar la licuadora gigante guardada',
      title: 'Dos problemas cotidianos que arruinan tus hábitos.',
      lead:
        'Alimentarte sano no debería quitarte tiempo fregando aparatos pesados con cables cada mañana.',
      cards: [
        {
          num: 'Problema 01 · La pereza matutina',
          title: 'Ensuciar la licuadora de vidrio de 3 kg por un solo vaso',
          desc:
            'Sacar la base pesada, lidiar con cables enredados, desarmar la rosca filosa y fregar el vaso enorme hace que termines desayunando café con pan o saltándote la fruta.',
          solution:
            'Solución: El termo es tu licuadora. Tomas directamente de ahí y se lava sola con agua en 5 segundos.',
          image: resolveImg(shopify.pain_image_1, 'blender_heavy_pain.jpg'),
        },
        {
          num: 'Problema 02 · Oxidación en el termo',
          title: 'Llevar jugos hechos de casa que se ponen negros y amargos',
          desc:
            'Si licúas a las 7 AM para tomar a las 11 AM en la oficina, la fibra se separa del agua, el jugo se oscurece por la oxidación y pierde nutrientes con el calor del día.',
          solution:
            'Solución: Lleva tu fruta picada fresca en el vaso y licúa en tu escritorio o en el auto al momento de tomar.',
          image: resolveImg(shopify.pain_image_2, 'blender_on_the_go.jpg'),
        },
      ],
    },

    zones: {
      kicker: 'Versatilidad para todo el día',
      title: 'Tu compañera de nutrición en cada momento.',
      list: [
        {
          tabLabel: 'Desayuno Express',
          img: resolveImg(shopify.zone_image_1, 'blender_bunny_hero.jpg'),
          tool: 'Modo Smoothie Matutino',
          title: 'Batido de avena, frutos rojos y leche en 30s',
          text:
            'Sal de casa desayunado y con energía. Pon los ingredientes, pulsa el botón dos veces y bebe directo del vaso en tu camino.',
        },
        {
          tabLabel: 'Gym & Proteína',
          img: resolveImg(shopify.zone_image_2, 'blender_on_the_go.jpg'),
          tool: 'Batido de Proteína Sin Grumos',
          title: 'Dile adiós a los polvos apelmazados en el shaker',
          text:
            'Sus 18.000 RPM disuelven completamente la proteína en polvo, creatina y suplementos, logrando una textura suave como de cafetería.',
        },
        {
          tabLabel: 'Oficina & Universidad',
          img: resolveImg(shopify.zone_image_3, 'blender_unboxing_features.jpg'),
          tool: 'Refresco Natural en tu Escritorio',
          title: 'Frappés y jugos helados sin cables',
          text:
            'Batería recargable por USB-C con autonomía para hasta 15 preparaciones completas. Cárgala en tu laptop o cargador del celular.',
        },
      ],
      kitGrid: [
        { name: 'Vaso Tritán 350ml', sub: 'Libre de BPA' },
        { name: 'Tapa Orejitas', sub: 'Hermética anti-derrame' },
        { name: '6 Cuchillas Inox', sub: 'Tritura hielo y fruta' },
        { name: 'Motor 18.000 RPM', sub: 'Alto torque silencioso' },
        { name: 'Batería USB-C', sub: '15 batidos por carga' },
        { name: 'Doble Clic Seguro', sub: 'No enciende por error' },
        { name: 'Correa Silicona', sub: 'Para llevar en mano' },
        { name: 'Auto-Lavado', sub: '5 segundos con agua' },
        { name: 'Garantía 30 Días', sub: 'Despacho Guayaquil' },
      ],
    },

    reviews: [
      {
        id: 1,
        stars: '★★★★★',
        text:
          '"Me daba una pereza tremenda lavar la licuadora Oster grande solo para hacerme un batido de proteína en la mañana. Ahora meto la fruta, licúo en 30 segundos y salgo manejando con el conejito. Es hermosa y tiene muchísima fuerza."',
        author: 'Camila S. — Samborondón, Guayaquil',
        tag: 'Compra verificada',
      },
      {
        id: 2,
        stars: '★★★★★',
        text:
          '"Las orejitas de conejo son adorables pero lo que más me sorprendió es la potencia: licúa hielo y frutos rojos congelados sin atorarse. Pagué al repartidor en efectivo cuando me llegó."',
        author: 'Andrea V. — Cumbayá, Quito',
        tag: 'Compra verificada',
      },
    ],

    codCard: {
      image: resolveImg(shopify.cod_image, 'cod_door_delivery.jpg'),
      title: 'Pagas en efectivo al recibir',
      desc:
        'Sin tarjetas ni pagos anticipados. Despachamos desde nuestra bodega en Guayaquil con entrega en 24-48h y pagas al recibir la caja.',
    },
  };
}

