from PIL import Image
import os
import re
import glob
from pathlib import Path


dirname = Path(__file__).parents[1]

image_path = os.path.join(dirname, 'public/img')


for file in glob.glob(image_path + '/*.png'):
    img = Image.open(file)
    width, height = img.size
    img.thumbnail((width, height), Image.LANCZOS)
    img.save(file, 'JPEG', quality=50)

for file in glob.glob(image_path + '/*.jpg'):
    img = Image.open(file)
    width, height = img.size
    img.thumbnail((width, height), Image.LANCZOS)
    img.save(file, 'JPEG', quality=50)

for file in glob.glob(image_path + '/*.jpeg'):
    img = Image.open(file)
    width, height = img.size
    img.thumbnail((width, height), Image.LANCZOS)
    img.save(file, 'JPEG', quality=50)


