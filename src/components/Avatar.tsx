import styled from "styled-components";

const StyledAvatar = styled.div`
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e9e1ff;
  color: #571aff;
  font-weight: bold;
  font-size: 16px;
  width: 3rem;
  height: 3rem;
  margin-right: 6px;
`;

export const Avatar = ({ name }) => {
  const words = name.toUpperCase().split(" ");
  const initials = words[0][0] + (words.length > 1 ? words[1][0] : "");
  return <StyledAvatar>{initials}</StyledAvatar>;
};
