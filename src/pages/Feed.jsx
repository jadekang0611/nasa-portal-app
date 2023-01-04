/* This is where a user sees photos from the 'Mars Rover' endpoint
A signed in user can not only view the photo feed, but also pin (a.k.a save) photo(s) he or she likes
A unsigned-in user can only view the photo feed. */
import React from 'react';
import Layout from '../components/shared/Layout';
import SearchForm from '../components/search/SearchForm';
import FeedPost from '../components/feed/FeedPost';
import { Grid } from '@material-ui/core';
import { defaultPost } from '../data';
import API from '../api';

/* Fetch the latest photos as soon as a user visits the main Feed page */

const FeedPage = () => {
  const [photos, setPhotos] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await API.get(
          `curiosity/latest_photos?api_key=DKuQ37oCnwIVKPnbOuI7Kv15ySbab1UqWjx9lmxY`
        );
        console.log(res.data);
        setPhotos(res.data.latest_photos);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <Layout title='Feed'>
      <SearchForm />
      <section>
        <main>
          <FeedPhotoSection photos={photos} />
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
          <Grid item key={index} xs={12} sm={6} md={4} l={4}>
            <FeedPost key={post.id} media={post.img_src} height='250' />
          </Grid>
        ))}
    </Grid>
  );
};

export default FeedPage;
