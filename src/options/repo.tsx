import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import partial from 'lodash-es/partial';
import { Rule } from './rule';
import { Repo as RepoModel } from './model';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hbox: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
  },
}));

type RepoProps = {
  repo: RepoModel;
  onDelete: () => void;
  onAddRule: () => void;
  onUpdateRuleRegex: (ruleId: number, newRegex: string) => void;
  onUpdateHideFlag: (ruleId: number, newHideFlag: boolean) => void;
};

export const Repo = ({
  repo,
  onDelete,
  onAddRule,
  onUpdateRuleRegex,
  onUpdateHideFlag,
}: RepoProps) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardHeader title={repo.name || 'Unnamed'} />
      <Divider variant="middle" />
      <CardContent>
        {repo.rules.map((rule) => {
          return (
            <Rule
              key={rule.id}
              rule={rule}
              onUpdateRuleRegex={partial(onUpdateRuleRegex, rule.id)}
              onUpdateHideFlag={partial(onUpdateHideFlag, rule.id)}
            />
          );
        })}
        <div className={classes.hbox}>
          <Button variant="contained" color="secondary" onClick={onAddRule}>
            Add rule
          </Button>
          <Button variant="contained" color="secondary" onClick={onDelete}>
            Delete repository
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
