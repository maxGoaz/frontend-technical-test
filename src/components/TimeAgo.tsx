import styled from "styled-components";

const StyledTimeAgo = styled.p`
  color: #777;
  margin: 0;
  margin-top: 0px;
  margin-top: 4px;
  display: block;
  text-align: right;
  font-size: 12px;

  display: inline-block;
  width: 100%;
`;

const displayTimeAgo = (timestamp) => {
  const rtf = new Intl.RelativeTimeFormat("fr", {
    numeric: "auto",
  });
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / oneDayInMs
  );
  console.log("daydifference ", daysDifference);
  let format = "day";
  let duration = daysDifference;
  if (Math.abs(daysDifference) > 365) {
    format = "year";
    duration = parseInt(daysDifference / 365);
  }
  if (Math.abs(daysDifference) < 1) {
    format = "hour";
    duration = parseInt(daysDifference * 24);
  }

  return rtf.format(duration, format);
};

export const TimeAgo = ({ timestamp }) => (
  <StyledTimeAgo>{displayTimeAgo(timestamp)}</StyledTimeAgo>
);
