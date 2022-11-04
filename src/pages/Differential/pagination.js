import React from 'react';
import { Pagination } from 'react-native-snap-carousel';
import colors from 'styles/colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const sizes = {
  dotSize: 12,
  margin: 4,
};
if (width <= 320) {
  sizes.dotSize = 8;
  sizes.margin = 0;
}

const dotStyles = {
  width: sizes.dotSize,
  height: sizes.dotSize,
  borderRadius: 6,
  marginHorizontal: sizes.margin,
  backgroundColor: colors.PRIMARY,
};

const CarouselPage = ({ entries, page }) => {
  return (
    <Pagination
      dotsLength={entries.length}
      activeDotIndex={page}
      containerStyle={{ backgroundColor: colors.WHITE }}
      dotStyle={dotStyles}
      inactiveDotStyle={{
        backgroundColor: colors.PRIMARY,
      }}
      inactiveDotOpacity={1}
      inactiveDotScale={0.6}
    />
  );
};

export default CarouselPage;
