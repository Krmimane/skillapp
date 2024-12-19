import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home'); // Redirige vers la page d'accueil
  };

  return (
    <div className="landing-page">
      <h1>Bienvenue dans notre application</h1>
      <p>Votre aventure commence ici.</p>
      <button onClick={handleClick}>Aller à l'accueil</button>
    </div>
  );
};

export default LandingPage;