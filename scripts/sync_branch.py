import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def sync_shopify_branch():
    # 0. Guardar cambios pendientes en main (si los hay) para que la rama shopify use lo último
    subprocess.run(["git", "add", "-A"], cwd=str(ROOT), check=True)
    staged = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=str(ROOT))
    if staged.returncode != 0:
        subprocess.run(["git", "commit", "-q", "-m", "chore: actualizar tema"], cwd=str(ROOT), check=True)
        print("[OK] Cambios guardados en main.")

    # 1. Obtener el tree ID de shopify-theme
    res = subprocess.run(
        ["git", "rev-parse", "HEAD:shopify-theme"],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        check=True,
    )
    tree_id = res.stdout.strip()

    # 2. Crear commit donde la raíz sea el tema
    res2 = subprocess.run(
        ["git", "commit-tree", tree_id, "-m", "chore: sync shopify theme"],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        check=True,
    )
    commit_id = res2.stdout.strip()

    # 3. Mover la rama local 'shopify'
    subprocess.run(["git", "branch", "-f", "shopify", commit_id], cwd=str(ROOT), check=True)

    print(f"[OK] Rama 'shopify' actualizada con el tema en la raiz.")
    print("Para subir a GitHub ejecuta: git push origin shopify --force")

if __name__ == "__main__":
    sync_shopify_branch()

