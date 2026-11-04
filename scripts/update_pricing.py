import os

def update_blender():
    path = r'shopify-theme\snippets\blender-landing.liquid'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update bundleOption2 card
    old_card = '''      <div
        id="bundleOption2"
        class="blender-bundle-card"
        onclick="selectBlenderBundle(2)"
      >
        <div class="b-bundle-left">
          <div class="b-radio-circle"></div>
          <div>
            <span class="b-bundle-title">2x Mini Licuadoras (Pack Dúo / Regalo)</span>
            <span class="b-bundle-sub">Para ti y tu amiga ($24.95 c/u — Ahorro Máximo)</span>
          </div>
        </div>
        <div class="b-bundle-price-col">
          <span class="b-bundle-price-now" id="b2PriceNow">$49.90</span>
          <span class="b-bundle-price-old" id="b2PriceOld">$59.80</span>
        </div>
      </div>'''

    new_card = '''      <div
        id="bundleOption2"
        class="blender-bundle-card"
        onclick="selectBlenderBundle(2)"
      >
        <div class="b-bundle-left">
          <div class="b-radio-circle"></div>
          <div>
            <span class="b-bundle-title">2x Mini Licuadoras (Pack Dúo / Regalo)</span>
            <span class="b-bundle-sub">Para ti y tu amiga ($24.90 c/u — Descuento -$10)</span>
          </div>
        </div>
        <div class="b-bundle-price-col">
          <span class="b-bundle-price-now" id="b2PriceNow">$49.80</span>
          <span class="b-bundle-price-old" id="b2PriceOld">$59.80</span>
        </div>
      </div>'''

    if old_card in content:
        content = content.replace(old_card, new_card)
        print("Updated blender card")
    else:
        print("Blender old card not found directly, checking partial")

    # 2. Update calculatePrice(q) and updateUi
    old_calc = '''    function calculatePrice(q) {
      if (q === 1) return basePrice;
      if (q === 2) return 49.90;
      return Number((24.95 * q).toFixed(2));
    }'''

    new_calc = '''    function calculatePrice(q) {
      var discount = q >= 2 ? 10.00 : 0;
      return Number(((basePrice * q) - discount).toFixed(2));
    }'''

    if old_calc in content:
        content = content.replace(old_calc, new_calc)
        print("Updated blender calculatePrice")
    else:
        print("Blender old calc not found directly")

    old_total_text = "document.getElementById('bTotalText').textContent = (currentQty === 1 ? '1x Licuadora por ' : currentQty + 'x Licuadoras (Pack Ahorro) por ') + formatMoney(totalPrice) + ' USD';"
    new_total_text = "var discountNote = currentQty >= 2 ? ' (Descuento -$10 aplicado)' : ''; document.getElementById('bTotalText').textContent = (currentQty === 1 ? '1x Licuadora por ' : currentQty + 'x Licuadoras' + discountNote + ' por ') + formatMoney(totalPrice) + ' USD';"
    if old_total_text in content:
        content = content.replace(old_total_text, new_total_text)
        print("Updated blender bTotalText")

    old_qty_label = "document.getElementById('bQtyLabel').textContent = currentQty === 1 ? '1 unidad (Kit completo con Envío Gratis)' : currentQty + ' unidades seleccionadas';"
    new_qty_label = "document.getElementById('bQtyLabel').textContent = currentQty === 1 ? '1 unidad (Kit completo con Envío Gratis)' : currentQty + ' unidades seleccionadas (Descuento -$10 aplicado en Checkout)';"
    if old_qty_label in content:
        content = content.replace(old_qty_label, new_qty_label)
        print("Updated blender bQtyLabel")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def update_massager():
    path = r'shopify-theme\snippets\massager-landing.liquid'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update card
    old_card = '''      <div
        id="mBundleOption2"
        class="spa-bundle-card"
        onclick="selectMassagerBundle(2)"
      >
        <div class="s-bundle-left">
          <div class="s-radio-circle"></div>
          <div>
            <span class="s-bundle-title">2x Masajeadores (Pack Pareja / Regalo Mamá)</span>
            <span class="s-bundle-sub">Uno para ti y otro de regalo ($34.95 c/u — Ahorro Máximo)</span>
          </div>
        </div>
        <div class="s-bundle-price-col">
          <span class="s-bundle-price-now" id="m2PriceNow">$69.90</span>
          <span class="s-bundle-price-old" id="m2PriceOld">$85.00</span>
        </div>
      </div>'''

    new_card = '''      <div
        id="mBundleOption2"
        class="spa-bundle-card"
        onclick="selectMassagerBundle(2)"
      >
        <div class="s-bundle-left">
          <div class="s-radio-circle"></div>
          <div>
            <span class="s-bundle-title">2x Masajeadores (Pack Pareja / Regalo)</span>
            <span class="s-bundle-sub">Uno para ti y otro de regalo ($37.50 c/u — Descuento -$10)</span>
          </div>
        </div>
        <div class="s-bundle-price-col">
          <span class="s-bundle-price-now" id="m2PriceNow">$75.00</span>
          <span class="s-bundle-price-old" id="m2PriceOld">$85.00</span>
        </div>
      </div>'''

    if old_card in content:
        content = content.replace(old_card, new_card)
        print("Updated massager card")

    # 2. Update calculatePrice
    old_calc = '''    function calculatePrice(q) {
      if (q === 1) return basePrice;
      if (q === 2) return 69.90;
      return Number((34.95 * q).toFixed(2));
    }'''

    new_calc = '''    function calculatePrice(q) {
      var discount = q >= 2 ? 10.00 : 0;
      return Number(((basePrice * q) - discount).toFixed(2));
    }'''

    if old_calc in content:
        content = content.replace(old_calc, new_calc)
        print("Updated massager calculatePrice")

    old_total_text = "document.getElementById('mTotalText').textContent = (currentQty === 1 ? '1x Masajeador por ' : currentQty + 'x Masajeadores (Pack Pareja) por ') + formatMoney(totalPrice) + ' USD';"
    new_total_text = "var discountNote = currentQty >= 2 ? ' (Descuento -$10 aplicado)' : ''; document.getElementById('mTotalText').textContent = (currentQty === 1 ? '1x Masajeador por ' : currentQty + 'x Masajeadores' + discountNote + ' por ') + formatMoney(totalPrice) + ' USD';"
    if old_total_text in content:
        content = content.replace(old_total_text, new_total_text)
        print("Updated massager mTotalText")

    old_qty_label = "document.getElementById('mQtyLabel').textContent = currentQty === 1 ? '1 unidad (Kit completo con Envío Gratis)' : currentQty + ' unidades seleccionadas';"
    new_qty_label = "document.getElementById('mQtyLabel').textContent = currentQty === 1 ? '1 unidad (Kit completo con Envío Gratis)' : currentQty + ' unidades seleccionadas (Descuento -$10 aplicado en Checkout)';"
    if old_qty_label in content:
        content = content.replace(old_qty_label, new_qty_label)
        print("Updated massager mQtyLabel")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)


def update_blender_config():
    path = r'src\data\blenderBunnyConfig.js'
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if 'const offers = [' in line:
            start_idx = i
        if 'return {' in line and start_idx is not None and end_idx is None:
            end_idx = i
            break

    if start_idx is not None and end_idx is not None:
        replacement = [
            "  const offers = [\n",
            "    {\n",
            "      id: 1,\n",
            "      qty: 1,\n",
            "      title: '1x Mini Licuadora Conejito Portatil',\n",
            "      sub: 'Vaso Tritan 350ml + Tapa Orejitas + Cable USB-C + Envio Gratis',\n",
            "      price: basePrice,\n",
            "      compareAtPrice: baseCompareAt,\n",
            "      savingsText: `Ahorras ${money(baseCompareAt - basePrice)} hoy`,\n",
            "      badge: 'Oferta Individual',\n",
            "    },\n",
            "    {\n",
            "      id: 2,\n",
            "      qty: 2,\n",
            "      title: '2x Mini Licuadoras (Pack Duo / Regalo)',\n",
            "      sub: 'Para ti y una amiga ($24.90 c/u - Descuento -$10)',\n",
            "      price: Number(((basePrice * 2) - 10.00).toFixed(2)),\n",
            "      compareAtPrice: Number((basePrice * 2).toFixed(2)),\n",
            "      savingsText: 'Ahorras $10.00 hoy',\n",
            "      badge: 'Pack Duo (Ahorro -$10)',\n",
            "    },\n",
            "  ];\n",
            "\n",
            "  const offerForQty = (qty) => {\n",
            "    const q = Math.max(1, Math.min(maxQty, Number(qty) || 1));\n",
            "    const discount = q >= 2 ? 10.00 : 0;\n",
            "    const price = Number(((basePrice * q) - discount).toFixed(2));\n",
            "    const compareAtPrice = Number((baseCompareAt * q).toFixed(2));\n",
            "    const unitPrice = Number((price / q).toFixed(2));\n",
            "    let title = '';\n",
            "    let sub = '';\n",
            "\n",
            "    if (q === 1) {\n",
            "      title = '1x Mini Licuadora Conejito Portatil';\n",
            "      sub = 'Vaso Tritan 350ml + Tapa Orejitas + Cable USB-C + Envio Gratis';\n",
            "    } else if (q === 2) {\n",
            "      title = '2x Mini Licuadoras (Pack Duo / Regalo)';\n",
            "      sub = `Una para ti y otra para regalar ($${unitPrice.toFixed(2)} c/u — Descuento -$10)`;\n",
            "    } else {\n",
            "      title = `${q}x Mini Licuadoras Conejito Portatiles`;\n",
            "      sub = `$${unitPrice.toFixed(2)} c/u (Descuento -$10 aplicado) + Envio Gratis`;\n",
            "    }\n",
            "\n",
            "    const totalSavings = Math.max(0, compareAtPrice - price);\n",
            "\n",
            "    return {\n",
            "      id: q,\n",
            "      qty: q,\n",
            "      title,\n",
            "      sub,\n",
            "      price,\n",
            "      compareAtPrice,\n",
            "      savingsText: `Ahorras ${money(totalSavings)} hoy`,\n",
            "      badge: q > 1 ? `${q} Licuadoras (Ahorro -$10)` : 'Oferta Individual',\n",
            "    };\n",
            "  };\n",
            "\n"
        ]
        lines = lines[:start_idx] + replacement + lines[end_idx:]
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print("Updated blenderBunnyConfig.js successfully via line slice!")
    else:
        print("Could not find start/end indices in blenderBunnyConfig.js", start_idx, end_idx)


def update_cepillo_config():
    path = r'src\data\productConfig.js'
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    start_idx = None
    end_idx = None
    for i, line in enumerate(lines):
        if 'const offers = [' in line:
            start_idx = i
        if 'return {' in line and start_idx is not None and end_idx is None:
            end_idx = i
            break

    if start_idx is not None and end_idx is not None:
        replacement = [
            "  const offers = [\n",
            "    {\n",
            "      id: 1,\n",
            "      qty: 1,\n",
            "      title: '1x Kit Cepillo 9 en 1 Pro',\n",
            "      sub: '9 cabezales + Brazo extensible + Envio Gratis',\n",
            "      price: basePrice,\n",
            "      compareAtPrice: baseCompareAt,\n",
            "      savingsText: `Ahorras ${money(baseCompareAt - basePrice)} hoy`,\n",
            "      badge: 'Oferta Individual',\n",
            "    },\n",
            "    {\n",
            "      id: 2,\n",
            "      qty: 2,\n",
            "      title: '2x Kits (Pack Familiar / Mama)',\n",
            "      sub: 'Uno para bano y otro para cocina ($39.90 c/u — Descuento -$10)',\n",
            "      price: Number(((basePrice * 2) - 10.00).toFixed(2)),\n",
            "      compareAtPrice: Number((basePrice * 2).toFixed(2)),\n",
            "      savingsText: 'Ahorras $10.00 hoy',\n",
            "      badge: 'Pack Familiar (Ahorro Maximo)',\n",
            "    },\n",
            "  ];\n",
            "\n",
            "  const offerForQty = (qty) => {\n",
            "    const q = Math.max(1, Math.min(maxQty, Number(qty) || 1));\n",
            "    const discount = q >= 2 ? 10.00 : 0;\n",
            "    const price = Number(((basePrice * q) - discount).toFixed(2));\n",
            "    const compareAtPrice = Number((baseCompareAt * q).toFixed(2));\n",
            "    const unitPrice = Number((price / q).toFixed(2));\n",
            "    let title = '';\n",
            "    let sub = '';\n",
            "\n",
            "    if (q === 1) {\n",
            "      title = '1x Kit Cepillo 9 en 1 Pro';\n",
            "      sub = '9 cabezales + Brazo extensible + Envio Gratis';\n",
            "    } else if (q === 2) {\n",
            "      title = '2x Kits (Pack Familiar / Mama)';\n",
            "      sub = `Uno para bano y otro para cocina ($${unitPrice.toFixed(2)} c/u — Descuento -$10)`;\n",
            "    } else {\n",
            "      title = `${q}x Kits Cepillo 9 en 1 Pro`;\n",
            "      sub = `$${unitPrice.toFixed(2)} c/u (Descuento -$10 aplicado) + Envio Gratis`;\n",
            "    }\n",
            "\n",
            "    const totalSavings = Math.max(0, compareAtPrice - price);\n",
            "\n",
            "    return {\n",
            "      id: q,\n",
            "      qty: q,\n",
            "      title,\n",
            "      sub,\n",
            "      price,\n",
            "      compareAtPrice,\n",
            "      savingsText: `Ahorras ${money(totalSavings)} hoy`,\n",
            "      badge: q > 1 ? `${q} Kits (Ahorro -$10)` : 'Oferta Individual',\n",
            "    };\n",
            "  };\n",
            "\n"
        ]
        lines = lines[:start_idx] + replacement + lines[end_idx:]
        with open(path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print("Updated productConfig.js successfully via line slice!")
    else:
        print("Could not find start/end indices in productConfig.js", start_idx, end_idx)

if __name__ == '__main__':
    update_blender()
    update_massager()
    update_blender_config()
    update_cepillo_config()
