import React from 'react';
import {List, ListItem} from 'material-ui/List';

import Divider from 'material-ui/Divider';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {getGameStatusText} from '../../core/libs/CommonHelper.js';

export default class extends React.Component{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  render() {

    const {i18n, loggedIn, user, chessgames} = this.props;

    const styles ={
      player:{
        float:"left",
        marginRight:20,
      },
      row: {
        display: 'block',
        padding: "20px 40px",
      },
    };

    return (
      <div>
        <FlatButton
          primary={true}
          label={i18n.CreateNewGame}
          onTouchTap={() => {this.context.router.push(`/chess/game/create`); }}
        />

        {loggedIn ?
          <Card
            initiallyExpanded={true}
          >
            <CardHeader
              title={i18n.YourPlayingGames}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText
              expandable={true}
              style={{padding:0}}
            >
              {chessgames.count() > 0 ?
                <List>
                  {chessgames.map((game) => {

                    return (
                      <ListItem
                        key={game._id}
                        onTouchTap={() => {this.context.router.push(`/chess/game/${game._id}`);}}
                        leftAvatar={<Avatar src="/images/chessgame.png" />}
                        secondaryText={getGameStatusText("chess", user._id, game, i18n)}
                        secondaryTextLines={2}
                        primaryText={
                        <div key={game._id}>
                          {game.blackId == user._id?
                            <div>
                              <span>{i18n.YouAre}</span>
                              <FontIcon className="fa fa-circle"/>
                              {game.whiteId?
                                <span>{" "+i18n.OpponentIs+game.whiteName}</span>:null
                              }
                            </div>:
                            <div>
                              <span>{i18n.YouAre}</span>
                              <FontIcon className="fa fa-circle-thin"/>
                              {game.blackId?
                                <span>{" "+i18n.OpponentIs+game.blackName}</span>:null
                              }
                            </div>
                          }
                          <div style={{clear:"both"}} />
                        </div>
                      }
                      />
                    )
                  })}
                </List> :
                <div style={styles.row}>
                  {i18n.NoGames}
                </div>
              }

            </CardText>
          </Card> : <div />
        }

        <Card
          initiallyExpanded={true}
        >
          <CardHeader
            title={i18n.PublicGames}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            expandable={true}
            style={{padding:0}}
          >
            <div style={styles.row}>
              {i18n.NoGames}
            </div>
          </CardText>
        </Card>

      </div>
    );
  }
}


