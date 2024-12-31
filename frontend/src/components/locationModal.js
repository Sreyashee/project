import React from 'react';
import '../styles/locationModal.css'; // Import the CSS file for styling

const LocationModal = ({ onEnable, onManualSearch }) => (
  <div className="modal">
    <div className="modal-content">
      <p>Enable location to proceed or search manually.</p>
      <div className="modal-buttons">
        <button className="enable-location-btn" onClick={onEnable}>
          Enable Location
        </button>
        <button className="search-manually-btn" onClick={onManualSearch}>
          Search Manually
        </button>
      </div>
    </div>
  </div>
);

export default LocationModal;
