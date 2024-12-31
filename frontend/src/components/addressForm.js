
import React, { useState, useEffect } from 'react';
import { FaHome, FaBuilding, FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons
import '../styles/addressForm.css';

const AddressForm = ({ location, onSave }) => {
  const [houseNo, setHouseNo] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('Home');
  const [placeName, setPlaceName] = useState('');  // To store the place name from geocoding

  useEffect(() => {
    if (location) {
      getPlaceName(location); // Get the place name when location is available
    }
  }, [location]);

  const getPlaceName = (latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLngObject = new window.google.maps.LatLng(latLng.lat, latLng.lng);

    geocoder.geocode({ location: latLngObject }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setPlaceName(results[0].formatted_address);  // Set the place name
      } else {
        setPlaceName('Place not found');
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = { houseNo, area, category }; // Send the place name as location
    
    // Send data to the backend
    fetch('http://localhost:5000/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Address saved:', data);
      // You can also show a success message to the user or reset the form
    })
    .catch(error => {
      console.error('Error saving address:', error);
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className="address-form">
      {/* Location Display */}
      <div className="location-container">
        <FaMapMarkerAlt className="location-icon" /> {/* Red location icon */}
        <p className="location">{placeName ? placeName : 'No location selected'}</p>
      </div>

      {/* House/Flat/Block No. */}
      <div className="input-container">
        <label>HOUSE / FLAT / BLOCK NO.</label>
        <input
          type="text"
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          className="input-line"
          required
        />
      </div>

      {/* Apartment/Road/Area */}
      <div className="input-container">
        <label>APARTMENT / ROAD / AREA</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="input-line"
          required
        />
      </div>

      {/* Save As Category */}
      <div className="category-container">
        <label>SAVE AS</label>
        <div className="category-icons">
          <div
            className={`icon ${category === 'Home' ? 'selected' : ''}`}
            onClick={() => setCategory('Home')}
          >
            <FaHome />
          </div>
          <div
            className={`icon ${category === 'Office' ? 'selected' : ''}`}
            onClick={() => setCategory('Office')}
          >
            <FaBuilding />
          </div>
          <div
            className={`icon ${category === 'Friends & Family' ? 'selected' : ''}`}
            onClick={() => setCategory('Friends & Family')}
          >
            <FaUserFriends />
          </div>
          <div
            className={`icon ${category === 'Others' ? 'selected' : ''}`}
            onClick={() => setCategory('Others')}
          >
            <FaMapMarkerAlt />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button type="submit" className="save-button">Save Address</button>
    </form>
  );
};

export default AddressForm;
