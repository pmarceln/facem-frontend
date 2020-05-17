# Made for creating builds on angular
rm -rf ../facem-dist/*
ng build --prod
cp -R dist/* ../facem-dist/
rm -rf dist/
