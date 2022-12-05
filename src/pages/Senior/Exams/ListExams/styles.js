import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from 'styles/colors';

export const NoExamRequested = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
`;

export const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
`;

export const CardExam = styled.View`
  padding: 16px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const CardContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardIcon = styled.View`
  max-width: 32px;
  margin-right: 16px;
`;

export const Icon = styled(MaterialIcon)`
  color: ${({ color }) => (color ? color : `${colors.PRIMARY}`)};
  position: relative;
`;

export const SmallIcon = styled(MaterialIcon)`
  font-size: 16px;
  position: absolute;
  bottom: -6px;
  right: -6px;
`;

export const IconFooter = styled(MaterialIcon)`
  color: #56b35a;
  font-size: 16px;
  margin-right: 8px;
`;

export const CardBody = styled.View``;

export const Title = styled.Text`
  color: ${({ color }) => (color ? color : `${colors.PRIMARY}`)};
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 4px;
`;

export const Text = styled.Text`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  line-height: 19px;
  color: #3a424a;
  font-weight: ${({ bold }) => (bold ? 'bold' : '400')};
`;

export const CardFooter = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

export const ButtonDownloadResult = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${colors.LIGHT_PRIMARY};
  flex-direction: row;
  padding: 8px 16px;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  font-weight: bold;
  margin-left: 4px;
`;

export const ShowResult = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background-color: #edf7ed;
`;
