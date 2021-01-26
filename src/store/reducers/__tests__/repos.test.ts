import { reposActions } from '../../actions/repos';
import { repos } from '../repos';

describe('repos reducer', () => {
  const allRepos = [
    { name: 'A' },
    { name: 'B' }
  ];
  const initialState = {
    repos: allRepos
  };

  it('should set the payload as the state `repos` when `SET_REPOS` action type is provided', () => {
    const reposData = [{ name: 'C' }];

    const state = repos(initialState, {
      type: reposActions.SET_REPOS,
      payload: reposData
    });

    expect(state.repos).toEqual(reposData);
  });

  it('should return the current state by default when an invalid action is provided', () => {
    const state = repos(initialState, {
      type: 'TEST_TYPE',
      payload: []
    });

    expect(state).toEqual(initialState);
  });
});
