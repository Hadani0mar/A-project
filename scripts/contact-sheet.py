from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[1]
files=sorted((root/'qa').glob('frame-*.png'))
thumbs=[]
font=ImageFont.truetype(str(root/'public/fonts/space-grotesk/space-grotesk-latin-wght-normal.woff2'),20) if False else ImageFont.load_default()
for f in files:
    im=Image.open(f).convert('RGB').resize((640,360),Image.Resampling.LANCZOS)
    tile=Image.new('RGB',(660,402),'#202620')
    tile.paste(im,(10,10))
    ImageDraw.Draw(tile).text((12,378),f.stem,fill='#EFEDE5',font=font)
    thumbs.append(tile)
cols=2
rows=(len(thumbs)+cols-1)//cols
sheet=Image.new('RGB',(cols*660,rows*402),'#151917')
for i,im in enumerate(thumbs):sheet.paste(im,((i%cols)*660,(i//cols)*402))
sheet.save(root/'qa/contact-sheet.jpg',quality=90)
print(root/'qa/contact-sheet.jpg')
