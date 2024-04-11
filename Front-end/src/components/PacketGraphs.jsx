import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const PacketGraphs = () => {
  const [packetCounts, setPacketCounts] = useState([]);
  const [packetData, setPacketData] = useState({});
  const [selectedCharacteristic, setSelectedCharacteristic] =
    useState("timestamp");
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/packets");
        const packets = response.data;

        // Packet Counts
        const counts = {
          allow: packets.filter((packet) => packet.action === "allow").length,
          deny: packets.filter((packet) => packet.action === "deny").length,
          drop: packets.filter((packet) => packet.action === "drop").length,
          "reset-both": packets.filter(
            (packet) => packet.action === "reset-both"
          ).length,
        };
        setPacketCounts(counts);

        // Packet Data
        const groupedPackets = {};
        packets.forEach((packet) => {
          let characteristicValue = packet[selectedCharacteristic];

          if (selectedCharacteristic === "timestamp") {
            const timestamp = new Date(packet.timestamp);
            characteristicValue = `${timestamp.getFullYear()}-${
              timestamp.getMonth() + 1
            }-${timestamp.getDate()} ${timestamp.getHours()}:${timestamp.getMinutes()}`;
          }

          if (!groupedPackets[packet.action]) {
            groupedPackets[packet.action] = {};
          }

          if (!groupedPackets[packet.action][characteristicValue]) {
            groupedPackets[packet.action][characteristicValue] = 0;
          }

          groupedPackets[packet.action][characteristicValue]++;
        });
        setPacketData(groupedPackets);

        // Check if new data is identical to previous data
        if (!fetchingData) {
          setFetchingData(true); // Set fetching data to true to prevent multiple fetches
        }
      } catch (error) {
        console.error("Error fetching packets:", error);
      }
    };

    fetchData(); // Initial call to fetch data

    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    // Cleanup interval
    return () => clearInterval(interval);
  }, [fetchingData, selectedCharacteristic]);

  const handleCharacteristicChange = (event) => {
    setSelectedCharacteristic(event.target.value);
  };

  const handleRefresh = () => {
    setFetchingData(false); // Trigger fetch of new data
  };

  const colors = ["green", "red", "blue", "orange"]; // Define colors

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Graphique des paquets par classe</h2>
      <Plot
        data={[
          {
            type: "bar",
            x: Object.keys(packetCounts),
            y: Object.values(packetCounts),
            marker: {
              color: colors, // Assign colors to bars
            },
          },
        ]}
        layout={{
          width: 500,
          height: 350,
          title: "Nombre de paquets par classe",
          plot_bgcolor: "#181818", // Background color #181818
          paper_bgcolor: "#181818", // Background color #181818
          xaxis: {
            title: "Classe",
            tickfont: {
              color: "#388087", // Color #388087
            },
            titlefont: {
              color: "#388087", // Color #388087
            },
          },
          yaxis: {
            title: "Nombre de paquets",
            tickfont: {
              color: "#388087", // Color #388087
            },
            titlefont: {
              color: "#388087", // Color #388087
            },
          },
        }}
      />
      <button className="btn" onClick={handleRefresh}>
        Actualiser
      </button>
      <div
        style={{
          backgroundColor: "#181818",
          color: "#388087",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>
          Graphiques des paquets par classe en fonction d'une caractéristique
        </h2>
        <p style={{ margin: "20px" }}>Séléctionnez la caractéristique</p>
        <select
          value={selectedCharacteristic}
          onChange={handleCharacteristicChange}
        >
          <option value="timestamp">Timestamp</option>
          <option value="source_port">Source Port</option>
          <option value="destination_port">Destination Port</option>
          <option value="nat_source_port">NAT Source Port</option>
          <option value="nat_destination_port">NAT Destination Port</option>
          <option value="bytes">Bytes</option>
          <option value="bytes_sent">Bytes Sent</option>
          <option value="bytes_received">Bytes Received</option>
          <option value="packets">Packets</option>
          <option value="elapsed_time_sec">Elapsed Time (sec)</option>
          <option value="pkts_sent">Pkts Sent</option>
          <option value="pkts_received">Pkts Received</option>
        </select>
        <div style={{ display: "grid", gridTemplateColumns: "500px 500px" }}>
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
                width: 500,
                height: 350,
                title: `Nbre d'éch '${action}' en fonction de '${selectedCharacteristic}'`,
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
                plot_bgcolor: "#181818", // Background color #181818
                paper_bgcolor: "#181818", // Background color #181818
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PacketGraphs;
