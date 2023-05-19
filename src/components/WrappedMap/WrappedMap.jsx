import { withScriptjs, withGoogleMap } from 'react-google-maps';
import Map from '../Map/Map';
const WrappedMap = withScriptjs(withGoogleMap(Map));
<WrappedMap
	googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKgQswA5n7qe6JFx9NXHhRK7LPvB1PHLY"
	loadingElement={<div style={{ height: `auto` }} />}
	containerElement={<div style={{ height: `400px` }} />}
	mapElement={<div style={{ height: `100vh` }} />}
/>

export default WrappedMap;