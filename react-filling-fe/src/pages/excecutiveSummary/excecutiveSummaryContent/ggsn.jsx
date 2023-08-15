
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

function GGSN() {
    const position = [-2.5489, 118.0149]; // Initial map center coordinates
  return (
    <MapContainer center={position} zoom={4} zoomControl={false} style={{ height: '200px' , width:'500px' , backgroundColor:'white' }}>
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
      /> */}
      <TileLayer
        url="http://localhost:2023/api/map/test/gridjson/{z}/{x}/{y}.png"
        // attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>GilaMap</a> contributors"
      />
      {/* <Marker position={position}>
        <Popup>
          A sample marker indicating the initial center of the map.
        </Popup>
      </Marker> */}
      {/* <GeoJSONLayer data={Province} style={geoJSONStyle} /> */}
    </MapContainer>
  )
}

export default GGSN