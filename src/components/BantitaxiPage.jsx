// src/components/BantitaxiPage.jsx
import { Link } from 'react-router-dom';
import Bantitaxi from './Bantitaxi'; // Ajoutez cette ligne d'importation

const BantitaxiPage = () => (
  <div className="page-container">
    <Link to="/services" className="back-button">
      &larr; Retour
    </Link>
    <h1 className="page-title">Service Bantitaxi</h1>
    <Bantitaxi /> {/* Le composant est maintenant importé */}
  </div>
);

export default BantitaxiPage;