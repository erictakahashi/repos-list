import axios from '../../utils/api';

export enum reposActions {
  SET_REPOS = 'SET_REPOS'
};

export const getRepos = () => async (dispatch: Function, getState: Function) => {
  const repos = getState().repos.repos;

  if (!repos || !repos.length) {
    try {
      const response = await axios({
        method: 'post',
        data: {
          query: `
            query GetFacebookRepositories {
              organization(login: "facebook") {
                repositories(first: 50) {
                  nodes {
                    id
                    forks {
                      totalCount
                    }
                    name
                    stargazers {
                      totalCount
                    }
                    url
                  }
                }
              }
            }
          `
        }
      });

      const fbRepos = response?.data?.data?.organization?.repositories?.nodes || [];
      dispatch({ type: reposActions.SET_REPOS, payload: fbRepos });
    } catch (error) {
      dispatch({ type: reposActions.SET_REPOS, payload: [] });
    }
  }
};
