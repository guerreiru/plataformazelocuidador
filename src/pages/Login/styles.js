import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'styles/colors';

export const Bg = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.WHITE};
`;

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-horizontal: 8px;
`;

export const PageContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ContainerForm = styled.View`
  background: ${colors.WHITE};
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 380px;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  align-self: center;
`;

export const SubContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const Label = styled.Text`
  font-size: 20px;
  color: ${(props) =>
    props.decoration ? colors.LIGHT_PRIMARY : colors.TEXT_GRAY};
  text-decoration: ${(props) => (props.decoration ? 'underline' : 'none')};
`;

export const LabelVersion = styled.Text`
  align-self: center;
  margin-vertical: 10px;
  color: ${(props) => (props.decoration ? colors.PRIMARY : colors.TEXT_GRAY)};
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  align-self: center;
`;

export const Line = styled.View`
  width: 139.5px;
  height: 2px;
  background: ${colors.MEDIUM_GRAY};
  margin-left: 16px;
  margin-right: 16px;
`;

export const Image = styled.Image`
  width: 124px;
  height: 124px;
  margin-bottom: 20px;
  align-self: center;
  margin-top: 40px;
`;
