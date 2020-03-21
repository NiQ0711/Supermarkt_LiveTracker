import "./leaflet.css";
import "./customermap.styles.css";
import * as React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";

export interface CustomerMapProps {
  className?: string;
}

type State = {
  hasLocation: boolean,
  latlng: {
    lat: number,
    lng: number,
  },
}

export default class CustomerMap extends React.Component<{}, State> {
  mapRef = React.createRef<Map>()

  state = {
    hasLocation: false,
    latlng: {
      lat: 51.505,
      lng: -0.09,
    },
  }

  handleClick = () => {
    const map = this.mapRef.current
    if (map != null) {
      map.leafletElement.locate()
    }
  }

  handleLocationFound = (e: Object) => {
    this.setState({
      hasLocation: true,
      latlng: e.latLng
    })
  }

  render(){
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null

    const position: LatLngTuple = [52.520008, 13.404954];

    return (
      <div className={["customerMap"].join(" ")}>
        <Map className='customerMap__map' center={position} zoom={15}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}
