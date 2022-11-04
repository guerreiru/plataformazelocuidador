import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 160px;
`;

export const ContainerAvatar = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

export const ContainerButton = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

export const ContainerButtonModal = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;

export const Line = styled.View`
  height: 1px;
  background-color: ${colors.RADIO_BORDER};
`;
