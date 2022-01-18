import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  vbox: {
    display: 'grid',
    gridGap: theme.spacing(2),
  },
}));

export const RuleDialog = (
  props: (
    | {
        kind: 'create';
      }
    | {
        kind: 'update';
        initialRegex: string;
        initialHide: boolean;
      }
  ) & {
    open: boolean;
    onCancel: () => void;
    onSubmit: (regex: string, hide: boolean) => void;
  },
) => {
  const [regex, setRegex] = React.useState('');
  const [hide, setHide] = React.useState(false);
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  React.useEffect(() => {
    if (props.open) {
      setRegex(props.kind === 'update' ? props.initialRegex : '');
      setHide(props.kind === 'update' ? props.initialHide : false);
      setSubmitAttempted(false);
    }
  }, [props.open]);
  const classes = useStyles();

  const title = props.kind === 'create' ? 'Add rule' : 'Update rule';
  const submitBtnLabel = props.kind === 'create' ? 'Create' : 'Update';

  const handleRegexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(event.target.value);
  };
  const handleHideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHide(event.target.checked);
  };
  const handleClose = (_: object, reason: string) => {
    if (reason !== 'backdropClick') {
      props.onCancel();
    }
  };
  const handleSubmit = () => {
    if (regex.length > 0) {
      props.onSubmit(regex, hide);
    }
    setSubmitAttempted(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      aria-labelledby="rule-dialog-title"
    >
      <DialogTitle id="rule-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <div className={classes.vbox}>
          <FormControl>
            <TextField
              id="rule-regex"
              required={true}
              error={regex === '' && submitAttempted}
              label="Regex"
              placeholder="^.*\.snap$"
              value={regex}
              onChange={handleRegexChange}
              fullWidth={true}
              autoFocus={true}
            />
            <FormHelperText>
              The files matched by this regular expression will be approved
              automatically
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormControlLabel
              label="Hide"
              control={<Checkbox checked={hide} onChange={handleHideChange} />}
            />
            <FormHelperText>
              Select this option to also hide the files matched by the regular
              expression
            </FormHelperText>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit}>
          {submitBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
