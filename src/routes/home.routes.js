import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

import NextButton from 'components/CustomNavButtons/NextButton';

import ClinicalFunctionalEvaluation from 'pages/Senior/ClinicalFunctionalEvaluation';
import SearchIntercurrence from 'pages/Senior/Intercurrence/SearchIntercurrence';
import ViewIntercurrence from 'pages/Senior/Intercurrence/ViewIntercurrence';
import RegisterCaregiver from 'pages/Senior/Teams/RegisterCaregiver';
import DisengageReasons from 'pages/Senior/DisengageReasons';
import HistoryMedicine from 'pages/Senior/Medicines/HistoryMedicine';
import SearchMedicine from 'pages/Senior/Medicines/SearchMedicine';
import SearchExam from 'pages/Senior/Exams/SearchExam';
import RequiredFields from 'pages/Senior/Exams/RequiredFields';
import Intercurrence from 'pages/Senior/Intercurrence';
import ViewMedicine from 'pages/Senior/Medicines/ViewMedicine';
import PersonalData from 'pages/Senior/PersonalData';
import ViewProfile from 'pages/Senior/Teams/ViewProfile';
import Reminder from 'pages/Senior/Medicines/Reminder';
import CheckCPF from 'pages/Senior/Teams/CheckCPF';
import Profile from 'pages/Senior/Profile';
import Home from 'pages/Home';
import { Chat } from 'pages/Senior/Chat';

import Medicines from './medicines.routes';
import Exams from './exams.routes';
import CarePlan from './careplan.routes';
import Teams from './team.routes';
import colors from 'styles/colors';

import useReminder from 'hooks/useReminder';
import useSenior from 'hooks/useSenior';
import useModal from 'hooks/useModal';

const HomeStack = createStackNavigator();

const barStyles = {
  headerStyle: {
    backgroundColor: colors.PRIMARY,
    elevation: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTintColor: colors.WHITE,
};

const MedicineStack = createStackNavigator();
function MedicineStackScreen() {
  const { Navigator, Screen } = MedicineStack;
  return (
    <Navigator mode="modal">
      <Screen
        name="Medicines"
        component={Medicines}
        options={({ route, navigation }) => {
          const { navigate } = navigation;
          const routeName = getFocusedRouteNameFromRoute(route) || 'InUse';
          return {
            title: 'Medicamentos',
            ...barStyles,
            headerRight: () =>
              routeName === 'Register' ? (
                <NextButton
                  simple
                  onPress={() => navigate('SearchMedicine')}
                  label="FILTRAR"
                />
              ) : null,
          };
        }}
      />
    </Navigator>
  );
}

const ExamStack = createStackNavigator();
function ExamStackScreen() {
  const { Navigator, Screen } = ExamStack;
  return (
    <Navigator mode="modal">
      <Screen
        name="Exams"
        component={Exams}
        options={({ route, navigation }) => {
          const { navigate } = navigation;
          const routeName = getFocusedRouteNameFromRoute(route);

          return {
            title: 'Exames',
            ...barStyles,
            headerRight: () => (
              <NextButton
                simple
                onPress={() =>
                  navigate({
                    name: 'SearchExam',
                    params: { routeName },
                  })
                }
                label="FILTRAR"
              />
            ),
          };
        }}
      />
    </Navigator>
  );
}

export default function HomeRoutes() {
  const { setReminderState } = useReminder();
  const { senior } = useSenior();
  const { renderUseModal, setUseModal } = useModal();
  const { Navigator, Screen } = HomeStack;
  return (
    <>
      <Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            elevation: 0,
            shadowColor: 'transparent',
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
        }}>
        <Screen
          name="Home"
          component={Home}
          options={{ title: 'Pessoas de quem cuido', ...barStyles }}
        />

        <Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Pessoa de quem cuido', ...barStyles }}
        />

        <Screen
          name="PersonalData"
          component={PersonalData}
          options={{ title: 'Dados pessoais', ...barStyles }}
        />

        <Screen
          name="Intercurrence"
          component={Intercurrence}
          options={{ title: 'Intercorrências', ...barStyles }}
        />

        <Screen
          name="SearchIntercurrence"
          component={SearchIntercurrence}
          options={{
            title: 'Buscar Intercorrências',
            ...barStyles,
          }}
        />

        <Screen
          name="ViewIntercurrence"
          component={ViewIntercurrence}
          options={{
            title: 'Intercorrência',
            ...barStyles,
          }}
        />

        <Screen
          name="ClinicalFunctionalEvaluation"
          component={ClinicalFunctionalEvaluation}
          options={{ title: 'Avaliação clínico-funcional', ...barStyles }}
        />

        <Screen
          name="Teams"
          component={Teams}
          options={{ title: 'Equipes', ...barStyles }}
        />

        <Screen
          name="Chat"
          component={Chat}
          options={{ title: 'Chat', ...barStyles }}
        />

        <Screen
          name="ViewProfile"
          component={ViewProfile}
          options={({ route }) => ({ title: route.params.name, ...barStyles })}
        />

        <Screen
          name="CheckCPF"
          component={CheckCPF}
          options={{ title: 'Vincular cuidador', ...barStyles }}
        />

        <Screen
          name="RegisterCaregiver"
          component={RegisterCaregiver}
          options={{ title: 'Convidar cuidador', ...barStyles }}
        />

        <Screen
          name="CarePlan"
          component={CarePlan}
          options={({ route }) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) || 'Instructions';
            return {
              title: 'Rotina de cuidados',
              ...barStyles,
              headerRight: () =>
                routeName === 'Instructions' ? (
                  <NextButton
                    name="alarm"
                    onPress={() => {
                      if (senior.death_date) {
                        setUseModal();
                      } else {
                        setReminderState();
                      }
                    }}
                  />
                ) : null,
            };
          }}
        />

        <Screen
          name="Exams"
          options={{
            title: 'Exames',
            headerShown: false,
          }}
          component={ExamStackScreen}
        />

        <Screen
          name="Medicines"
          options={{
            title: 'Medicamentos',
            headerShown: false,
          }}
          component={MedicineStackScreen}
        />

        <Screen
          name="SearchMedicine"
          component={SearchMedicine}
          options={{
            title: 'Buscar Medicamentos',
            ...barStyles,
          }}
        />

        <Screen
          name="SearchExam"
          component={SearchExam}
          options={{
            title: 'Buscar Exames',
            ...barStyles,
          }}
        />

        <Screen
          name="RequiredFields"
          component={RequiredFields}
          options={{
            title: 'Exames',
            ...barStyles,
          }}
        />

        <Screen
          name="ViewMedicine"
          component={ViewMedicine}
          options={{
            title: 'Medicamento',
            ...barStyles,
          }}
        />
        <Screen
          name="HistoryMedicine"
          component={HistoryMedicine}
          options={{
            title: 'Medicamento',
            ...barStyles,
          }}
        />
        <Screen
          name="DisengageReasons"
          component={DisengageReasons}
          navigationOptions={{ tabBarVisible: false }}
          options={{
            title: 'Motivo de desvínculo',
            ...barStyles,
          }}
        />
        <Screen
          name="Reminder"
          component={Reminder}
          options={{
            title: 'Alterar Lembrete',
            ...barStyles,
          }}
        />
      </Navigator>
      {renderUseModal({
        title: 'Atenção',
        message:
          'Foi registrado um óbito para o idoso. Por isso, não é possível inserir nem editar dados relacionados a esse Idoso.',
      })}
    </>
  );
}
