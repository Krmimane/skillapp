import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Statecirc = () => {
  const user = {
    id: 1,
    username: "SkillMaster1",
    temps: {
      semaine: {
        aujourdhui: {
          heures_appris: 12,
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
        backgroundColor: ["#F5C8AA", "#8A6FAC"],
        borderWidth: 2,
        borderColor: "#ffffff",
        cutout: "75%",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Cacher la légende intégrée
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

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>User's Learning and Teaching Statistics</h3>
      <div style={styles.chartWrapper}>
        <div style={styles.labelsDesktop}>
          <div style={styles.labelRow}>
            <span style={styles.labelText}>Learned</span>
            <div style={{ ...styles.circle, backgroundColor: "#F5C8AA" }}></div>
          </div>
          <div style={styles.labelRow}>
            <span style={styles.labelText}>Teached</span>
            <div style={{ ...styles.circle, backgroundColor: "#8A6FAC" }}></div>
          </div>
        </div>
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
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    margin: "0 auto",
    
  },
  title: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#4A3F55",
    marginBottom: "15px",
    textAlign: "center",
  },
  chartWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  
  labelsDesktop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  labelText: {
    marginRight: "10px",
    fontSize: "14px",
    color: "#4A3F55",
  },
  circle: {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
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
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  centerLabel: {
    fontSize: "12px",
    color: "#777",
  },
  "@media (max-width: 768px)": {
    labelsDesktop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
   
    labelRow: {
      marginBottom: 0,
    },
    chartContainer: {
      width: "100px",
      height: "100px",
    },
    centerNumber: {
      fontSize: "16px",
    },
  },
};

export default Statecirc;
