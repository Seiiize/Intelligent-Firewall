import React, { useState, useEffect } from "react";
import axios from "axios";
import "./packetdetails.css";
const PacketDetails = () => {
  const [packets, setPackets] = useState([]);

  const fetchPackets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/packets");
      const packetsData = response.data;
      // Récupérer uniquement les 20 derniers paquets
      const lastTwentyPackets = packetsData.slice(-25);
      setPackets(lastTwentyPackets);
    } catch (error) {
      console.error("Error fetching packets:", error);
    }
  };

  useEffect(() => {
    fetchPackets();
  }, []);

  return (
    <div
      style={{
        height: "92.3vh",
        textAlign: "center",
        fontSize: "13px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Détails des 25 derniers paquets</h2>
      <button onClick={fetchPackets} className="bttn">
        Actualiser
      </button>
      <table style={{ borderSpacing: "25px 5px" }}>
        <thead>
          <tr>
            <th>Source Port</th>
            <th>Destination Port</th>
            <th>NAT Source Port</th>
            <th>NAT Destination Port</th>
            <th>Bytes</th>
            <th>Bytes Sent</th>
            <th>Bytes Received</th>
            <th>Packets</th>
            <th>Elapsed Time (sec)</th>
            <th>Pkts Sent</th>
            <th>Pkts Received</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {packets.map((packet, index) => (
            <tr key={index} style={{ color: "white" }}>
              <td>{packet.source_port}</td>
              <td>{packet.destination_port}</td>
              <td>{packet.nat_source_port}</td>
              <td>{packet.nat_destination_port}</td>
              <td>{packet.bytes}</td>
              <td>{packet.bytes_sent}</td>
              <td>{packet.bytes_received}</td>
              <td>{packet.packets}</td>
              <td>{packet.elapsed_time_sec}</td>
              <td>{packet.pkts_sent}</td>
              <td>{packet.pkts_received}</td>
              <td>
                <strong>{packet.action}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacketDetails;
