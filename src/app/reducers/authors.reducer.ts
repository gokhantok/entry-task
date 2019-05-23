import { AuthorsState } from '../models/helper/app-state.model';
import { AuthorsActions, GetAuthorsRequestAction, GetAuthorsSuccessAction, PostAuthorSuccessAction } from '../actions/authors.actions';

const INITIAL_STATE: AuthorsState = {
  data: [

  ],
  loading: false
};

export function authorsReducer(state: AuthorsState = INITIAL_STATE,
                               action: AuthorsActions): AuthorsState {
  switch (action.type) {
    case GetAuthorsRequestAction.type:
      return {
        ...state,
        loading: true
      };

    case GetAuthorsSuccessAction.type:
      return {
        ...state,
        data: action.authors,
        loading: true
      };

      case PostAuthorSuccessAction.type:
        return {
          ...state,
          data: {
            ...state.data,
            [action.author.id!]: action.author
          },
          loading: false
        };

    default:
      return state;
  }
}
