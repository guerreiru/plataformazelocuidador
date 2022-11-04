import { useSelector, useDispatch } from 'react-redux';
import { TYPES } from '../store/IconeWarningReducer';
export default () => {
  const { status } = useSelector((state) => state.iconeWarning);
  const dispatch = useDispatch();

  const activate = () => {
    dispatch({
      type: TYPES.ACTIVE,
      payload: true,
    });
  };

  const deactivate = () => {
    dispatch({
      type: TYPES.DISABLED,
      payload: false,
    });
  };
  return {
    status,
    activate,
    deactivate,
  };
};
