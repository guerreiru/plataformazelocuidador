import React, { useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';

import { Container, Box, Line1, Line2, ItemBox, ItemTxt, Dots } from './styles';

export default function TimePicker({
  initialValue = '00:00',
  minInc = 1,
  onChange = () => {},
}) {
  const initialHour = initialValue.split(':')[0] * 1;
  const initialMinute = (initialValue.split(':')[1] * 1) / minInc;

  const [hours, setHours] = useState(initialHour);
  const [minutes, setMinutes] = useState(initialMinute * minInc);
  const hoursArray = [];
  const minutesArray = [];
  useEffect(() => {
    const _h = `0${hours}`.slice(-2);
    const _m = `0${minutes}`.slice(-2);
    const _fullHour = `${_h}:${_m}`;
    onChange(_fullHour);
  }, [hours, minutes]);

  for (let i = 0; i < 60; i++) {
    if (i < 24) {
      hoursArray.push(i);
    }
    if (i % minInc === 0) {
      minutesArray.push(i);
    }
  }

  const Item = ({ txt }) => {
    return (
      <ItemBox>
        <ItemTxt>{(txt === '' ? txt : '0' + txt).slice(-2)}</ItemTxt>
      </ItemBox>
    );
  };

  return (
    <Container>
      <Box>
        <Line1 />
        <Line2 />
        <Carousel
          firstItem={initialHour}
          // loopClonesPerSide={6}
          // loop={true}
          activeSlideOffset={2}
          enableSnap={true}
          vertical={true}
          inactiveSlideOpacity={0.4}
          sliderWidth={100}
          activeSlideAlignment={'center'}
          sliderHeight={108}
          itemWidth={108}
          itemHeight={36}
          data={hoursArray}
          renderItem={({ item }) => <Item txt={item} />}
          onBeforeSnapToItem={(index) => {
            setHours(index);
          }}
        />
      </Box>
      <Dots>:</Dots>
      <Box>
        <Line1 />
        <Line2 />
        <Carousel
          //loop={true}
          //loopClonesPerSide={6}
          firstItem={initialMinute}
          activeSlideOffset={2}
          enableSnap={true}
          inactiveSlideOpacity={0.4}
          vertical={true}
          sliderWidth={100}
          sliderHeight={108}
          itemWidth={100}
          itemHeight={36}
          data={minutesArray}
          renderItem={({ item }) => <Item txt={item} />}
          onBeforeSnapToItem={(index) => {
            setMinutes(index * minInc);
          }}
        />
      </Box>
    </Container>
  );
}
