import {CssBaseline, Container, Typography} from '@material-ui/core';

import { useSearchStyle } from '../../styles';


// Custom Components
import SearchFrom from './SearchForm';
// import SearchResultList from '../SearchResultList';



const Search = (props) => {
  const classes = useSearchStyle();
  const [results, setResults] = React.useState([]);
  const [searched, setSearched] = React.useState(false);

  React.useEffect(() => {
    props.updateTitle('NASA Mars Rover');
  });

  const handleResults = (data) => {
    setResults(data);
    console.log(data);
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            NASA Mars Rover Photo Search
          </Typography>
          <SearchResultForm
            setSearched={setSearched}
            handleResults={handleResults}
          />
        </div>
      </Container>
     
    </>
  );
}

export default Search