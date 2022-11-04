import React from 'react';
import { useSelector } from 'react-redux';

import ErrorDateTime from 'pages/Error/DateTime';
import QuestionModal from 'components/QuestionModal';
import SplashScreen from 'pages/SplashScreen';
import Connectivity from 'pages/Error/Connectivity';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import TipModal from 'components/TipModal';
import Loading from 'components/Loading';

import useConnectivity from 'hooks/useConnectivity';
import useLoading from 'hooks/useLoading';

export default function Routes() {
  const { message, cancelRequest } = useLoading();
  const { ready, dateTimeIsSync } = useSelector((state) => state.app);
  const { online } = useConnectivity();
  const { user } = useSelector((state) => state.auth);

  if (!ready) {
    return <SplashScreen />;
  }

  if (!online) {
    return <Connectivity />;
  }

  if (!dateTimeIsSync) {
    return <ErrorDateTime />;
  }

  if (user) {
    return (
      <>
        <QuestionModal />
        <TipModal />
        <AppRoutes />
        <Loading message={message} cancel={cancelRequest} />
      </>
    );
  }

  return (
    <>
      <AuthRoutes />
      <Loading message={message} cancel={cancelRequest} />
    </>
  );
}
