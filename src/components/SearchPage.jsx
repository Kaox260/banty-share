import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateDistance } from '../utils'; // Modification de l'import

const SearchPage = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulation d'appel API pour la distance
    const distanceKm = await calculateDistance(start, end); 
    
    navigate('/results', {
      state: {
        start,
        end,
        passengers,
        distance: distanceKm
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="ride-form">
      <input
        type="text"
        placeholder="Adresse de départ"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      
      <input
        type="text"
        placeholder="Adresse d'arrivée"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      
      <div className="passenger-input">
        <label>Passagers :</label>
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
        />
      </div>

      <button type="submit">Rechercher</button>
    </form>
  );
};

// Simulation de calcul de distance
const calculateDistance = async (start, end) => {
  // Ici vous intégreriez votre vrai API de calcul de distance
  return Math.random() * 20; // Exemple : 0-20 km aléatoire
};

export default SearchPage;