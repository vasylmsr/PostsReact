import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { HOME, SIGN_UP } from '../../../utils/constants/routes';
import * as AuthApi from '../../../firebase/AuthApi';
import GoogleIcon from '../../../assets/images/google.png';
import signInValidationSchema from './SignInValidation';
import { getDefaultAuthStyles } from '../styles';
import { signIn } from '../../../store/auth/login/actions';
import { UiButton } from '../../../components/ui/UiButton/UiButton';
import { LOADING_STATUS } from '../../../utils/constants/other';

const useStyles = makeStyles(theme => getDefaultAuthStyles(theme));

export const SignIn: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { loginError, user, loginStatus } = useSelector((state: any) => state.auth);
  const { register, handleSubmit, errors } = useForm<AuthApi.IUserLoginCredentials>({
    resolver: yupResolver(signInValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (loginError) {
      enqueueSnackbar(loginError.message, { variant: 'error' });
    }
  }, [loginError, enqueueSnackbar]);

  useEffect(() => {
    if (user) {
      history.push(HOME);
    }
  }, [user, history]);
  const onSubmit = handleSubmit(data => {
    dispatch(signIn(data));
  });

  return (
    <>
      <CssBaseline />
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoFocus
          inputRef={register}
          helperText={errors.email?.message}
          error={Boolean(errors.email)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          inputRef={register}
          helperText={errors.password?.message}
          error={Boolean(errors.password)}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button onClick={AuthApi.doSignInWithGoogle}>
          <img src={GoogleIcon} alt="Google icon" width="auto" height="30px" />
        </Button>

        <UiButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          loading={loginStatus === LOADING_STATUS}
        >
          Sign In
        </UiButton>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <RouterLink to={SIGN_UP}>Don`t have an account? Sign Up</RouterLink>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
