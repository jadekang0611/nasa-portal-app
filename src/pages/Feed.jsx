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
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const loader = React.useRef(null);
  const [filtered, setFiltered] = React.useState(false);
  const [filters, setFilters] = React.useState({
    rovers: '',
    sol: '',
    datetype: '',
    cameras: '',
    date: '',
  });

  function handleSearch() {
    setFiltered(true);
  }

  const handleObserver = React.useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log(`Target is intersect`);
      setPage((prev) => prev + 1);
    }
  }, []);

  const fetchMarsPhotos = async () => {
    let res;
    let entireData;
    console.log(filtered);
    if (filtered) {
      if (filters.cameras === 'all') {
        res = await API.get(
          `${filters.rovers}/photos?${filters.datetype}=${filters.date}&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
        );
        if (res.data.photos.length > 0) {
          entireData = new Set([...photos, ...res.data.photos]);
          setPhotos([...entireData]);
        }
      } else {
        res = await API.get(
          `${filters.rovers}/photos?${filters.datetype}=${filters.date}&camera=${filters.cameras}&page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
        );
        if (res.data.photos.length > 0) {
          entireData = new Set([...photos, ...res.data.photos]);
          setPhotos([...entireData]);
        }
      }
    } else {
      res = await API.get(
        `curiosity/latest_photos?page=${page}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      if (res.data.latest_photos.length > 0) {
        console.log('fetching latest');
        entireData = new Set([...photos, ...res.data.latest_photos]);
        setPhotos([...entireData]);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  React.useEffect(() => {
    fetchMarsPhotos();
    console.log(`Page: ${page}`);
  }, [page]);

  function handleResults(data, rovers, datetype, date, cameras, filtered) {
    setPhotos(data);
    console.log('handle results');
    console.log(`filtered: ${filtered}`);
    setFilters({
      rovers,
      datetype,
      cameras,
      date,
    });
    setFiltered(filtered);
  }

  function handlePage() {
    setPage(1);
  }

  return (
    <Layout title='Feed'>
      <SearchForm
        handleResults={handleResults}
        page={page}
        handlePage={handlePage}
        handleSearch={handleSearch}
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
        </main>
        {loading && <LoadingLargeIcon />}
        <div ref={loader} />
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
