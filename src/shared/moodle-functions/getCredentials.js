import { render, Component, h } from 'preact';
import frontPageCss from './getCredentials.scss';

export const getCredentials = ( loginReturnState = defaultLoginReturnState ) => new Promise( resolve => {
  const callback = ( { username, password } ) => {
    if ( username && password ) {
      /* username and password both cant be empty strings (seems obvious)
       so don't even try logging if either is */

      GM_setValue(
        'username',
        username
      );
      GM_setValue(
        'password',
        password
      );

      loginReturnState( { loggedOut: false, loggedOutCallback: null } );

      resolve( { username, password } );
    }
  };

  const username = GM_getValue( 'username' );
  const password = GM_getValue( 'password' );
  if ( username && password ) {
    resolve( { username, password } );
  }
  else {
    loginReturnState( {
      loggedOut: true,
      loggedOutCallback: callback,
    } );
  }
} );

let frontPageLoginSetState;
let frontPageDefaultLoginState = {};

class FrontPageLogin extends Component {
  state = frontPageDefaultLoginState;

  inputs = {};

  render = (
    _props, { loggedOut }
  ) => loggedOut
      && <div class="vertical-horizontal-center">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Login</h5>
            <input
              placeholder="Username"
              required
              class="input-group-text"
              ref={e => {
                this.inputs.username = e;
              }}
            />
            <input
              placeholder="Password"
              required
              class="input-group-text"
              ref={e => {
                this.inputs.password = e;
              }}
              type="password"
            />
          </div>
          <button class="btn btn-primary" onClick={this.handleClick}>
            Login
          </button>
        </div>
      </div>
    ;

  handleClick = () => {
    const username = this.inputs.username.value.trim();
    const password = this.inputs.password.value;

    this.state.loggedOutCallback( {
      username,
      password,
    } );
  };

  componentDidMount = () => {
    frontPageLoginSetState = this.setState.bind( this );
  };
}

export const defaultLoginReturnState = state => {
  if ( typeof frontPageLoginSetState === 'function' ) {
    frontPageLoginSetState( state );
  }
  else {
    frontPageDefaultLoginState = state;
    const div = document.createElement( 'div' );
    div.className = 'shared-login-popup';
    document.body.append( div );
    GM_addStyle( frontPageCss );
    render(
      <FrontPageLogin />,
      div
    );
  }
};
