// src/components/ResultsPage.jsx
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  if (!state) {
    navigate('/services/bantitaxi');
    return null;
  }

  return (
    <div className="results-page">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Retour
      </button>
      
      <h2>Résultats de votre course</h2>
      
      <div className="trip-details">
        <p><strong>Départ:</strong> {state.departure}</p>
        <p><strong>Destination:</strong> {state.destination}</p>
        <p><strong>Passagers:</strong> {state.passengers}</p>
        <p><strong>Distance:</strong> {state.distance?.toFixed(2)} km</p>
        <p><strong>Prix total:</strong> {state.price?.toFixed(2)} $</p>
      </div>

      <div className="payment-section">
        <h3>Paiement</h3>
        <select>
          <option>Mastercard **** 1234</option>
          <option>Visa **** 5678</option>
        </select>
      </div>

      <button 
        className="confirm-button"
        onClick={() => alert('Course confirmée !')}
      >
        Confirmer la course
      </button>
    </div>
  );
};

export default ResultsPage;