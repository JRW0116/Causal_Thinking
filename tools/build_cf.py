"""Stage the site for the Cloudflare Worker (causal-thinking-lab): copies index.html + assets/ into dist/."""
import pathlib, shutil
root = pathlib.Path(__file__).resolve().parent.parent
dist = root / "dist"
if dist.exists():
    shutil.rmtree(dist)
dist.mkdir()
shutil.copy2(root / "index.html", dist / "index.html")
shutil.copytree(root / "assets", dist / "assets")
print("staged", sum(1 for f in dist.rglob("*") if f.is_file()), "files in", dist)
