import React, { useState, useEffect, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from 'styles/colors';
import ListExams from 'pages/Senior/Exams/ListExams';
import useExam from '../hooks/useExam';
import useSenior from 'hooks/useSenior';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function Exams({ route }) {
  const styles = { borderTopWidth: 0.2, borderTopColor: colors.LIGHT_GRAY };
  const { getExamBySenior } = useExam();
  const { senior } = useSenior();
  const [examsOnHold, setExamsOnHold] = useState([]);
  const [finishedExams, setFinishedExams] = useState([]);
  const [filter, setFilter] = useState('date');

  const getExams = async () => {
    const exams = await getExamBySenior(senior.id);
    const orderedExams = exams?.sort((a, b) => {
      var aa = a[filter],
        bb = b[filter];
      if (filter === 'date') {
        return aa > bb ? -1 : aa < bb ? 1 : 0;
      }
      return aa > bb ? 1 : aa < bb ? -1 : 0;
    });

    const examsOnHold = orderedExams.filter((e) => e.status !== 'FINISHED');
    const finishedExams = orderedExams.filter((e) => e.status === 'FINISHED');

    setExamsOnHold(examsOnHold);
    setFinishedExams(finishedExams);

    return;
  };

  const getFilterFromRoute = useCallback((routes) => {
    routes.map((route) => {
      if (route.params?.filters.type) {
        setFilter(route.params?.filters.type);
      }
      return;
    });
  }, []);

  useEffect(() => {
    getExams();
  }, [filter]);

  useEffect(() => {
    if (route.state) {
      getFilterFromRoute(route.state.routes);
      return;
    }
  }, [route]);

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
