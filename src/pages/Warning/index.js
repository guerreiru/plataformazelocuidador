import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { isToday, isThisWeek } from 'utils/date';
import NoInformation from 'components/NoInformation';
import ItemWarning from 'components/ItemWarning';
import useWarning from 'hooks/useWarning';
import SeniorImg from 'Images/intercorrencia.png';

import { ContainerHeader, Header, List } from './styles';

export default function Warning() {
  const { user } = useSelector((state) => state.auth);
  const { getWarnings } = useWarning();
  const isFocused = useIsFocused();
  const [orderWarnings, setOrderWarnings] = useState([]);

  const getDiffDate = (currentDate) => {
    if (isToday(currentDate)) {
      return 'Hoje';
    } else if (isThisWeek(currentDate)) {
      return 'Esta semana';
    }
    return 'Anteriores';
  };

  function sortListWarning(data) {
    if (!data) {
      return [];
    }

    const listWarnings = data.reduce(function (list, obj, index) {
      let diffDate = getDiffDate(obj.created_at);

      let listItem = list.find((item) => item.title && item.title === diffDate);

      if (!listItem) {
        list.push({ title: diffDate, data: [obj] });
      } else {
        listItem.data.push(obj);
      }

      return list;
    }, []);

    return listWarnings;
  }

  const loadWarnings = async () => {
    if (user) {
      const _warning = await getWarnings();
      setOrderWarnings(sortListWarning(_warning));
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadWarnings();
    }
  }, [isFocused]);

  return (
    <>
      {orderWarnings && orderWarnings.length > 0 ? (
        <List
          sections={orderWarnings}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <ItemWarning item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <ContainerHeader>
              <Header>{title}</Header>
            </ContainerHeader>
          )}
        />
      ) : (
        <NoInformation
          description={`Ainda não há avisos aqui! Eles vão aparecer automaticamente de acordo com as ações realizadas pela equipe de cuidados.`}
          imag={SeniorImg}
        />
      )}
    </>
  );
}
