import styled from "styled-components";
import io from "socket.io-client";
import { serverURL } from "../Consts";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  justify-content: center;
`;

const socket = io.connect(serverURL);

function Play({ match }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 3;
    contextRef.current = context;

    setCtx(context);
  }, []);

  const startDrawing = () => {
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
    const data = {
      offsetX,
      offsetY,
      isDrawing,
      roomId,
    };
    socket.emit("send draw", data);
  };

  const otherDraw = (offsetX, offsetY, isDrawing) => {
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  };

  socket.on("receive draw", (data) => {
    const { offsetX, offsetY, isDrawing } = data;
    otherDraw(offsetX, offsetY, isDrawing);
  });

  const roomId = match.params.id;

  useEffect(() => {
    socket.emit("join room", roomId);
  }, []);
  socket.on("welcome", () => console.log("joinedRoom"));

  return (
    <Container>
      <canvas
        style={{
          border: "1px solid black",
          width: "fit-content",
          height: "fit-content",
        }}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
      />
    </Container>
  );
}

export default Play;
