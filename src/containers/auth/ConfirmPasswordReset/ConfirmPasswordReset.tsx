import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import { getDefaultAuthStyles } from '../styles';
import { UiButton } from '../../../components/ui/UiButton/UiButton';
import { confirmPasswordReset } from '../../../store/auth/login/actions';
import { AuthTextField } from '../../../components/auth/AuthTextField/AuthTextField';
import { SIGN_IN, SIGN_UP } from '../../../utils/constants/routes';
import { handleAsyncAction } from '../../../utils/helpers';
import { password } from '../../../utils/validationRules';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

const forgotPasswordValidationSchema = yup.object({
  newPassword: password().required(),
  newPasswordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword')])
    .required(),
});

type ConfirmPasswordResetProps = {
  code: string;
};

export const ConfirmPasswordReset: React.FC<ConfirmPasswordResetProps> = ({
  code,
}: ConfirmPasswordResetProps): JSX.Element => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
  });

  const onSubmit = handleSubmit(({ newPassword }) => {
    handleAsyncAction({
      async callback() {
        await dispatch(confirmPasswordReset(code, newPassword));
        enqueueSnackbar('Password successfully changed');
        history.push(SIGN_IN);
      },
      setLoading,
      enqueueSnackbar,
    });
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Forgot password
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <AuthTextField
          label="New password"
          name="newPassword"
          autoFocus
          inputRef={register}
          customError={errors.newPassword}
        />

        <AuthTextField
          label="Confirm new password"
          name="newPasswordConfirmation"
          inputRef={register}
          customError={errors.newPasswordConfirmation}
        />

        <Grid container>
          <Grid item xs>
            <RouterLink to={SIGN_IN}>Sign In</RouterLink>
          </Grid>
          <Grid item>
            <RouterLink to={SIGN_UP}>Don`t have an account? Sign Up</RouterLink>
          </Grid>
        </Grid>

        <UiButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          loading={loading}
        >
          Set new password
        </UiButton>
      </form>
    </>
  );
};