import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import * as AuthApi from './firebase/AuthApi';
import { storeAuthUser } from './store/auth/login/actions';
import { AppRoutes } from './components/AppRoutes';
import { FAILURE_STATUS, SUCCESS_STATUS } from './utils/constants/other';

export default function App() {
  const dispatch = useDispatch();
  const [hasUserInStorage, setAvailabilityUserInStorage] = useState(true);
  const { checkingUserStatus } = useSelector((state: any) => state.auth);
  // We don`t save data in LS because firebase save token inside IndexedDB
  React.useEffect(
    () =>
      AuthApi.onAuthStateChanged((user: any) => {
        if (user) {
          dispatch(storeAuthUser(user));
        } else {
          setAvailabilityUserInStorage(false);
        }
      }),
    [dispatch],
  );

  const finishedLoadingStatuses = [SUCCESS_STATUS, FAILURE_STATUS];
  const isRoutesVisible = !hasUserInStorage || finishedLoadingStatuses.includes(checkingUserStatus);

  return <SnackbarProvider maxSnack={3}>{isRoutesVisible && <AppRoutes />}</SnackbarProvider>;
}
