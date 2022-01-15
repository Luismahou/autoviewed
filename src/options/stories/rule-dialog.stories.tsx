import Button from '@material-ui/core/Button';
import React from 'react';
import { RuleDialog } from '../rule-dialog';

export default {
  title: 'Rule dialog',
  component: RuleDialog,
};

export const Interactive = () => {
  const [kind, setKind] =
    React.useState<React.ComponentProps<typeof RuleDialog>['kind']>('create');
  const [showDialog, setShowDialog] = React.useState(false);
  const onOpenCreateVariant = () => {
    setKind('create');
    setShowDialog(true);
  };
  const onOpenUpdateVariant = () => {
    setKind('update');
    setShowDialog(true);
  };
  const onCancel = () => {
    setShowDialog(false);
  };
  const onSubmit = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Button variant="contained" onClick={onOpenCreateVariant}>
        Open create dialog
      </Button>
      <Button variant="contained" onClick={onOpenUpdateVariant}>
        Open update dialog
      </Button>
      {kind === 'create' ? (
        <RuleDialog
          kind="create"
          open={showDialog}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      ) : (
        <RuleDialog
          kind="update"
          initialRegex=".*\.proto\.ts"
          initialHide={false}
          open={showDialog}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
