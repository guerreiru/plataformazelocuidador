import React from 'react';
import colors from '../../styles/colors';
import SwitchToggle from './SwitchToggle';

const containerStyle = {
  width: 45,
  height: 15,
  borderRadius: 100,
  backgroundColor: colors.PRIMARY,
  padding: 0,
};

const circleStyle = {
  width: 20,
  height: 20,
  borderRadius: 14,
  backgroundColor: colors.PRIMARY,
};

const buttonStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
};

const rightContainerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};

const leftContainerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const colorText = {
  color: colors.WHITE,
};
import {
  Container,
  ContainerText,
  Title,
  ErrorTxt,
  SwitchToggleContainer,
  Description,
} from './styles';

export default function SwitchGroup({
  name,
  handleChange,
  value,
  error,
  theme = 'light',
  label = '',
  description = '',
}) {
  const renderError = () => (error ? <ErrorTxt>{error}</ErrorTxt> : null);
  return (
    <>
      <Container>
        <ContainerText>
          <Title theme={theme} highlighted={!!description}>
            {label}
          </Title>
          {!!description && <Description>{description}</Description>}
        </ContainerText>
        <SwitchToggleContainer>
          <SwitchToggle
            name={name}
            containerStyle={containerStyle}
            circleStyle={circleStyle}
            backgroundColorOn={colors.LILAC_TRANSP(57)}
            backgroundColorOff={colors.LIGHT_GRAY}
            switchOn={value === 'true'}
            onPress={() => handleChange(value === 'true' ? 'false' : 'true')}
            circleColorOff={colors.WHITE}
            circleColorOn={colors.PRIMARY}
            buttonStyle={buttonStyle}
            textRightStyle={colorText}
            textLeftStyle={colorText}
            rightContainerStyle={rightContainerStyle}
            leftContainerStyle={leftContainerStyle}
            backTextRight={value === 'false' || !value ? '' : ''}
            backTextLeft={value === 'true' ? '' : ''}
            duration={500}
          />
        </SwitchToggleContainer>
      </Container>

      {renderError()}
    </>
  );
}
