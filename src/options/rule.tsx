import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Rule as RuleModel } from './model';

type RuleProps = {
  rule: RuleModel;
  onUpdateRuleRegex: (newRegex: string) => void;
  onUpdateHideFlag: (newHideFlag: boolean) => void;
};

export const Rule = ({
  rule,
  onUpdateRuleRegex,
  onUpdateHideFlag,
}: RuleProps) => (
  <div>
    <FormControl required>
      <TextField
        label="File regex"
        onChange={e => onUpdateRuleRegex(e.target.value)}
        value={rule.regex}
      />
    </FormControl>
    <FormControl required>
      <FormControlLabel
        control={
          <Checkbox
            onChange={e => onUpdateHideFlag(e.target.checked)}
            value={rule.hide}
          />
        }
        label="Hide"
      />
    </FormControl>
  </div>
);
