"""Create a portable source ZIP, excluding dependencies and local output."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
excluded = {"node_modules", "dist", ".git", ".publish", "coverage", ".vite", "__pycache__"}
target = root / "karat-practice.zip"
with ZipFile(target, "w", ZIP_DEFLATED) as archive:
    for path in sorted(root.rglob("*")):
        relative = path.relative_to(root)
        if not path.is_file() or any(part in excluded for part in relative.parts):
            continue
        if path.suffix in {".zip", ".log"} or path.name.startswith(".env"):
            continue
        archive.write(path, Path("karat") / relative)
print(f"Created {target}")
