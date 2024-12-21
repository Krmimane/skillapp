import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Statecourbe = ({ isPopup = false }) => {
  // Données JSON simulées
  const user = {
    id: 1,
    username: "SkillMaster1",
    temps: {
      semaine: {
        lundi: { heures_appris: 2, heures_enseignes: 3 },
        mardi: { heures_appris: 1, heures_enseignes: 2 },
        mercredi: { heures_appris: 1, heures_enseignes: 4 },
        jeudi: { heures_appris: 3, heures_enseignes: 1 },
        vendredi: { heures_appris: 0, heures_enseignes: 3 },
        samedi: { heures_appris: 1, heures_enseignes: 2 },
        dimanche: { heures_appris: 3, heures_enseignes: 0 },
      },
    },
  };

  // Extraction des jours et des heures apprises et enseignées
  const jours = Object.keys(user.temps.semaine);
  const heuresAppris = jours.map(
    (day) => user.temps.semaine[day].heures_appris
  );
  const heuresEnseignes = jours.map(
    (day) => user.temps.semaine[day].heures_enseignes
  );

  // Données pour le graphique
  const data = {
    labels: jours, // Jours de la semaine
    datasets: [
      {
        label: "Heures Apprises",
        data: heuresAppris,
        borderColor: "#F5C8AA", // Vert
        backgroundColor: "rgba(245, 200, 170, 0.4)", // Vert clair
        fill: true,
        tension: 0.4, // Lissage
      },
      {
        label: "Heures Enseignées",
        data: heuresEnseignes,
        borderColor: "#7D6597", // Violet
        backgroundColor: "rgba(125, 101, 151, 0.4)", // Violet clair
        fill: true,
        tension: 0.4, // Lissage
      },
    ],
  };

 
  // Styles dynamiques
  const styles = {
    container: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "10px",
      width: "97%", // Utilise 90% de l'espace en popup pour mobile
      maxWidth: "100%",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    
    chartWrapper: {
      width: "100%",
      height: "270px", // Hauteur adaptée pour mobile
    },
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Empêche le ratio de déformer
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 10, // Taille de police plus petite
          },
        },
      },
      tooltip: {
        bodyFont: { size: 10 },
        titleFont: { size: 12 },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 } }, // Petits labels sur l'axe X
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 10 } }, // Taille réduite pour Y
      },
    },
  };
  

  return (
    <div style={styles.container}>
      
      
      <div style={styles.chartWrapper}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Statecourbe;
