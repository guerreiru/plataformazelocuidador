import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../styles/colors';
import IconMD from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get('window');

const PADDING = 15;
const BORDER_RADIUS = 5;
const FONT_SIZE = 14;
const HIGHLIGHT_COLOR = colors.PRIMARY;
const OPTION_CONTAINER_HEIGHT = 400;

export const Label = styled.Text`
  color: ${colors.LABEL};
  font-size: 14px;
`;

export const Overlay = styled.View`
  width: ${width}px;
  height: ${height}px;
  background-color: ${colors.BLACK_TRANSP(7)};
`;

export const PromptContainer = styled.View`
  left: ${width * 0.1}px;
  top: ${(height - OPTION_CONTAINER_HEIGHT) / 2 - 10}px;
`;

export const Prompt = styled.View`
  border-radius: ${BORDER_RADIUS};
  width: ${width * 0.8}px;
  background-color: ${colors.WHITE_TRANSP(8)};
  padding: ${PADDING}px;
`;

export const PromptLabel = styled.Text`
  text-align: center;
  color: #333;
  font-size: ${FONT_SIZE}px;
`;

export const OptionContainer = styled.View`
  border-radius: ${BORDER_RADIUS}px;
  width: ${width * 0.8}px;
  height: ${OPTION_CONTAINER_HEIGHT}px;
  background-color: ${colors.WHITE_TRANSP(9)};
  left: ${width * 0.1}px;
  top: ${(height - OPTION_CONTAINER_HEIGHT) / 2}px;
`;

export const OptionContainerInnerContainer = styled.View`
  padding-horizontal: 10px;
`;

export const CancelContainer = styled.View`
  left: ${width * 0.1}px;
  top: ${(height - OPTION_CONTAINER_HEIGHT) / 2 + 10}px;
`;

export const Cancel = styled.View`
  border-top-right-radius: ${BORDER_RADIUS}px;
  border-top-left-radius: ${BORDER_RADIUS}px;
  width: ${width * 0.8}px;
  background-color: ${colors.WHITE_TRANSP(8)};
  padding: ${PADDING}px;
`;

export const CancelLabel = styled.Text`
  text-align: center;
  color: ${colors.ERROR};
  font-size: ${FONT_SIZE}px;
`;

export const Clear = styled.View`
  border-bottom-right-radius: ${BORDER_RADIUS}px;
  border-bottom-left-radius: ${BORDER_RADIUS}px;
  border-top-width: 1px;
  border-top-color: #aaa;

  width: ${width * 0.8}px;
  background-color: ${colors.WHITE_TRANSP(8)};
  padding: ${PADDING}px;
`;

export const ClearLabel = styled.Text`
  text-align: center;
  color: #333;
  font-size: ${FONT_SIZE}px;
`;

export const Option = styled.View`
  padding: ${PADDING}px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const OptionLabel = styled.Text`
  text-align: center;
  font-size: ${FONT_SIZE}px;
  color: ${HIGHLIGHT_COLOR};
`;

export const SelectContainer = styled.View`
  margin-top: 4px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  height: 48px;
  border-bottom-width: ${(props) => {
    if (props.hasError || props.focused) {
      return '2px';
    }
    return '1px';
  }};
  border-bottom-color: ${(props) => {
    if (props.focused) {
      return colors.INPUT.BORDER;
    }
    if (props.hasError) {
      return colors.ERROR;
    }
    return colors.INPUT.BORDER_SELECT;
  }};
  background: ${(props) => {
    return props.disabled
      ? colors.INPUT.BACKGROUND_DISABLED
      : colors.INPUT.BACKGROUND;
  }};
`;

export const SelectLabel = styled.Text`
  flex: 1;
  color: #333;
  font-size: ${FONT_SIZE}px;
`;

export const Icon = styled(FAIcon)`
  color: ${colors.INPUT.BORDER};
`;

export const Container = styled.View``;

export const ErrorTxt = styled.Text`
  color: ${colors.ERROR};
  font-size: 14px;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 4px;
`;

export const IconError = styled(IconMD)`
  color: ${colors.ERROR};
  font-size: 20px;
`;

export const Section = styled.View`
  padding: ${PADDING}px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const SectionLabel = styled.Text`
  text-align: center;
  font-size: ${FONT_SIZE}px;
`;
