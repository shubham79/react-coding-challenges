import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCategories, getNewReleases, getPlaylists } from '../redux/reducer';

export default function Discover() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const discoverState = useSelector((state) => state.discover);
  const { authDetails } = authState;
  const {
    newReleases,
    playlists,
    categories,
    newReleaseLoading,
    playlistLoading,
    categoriesLoading,
  } = discoverState;

  useEffect(() => {
    // when authToken available fetch data
    if (authDetails?.access_token) {
      dispatch(getNewReleases());
      dispatch(getPlaylists());
      dispatch(getCategories());
    }
  }, [authDetails, dispatch]);

  return (
    <div className='discover'>
      <DiscoverBlock
        text='RELEASED THIS WEEK'
        id='released'
        data={newReleases}
        isLoading={newReleaseLoading}
      />
      <DiscoverBlock
        text='FEATURED PLAYLISTS'
        id='featured'
        data={playlists}
        isLoading={playlistLoading}
      />
      <DiscoverBlock
        text='BROWSE'
        id='browse'
        data={categories}
        imagesKey='icons'
        isLoading={categoriesLoading}
      />
    </div>
  );
}
