import { useSelector, useDispatch } from 'react-redux';

import api from '../services/api';
import { TYPES } from '../store/TeamReducer';

export default () => {
  const teams = useSelector((state) => state.team.list);
  const member = useSelector((state) => state.team.member);
  const dispatch = useDispatch();

  const translateNameTypeCaregiver = (value) => {
    switch (value) {
      case 'Cuidador':
        return 'caregivers';
      case 'Responsável':
        return 'caregivers';
      case 'Familiar':
        return 'relatives';
    }
  };

  const groupByTypeCaregiver = (objctArray, property) => {
    return objctArray.reduce((acc, object) => {
      let key = translateNameTypeCaregiver(object[property]);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(object);
      return acc;
    }, {});
  };

  const getTeams = async (seniorId) => {
    const _response = await api.get(`/seniors/${seniorId}/teams`);
    const formatTypeCategoryCaregiver = groupByTypeCaregiver(
      _response.caregivers,
      'type_caregiver',
    );

    let _teams = {
      professionals: _response.professionals,
      caregivers: formatTypeCategoryCaregiver.caregivers
        ? formatTypeCategoryCaregiver.caregivers
        : [],
      relatives: formatTypeCategoryCaregiver.relatives
        ? formatTypeCategoryCaregiver.relatives
        : [],
    };

    dispatch({
      type: TYPES.TEAMS_LISTED,
      payload: _teams,
    });
    return _teams;
  };

  const getMember = async (seniorId, memberId, hasProfessional) => {
    const _member = await api.get(`/seniors/${seniorId}/member/${memberId}`, {
      hasProfessional,
    });
    dispatch({
      type: TYPES.TEAM_MEMBER_FETCHED,
      payload: _member,
    });
    return _member;
  };

  const clearTeams = async () => {
    dispatch({
      type: TYPES.TEAMS_LISTED,
      payload: [],
    });
  };

  return {
    teams,
    member,
    getTeams,
    getMember,
    clearTeams,
  };
};
