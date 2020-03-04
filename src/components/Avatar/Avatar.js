import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import "./Avatar.css"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    }
  }
}));

export default function IconAvatars({ icon, color, background, src, alt, type, width = 70, height = 70 }) {
  const classes = useStyles();

  if (icon)
    return (
      <div className={classes.root}>
        <Avatar style={{ color, background, width, height }}>
          <i className={icon} />
        </Avatar>
      </div>
    )
  else
    return (
      <div className={classes.root}>
        <Avatar variant={type} alt={alt} src={src}
          style={{ color, background, width, height }} />
      </div>
    )
}