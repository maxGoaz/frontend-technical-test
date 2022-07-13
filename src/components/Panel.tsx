import { animated } from "@react-spring/web";
import styled from "styled-components";

export const Panel = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2rem;
  background-color: white;
  width: 100%;
  height: 100%;
  will-change: transform;
  overflow-y: auto;
  box-shadow: 0px 0px 3px rgba(0, 35, 44, 0.1),
    0px 2px 0px rgba(0, 35, 44, 0.08);
  z-index: 2;
  display: flex;
  justify-content: center;
`;

export default Panel;
