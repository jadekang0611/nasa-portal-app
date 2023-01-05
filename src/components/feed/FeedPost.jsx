import React from 'react';
import { useFeedPostStyle } from '../../styles';
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';

export default function FeedPost({ media, height }) {
  const classes = useFeedPostStyle();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia component='img' image={media} height={height} />
      </CardActionArea>
      <CardContent />
    </Card>
  );
}
