import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRepos } from '../../store/actions/repos';
import Styled from './Home.styled';

interface IUseSelectorState {
  repos?: any
}

/**
 * Home page container.
 */
const Home: FC = () => {
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(getRepos())
  }, [dispatch]);

  const reposState = useSelector((state: IUseSelectorState) => state.repos);
  const { repos } = reposState;

  return (
    <Styled.Wrapper>
      <Styled.Navbar />

      <Styled.Container>
        <RenderTable
          data={repos}
        />
      </Styled.Container>
    </Styled.Wrapper>
  );
};

export default Home;

interface IRenderTable {
  data?: Array<object>
}

interface ITotalCount {
  totalCount?: number
}

interface IRepoItem {
  forks?: ITotalCount,
  id?: string,
  name?: string,
  stargazers?: ITotalCount,
  url?: string
}

export const RenderTable: FC<IRenderTable> = (props: IRenderTable) => {
  const { data } = props

  if (!data) return (
    <Styled.NoTable>Not enough data to display the table.</Styled.NoTable>
  );

  return (
    <Styled.TableContainer>
      <Styled.Table size="small">
        <Styled.TableHead>
          <Styled.TableRow>
            <Styled.TableCell>Repo name</Styled.TableCell>
            <Styled.TableCell align="right">Stars</Styled.TableCell>
            <Styled.TableCell align="right">Forks</Styled.TableCell>
          </Styled.TableRow>
        </Styled.TableHead>

        <Styled.TableBody>
          {data.map((item: IRepoItem) => (
            <Styled.TableRow key={item.id}>
              <Styled.TableCell component="th" scope="row">
                <Styled.TableLink href={item.url}>{item.name}</Styled.TableLink>
              </Styled.TableCell>
              <Styled.TableCell align="right">{item.stargazers?.totalCount}</Styled.TableCell>
              <Styled.TableCell align="right">{item.forks?.totalCount}</Styled.TableCell>
            </Styled.TableRow>
          ))}
        </Styled.TableBody>
      </Styled.Table>
    </Styled.TableContainer>
  );
};
