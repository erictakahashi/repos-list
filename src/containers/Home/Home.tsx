import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { getRepos } from '../../store/actions/repos';
import Styled from './Home.styled';

/**
 * Home page container.
 */
const Home: FC = () => {
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(getRepos())
  }, [dispatch]);

  return (
    <Styled.Wrapper>App</Styled.Wrapper>
  );
};

export default Home;
