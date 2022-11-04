import styled from 'styled-components/native';
import colors from '../../styles/colors';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: ${colors.ITEM.BORDER};
  background-color: ${({ backgroundColor }) =>
    !backgroundColor ? colors.GREEN_TRANSP(17) : colors.WHITE};
  padding-bottom: 10px;
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
  color: ${colors.BLACK};
  font-size: 24px;
  margin-left: 27px;
  margin-top: 10px;
`;

export const IconIonicons = styled(Ionicons)`
  color: ${colors.BLACK};
  font-size: 24px;
  margin-left: 27px;
  margin-top: 10px;
`;

export const IconFontAwesome5 = styled(FontAwesome5)`
  color: ${colors.BLACK};
  font-size: 24px;
  margin-left: 27px;
  margin-top: 10px;
`;

export const IconAntDesign = styled(AntDesign)`
  color: ${colors.BLACK};
  font-size: 24px;
  margin-left: 27px;
  margin-top: 10px;
`;

export const IconMaterialCommunityIcons = styled(MaterialCommunityIcons)`
  color: ${colors.BLACK};
  font-size: 24px;
  margin-left: 27px;
  margin-top: 10px;
`;

export const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: 22px 27px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${colors.BLACK};
  font-weight: bold;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.BLACK_TRANSP(67)};
`;

export const SubContainerDescription = styled.View`
  flex-direction: row;
`;

export const DescriptionSenior = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.BLACK_TRANSP(67)};
`;

export const DateTime = styled.Text`
  color: ${colors.BLACK_TRANSP(67)};
  font-size: 12px;
  margin-top: 5px;
`;
