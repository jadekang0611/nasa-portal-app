import React from 'react';
import { useFeedPostStyles } from '../../styles';
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';

const FeedPost = ({ media, height }) => {
  const classes = useFeedPostStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia component='img' image={media} height={height} />
      </CardActionArea>
      <CardContent />
    </Card>
  );
};

export default FeedPost;
