/* This is where a user sees photos from the 'Mars Rover' endpoint
A signed in user can not only view the photo feed, but also pin (a.k.a save) photo(s) he or she likes
A unsigned-in user can only view the photo feed. */
import React from 'react';
import Layout from '../components/shared/Layout';
import SearchForm from '../components/search/SearchForm';
import FeedPost from '../components/feed/FeedPost';
import { Grid, Typography } from '@material-ui/core';
import API from '../api';
import { LoadingLargeIcon } from '../icons';
import { useFeedPageStyle } from '../styles';

/* Fetch the latest photos as soon as a user visits the main Feed page */

const FeedPage = () => {
  const classes = useFeedPageStyle();
  const [photos, setPhotos] = React.useState([]);
  const [page, setPage] = React.useState(0);
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

  const handleObserver = React.useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  const fetchMarsPhotos = async () => {
    setLoading(true);
    let res;
    let entireData;
    if (filtered) {
      if (filters.cameras === 'all') {
        res = await API.get(
          `${filters.rovers}/photos?${filters.datetype}=${filters.date}&page=${page}&api_key=DKuQ37oCnwIVKPnbOuI7Kv15ySbab1UqWjx9lmxY`
        );
        if (res.data.photos.length > 0) {
          entireData = new Set([...photos, ...res.data.photos]);
          setPhotos([...entireData]);
        }
      } else {
        res = await API.get(
          `${filters.rovers}/photos?${filters.datetype}=${filters.date}&camera=${filters.cameras}&page=${page}&api_key=DKuQ37oCnwIVKPnbOuI7Kv15ySbab1UqWjx9lmxY`
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
  }, [page]);

  function handleResults(data, rovers, datetype, date, cameras, filtered) {
    setPhotos(data);
    setFilters({
      rovers,
      datetype,
      cameras,
      date,
    });
    setFiltered(filtered);
  }

  function handlePage() {
    setPage(0);
  }

  return (
    <Layout title='Feed'>
      <SearchForm
        handleResults={handleResults}
        page={page}
        handlePage={handlePage}
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
          <Grid item key={index} xs={12} sm={6} md={4} l={4}>
            <FeedPost key={post.id} media={post.img_src} height='250' />
          </Grid>
        ))}
    </Grid>
  );
};

export default FeedPage;
