import React, { useState } from "react";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import "./login.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #181818;
`;

const Form = styled.form`
  animation: ${(props) =>
    props.shake
      ? css`
          ${shakeAnimation} 0.5s linear
        `
      : "none"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  padding: 20px;
  border: 5px dashed #999999;
  border-radius: 4px;
  background: none;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80%;
`;
const shakeAnimation = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;
const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;
const ErrorMessage = styled.p`
  color: red;
`;

const Register = ({ onRegister }) => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const user = { name, password };
    try {
      const response = await axios.post("http://localhost:5000/user", user);
      console.log(response.data);

      // Appeler onRegister après une inscription réussie
      onRegister();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setErrorMessage(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <h1 style={{ fontSize: "40px", position: "absolute", top: "50px" }}>
        Intelligent Firewall
      </h1>
      <h3 style={{ position: "absolute", top: "100px" }}>
        Votre pare feu de nouvelle génération
      </h3>
      <Form onSubmit={handleSubmit} shake={shake}>
        <p style={{ position: "absolute", top: "220px" }}>
          Veuillez vous inscrire
        </p>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <button
          class="btn"
          type="submit"
          style={{
            cursor: "pointer",
            margin: "20px",
          }}
        >
          <strong style={{ background: "none" }}>Register</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow" style={{ background: "none" }}>
            <div class="circle" style={{ background: "none" }}></div>
            <div class="circle"></div>
          </div>
        </button>
        <Link to="/login">
          <button className="buttonn">
            <span
              style={{
                background: "none",
                textDecoration: "none",
                color: "white",
              }}
            >
              Go To Login
            </span>
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ background: "none" }}
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                stroke-width="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </button>
        </Link>
      </Form>
    </Container>
  );
};

export default Register;
