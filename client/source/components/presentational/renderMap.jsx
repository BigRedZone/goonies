import React from 'react';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';
// import dotenv from 'dotenv';

// dotenv.config({ path: '../../../../.env' });
import key from '../../../../myapikey';

const apiKey = key.key;

// const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hikingTrails: [
        {
          id: 0,
          trailName: 'Half Dome',
          distance: 2,
          difficulty: 'Novice',
          latitude: 37.749669,
          longitude: -119.555108,
          rating: 9,
          ratingVotes: 2421,
          summary: 'Dont go chasin waterfalls',
          isOpen: false,
        },
        {
          id: 1,
          trailName: 'Lower Yosemite Fall Trail',
          distance: 2,
          difficulty: 'Novice',
          latitude: 37.759669,
          longitude: -119.655108,
          rating: 9,
          ratingVotes: 2123,
          summary: 'We have waterfalls and waffles',
          isOpen: false,
        },
      ],
    };
  }

  handleMarkerClick(marker) {
    // use the data from marker when you click on marker
    console.log('marker', marker);
    console.log(this);
  }

  render() {
    const { hikingTrails } = this.state;
    const markers = hikingTrails.map(trail => (
      <Marker
        key={trail.id}
        position={{
          lat: trail.latitude,
          lng: trail.longitude,
        }}
        label={(trail.id + 1).toString()}
        onClick={() => this.handleMarkerClick(trail)}
      />
    ));
    const YosemiteMap = withScriptjs(withGoogleMap(() => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 37.749669, lng: -119.555108 }}
      >
        {markers}
      </GoogleMap>
    )));
    return (
      <div>
        <YosemiteMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '500px', width: '500px' }} />}
          mapElement={<div style={{ height: '100%', width: '100%' }} />}
        />
      </div>

    );
  }
}

export default GoogleMapsContainer;
