import React, { useEffect, useState } from 'react';
import Statecirc from "../components/statecirc";
import Statecourbe from "../components/statecourbe";

const Home = () => {
  const [userName, setUserName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false); // Pour afficher le popup

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('user_skill.json'); // Mettez à jour le chemin
        const data = await response.json();
        setUserName(data.user[0]); // Supposant que le nom est dans user[0]
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur :', error);
      }
    };

    fetchUserData();

    // Détecter la taille de l'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ajustez la largeur selon vos besoins
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifiez la taille de l'écran au chargement

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={isMobile ? styles.mobileContainer : styles.desktopContainer}>
      {isMobile ? (
        <>
          <div>
            <Statecirc />
          </div>
          <center>
          <button style={styles.buttonSkill} onClick={() => setShowStatistics(true)}>
            Voir les statistiques
          </button></center>
          {showStatistics && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <button
                  style={styles.closeButton}
                  onClick={() => setShowStatistics(false)}
                >
                  x
                </button>
                <Statecourbe isPopup={true} />

              </div>
            </div>
          )}
          <div className="skill-space" style={styles.skillSpaceMobile}></div>
        </>
      ) : (
        <div style={styles.desktopContent}>
          {/* Section de gauche - 70% */}
          <div style={styles.leftPanel}>
            <div style={styles.banner}>
              <div style={styles.textContainer}>
                <h2>Welcome back {userName}!</h2>
                <p>You’ve learned 80% of your goal this week!</p>
                <p>Keep it up and improve your results!</p>
              </div>
              <img
                src="https://img.freepik.com/premium-photo/creative-collaboration-man-woman-brainstorming-writing-discussing-ideas_1191225-10341.jpg?w=740"
                alt="User"
                style={styles.image}
              />
            </div>
            <div className="skill-space" style={styles.skillSpace}></div>
          </div>

          {/* Section de droite - 30% */}
          <div style={styles.rightPanel}>
            <Statecirc />
            <Statecourbe />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  desktopContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '20px',
  },
  desktopContent: {
    display: 'flex',
    gap: '20px',
  },
  leftPanel: {
    flex: 7, // 70%
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightPanel: {
    flex: 3, // 30%
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  banner: {
    display: 'flex',
    backgroundColor: '#FEFCEF',
    padding: '20px',
    borderRadius: '8px',
    height:"170px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  textContainer: {
    flex: 1,
    textAlign: 'left',
  },
  image: {
    width: '170px',
    height: '170px',
    marginLeft: '20px',
  },
  skillSpace: {
    backgroundColor: '#f9f9f9',
    height: '200px',
    borderRadius: '8px',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '20px',
  },
  buttonSkill: {
    backgroundColor: '#4f3466',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: "all 0.3s ease",
    boxShadow:" 0 2px 5px rgba(0, 0, 0, 0.1)",
    
    width:"60%",

    
  },
 

  
  
  
  popup: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    position: 'relative',
    width: '90%',
    maxWidth: '500px',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '6px',
    backgroundColor: '#FF4D4D',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  skillSpaceMobile: {
    backgroundColor: '#f9f9f9',
    height: '100px',
    borderRadius: '8px',
  },
};

export default Home;
