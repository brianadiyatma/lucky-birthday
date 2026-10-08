"""Generate browser-friendly photos: python scripts/prepare_photos.py.

Requires Pillow and pillow-heif (optionally installed into .tools).
Original HEIC files are never modified. Exports omit source metadata.
"""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / '.tools'))
from PIL import Image, ImageDraw, ImageOps
from pillow_heif import register_heif_opener

register_heif_opener()
output = ROOT / 'assets' / 'photos'
output.mkdir(parents=True, exist_ok=True)
preview = ROOT / '.preview'
preview.mkdir(exist_ok=True)
files = sorted((ROOT / 'pic').glob('*.HEIC'))
sheet = Image.new('RGB', (1000, ((len(files) + 3) // 4) * 290), '#efeaf6')
draw = ImageDraw.Draw(sheet)
for index, source in enumerate(files):
    with Image.open(source) as raw:
        photo = ImageOps.exif_transpose(raw).convert('RGB')
        photo.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        photo.save(output / f'{source.stem}.webp', 'WEBP', quality=83, method=6)
        thumb = ImageOps.fit(photo, (230, 250), Image.Resampling.LANCZOS)
        x, y = (index % 4) * 250 + 10, (index // 4) * 290 + 10
        sheet.paste(thumb, (x, y))
        draw.text((x, y + 255), source.stem, fill='#342345')
        print(f'{source.stem}: {photo.width}x{photo.height}')
sheet.save(preview / 'contact-sheet.jpg')
