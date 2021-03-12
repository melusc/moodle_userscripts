// ==UserScript==
// @name      Unconfirmed Marks Preact
// @version   2021.03.12a
// @author    lusc
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/main/dist/Unconfirmed%20Marks/unconfirmed-marks.user.js
// @grant     GM_xmlhttpRequest
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM_addStyle
// @grant     GM.deleteValue
// @run-at    document-start
// @connect   www.schul-netz.com
// ==/UserScript==

import { render, Component, h, createRef } from 'preact';
import style from './style.scss';

// https://stackoverflow.com/a/2117523
const uuidv4 = () => ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace(
  /[018]/g,
  c => (
    c
      ^ ( crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & ( 15 >> ( c / 4 ) ) )
  ).toString( 16 )
);

const SvgCircleNotch = () => <svg
  aria-hidden="true"
  class="ucmr-circle-notch ucmr-spin"
  viewBox="0 0 512 512"
>
  <path
    fill="currentColor"
    d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
  />
</svg>;
class SchulNetzMarks extends Component {
  state = {
    marks: [],
    loading: true,
    error: false,
    errorMsg: '',
    loggedOut: false,
    bottomHR: false,
  };

  inputs = {
    login: createRef(),
    password: createRef(),
    page: createRef(),
  };

  render = (
    _properties,
    { marks, loading, error, errorMsg, loggedOut, bottomHR }
  ) => <div class="mod-indent-outer">
    <div class="contentwithoutlink">
      {/* <link rel=stylesheet type=text/css
      href=http://localhost:5000/Unconfirmed%20Marks/style.css /> */}

      <div class="ucmr-title">Unconfirmed Marks</div>

      {loading && !error && <SvgCircleNotch />}
      {!loggedOut && !error && Array.isArray( marks )
          && <div>
            {Array.isArray( marks )
              && marks.map( ( { key, course, name, date, mark } ) => <div key={key} class="ucmr-row">
                <div class="ucmr-course">{course}</div>
                <div class="ucmr-name">{name}</div>
                <div class="ucmr-date">{date}</div>
                <div class="ucmr-mark">{mark}</div>
              </div> )}
          </div>
      }
      {loggedOut
          && <div class="login">
            <input
              class="form-control"
              required
              ref={this.inputs.login}
              placeholder="Username"
              type="text"
            />
            <input
              class="form-control"
              required
              ref={this.inputs.password}
              placeholder="Password"
              type="password"
            />
            <input
              class="form-control"
              required
              ref={this.inputs.page}
              placeholder="Page (ausserschwyz, einsiedeln...)"
              type="text"
            />
            <button
              class="btn btn-primary"
              type="button"
              onClick={this.handleLogin}
            >
              Save
            </button>
          </div>
      }
      {!loggedOut && marks === false
          && <div>Sie haben alle Noten bestätigt.</div>
      }
      {error
          && <div class="ucmr-error">{errorMsg ?? 'Something went wrong'}</div>
      }

      {bottomHR && <hr />}
    </div>
  </div>
  ;

  handleLogin = () => {
    const login = this.inputs.login.current.value;
    const password = this.inputs.password.current.value;
    const page = this.inputs.page.current.value;

    if ( login && password && page ) {
      Promise.all( [
        GM.setValue(
          'login',
          login
        ),
        GM.setValue(
          'password',
          password
        ),
        GM.setValue(
          'page',
          page
        ),
      ] ).then( () => {
        this.setState( { loggedOut: false, loading: true } );

        this.getMarks();
      } );
    }
  };

  componentDidMount() {
    this.checkCredentials();

    GM.getValue( 'bottomHR' ).then( bottomHR => {
      this.setState( { bottomHR } );
    } );
  }

  checkCredentials() {
    Promise.all( [
      GM.getValue( 'login' ),
      GM.getValue( 'password' ),
      GM.getValue( 'page' ),
    ] ).then( ( [ login, password, page ] ) => {
      if ( !login || !password || !page ) {
        this.setState( { loggedOut: true, loading: false } );
      }
      else {
        this.getMarks();
      }
    } );
  }

  getMarks() {
    Promise.all( [
      GM.getValue( 'login' ),
      GM.getValue( 'password' ),
      GM.getValue( 'page' ),
    ] ).then( ( [ login, password, page ] ) => {
      const loginPage = new Promise( (
        resolve, reject
      ) => {
        GM_xmlhttpRequest( {
          method: 'GET',
          url: `https://www.schul-netz.com/${ page }/loginto.php`,
          onload: resolve,
          timeout: 10000,
          onerror: reject,
          onabort: reject,
          ontimeout: reject,
        } );
      } );

      const frontPage = loginPage
        .then( response => {
          const parsed = new DOMParser().parseFromString(
            response.responseText,
            'text/html'
          );

          const data = new URLSearchParams( {
            loginhash: parsed.querySelector( 'input[name="loginhash"]' ).value,
            login,
            passwort: password,
          } );

          const cookie = response.responseHeaders
            .match( /phpsessid=\w{26}(?=;)/giu )
            .pop();

          return new Promise( (
            resolve, reject
          ) => {
            GM_xmlhttpRequest( {
              method: 'POST',
              url: `https://www.schul-netz.com/${ page }/index.php?pageid=`,
              cookie,
              data: data.toString(),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              timeout: 10000,
              onload: resolve,
              nocache: true,
              revalidate: true,
              onerror: reject,
              onabort: reject,
              ontimeout: reject,
            } );
          } );
        } )
        .catch( error => {
          console.error( error );
          this.setState( { loggedOut: true, loading: false } );
          for ( const value of [ 'login', 'password', 'page' ] ) {
            GM.deleteValue( value );
          }
        } );

      frontPage
        .then( response => {
          if ( typeof response !== 'object' || response.cancelled ) {
            return;
          }

          if ( new URL( response.finalUrl ).pathname.endsWith( 'loginto.php' ) ) {
            for ( const value of [ 'login', 'password', 'page' ] ) {
              GM.deleteValue( value );
            }

            this.setState( { loggedOut: true, loading: false } );
            return;
          }

          const parsed = new DOMParser().parseFromString(
            response.responseText,
            'text/html'
          );

          const h3 = [ ...parsed.querySelectorAll( 'h3.tabletitle' ) ].find( item => item.textContent.toLowerCase().trim() === 'ihre letzten noten' );

          const table = h3.nextElementSibling;
          const { rows } = table;
          const marks = [];
          let allConfirmed = false;

          for ( const row of rows ) {
            const [ course, name, date, mark ] = [ ...row.children ].map( item => item.textContent.trim() );

            if ( ( /sie haben alle noten bestätigt./i ).test( course ) ) {
              this.setState( { marks: false } );
              allConfirmed = true;
              break;
            }

            marks.push( { course, name, date, mark, key: uuidv4() } );
          }

          if ( !allConfirmed ) {
            this.setState( { marks } );
          }

          this.setState( { loading: false } );

          const anchor = [ ...parsed.querySelectorAll( 'a.mdl-menu__item' ) ].find( item => item.textContent.toLowerCase().trim() === 'abmelden' );

          if ( anchor ) {
            GM_xmlhttpRequest( {
              method: 'GET',
              url: `https://www.schul-netz.com/${ page }/${ anchor.getAttribute( 'href' ) }`,
              anonymous: true,
            } );
          }
        } )
        .catch( error => {
          console.error( error );
          this.setState( { error: true } );
        } );
    } );
  }
}

const init = () => {
  const main = document.querySelector( '#region-main ul.section' );
  const li = document.createElement( 'li' );

  li.id = 'module-marks';
  li.className = 'activity label modtype_label';
  const timetablev5 = document.querySelector( '#module-timetable-v5' );

  timetablev5
    ? timetablev5.after( li )
    : main.prepend( li );

  render(
    <SchulNetzMarks />,
    li
  );

  GM_addStyle( style );
};

document.readyState === 'complete'
  ? init()
  : addEventListener(
    'DOMContentLoaded',
    init,
    { once: true }
  );
