import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  chip: {
    margin: 8,
  },
});

export default function FeedPost({ media, height }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia component='img' image={media} height={height} />
      </CardActionArea>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        ></Typography>
        <Typography variant='h5' component='h2'></Typography>
      </CardContent>
    </Card>
  );
}
