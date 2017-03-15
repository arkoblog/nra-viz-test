# Install jq

sudo apt-get install jq

# Subset large file for individual districts after browsing to directory

jq '{type: .type , features: [ .features[]| select( .properties.NAME_3 == "Dhading") ] }' nepal-vdc-all.geojson > Dhading.geojson

# Join geojson files

sudo npm install geojson-merge -g
geojson-merge individual/*.geojson > five_districts.geojson


# Dissolve vdcs to districts
sudo npm install -g mapshaper
mapshaper -i gorkha.geojson --dissolve -o gorkha_dis.geojson



