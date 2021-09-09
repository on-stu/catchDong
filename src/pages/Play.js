import styled from "styled-components";
import io from "socket.io-client";
import { serverURL } from "../Consts";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  justify-content: center;
`;

const socket = io.connect(serverURL);

function Play({ match }) {
  const roomId = match.params.id;

  useEffect(() => {
    socket.on("welcome", (msg) => console.log(msg));
  });

  return (
    <Container>
      <span>this is play page&nbsp;</span>
      <span>and Room ID is {roomId}</span>
    </Container>
  );
}

export default Play;
