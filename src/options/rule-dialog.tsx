import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles({
  vbox: {
    display: 'grid',
    gridGap: 8,
  },
});

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
  const [regex, setRegex] = React.useState(
    props.kind === 'update' ? props.initialRegex : '',
  );
  const [hide, setHide] = React.useState(
    props.kind === 'update' ? props.initialHide : false,
  );
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const classes = useStyles();

  const title = props.kind === 'create' ? 'Add rule' : 'Update rule';
  const submitBtnLabel = props.kind === 'create' ? 'Create' : 'Update';

  const handleRegexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegex(event.target.value);
  };
  const handleHideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHide(event.target.checked);
  };
  const handleSubmit = () => {
    if (regex.length > 0) {
      props.onSubmit(regex, hide);
    }
    setSubmitAttempted(true);
  };

  return (
    <Dialog
      disableBackdropClick={true}
      onClose={props.onCancel}
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
              Use this flag to also hide the files matched by the regular
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