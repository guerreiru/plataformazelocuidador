import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from 'styles/colors';
import ListExams from 'pages/Senior/Exams/ListExams';
import useExam from '../hooks/useExam';
import useSenior from 'hooks/useSenior';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function Exams() {
  const styles = { borderTopWidth: 0.2, borderTopColor: colors.LIGHT_GRAY };
  const { getExamBySenior } = useExam();
  const { senior } = useSenior();
  const [examsOnHold, setExamsOnHold] = useState([]);
  const [finishedExams, setFinishedExams] = useState([]);

  const getExams = async () => {
    const allExams = await getExamBySenior(senior.id);

    setExamsOnHold(allExams.filter((e) => e.status !== 'FINISHED'));
    setFinishedExams(allExams.filter((e) => e.status === 'FINISHED'));

    return allExams?.sort(function (a, b) {
      var aa = a.date.split('/').reverse().join(),
        bb = b.date.split('/').reverse().join();
      return aa > bb ? -1 : aa < bb ? 1 : 0;
    });
  };

  const checkAddress = () => {
    const { city, district, public_place, number, state, zip_code } = senior;
    console.log();
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <>
      <Navigator
        style={styles}
        tabBarOptions={{
          style: {
            backgroundColor: colors.PRIMARY,
            height: 48,
          },
          labelStyle: { fontWeight: '500', fontSize: 14 },
          activeTintColor: colors.WHITE,
          inactiveTintColor: colors.LIGHT_GRAY,
          indicatorStyle: { backgroundColor: colors.WHITE },
        }}
      >
        <Screen
          name='Available'
          children={() => <ListExams exams={finishedExams} type='Available' />}
          options={{ title: 'DISPONÍVEIS' }}
        />
        <Screen
          name='OnHold'
          children={() => <ListExams exams={examsOnHold} type='OnHold' />}
          options={{ title: 'EM ESPERA' }}
        />
      </Navigator>
    </>
  );
}

export default Exams;
