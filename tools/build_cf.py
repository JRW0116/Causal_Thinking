"""Stage the site for the Cloudflare Worker (research-portfolio): dist/causal-thinking/ + root redirect."""
import pathlib, shutil
root = pathlib.Path(__file__).resolve().parent.parent
dist = root / "dist"
if dist.exists():
    shutil.rmtree(dist)
out = dist / "causal-thinking"
out.mkdir(parents=True)
shutil.copy2(root / "index.html", out / "index.html")
shutil.copytree(root / "assets", out / "assets")
(dist / "_redirects").write_text("/ /causal-thinking/ 302\n", encoding="utf-8")
print("staged", sum(1 for _ in out.rglob("*") if _.is_file()), "files in", out)
