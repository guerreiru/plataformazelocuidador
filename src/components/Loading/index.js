import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';
import {
  Text,
  ActivityIndicator,
  LoadingBg,
  LoadingBox,
  Button,
  ButtonText,
  TextInfo,
  Divisor,
} from './styles';

function Loading({ message = 'Processando...', cancel = () => {} }) {
  const { loading, loadingDelay } = useSelector((state) => state.app);
  const [lazy, setLazy] = useState(false);
  const [clear, setClear] = useState(null);
  const [sched, setSched] = useState(null);
  const [visible, setVisible] = useState(false);

  const toLazy = () => {
    return null;
  };

  useEffect(() => {
    if (loading > 0) {
      if (!clear) {
        const c = setTimeout(() => {
          setLazy(true);
        }, 7000);
        setClear(c);
      }
      if (loadingDelay) {
        if (!sched) {
          const s = setTimeout(() => {
            setVisible(true);
            setSched(null);
          }, loadingDelay);
          setSched(s);
        }
      } else {
        setVisible(true);
      }
    }
    if (loading === 0) {
      if (clear) {
        clearTimeout(clear);
        setClear(null);
        setLazy(false);
      }
      if (sched) {
        clearTimeout(sched);
        setSched(null);
      }
      setVisible(false);
    }
  }, [loading]);

  if (!visible) {
    return null;
  }
  return (
    <LoadingBg>
      <LoadingBox>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
        <Text>{message}</Text>
        {toLazy()}
        {lazy && (
          <>
            <TextInfo>Isso está demorando um pouco...</TextInfo>
            <Divisor />
            <Button onPress={cancel}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
          </>
        )}
      </LoadingBox>
    </LoadingBg>
  );
}

export default Loading;
