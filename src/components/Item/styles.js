import styled from 'styled-components/native';
import colors from '../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: ${colors.ITEM.BORDER};
`;

export const SubContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerDescription = styled.View`
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: center;
  width: 80%;
`;

export const Icon = styled(MaterialIcon)`
  color: ${colors.PRIMARY};
  font-size: 24px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 25px;
  margin-bottom: 20px;
`;

export const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 25px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${colors.ITEM.TITLE};
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.ITEM.DESCRIPTION};
`;

export const SubDescription = styled.Text`
  font-size: 14px;
  color: ${colors.ITEM.SUBDESCRIPTION};
`;
