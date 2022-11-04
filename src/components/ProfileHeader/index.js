import React, { useState, useEffect } from 'react';
import { ContainerInfor, Title, Description } from './styles';
import colors from '../../styles/colors';
import { calculateAge } from '../../utils/date';
import THE_SENIOR from '../../utils/formatSenior';

const ProfileHeader = ({
  full_name,
  birthdate,
  nickname,
  gender,
  colorTitle = colors.PRIMARY,
}) => {
  const [ageOfSenior, setAgeOfSenior] = useState(0);

  useEffect(() => {
    setAgeOfSenior(calculateAge(birthdate));
  }, [birthdate]);

  //if(!ageOfSenior) return null;
  return (
    <ContainerInfor>
      <Title colorTitle={colorTitle}>{full_name}</Title>
      <Description>{`(${
        THE_SENIOR.THE_TREATMENT_PRONOUN[gender.toUpperCase()]
      } ${nickname || full_name}), ${ageOfSenior} anos`}</Description>
    </ContainerInfor>
  );
};

export default ProfileHeader;
