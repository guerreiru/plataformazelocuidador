import styled from 'styled-components/native';

export const ContainerColumn = styled.View`
  flex-direction: column;
  height: ${({ isInternal }) => (isInternal ? 'auto' : '400px')};
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

export const SwitchTitle = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #3a424a;
`;

export const SwitchSubTitle = styled.Text`
  font-size: 14px;
  line-height: 19px;
  color: #3a424a;
  width: 100%;
`;

export const SwitchHeaderWrapper = styled.View``;
