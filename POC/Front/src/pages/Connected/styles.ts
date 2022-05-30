import styled from "styled-components";

export const ConnectedContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
  > :first-child {
    flex-basis: 100%;
    margin-bottom: 5%;
  }
  > :nth-child(2) {
    flex-basis: 100%;
    margin-right: 2%;
    margin-left: 2%;
  }
  > :nth-child(3) {
    flex-basis: 20%;
  }
  @media screen and (max-width: 660px) {
    flex-direction: column;
    > :nth-child(3) {
      flex-basis: 100% !important;
    }
    > div {
      margin-bottom: 10px;
    }
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
`;
export const UsersListContainer = styled.div`
  min-height: 400px;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px;
  p {
    margin-top: 0;
  }
  border-radius: 30px 10px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 660px) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;
export const GameContainer = styled.div`
  min-height: 400px;
  padding: 14px;
  background-color: white;
  border-radius: 10px 30px;
  flex-basis: 75% !important;
  @media screen and (max-width: 660px) {
    //  width: 100%;
    // margin-left: 5% !important;
  }
  > div,
  p,
  h2,
  input {
    color: var(--primary) !important;
  }
`;
export const StepZeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
  padding: 10px;
  color: white;
  > div {
    margin-bottom: 10px;
  }
  button {
    width: 100%;
  }
`;
export const StepResumeVotesContainer = styled.div`
  color: white;
  .anec--user-list {
    display: flex;
    flex-direction: row;
    justify-content: start;
    .anec--user-list-item {
      svg {
        width: 40px;
        margin-right: 10px;
      }
      background: var(--primary);
      color: white;
    }
  }
`;
export const ListWinnersContent = styled.div`
  display: flex;
  > div {
    padding: 10px;
    border-radius: 3px;
    flex-basis: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      width: 40px;
      margin-right: 10px;
    }
    background: var(--blue);
    color: white;
    &:nth-child(2n) {
      background: var(--violet);
    }
  }
`;
export const AvatarWins = styled.div`
  margin-right: 20px;
`;
export const CurrentUserHadWinToContainer = styled.div`
  margin-top: 40px;
`;
export const ObjectifList = styled.div`
  background: var(--primary);
  color: white;
  padding: 10px 30px 25px 30px;
  border-radius: 10px 30px;
  p{
    color: white !important;
    font-weight: bold;
    font-size: 1.2rem;
  }
  ul{ 
    padding-left: 40px;
    list-style-type: circle;
    font-size: 1.1rem;
    li{
      list-style-type: circle;
    }
  }
`;
