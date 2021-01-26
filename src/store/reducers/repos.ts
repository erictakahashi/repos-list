import { reposActions } from '../actions/repos';

interface IState {
  repos?: Array<object>
}

const initialState = {
  repos: [] as Array<object>
};

interface IActionTypePayload {
  type?: string,
  payload?: Array<object>
}

export const repos = (state = initialState, action: IActionTypePayload): IState => {
  const {
    type = '',
    payload = []
  } = action;

  switch (type) {
    case reposActions.SET_REPOS:
      return {
        ...state,
        repos: [...payload]
      };

    default:
      return state;
  }
};
