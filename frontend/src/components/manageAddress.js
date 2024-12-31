
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaHome, FaBuilding, FaUsers } from 'react-icons/fa'; // Address type and location icons
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api'; // Import Google Maps components
import { FaLocationCrosshairs } from "react-icons/fa6";
import '../styles/manageAddress.css';

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', address: '123 Home St, Cityville', icon: <FaHome color="black" /> },
    { id: 2, type: 'Office', address: '456 Work Rd, Metropolis', icon: <FaBuilding color="black" /> },
    { id: 3, type: 'Friends & Family', address: '789 Friend Ave, Townsville', icon: <FaUsers color="black" /> },
  ]);

  const [recentSearches, setRecentSearches] = useState([
    { id: 1, type: 'Search 1', address: 'Some Location, City' },
    { id: 2, type: 'Search 2', address: 'Another Location, Metropolis' },
    { id: 3, type: 'Search 3', address: 'Yet Another Location, Townsville' },
  ]);//

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [manualSearchMode, setManualSearchMode] = useState(false);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchManually = () => {
    setManualSearchMode(true); // Activate manual search mode
  };

  const handlePlaceSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      setSelectedAddress(place.formatted_address);
      setManualSearchMode(false); // Close manual search after address is selected
    }
  };

  return (
    <div className="manage-addresses">
      {/* Search Bar Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search your area / pincode / apartment"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Current Location and Enable Button */}
      <div className="location-section">
        <div className="location-info">
          <FaLocationCrosshairs color="red" />
          <span className="current-location">Current Location</span>
        </div>
        <button className="enable-btn">Enable</button>
        <div className="underline"></div>
      </div>

      {/* Manual Search Section */}
      {manualSearchMode && (
        <div className="manual-search">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              zoom={12}
              center={{ lat: 0, lng: 0 }} // Optional: Center the map
            >
              <Autocomplete
                onLoad={(autocomplete) => console.log('Autocomplete loaded')}
                onPlaceChanged={(e) => handlePlaceSelect(e)}
              >
                <input
                  type="text"
                  placeholder="Enter address"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </Autocomplete>
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      {/* Saved Location Section */}
      <div className="saved-location">
        <h3>Saved Location</h3>
        <ul>
          {addresses.map((address) => (
            <li key={address.id} className="address-item">
              <div className="address-info">
                <div className="address-type">
                  {address.icon}
                  <strong>{address.type}</strong>
                </div>
                <p className="address-text">{address.address}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="underline"></div>
      </div>

      {/* Recent Searches Section */}
      <div className="recent-searches">
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.map((search) => (
            <li key={search.id} className="address-item">
              <div className="address-info">
                <div className="address-type">
                  <FaMapMarkerAlt color="red" />
                  <strong>{search.type}</strong>
                </div>
                <p className="address-text">{search.address}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="underline"></div>
      </div>
    </div>
  );
};

export default ManageAddresses;
