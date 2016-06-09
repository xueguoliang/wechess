import Home from '../components/Home.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

import {getUserIdentity} from '../../../../lib/utility';



export const composer = ({context}, onData) => {

  const {Meteor, Collections, Store} = context();

  const i18n = Store.getState().i18n;
  const userId = Meteor.userId();

  if (Meteor.subscribe('users.current').ready()){

    const loggedIn = userId || false;

    let user = null;
    let name = "";

    if (userId){
      user = Meteor.users.findOne(userId);
      name = getUserIdentity(user);
    }

    onData(null, {i18n, loggedIn, user, name});
  }
};


export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Home);
