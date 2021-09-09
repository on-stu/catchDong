import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  justify-content: center;

  .EnterRoom {
    margin-top: 100px;
  }
`;

function Home() {
  const history = useHistory();
  const [roomId, setRoomId] = useState("");

  const onClick = () => {
    history.push(`/play/${roomId}`);
  };
  return (
    <Container>
      <div className="EnterRoom">
        <Input
          placeholder="방 이름"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button onClick={onClick}>들어가기</Button>
      </div>
    </Container>
  );
}

export default Home;
