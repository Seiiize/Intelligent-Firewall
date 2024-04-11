import React, { useState } from "react";
import PacketCountCard from "./PacketCountCard";
import axios from "axios";
import PacketDetails from "./PacketDetails";
import PacketGraphs from "./PacketGraphs";
import PacketGraphsByTime from "./PacketGraphsByTime";
import "./home.css";
const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExecute = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("http://localhost:5000/execute");
      setIsProcessing(false);
    } catch (error) {
      console.error("Erreur lors de l'exécution du code :", error);
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ background: "transparent", width: "100%", height: "92.3vh" }}>
      <nav id="barre-des-taches"></nav>

      <div id="contenu-principal"></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "50px", margin: "20px" }}>
          Intelligent Firewall
        </h1>
        <h3>Bienvenue dans votre Pare Feu intelligent</h3>
        <p>
          Dans ce gestionnaire de Firewall intelligent, vous pourrez voir les
          résultats et l'agissement de votre Pare Feu en temps réel
        </p>
        <p>
          Pour commencer l'analyse des paquets en temps réel; Veuillez cliquer
          sur le bouton ci-dessous
        </p>
        <button
          className="btn"
          onClick={handleExecute}
          disabled={isProcessing}
          style={{
            cursor: isProcessing ? "not-allowed" : "pointer",
            marginTop: "20px",
          }}
        >
          {isProcessing
            ? "Traitement en cours..."
            : "Lancer l'analyse des données"}
        </button>
        <div style={{ display: "flex", gap: "20px" }}>
          <PacketCountCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
