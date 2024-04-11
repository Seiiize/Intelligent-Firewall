import React from "react";
import Plot from "react-plotly.js";

const PacketGraphsByTime = ({ packetData, selectedCharacteristic }) => {
  const colors = ["green", "red", "blue", "orange"]; // Define colors

  return (
    <div style={{ color: "#388087" }}>
      <h2>
        Graphiques des paquets par classe en fonction d'une caractéristique
      </h2>
      <div>
        {Object.keys(packetData).map((action, index) => (
          <Plot
            key={action}
            data={[
              {
                type: "bar",
                x: Object.keys(packetData[action]),
                y: Object.values(packetData[action]),
                marker: {
                  color: colors[index % colors.length], // Assign colors from array
                },
              },
            ]}
            layout={{
              width: 800,
              height: 500,
              title: `Nombre d'échantillons de la classe '${action}' en fonction de '${selectedCharacteristic}'`,
              xaxis: {
                title: selectedCharacteristic,
                tickfont: {
                  color: "#388087", // Text color
                },
                titlefont: {
                  color: "#388087", // Title color
                },
              },
              yaxis: {
                title: "Nombre d'échantillons",
                tickfont: {
                  color: "#388087", // Text color
                },
                titlefont: {
                  color: "#388087", // Title color
                },
              },
              plot_bgcolor: "#181818", // Background color
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PacketGraphsByTime;
