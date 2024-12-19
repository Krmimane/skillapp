import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Styles par défaut

const Statecirc = () => {
  // Données JSON
  const user = {
    id: 1,
    username: "SkillMaster1",
    temps: {
      semaine: {
        aujourdhui: {
          heures_appris: 2, // Par exemple, 2 heures apprises aujourd'hui
          heures_enseignes: 3, // Par exemple, 3 heures enseignées aujourd'hui
        },
      },
    },
  };

  // Calcul des pourcentages
  const heuresAppris = user.temps.semaine.aujourdhui.heures_appris;
  const heuresEnseignes = user.temps.semaine.aujourdhui.heures_enseignes;

  const learnedPercentage = (heuresAppris * 100) / 24;
  const teachedPercentage = (heuresEnseignes * 100) / 24;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        <em>Statistics</em>
      </h3>
      <div style={styles.content}>
        {/* Texte à gauche */}
        <div style={styles.textSection}>
          <div style={styles.textItem}>
            <span style={{ color: "#8ED17A", fontWeight: "bold" }}>
              Learned: {Math.round(learnedPercentage)}%
            </span>
          </div>
          <div style={styles.textItem}>
            <span style={{ color: "#7D6597", fontWeight: "bold" }}>
              Teached: {Math.round(teachedPercentage)}%
            </span>
          </div>
        </div>

        {/* Cercles à droite */}
        <div style={styles.circleContainer}>
          {/* Cercle Parent */}
          <div style={styles.outerCircle}>
            <CircularProgressbar
              value={learnedPercentage}
              styles={buildStyles({
                pathColor: "#8ED17A", // Couleur verte pour "Learned"
                trailColor: "#f0f0f0",
                strokeLinecap: "round",
              })}
            />
          </div>

          {/* Cercle Enfant */}
          <div style={styles.innerCircle}>
            <CircularProgressbar
              value={teachedPercentage}
              styles={buildStyles({
                pathColor: "#7D6597", // Couleur violette pour "Teached"
                trailColor: "transparent",
                strokeLinecap: "round",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    height:"180px",
  },
  title: {
    fontSize: "19px",
    marginBottom: "10px",
    color: "#333",
    fontWeight: "bold",
  },
  content: {
    display: "flex", // Utilisation de flexbox
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  textItem: {
    fontSize: "19px",
    fontWeight: "500",
  },
  circleContainer: {
    position: "relative",
    width: "120px",
    height: "120px",
  },
  outerCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  innerCircle: {
    position: "absolute",
    top: "15%",
    left: "15%",
    width: "70%",
    height: "70%",
  },
};

export default Statecirc ;