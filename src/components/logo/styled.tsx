import styled from "styled-components";
export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.div`
  width: 29px;
  height: 29px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const LogoText = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-left: 4px;
  color: white;
  font-weight: 500;
  @media (max-width: 768px) {
    margin-top: 3px;
  }
`;
