import folium
import requests
# Crear el mapa base centrado en Nueva York
map_ny = folium.Map(location=[40.7128, -74.0060], zoom_start=12)
# URL del archivo GeoJSON de estaciones de metro (esto es solo un ejemplo)
url_metro = 'https://data.cityofnewyork.us/resource/h9gi-nx95.geojson'
response_metro = requests.get(url_metro)
metro_data = response_metro.json()

# Agregar estaciones de metro al mapa
folium.GeoJson(
    metro_data,
    name='Estaciones de Metro',
    popup=folium.Popup('Estaciones de Metro', parse_html=True)
).add_to(map_ny)
# URL del archivo GeoJSON de parques (esto es solo un ejemplo)
url_parks = 'https://data.cityofnewyork.us/resource/p7jc-c8ak.geojson'
response_parks = requests.get(url_parks)
parks_data = response_parks.json()

# Agregar parques al mapa
folium.GeoJson(
    parks_data,
    name='Parques',
    popup=folium.Popup('Parques', parse_html=True)
).add_to(map_ny)
# Añadir control de capas
folium.LayerControl().add_to(map_ny)

# Guardar el mapa
map_ny.save('nyc_map_with_layers.html')
