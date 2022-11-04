import styled from 'styled-components/native';

export const ContainerColumn = styled.View`
  flex-direction: column;
  height: 120px;
  margin-bottom: 10px;
`;

export const ContainerRows = styled.View`
  flex-direction: row;
  flex: 1px;
  height: 80px;
`;

export const ContainerCell = styled.View`
  height: 80px;
  flex: ${({ flex }) => flex};
  align-self: stretch;
  justify-content: center;
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  margin-right: ${({ marginRight }) => `${marginRight}px`};
`;
