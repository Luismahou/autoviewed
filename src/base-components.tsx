import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  ul: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  }
}))

type ListItemProps = {
  children: React.ReactNode,
  className?: string,
}
export const Ul = ({ children, className }: ListItemProps) => {
  const classes = useStyles();
  return <ul className={`${classes.ul} ${className ? className : ''}`}>{children}</ul>
}
export const Li = ({ children, className }: ListItemProps) => {
  const classes = useStyles();
  return <li className={`${classes.li} ${className ? className : ''}`}>{children}</li> }
