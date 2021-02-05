import * as UtilsAxios from '../../../utils/api';
import { reposActions } from '../repos';
import { getRepos } from '../repos';

jest.mock('../../../utils/api', () => {
  const original = jest.requireActual('../../../utils/api')
  return {
    __esModule: true,
    default: jest.fn(original.default)
  }
});

describe('repos action', () => {
  let axios: any;

  let dispatch: any, getState: any;

  const repoA = { name: 'A' };
  const repoB = { name: 'B' };
  const repos = [repoA, repoB];
  const reposState = { repos };

  beforeEach(() => {
    axios = jest.spyOn(UtilsAxios, 'default');

    dispatch = jest.fn();
    getState = jest.fn();
    getState.mockReturnValue({ repos: reposState });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('exported actions', () => {
    it('should have a `SET_REPOS` actions', () => {
      expect(reposActions.SET_REPOS).toBeTruthy();
    });
  });

  describe('getRepos', () => {
    describe('pre existing `repos` data in the state', () => {
      it('should not call `axios` nor `dispatch`', () => {
        getRepos()(dispatch, getState);

        expect(axios).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('no pre existing `repos` data  in the state', () => {
      it('should call `axios` and call dispatch with `SET_REPOS` action and the proper payload, once the `axios` promise is done', () => {
        const promiseTimeout = new Promise((resolve: Function) => (
          setTimeout(() => resolve({ 
            data: {
              data: {
                organization: {
                  repositories: {
                    nodes: repos
                  }
                }
              }
            }
          }), 100)
        ));

        getState.mockReturnValue({ repos: { repos: [] } });
        axios.mockReturnValue(promiseTimeout);

        getRepos()(dispatch, getState);

        expect(axios).toHaveBeenCalled();

        return axios().then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: reposActions.SET_REPOS,
            payload: repos
          });
        });
      });

      it('should call dispatch with `SET_REPOS` action and and empty array as a payload when `axios` promise got rejected', () => {
        const error = 'Error';
        const promiseReject = new Promise((_, reject: Function) => (
          setTimeout(() => reject(error), 100)
        ));

        getState.mockReturnValue({ repos: { repos: [] } });
        axios.mockReturnValue(promiseReject);

        getRepos()(dispatch, getState);

        return axios().catch(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: reposActions.SET_REPOS,
            payload: []
          });
        });
      });
    });
  });
});
