import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  height: 100vh;
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
  border: 1px solid #b8b8b8;
  border-radius: 4px;
  width: 80%;
`;

const Login = ({ onLogin }) => {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, password };
    try {
      const response = await axios.post("http://localhost:5000/login", user);
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data);
      onLogin();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setErrorMessage("Invalid credentials");
      } else {
        console.error(error);
      }
    }
  };

  const ErrorMessage = styled.p`
    color: red;
  `;

  // ...

  return (
    <Container>
      <h1 style={{ fontSize: "40px", position: "absolute", top: "50px" }}>
        Intelligent Firewall
      </h1>
      <h3 style={{ position: "absolute", top: "100px" }}>
        Votre pare feu de nouvelle génération
      </h3>
      <p style={{ position: "absolute", top: "220px" }}>
        Veuillez vous connecter à votre compte
      </p>
      <Form onSubmit={handleSubmit} shake={shake}>
        <Input
          type="text"
          shake={shake}
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
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
        <button className="buttonn" type="submit">
          <span
            style={{
              background: "none",
              textDecoration: "none",
              color: "white",
            }}
          >
            Login
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
        <Link to="/register">
          <button
            class="btn"
            style={{
              cursor: "pointer",
              margin: "20px",
              background: "none",
            }}
          >
            <strong style={{ background: "none" }}>Register</strong>
          </button>
        </Link>
      </Form>
    </Container>
  );
};

export default Login;
