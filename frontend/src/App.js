
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import ManageAddresses from './components/manageAddress';
import MapPicker from './components/mapPicker';
import AddressForm from './components/addressForm';
import LocationModal from './components/locationModal';
import useGeolocation from './hooks/useGeolocation';
import './App.css';


const App = () => {
  const { position, error } = useGeolocation();
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [showModal, setShowModal] = React.useState(true);
  //const navigate = useNavigate(); // Import useNavigate for navigation

  const handleEnableLocation = () => {
    if (position) {
      setSelectedLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setShowModal(false);
    } else {
      alert('Location permission denied or unavailable.');
    }
  };

  const handleManualSearch = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              {showModal && <LocationModal onEnable={handleEnableLocation} onManualSearch={handleManualSearch} />}
              <MapPicker onLocationSelect={setSelectedLocation} />
              {selectedLocation && <AddressForm location={`${selectedLocation.lat}, ${selectedLocation.lng}`} />}
              <button
                className="manage-address-btn"
                onClick={() => (window.location.href = '/locations')} // Redirect using window.location.href
              >
                Manage Address
              </button>
            </>
          }
        />

        {/* Locations Route */}
        <Route path="/locations" element={<ManageAddresses />} />
      </Routes>
    </Router>
  );
};

export default App;