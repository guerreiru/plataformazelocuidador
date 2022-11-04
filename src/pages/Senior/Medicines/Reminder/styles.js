import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'styles/colors';

export const Icon = styled(MIcon)`
  font-size: 30px;
  color: ${colors.WHITE};
  align-self: center;
`;

export const TopButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-horizontal: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  margin-bottom: 16px;
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${colors.BLACK_TRANSP('67')};
  width: 100%;
  margin: 28px 0 20px; 0;
`;

export const Text = styled.Text`
  width: 100%;
  font-size: 14px;
  color: ${colors.BLACK_TRANSP('67')};
  margin-top: 20px;
`;

export const TxtButtonModal = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.PRIMARY};
`;

export const ContainerTime = styled.View`
  width: 100%;
  align-items: center;
`;

export const ContainerDate = styled.View`
  width: 100%;
`;

export const Container = styled.View`
  background: ${colors.WHITE};
  flex: 1;
  align-items: center;
  padding: 16px;
  flex-direction: column;
`;
