// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaThLarge, FaArrowRight, FaUser } from 'react-icons/fa';
import Bantitaxi from './components/Bantitaxi';
import Bantimoto from './components/Bantimoto';
import Food from './components/Food';
import Shopping from './components/Shopping';
import MyTransaction from './components/MyTransaction';
import Reservation from './components/Reservation';
import BantitaxiPage from './components/BantitaxiPage'


const Home = () => <div className="content">Bienvenue</div>;

const Services = () => {
  const services = [
    { name: 'Bantitaxi', path: 'bantitaxi' },
    { name: 'Bantimoto', path: 'bantimoto' },
    { name: 'Food', path: 'food' },
    { name: 'Shopping', path: 'shopping' },
    { name: 'My Transaction', path: 'my-transaction' },
    { name: 'Reservation', path: 'reservation' }
  ];

  return (
    <div className="services-grid">
      {services.map((service, index) => (
        <Link
          key={index}
          to={`/services/${service.path}`}
          className="service-square"
        >
          {service.name}
        </Link>
      ))}
    </div>
  );
};

const Navigation = () => <div className="content"></div>;
const Account = () => <div className="content"></div>;

const Navbar = () => (
  <nav className="bottom-navbar">
    <Link to="/"><FaHome /></Link>
    <Link to="/services"><FaThLarge /></Link>
    <Link to="/navigation"><FaArrowRight /></Link>
    <Link to="/account"><FaUser /></Link>
  </nav>
);

const App = () => (
  <Router>
    <div className="mobile-app">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/bantitaxi" element={<Bantitaxi />} />
          <Route path="/services/bantimoto" element={<Bantimoto />} />
          <Route path="/services/food" element={<Food />} />
          <Route path="/services/shopping" element={<Shopping />} />
          <Route path="/services/my-transaction" element={<MyTransaction />} />
          <Route path="/services/reservation" element={<Reservation />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/account" element={<Account />} />
          <Route path="/services/bantitaxi" element={<BantitaxiPage />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  </Router>
);

export default App;