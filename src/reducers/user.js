import Immutable                              from 'immutable';
import { createReducer }                      from 'redux-immutablejs';

import { SIGN_OUT_COMPLETE, SIGN_OUT_ERROR }  from 'actions/sign-out';
import { OAUTH_SIGN_IN_COMPLETE }             from 'actions/oauth-sign-in';
import * as authActions                       from 'actions/authenticate';
import * as ssActions                         from 'actions/server';

const initialState = Immutable.fromJS({
  attributes: null,
  isSignedIn: false
});

export default createReducer(initialState, {
  [authActions.AUTHENTICATE_COMPLETE]: (state, { user }) => state.merge({
    attributes: user,
    isSignedIn: true
  }),
// ToDo: check while this is not working
  [ssActions.SS_TOKEN_VALIDATION_COMPLETE]: (state, { user }) => {
    return state.merge({
      attributes: user,
      isSignedIn: true
    });
  },

  [OAUTH_SIGN_IN_COMPLETE]: (state, { user }) => state.merge({
    attributes: user,
    isSignedIn: true
  }),

  [ssActions.SS_AUTH_TOKEN_UPDATE]: (state, { user }) => {
    return state.merge({
      isSignedIn: !!user,
      attributes: user
    });
  },

  [authActions.AUTHENTICATE_FAILURE]:    state => state.merge(initialState),
// ToDo: check while this is not working
  [ssActions.SS_TOKEN_VALIDATION_ERROR]: state => state.merge(initialState),

  [SIGN_OUT_COMPLETE]:                   state => state.merge(initialState),
  [SIGN_OUT_ERROR]:                      state => state.merge(initialState)
});
