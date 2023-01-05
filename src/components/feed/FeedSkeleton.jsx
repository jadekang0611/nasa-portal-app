import { useMediaQuery } from '@material-ui/core';
import { useFeedPostSkeletonStyles } from '../../styles';
const FeedSkeleton = () => {
  const classes = useFeedPostSkeletonStyles();
  const matches = useMediaQuery('(min-width: 300px');
  return (
    <div
      className={classes.container}
      style={{
        gridTemplateColumns: matches && '600px 335px',
      }}
    >
      <div className={classes.mediaSkeleton} />
    </div>
  );
};

export default FeedSkeleton;
