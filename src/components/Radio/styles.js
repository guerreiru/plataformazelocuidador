import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: ${({ directionRender }) =>
    directionRender ? directionRender : 'column'};
  padding: 10px;
  justify-content: ${({ directionRender }) =>
    directionRender ? 'space-around' : 'flex-start'};
`;

export const ContainerOption = styled.View`
  align-items: center;
  flex-direction: ${({ directionRender }) =>
    directionRender ? 'row-reverse' : 'row'};
  padding: 10px;
`;

export const ContainerOptionItem = styled.View`
  align-items: center;
  flex-direction: ${({ directionRender }) =>
    directionRender ? 'row-reverse' : 'row'};
  margin-left: 8px;
  padding: 10px;
`;

export const IconGray = styled.View`
  background-color: ${colors.WHITE};
  width: 24px;
  height: 24px;
  margin-right: ${({ size }) => (size === 'mini' ? 4 : 0)}px;
  border-radius: 15px;
  border: 2px solid ${colors.RADIO_BORDER};
`;

export const IconColor = styled.View`
  background-color: ${colors.WHITE};
  width: 24px;
  height: 24px;
  margin-right: ${({ size }) => (size === 'mini' ? 4 : 0)}px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.PRIMARY};
`;

export const IconColorDot = styled.View`
  background-color: ${colors.PRIMARY};
  width: 13px;
  height: 13px;
  border-radius: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-left: 32px;
`;

export const Error = styled.Text`
  color: ${colors.ERROR};
  font-size: 14px;
  margin-left: 20px;
  margin-right: 10px;
`;
