import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import React from 'react';

function isNameValid(name: string) {
  // name must be in the following format: username/repository_name
  return /^[^\/]+\/[^\/]+$/.test(name);
}

export const RepoDialog = (
  props: (
    | {
        kind: 'create';
      }
    | {
        kind: 'update';
        initialName: string;
      }
  ) & {
    open: boolean;
    onCancel: () => void;
    onSubmit: (newName: string) => void;
  },
) => {
  const [name, setName] = React.useState('');
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  React.useEffect(() => {
    if (props.open) {
      setName(props.kind === 'update' ? props.initialName : '');
      setSubmitAttempted(false);
    }
  }, [props.open]);

  const title =
    props.kind === 'create' ? 'Add repository' : 'Update repository';
  const submitBtnLabel = props.kind === 'create' ? 'Create' : 'Update';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSubmit = () => {
    if (isNameValid(name)) {
      props.onSubmit(name);
    }
    setSubmitAttempted(true);
  };

  return (
    <Dialog
      disableBackdropClick={true}
      onClose={props.onCancel}
      open={props.open}
      aria-labelledby="repo-dialog-title"
    >
      <DialogTitle id="repo-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <FormControl>
          <TextField
            id="rule-regex"
            required={true}
            error={!isNameValid(name) && submitAttempted}
            label="Repository name"
            placeholder="foo/bar"
            value={name}
            onChange={handleNameChange}
            fullWidth={true}
          />
          <FormHelperText>
            This is the name of your github repository in the following format
            <code> &lt;username&gt;/&lt;repository name&gt;</code>
          </FormHelperText>
        </FormControl>
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