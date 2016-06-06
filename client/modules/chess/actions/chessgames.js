import {getUserIdentity} from '/lib/utility';

export default {
  create({Meteor, LocalState, FlowRouter}, order, creator, opponent) {
    if (!creator) {
      return LocalState.set('SAVING_ERROR', 'creator are required!');
    }
    if (order !==0 && order !== 1) {
      return LocalState.set('SAVING_ERROR', 'order wrong!');
    }

    LocalState.set('SAVING_ERROR', null);

    let game ={};

    game._id = Meteor.uuid();
    game.creatorId = creator._id;
    game.blackId = order === 0?creator._id:(opponent?opponent._id:"");
    game.blackName = order === 0?getUserIdentity(creator):(opponent?getUserIdentity(opponent):"");
    game.whiteId = order === 0?(opponent?opponent._id:""):creator._id;
    game.whiteName = order === 0?(opponent?getUserIdentity(opponent):""):getUserIdentity(creator);
    game.turn = 1;      //chess game white first
    game.moves = [];
    game.position = "";
    game.status = "request";

    console.log("order", order);
    console.log("game", game);



    Meteor.call('chessgames.create', game, (err) => {
      if (err) {
        return LocalState.set('SAVING_ERROR', err.message);
      }
    });
    FlowRouter.go(`/chess/game/${game._id}`);
  },

  invitation({Meteor, LocalState, FlowRouter}, email, gameUrl, invitator, callback) {

    if (!email) {
      return LocalState.set('INVITATION_ERROR', '邮箱地址不能为空!');
    }

    if (!gameUrl) {
      return LocalState.set('INVITATION_ERROR', '对局链接不能为空!');
    }

    if (!invitator) {
      return LocalState.set('INVITATION_ERROR', '对局邀请者不能为空!');
    }

    LocalState.set('INVITATION_ERROR', null);

    let data = {
      email: email,
      gameUrl: gameUrl,
      invitator: getUserIdentity(invitator),
      gameType: "国际象棋"
    };

    Meteor.call( 'sendGameInvitation', data, ( error, response ) => {

      if ( error ) {
        return LocalState.set('INVITATION_ERROR', error.reason);
      } else {
        Bert.alert( '您的对局邀请已经成功发送到友人邮箱！', 'success' );
        if (callback){
          callback.apply();
        }
      }
    });

  },

  invitationErrorClear({LocalState}) {
    return LocalState.set('INVITATION_ERROR', null);
  },





  acceptRequest({Meteor, LocalState, FlowRouter}, game, acceptor) {

    if (game.status!=="request"){
      return LocalState.set('SAVING_ERROR', '该对局已经有人接受邀请!');
    }

    if (!acceptor){
      return LocalState.set('SAVING_ERROR', '必须登录才能接受邀请！该对局已经有人接受邀请!');
    }
    if (acceptor._id === game.blackId || acceptor._id === game.whiteId){
      return LocalState.set('SAVING_ERROR', '您已经接受邀请!');
    }

    let data = {};

    data.whiteId = game.creatorId === game.blackId?acceptor._id: game.whiteId;
    data.whiteName = game.creatorId === game.blackId?getUserIdentity(acceptor): game.whiteName;
    data.blackId = game.creatorId === game.whiteId?acceptor._id: game.blackId;
    data.blackName = game.creatorId === game.whiteId?getUserIdentity(acceptor): game.blackName;
    data.status = "accepted";
    data.position = "";

    Meteor.call('chessgames.accept', data, game._id, (err) => {
      if (err) {
        return LocalState.set('games.SAVE_ERROR', err.message);
      }
    });

  },


  update({Meteor, LocalState, FlowRouter}, data, _id) {

    Meteor.call('chessgames.update', data, _id, (err) => {
      if (err) {
        return LocalState.set('games.SAVE_ERROR', err.message);
      }
    });
  },


  clearErrors({LocalState}) {
    return LocalState.set('SAVING_ERROR', null);
  }
};