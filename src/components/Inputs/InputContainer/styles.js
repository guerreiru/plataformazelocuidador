import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex-direction: column;
`;

export const InputBox = styled.View`
  margin-top: 4px;
  margin-bottom: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  background: ${(props) => {
    return props.editable === false
      ? colors.INPUT.BACKGROUND_DISABLED
      : colors.WHITE;
  }};
  border: 1px solid;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-width: ${(props) => {
    if (props.hasError || props.focused) {
      return '2px';
    }
    return '1px';
  }};
  border-color: ${(props) => {
    if (props.focused) {
      return colors.PRIMARY;
    }
    if (props.hasError) {
      return colors.ERROR;
    }
    return colors.MEDIUM_GRAY;
  }};
`;

export const Label = styled.Text`
  color: ${colors.LABEL};
  font-size: 14px;
`;

export const IconSpace = styled.View`
  padding-top: 10px;
`;

export const ButtonSpace = styled.TouchableOpacity`
  padding-top: 10px;
`;

export const ErrorTxt = styled.Text`
  color: ${colors.ERROR};
  font-size: 14px;
  margin-left: 20px;
  margin-right: 10px;
`;

export const IconError = styled(Icon)`
  color: ${colors.ERROR};
  font-size: 20px;
`;
