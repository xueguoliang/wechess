import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class extends React.Component{

  render() {

    const styles ={
      button: {
        margin:10,
      },
      errMessage: {
        color: "red",
      },
    };

    const {loginSocialError, i18n} = this.props;


    return (

      <div>
        <FlatButton
          style={styles.button}
          primary={true}
          label="Facebook"
          icon={<FontIcon className="fa fa-facebook"/>}
          onTouchTap = {this.props.handleLoginFacebook}
        />
        <FlatButton
          style={styles.button}
          primary={true}
          label="Twitter"
          icon={<FontIcon className="fa fa-twitter"/>}
          onTouchTap = {this.props.handleLoginTwitter}
        />
        <FlatButton
          style={styles.button}
          primary={true}
          label="Google"
          icon={<FontIcon className="fa fa-google"/>}
          onTouchTap = {this.props.handleLoginGoogle}
        />
        <FlatButton
          style={styles.button}
          primary={true}
          label="Github"
          icon={<FontIcon className="fa fa-github"/>}
          onTouchTap = {this.props.handleLoginGithub}
        />
        <FlatButton
          style={styles.button}
          primary={true}
          label={i18n.Wechat}
          icon={<FontIcon className="fa fa-wechat"/>}
          disabled = {true}
        />
        <FlatButton
          style={styles.button}
          primary={true}
          label={i18n.Weibo}
          icon={<FontIcon className="fa fa-weibo"/>}
          disabled = {true}
        />
        <FlatButton
          style={styles.button}
          primary={true}
          label="QQ"
          icon={<FontIcon className="fa fa-qq"/>}
          disabled = {true}
        />
        {loginSocialError ?
          <div style={styles.errMessage}>
            {loginSocialError}
          </div> : null }

      </div>
    );
  }
}
