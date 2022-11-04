import styled from 'styled-components/native';
import colors from 'styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  background-color: ${colors.WHITE};
  padding: ${({ padding }) => `${padding}px`};
`;

export const TouchableOpacity = styled.TouchableOpacity``;

export const AvatarContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 80px;
  align-self: center;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 160px;
`;
export const EditPhoto = styled.View`
  background-color: ${colors.PRIMARY};
  width: 24px;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const IconEditPhoto = styled(MaterialIcon)`
  color: ${colors.WHITE};
  align-self: center;
  font-size: 16px;
`;
