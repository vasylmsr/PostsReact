import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog/Dialog';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { UiDialogActions, UiDialogContent, UiDialogTitle } from '../../ui/UiDialog/UiDialog';
import * as AuthApi from '../../../api/auth';
import { UiTextField } from '../../ui/UiTextField/UiTextField';
import { IPostData } from '../../../api/auth';
import { UiButton } from '../../ui/UiButton/UiButton';

type CreatePostDialogProps = DialogProps & {
  onClose: () => void;
  onSave: (data: IPostData) => void;
  title: string;
  loading: boolean;
};

const postValidationSchema = yup.object({
  title: yup.string().max(128).required(),
  description: yup.string().max(512).required(),
});

const useStyles = makeStyles(() => ({
  dialogTitle: {
    textTransform: 'uppercase',
  },
  line: {
    display: 'grid',
    gridTemplateColumns: '200px 200px',
    gridGap: '25px',
  },
  fields: {
    display: 'grid',
    gridGap: '25px',
  },
}));

export const CreatePostDialog: React.FC<CreatePostDialogProps> = (
  props: CreatePostDialogProps,
): JSX.Element => {
  const { title, open, onClose, onSave, loading } = props;
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<AuthApi.IPostData>({
    resolver: yupResolver(postValidationSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      photoUrl: '',
      originalPostUrl: '',
      location: '',

      createdAt: '',
      updatedAt: '',
      user: '',
    },
  });

  const onSubmit = handleSubmit(data => onSave(data));

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <UiDialogTitle id="Create Post Dialog Title" onClose={onClose}>
        <span className={classes.dialogTitle}>{title}</span>
      </UiDialogTitle>

      <UiDialogContent dividers>
        <form className={classes.fields} noValidate>
          <div className={classes.line}>
            <UiTextField
              label="Title *"
              inputRef={register}
              name="title"
              customError={errors.title}
              size="small"
            />
            <UiTextField
              label="Location"
              inputRef={register}
              name="location"
              customError={errors.location}
              size="small"
            />
          </div>
          <div className={classes.line}>
            <UiTextField
              label="Photo link"
              inputRef={register}
              name="photoUrl"
              customError={errors.photoUrl}
              size="small"
            />
            <UiTextField
              label="Original post link"
              inputRef={register}
              name="originalPostUrl"
              size="small"
              customError={errors.originalPostUrl}
            />
          </div>

          <UiTextField
            label="Description *"
            inputRef={register}
            name="description"
            size="small"
            customError={errors.description}
            multiline
          />
        </form>
      </UiDialogContent>
      <UiDialogActions>
        <UiButton loading={loading} type="submit" color="primary" onClick={onSubmit}>
          Save changes
        </UiButton>
      </UiDialogActions>
    </Dialog>
  );
};
