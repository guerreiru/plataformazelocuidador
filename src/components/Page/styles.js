import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  align-items: stretch;
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  padding-left: ${(props) => (props.hasSidePadding ? '20px' : '0px')};
  padding-right: ${(props) => (props.hasSidePadding ? '20px' : '0px')};
  background: ${colors.WHITE};
`;

export const View = styled.View`
  padding-left: ${(props) => (props.hasSidePadding ? '20px' : '0px')};
  padding-right: ${(props) => (props.hasSidePadding ? '20px' : '0px')};
  background: ${colors.WHITE};
  flex: 1;
`;

export const Content = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;
