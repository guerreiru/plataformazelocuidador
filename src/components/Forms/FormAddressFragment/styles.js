import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
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
  min-height: 80px;
  flex: ${({ flex }) => flex};
  align-self: stretch;
  justify-content: center;
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  margin-right: ${({ marginRight }) => `${marginRight}px`};
`;

export const SwitchTitle = styled.Text`
  text-overflow: clip;
  width: ${Dimensions.get('window').width - 90}px;
  margin-right: 50px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #3a424a;
`;

export const SwitchSubTitle = styled.Text`
  text-overflow: clip;
  width: ${Dimensions.get('window').width - 90}px;
  font-size: 14px;
  line-height: 19px;
  color: #3a424a;
`;

export const SwitchHeaderWrapper = styled.View`
  width: 100%;
`;
