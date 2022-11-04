import React, { useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import NoInformation from 'components/NoInformation';
import ImgNoSenior from 'Images/CaregiverSenior.png';
import useSenior from 'hooks/useSenior';
import Item from './Item';
import Page from 'components/Page';

export default function Home() {
  const { navigate } = useNavigation();
  const { getMySeniors, mySeniors } = useSenior();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMySeniors();
    }
  }, [isFocused]);

  return (
    <>
      {mySeniors && mySeniors.length > 0 ? (
        <Page simple={false}>
          {mySeniors.map((senior, index) => {
            return (
              <Item
                key={index}
                full_name={senior.full_name}
                birthdate={senior.birthdate}
                nickname={senior.nickname}
                gender={senior.gender}
                seniorId={senior.id}
                onPress={() =>
                  navigate('Profile', { source: 'HOME', seniorId: senior.id })
                }
              />
            );
          })}
        </Page>
      ) : (
        <NoInformation
          imag={ImgNoSenior}
          description={
            'Ops... Parece que não há pessoas idosas associadas a você.'
          }
          buttonLabel={'ATUALIZAR'}
          onPress={async () => {
            getMySeniors();
          }}
        />
      )}
    </>
  );
}
