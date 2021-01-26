import axios from '../../utils/api';

export enum reposActions {
  SET_REPOS = 'SET_REPOS'
};

export const getRepos = () => async (dispatch: Function, getState: Function) => {
  const repos = getState().repos.repos;

  if (!repos || !repos.length) {
    try {
      const response = await axios.get('/repos');
      const { data = [] } = response || {};

      if (!!data.length) {
        dispatch({ type: reposActions.SET_REPOS, payload: data });
      }

    } catch (error) {
      dispatch({ type: reposActions.SET_REPOS, payload: [] });
    }
  }
};
