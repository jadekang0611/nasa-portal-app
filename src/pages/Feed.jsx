import React from 'react';
import Layout from '../components/shared/Layout';
import SearchForm from '../components/search/SearchForm';
import { Grid, Typography } from '@material-ui/core';
import API from '../api';
import { LoadingLargeIcon } from '../icons';
import { useFeedPageStyles } from '../styles';
import FeedSkeleton from '../components/feed/FeedSkeleton';
const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

const FeedPage = () => {
  const classes = useFeedPageStyles();
  const [photos, setPhotos] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const loader = React.useRef(null);
  const [filtered, setFiltered] = React.useState(false);

  function handleSearch() {
    setFiltered(true);
  }

  function handleLoading(value) {
    setLoading(value);
  }

  const handleObserver = React.useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  function loadPhotos(photo_list) {
    setPhotos([...photo_list]);
  }

  function handlePage() {
    setPage(0);
  }

  return (
    <Layout title='Feed'>
      <SearchForm
        page={page}
        handlePage={handlePage}
        handleSearch={handleSearch}
        loadPhotos={loadPhotos}
        photos={photos}
        handleLoading={handleLoading}
      />
      <section>
        <main className={classes.mainWrapper}>
          {!loading && photos.length === 0 ? (
            <>
              <Typography component='h3' variant='h6'>
                Your search did not return any results.
              </Typography>
            </>
          ) : (
            <FeedPhotoSection photos={photos} />
          )}
          {loading && <LoadingLargeIcon />}
          <div ref={loader} />
        </main>
      </section>
    </Layout>
  );
};

const FeedPhotoSection = ({ photos }) => {
  return (
    <Grid container spacing={2}>
      {photos &&
        photos.map((post, index) => (
          <React.Suspense key={index} fallback={<FeedSkeleton />}>
            <Grid item key={index} xs={12} sm={6} md={4} l={4}>
              <FeedPost
                key={post.id}
                id={post.id}
                media={post.img_src}
                height='250'
              />
            </Grid>
          </React.Suspense>
        ))}
    </Grid>
  );
};

export default FeedPage;
