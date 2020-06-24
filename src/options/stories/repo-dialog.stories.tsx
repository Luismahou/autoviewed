import Button from '@material-ui/core/Button';
import React from 'react';
import { RepoDialog } from '../repo-dialog';

export default {
  title: 'Repo dialog',
  component: RepoDialog,
};

export const Interactive = () => {
  const [kind, setKind] = React.useState<
    React.ComponentProps<typeof RepoDialog>['kind']
  >('create');
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
        <RepoDialog
          kind="create"
          open={showDialog}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      ) : (
        <RepoDialog
          kind="update"
          initialName="foo/bar"
          open={showDialog}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
