import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMediaQuery } from "react-responsive";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statecirc = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Données utilisateur
  const user = {
    id: 1,
    username: "SkillMaster1",
    temps: {
      semaine: {
        aujourdhui: {
          heures_appris: 2,
          heures_enseignes: 3,
        },
      },
    },
  };

  const heuresAppris = user.temps.semaine.aujourdhui.heures_appris;
  const heuresEnseignes = user.temps.semaine.aujourdhui.heures_enseignes;

  const learnedPercentage = ((heuresAppris * 100) / 24).toFixed(1);
  const teachedPercentage = ((heuresEnseignes * 100) / 24).toFixed(1);

  const data = {
    labels: ["Learned", "Teached"],
    datasets: [
      {
        data: [learnedPercentage, teachedPercentage],
        backgroundColor: ["#F5C8AA", "#8A6FAC"], // Transparent en mobile
        borderWidth: 2,
        borderColor: "#ffffff",
        cutout: "70%",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 12,
          color: "#4A3F55",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  const styles = {
    container: {
      backgroundColor: isMobile ? "transparent" : "#fff", // Background transparent en mobile
      borderRadius: isMobile ? "none" :"16px",
      padding: "20px",
      boxShadow: isMobile ? "none" : "0 4px 15px rgba(0, 0, 0, 0.1)",
      margin: "0 auto",
      textAlign: "center",
    },
    chartContainer: {
      position: "relative",
      width: "250px",
      height: "250px",
      margin: "0 auto",
    },
    centerText: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
    centerNumber: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#333",
      margin: 0,
    },
    centerLabel: {
      fontSize: "14px",
      color: "#777",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.chartContainer}>
        <Doughnut data={data} options={options} />
        <div style={styles.centerText}>
          <h2 style={styles.centerNumber}>
            {parseFloat(learnedPercentage) + parseFloat(teachedPercentage)}%
          </h2>
          <p style={styles.centerLabel}>Total Activity</p>
        </div>
      </div>
    </div>
  );
};

export default Statecirc;
