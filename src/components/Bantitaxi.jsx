import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import { saveAs } from 'file-saver';

const Bantitaxi = () => {
  // États initiaux
  const [formData, setFormData] = useState({
    departure: '',
    destination: '',
    passengers: 1
  });
  
  const [autocompleteDeparture, setAutocompleteDeparture] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);

  // Gestionnaire de sélection des passagers
  const handleSelectPassengers = (number) => {
    setFormData({ ...formData, passengers: number });
  };

  // Calcul de l'itinéraire
  const calculateRoute = async () => {
    if (!window.google) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    const results = await directionsService.route({
      origin: formData.departure,
      destination: formData.destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    });

    const routeDistance = results.routes[0].legs[0].distance.value / 1000;
    const calculatedPrice = calculatePrice(routeDistance, formData.passengers);
    
    setDistance(routeDistance);
    setPrice(calculatedPrice);
  };

  // Gestionnaire de recherche
  const handleSearch = async () => {
    await calculateRoute();

    const logEntry = {
      ...formData,
      distance: distance?.toFixed(2),
      price,
      timestamp: new Date().toISOString()
    };

    // Sauvegarde dans localStorage
    const existingLogs = JSON.parse(localStorage.getItem('logs') || '[]');
    const newLogs = [...existingLogs, logEntry];
    localStorage.setItem('logs', JSON.stringify(newLogs));

    // Téléchargement du fichier
    const blob = new Blob([JSON.stringify(newLogs, null, 2)], { type: 'application/json' });
    saveAs(blob, 'logs.json');
  };

  return (
    <div className="bantitaxi-container">
      <LoadScript googleMapsApiKey="AIzaSyAlT5wHT649ARpF9dkxTwOV6X9L3yNWaxs" libraries={['places']}>
        {/* Champ d'adresse de départ */}
        <div className="address-input">
          <Autocomplete
            onLoad={(autocomplete) => setAutocompleteDeparture(autocomplete)}
            onPlaceChanged={() => {
              if (autocompleteDeparture) {
                const place = autocompleteDeparture.getPlace();
                setFormData({ ...formData, departure: place.formatted_address });
              }
            }}
          >
            <input
              type="text"
              placeholder="Adresse de départ"
              value={formData.departure}
              onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
            />
          </Autocomplete>
        </div>

        {/* Champ d'adresse de destination */}
        <div className="address-input">
          <Autocomplete
            onLoad={(autocomplete) => setAutocompleteDestination(autocomplete)}
            onPlaceChanged={() => {
              if (autocompleteDestination) {
                const place = autocompleteDestination.getPlace();
                setFormData({ ...formData, destination: place.formatted_address });
              }
            }}
          >
            <input
              type="text"
              placeholder="Adresse de destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </Autocomplete>
        </div>
      </LoadScript>

      {/* Sélection du nombre de passagers */}
      <div className="passenger-selector">
        <p>Nombre de passagers:</p>
        <div className="passenger-buttons">
          {[1, 2, 3, 4].map((number) => (
            <button
              key={number}
              className={formData.passengers === number ? 'active' : ''}
              onClick={() => handleSelectPassengers(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {/* Affichage du prix */}
      {price && (
        <div className="price-display">
          <h3>Détails de la course :</h3>
          <p>Distance : {distance?.toFixed(2)} km</p>
          <p>Passagers : {formData.passengers}</p>
          <p>Prix total : {price?.toFixed(2)} $</p>
        </div>
      )}

      {/* Bouton de recherche */}
      <button 
        className="search-button"
        onClick={handleSearch}
        disabled={!formData.departure || !formData.destination}
      >
        Rechercher
      </button>
    </div>
  );
};

// Fonction de calcul du prix (à mettre dans un fichier utils.js si réutilisation)
const calculatePrice = (distance, passengers) => {
  const base = distance < 5 ? 10 : 10 + (distance - 5) * 3;
  return base + passengers * 3;
};

export default Bantitaxi;