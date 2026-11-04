import json
import re
import shutil
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "src"
THEME_DIR = ROOT / "shopify-theme"
ASSETS_DIR = THEME_DIR / "assets"
PUBLIC_IMG_DIR = ROOT / "public" / "images"

# Solo imágenes viscerales, creíbles y de demostración real (sin melodrama artificial)
GENERATED_IMAGES_SOURCE = {
    "unboxing_flatlay_9in1.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\unboxing_flatlay_9in1_1793675585790.jpg",
    "before_dirty_tiles.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\before_dirty_tiles_1793671928227.jpg",
    "after_clean_tiles.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\after_clean_tiles_1793671949521.jpg",
    "fear_disgust_germs.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\fear_disgust_germs_1793672004280.jpg",
    "relief_standing_clean.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\relief_standing_clean_1793671971378.jpg",
    "zone_cone_corner.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\zone_cone_corner_1793671997938.jpg",
    "zone_stove_grease.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\zone_stove_grease_1793672023537.jpg",
    "cod_door_delivery.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\cod_door_delivery_1793672050011.jpg",
    "blender_bunny_hero.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\blender_bunny_hero_png_1793734118504.jpg",
    "blender_heavy_pain.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\blender_heavy_pain_png_1793734134845.jpg",
    "blender_on_the_go.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\blender_on_the_go_png_1793734152347.jpg",
    "blender_unboxing_features.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\blender_unboxing_features_png_1793734170977.jpg",
    "massager_scalp_hero.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\massager_scalp_hero_jpg_1793806875277.jpg",
    "massager_shower_wet.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\massager_shower_wet_jpg_1793806896303.jpg",
    "massager_neck_stress_pain.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\massager_neck_stress_pain_jpg_1793806923148.jpg",
    "massager_unboxing_nodes.jpg": r"C:\Users\angel\.gemini\antigravity\brain\8847dfa2-3cc2-401f-81b6-37b2e68eb18f\massager_unboxing_nodes_jpg_1793806964627.jpg",
}

OBSOLETE_IMAGES = [
    "hero_split_emotion.jpg",
    "fear_back_pain.jpg",
    "fear_shame_mold.jpg",
    "fear_lost_sunday.jpg",
]

MODULE_ORDER = [
    SRC_DIR / "components" / "SvgIcons.js",
    SRC_DIR / "components" / "QtyStepper.js",
    SRC_DIR / "data" / "productConfig.js",
    SRC_DIR / "data" / "blenderBunnyConfig.js",
    SRC_DIR / "data" / "productCatalog.js",
    SRC_DIR / "components" / "TopUrgencyTicker.js",
    SRC_DIR / "components" / "EmotionalHeroMobile.js",
    SRC_DIR / "components" / "ThumbCleanInteractive.js",
    SRC_DIR / "components" / "VisualZoneTapper.js",
    SRC_DIR / "components" / "PhysicalReliefSection.js",
    SRC_DIR / "components" / "RealFeelingsUgc.js",
    SRC_DIR / "components" / "ZeroFearCodSection.js",
    SRC_DIR / "components" / "StickyThumbBar.js",
    SRC_DIR / "App.js",
    SRC_DIR / "main.js",
]


def sync_images():
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_IMG_DIR.mkdir(parents=True, exist_ok=True)

    # Limpiar imágenes melodramáticas descartadas
    for old_name in OBSOLETE_IMAGES:
        for folder in (ASSETS_DIR, PUBLIC_IMG_DIR):
            old_file = folder / old_name
            if old_file.exists():
                old_file.unlink()
                print(f"[CLEAN] Removed obsolete {old_file.relative_to(ROOT)}")

    for target_name, src_str in GENERATED_IMAGES_SOURCE.items():
        src_path = Path(src_str)
        dest_asset = ASSETS_DIR / target_name
        dest_public = PUBLIC_IMG_DIR / target_name
        if src_path.exists():
            shutil.copy2(src_path, dest_asset)
            shutil.copy2(src_path, dest_public)
            size_kb = dest_asset.stat().st_size / 1024
            print(f"[IMG] {target_name} ({size_kb:.1f} KB)")
        elif not dest_asset.exists():
            raise FileNotFoundError(f"Missing image: {target_name} from {src_path}")


def strip_esm_syntax(code: str) -> str:
    code = re.sub(r"^\s*import\s+[\s\S]*?from\s+['\"].*?['\"];?\s*$", "", code, flags=re.MULTILINE)
    code = re.sub(r"^\s*export\s+(const|function|let|var)\s+", r"\1 ", code, flags=re.MULTILINE)
    return code.strip()


def build_vue_bundle():
    chunks = [
        "/* Cepillo 9 en 1 Pro - Clean Home & Relief Vue 3 Bundle para Shopify OS 2.0 */",
        "(function () {",
        "  'use strict';",
        "  function bootCepilloVue() {",
        "    if (!window.Vue) {",
        "      setTimeout(bootCepilloVue, 40);",
        "      return;",
        "    }",
        "    const { createApp, ref, computed, reactive, onMounted, onUnmounted } = window.Vue;",
    ]

    for mod_path in MODULE_ORDER:
        raw = mod_path.read_text(encoding="utf-8")
        cleaned = strip_esm_syntax(raw)
        chunks.append(f"\n    // --- {mod_path.name} ---")
        for line in cleaned.splitlines():
            chunks.append("    " + line if line.strip() else "")

    chunks.extend(
        [
            "  }",
            "  if (document.readyState === 'loading') {",
            "    document.addEventListener('DOMContentLoaded', bootCepilloVue);",
            "  } else {",
            "    bootCepilloVue();",
            "  }",
            "})();",
            "",
        ]
    )

    out_js = ASSETS_DIR / "cepillo-vue-app.js"
    out_js.write_text("\n".join(chunks), encoding="utf-8")
    print(f"[JS]  Built {out_js.relative_to(ROOT)} ({out_js.stat().st_size / 1024:.1f} KB)")

    out_css = ASSETS_DIR / "cepillo-vue-style.css"
    shutil.copy2(SRC_DIR / "style.css", out_css)
    print(f"[CSS] Built {out_css.relative_to(ROOT)} ({out_css.stat().st_size / 1024:.1f} KB)")


def generate_local_preview():
    preview_html = ROOT / "preview-mobile.html"
    content = """<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
    <meta name="theme-color" content="#ffffff">
    <title>Vista Previa Móvil · Cepillo Eléctrico 9 en 1 Pro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./shopify-theme/assets/cepillo-vue-style.css">
  </head>
  <body>
    <div id="cepillo-vue-root"></div>
    <script>
      window.__SHOPIFY_DATA__ = {
        assetsBase: './shopify-theme/assets/',
        price: 44.90,
        compareAtPrice: 69.90,
        stockLeft: 14,
        warehouseCity: 'Guayaquil'
      };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.prod.js" defer onerror="this.onerror=null;this.src='https://cdnjs.cloudflare.com/ajax/libs/vue/3.5.13/vue.global.prod.min.js'"></script>
    <script src="./shopify-theme/assets/cepillo-vue-app.js" defer></script>
  </body>
</html>
"""
    preview_html.write_text(content, encoding="utf-8")
    print(f"[PREVIEW] Updated {preview_html.name}")


def validate_shopify_theme():
    theme_liquid = (THEME_DIR / "layout" / "theme.liquid").read_text(encoding="utf-8")
    assert "content_for_header" in theme_liquid, "Missing content_for_header in theme.liquid"
    assert "content_for_layout" in theme_liquid, "Missing content_for_layout in theme.liquid"

    for json_file in THEME_DIR.rglob("*.json"):
        data = json.loads(json_file.read_text(encoding="utf-8"))
        assert data is not None

    default_locales = list((THEME_DIR / "locales").glob("*.default.json"))
    assert len(default_locales) == 1, f"Expected 1 default locale, found {len(default_locales)}"

    for sec_file in (THEME_DIR / "sections").glob("*.liquid"):
        txt = sec_file.read_text(encoding="utf-8")
        m = re.search(r"\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}", txt)
        assert m, f"Missing schema in {sec_file.name}"
        schema = json.loads(m.group(1))
        assert len(schema.get("name", "")) <= 25, f"Section name > 25 chars in {sec_file.name}"
        for s in schema.get("settings", []):
            lbl = s.get("label", "")
            assert len(lbl) <= 50, f"Setting label > 50 chars ('{lbl}') in {sec_file.name}"

    print("[OK] Shopify Online Store 2.0 validation passed 100%!")


def build_archives():
    zip_out = ROOT / "cepillo-9en1-shopify.zip"
    if zip_out.exists():
        zip_out.unlink()

    with zipfile.ZipFile(zip_out, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for file_path in sorted(THEME_DIR.rglob("*")):
            if file_path.is_file():
                arcname = file_path.relative_to(THEME_DIR).as_posix()
                zf.write(file_path, arcname)

    zip_mb = zip_out.stat().st_size / (1024 * 1024)
    print(f"[ZIP] Created {zip_out.name} ({zip_mb:.2f} MB) -> Ready for Shopify Upload!")

    rar_exe = Path(r"C:\Program Files\WinRAR\Rar.exe")
    rar_out = ROOT / "cepillo-9en1-shopify.rar"
    if rar_out.exists():
        rar_out.unlink()
    if rar_exe.exists():
        res = subprocess.run(
            [str(rar_exe), "a", "-r", str(rar_out), "."],
            cwd=str(THEME_DIR),
            capture_output=True,
            text=True,
        )
        if res.returncode == 0 and rar_out.exists():
            rar_mb = rar_out.stat().st_size / (1024 * 1024)
            print(f"[RAR] Created {rar_out.name} ({rar_mb:.2f} MB)")


if __name__ == "__main__":
    sync_images()
    build_vue_bundle()
    generate_local_preview()
    validate_shopify_theme()
    build_archives()
