import styled from 'styled-components/native';
import colors from 'styles/colors';

export const ContainerItem = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ContainerCaregiverInfo = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const ContainerForm = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 10px;
`;

export const ContainerText = styled.View`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 5px;
`;

export const ContainerAvatar = styled.View`
  margin-right: 20px;
  margin-top: 10px;
`;

export const DateItem = styled.Text`
  font-size: 14px;
  color: ${colors.LABEL};
  margin-bottom: 10px;
`;

export const TitleItem = styled.Text`
  margin-top: 14px;
  font-size: 20px;
  color: ${colors.PRIMARY};
  font-weight: bold;
`;

export const Label = styled.Text`
  color: ${colors.BLACK_TRANSP(67)};
  font-size: 14px;
  padding-bottom: 4px;
`;

export const ContainerButton = styled.View`
  padding-top: 30px;
  padding-left: 100px;
  padding-right: 100px;
`;
