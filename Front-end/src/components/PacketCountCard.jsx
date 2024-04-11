import React, { useState, useEffect } from "react";
import axios from "axios";
import "./packetcountcard.css";
const PacketCount = () => {
  const [packetCounts, setPacketCounts] = useState([]);
  const [allpacketcount, setAllPacketCount] = useState();

  useEffect(() => {
    // Définir un intervalle pour actualiser les données toutes les 5 secondes (par exemple)
    const intervalId = setInterval(fetchData, 5000);

    // Appel initial pour obtenir les données au chargement du composant
    fetchData();

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/packets");
      const packets = response.data;
      const countsall = packets.length;
      const counts = {
        allow: packets.filter((packet) => packet.action === "allow").length,
        deny: packets.filter((packet) => packet.action === "deny").length,
        drop: packets.filter((packet) => packet.action === "drop").length,
        resetBoth: packets.filter((packet) => packet.action === "reset-both")
          .length,
      };
      setPacketCounts(counts);
      setAllPacketCount(countsall);
    } catch (error) {
      console.error("Error fetching packets:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h4>
        Ici vous retrouverez le nombre total de paquets et la décision de votre
        Firewall intelligent
      </h4>
      <div className="Allcard">
        <h3>Nombre Total de Paquets:</h3>
        <h3>{allpacketcount}</h3>
      </div>
      <div className="cards">
        <div className="card">
          <svg
            height="20"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path d="m14 21.414-5-5.001 1.413-1.413 3.587 3.586 7.585-7.586 1.415 1.415z" />
            <path d="m16 2a14 14 0 1 0 14 14 14 14 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12 12 0 0 1 -12 12z" />
            <path d="m0 0h32v32h-32z" fill="none" />
          </svg>
          <h3>Allow:</h3>
          <h3>{packetCounts.allow}</h3>
        </div>
        <div className="card">
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 64 64"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff"
          >
            <path d="m-256-256h1280v800h-1280z" fill="none" />
            <path d="m32.266 7.951c13.246 0 24 10.754 24 24s-10.754 24-24 24-24-10.754-24-24 10.754-24 24-24zm-15.616 11.465c-2.759 3.433-4.411 7.792-4.411 12.535 0 11.053 8.974 20.027 20.027 20.027 4.743 0 9.102-1.652 12.534-4.411zm31.048 25.295c2.87-3.466 4.596-7.913 4.596-12.76 0-11.054-8.974-20.028-20.028-20.028-4.847 0-9.294 1.726-12.76 4.596z" />
          </svg>
          <h3>Deny:</h3>
          <h3>{packetCounts.deny}</h3>
        </div>
        <div className="card">
          <svg
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff" // Changer la couleur en blanc
          >
            <path d="m0 0h48v48h-48z" fill="#fff" fill-opacity=".01" />
            <g
              stroke="#fff" // Changer la couleur en blanc
              stroke-linecap="round"
              stroke-width="4"
              fill="#fff" // Changer la couleur en blanc
            >
              <path
                d="m40 28-16 12-16-12"
                stroke-linejoin="round"
                fill="#fff" // Changer la couleur en blanc
              />
              <path d="m8 10h32" fill="#fff" /> // Garder la couleur en blanc
              <path d="m8 18h32" fill="#fff" /> // Garder la couleur en blanc
            </g>
          </svg>

          <h3>Drop:</h3>
          <h3>{packetCounts.drop}</h3>
        </div>
        <div className="card">
          <svg
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              d="m3 13c0 4.9706 4.02944 9 9 9 3.9187 0 7.2524-2.5044 8.4879-6m-17.4879-3 3 2m-3-2-2 3m20-4c0-4.97056-4.0294-9-9-9-3.91866 0-7.25237 2.50442-8.48788 6m17.48788 3-3-2m3 2 2-3"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h3>Reset-Both:</h3>
          <h3>{packetCounts.resetBoth}</h3>
        </div>
      </div>
    </div>
  );
};

export default PacketCount;
