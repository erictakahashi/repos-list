import axios from '../../../utils/api';
import { reposActions } from '../repos';
import { getRepos } from '../repos';

describe('repos action', () => {
  let get: any;

  let dispatch: any, getState: any;

  const repoA = { name: 'A' };
  const repoB = { name: 'B' };
  const repos = [repoA, repoB];
  const reposState = { repos };

  beforeEach(() => {
    get = jest.spyOn(axios, 'get');

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
      it('should not call axios `get` nor `dispatch`', () => {
        getRepos()(dispatch, getState);

        expect(get).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('no pre existing `repos` data  in the state', () => {
      it('should call axios `get` with the proper path, and call dispatch with `SET_REPOS` action and the proper payload, once the `get` promise is done', () => {
        const promiseTimeout = new Promise((resolve: Function) => (
          setTimeout(() => resolve({ data: repos }), 100)
        ));

        getState.mockReturnValue({ repos: { repos: [] } });
        get.mockReturnValue(promiseTimeout);

        getRepos()(dispatch, getState);

        const expectedPath = '/repos';
        expect(get).toHaveBeenCalledWith(expectedPath);

        return get().then(({ data = [] }) => {
          expect(dispatch).toHaveBeenCalledWith({
            type: reposActions.SET_REPOS,
            payload: data
          });
        });
      });

      it('should call dispatch with `SET_REPOS` action and and empty array as a payload when `get` promise got rejected', () => {
        const error = 'Error';
        const promiseReject = new Promise((_, reject: Function) => (
          setTimeout(() => reject(error), 100)
        ));

        getState.mockReturnValue({ repos: { repos: [] } });
        get.mockReturnValue(promiseReject);

        getRepos()(dispatch, getState);

        return get().catch(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: reposActions.SET_REPOS,
            payload: []
          });
        });
      });
    });
  });
});
