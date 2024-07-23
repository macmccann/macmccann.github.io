# build the pages
cd src
python3 template.py
cd ..
cp -r ./blog ../docs/
