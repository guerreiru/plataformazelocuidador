import styled from 'styled-components/native';
import colors from '../../../styles/colors';

import { TextInputMask as InputMask } from 'react-native-masked-text';

export const TextInputMask = styled(InputMask)`
  font-size: 14px;
  color: ${colors.INPUT.TEXT};
  flex: 1;
  padding-top: 11px;
  padding-bottom: 10px;
  padding-left: 16px;
`;
