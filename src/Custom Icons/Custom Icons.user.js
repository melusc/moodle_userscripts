// ==UserScript==
// @name         Custom Icons Preact
// @version      2021.01.22b
// @author       lusc
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Custom%20Icons/Custom%20Icons.user.js
// @include      *://moodle.ksasz.ch/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

import { render, Component, html, h } from 'htm/preact';
import { Fragment } from 'preact';
import { getCourses } from '../shared/moodle-functions';
import style from './style.scss';

const isFrontpage = !( /^\/customiconspreact/iu ).test( location.pathname );

const errors = {
  error: Error( 'An error occured' ),
  timeout: Error( 'Request timed out' ),
  abort: Error( 'Request was aborted' ),
  invalidSelector: Error( 'Invalid option selected' ),
  statusCode: (
    status, statusText
  ) => new Error( `Error ${ status }: ${ statusText }` ),
};

const runOnceOnFrontPage = () => {
  GM_registerMenuCommand(
    'Open settings',
    () => {
      open(
        '/customIconsPreact/',
        '_blank'
      );
    }
  );

  addEventListener(
    'customIconsPreact',
    initFrontpage
  );

  if ( !GM_getValue( 'pointers' ) ) {
    GM_setValue(
      'pointers',
      {}
    );
    GM_setValue(
      'values',
      {}
    );
  }

  initFrontpage();
};

const initFrontpage = () => {
  const sidebar = getSidebar( document );

  if ( notNullOrUndef( sidebar ) ) {
    const pointers = Object.keys( GM_getValue( 'pointers' ) );

    for ( let i = 0; i < pointers.length; i++ ) {
      applyIcon(
        pointers[ i ],
        sidebar
      );
    }

    GM_addValueChangeListener(
      'pointers',
      refresh
    ); // if "values" changes "pointers" will change anyway
  }
};

const applyIcon = (
  id, sidebar
) => {
  const anchor = sidebar.querySelector( `a[href="https://moodle.ksasz.ch/course/view.php?id=${ id }"]` );

  if ( notNullOrUndef( anchor ) ) {
    if ( anchor.childElementCount > 0 ) {
      const blobURLObj = getBlobURL( id );

      if ( typeof blobURLObj !== 'object' ) {
        return;
      }

      if ( blobURLObj.isXML ) {
        const span = document.createElement( 'span' );

        span.className = 'icon navicon';
        span.style.display = 'inline-block';
        span.style.color = 'var(--svg-fill, inherit)';

        render(
          html( [ blobURLObj.rawXML ] ),
          span
        );

        anchor.firstElementChild.replaceWith( span );
      }
      else {
        const img = document.createElement( 'img' );

        img.classList.add(
          'icon',
          'navicon'
        );
        img.setAttribute(
          'aria-hidden',
          true
        );
        img.style
          = 'fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;';

        img.tabIndex = -1;
        img.src = blobURLObj.blobURL;
        img.addEventListener(
          'load',
          () => {
            URL.revokeObjectURL( blobURLObj );
          },
          { once: true }
        );
        anchor.firstElementChild.replaceWith( img );
      }
    }
  }
  else {
    testIfUserLeftCourse( id );
  }
};

/**
 * Takes dataURI from TM storage and returns an ObjectURL
 * @param {string|number} id Id of course
 * @returns {string} The object url
 */
const getBlobURL = id => {
  const dataURI = getDataURI( id );

  if ( typeof dataURI === 'object' ) {
    if ( dataURI.isXML ) {
      return dataURI;
    }

    const { mediaType, rawByteString } = dataURI;
    const byteString = atob( rawByteString );
    const { length } = byteString;
    const arrayBuffer = new ArrayBuffer( length );
    const uintArr = new Uint8Array( arrayBuffer );

    for ( let i = 0; i < length; i++ ) {
      uintArr[ i ] = byteString.charCodeAt( i );
    }
    const blob = new Blob(
      [ uintArr ],
      {
        type: mediaType,
      }
    );

    return { blobURL: URL.createObjectURL( blob ), isXML: false };
  }
  return undefined;
};

const refresh = (
  _name, oldVal, newVal, remote
) => {
  if ( remote === true ) {
    const sidebar = getSidebar( document );
    const oldEntries = Object.entries( oldVal );
    const newEntries = Object.entries( newVal );
    const changedOrAdded = newEntries.filter( ( [ key, val ] ) => oldVal.hasOwnProperty( key ) === false && oldVal[ key ] !== val );
    const removed = oldEntries.filter( ( [ key ] ) => newVal.hasOwnProperty( key ) === false );

    for ( let i = 0; i < removed.length; i++ ) {
      const [ id ] = removed[ i ];
      const img = sidebar.querySelector( `a[href="https://moodle.ksasz.ch/course/view.php?id=${ id }"] > .icon.navicon` );

      if ( img && ( img.nodeName === 'SPAN' || img.nodeName === 'IMG' ) ) {
        // nodeName to not update an icon accidentally
        const i = document.createElement( 'i' );

        i.classList.add(
          'icon',
          'fa',
          'fa-graduation-cap',
          'fa-fw',
          'navicon'
        );
        i.setAttribute(
          'aria-hidden',
          true
        );
        i.tabIndex = -1;
        img.replaceWith( i );
      }
    }

    for ( let i = 0; i < changedOrAdded.length; i++ ) {
      applyIcon(
        changedOrAdded[ i ][ 0 ],
        sidebar
      );
    }
  }
};

const testIfUserLeftCourse = id => {
  getCourses(
    false,
    settingsPageSetState
  ).then( courses => {
    if ( !courses.hasOwnProperty( id ) ) {
      deleteVal( id );
      alert( `You appear to not be in the course with the id "${ id }" anymore.\nThe course will not be checked for anymore` );
    }
  } );
};

const initSettingspage = () => {
  history.replaceState(
    {},
    '',
    '/customIconsPreact/'
  );

  document.title = 'Custom Icons Preact Setup';

  GM_addStyle( style );

  const icon = document.createElement( 'link' );

  icon.rel = 'shortcut icon';
  icon.href
    = 'data:image/svg+xml,%3Csvg xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox%3D"0 74.46 344.72 235.31"%3E%3Cpath fill%3D"%23f98012" d%3D"M289.61 309.77V201.51q0-33.94-28-33.95t-28.06 33.95v108.26H178.4V201.51q0-33.94-27.57-33.95-28.05 0-28 33.95v108.26H67.67V195.12q0-35.43 24.6-53.63 21.66-16.25 58.56-16.25 37.41 0 55.12 19.19 15.26-19.19 55.62-19.19 36.9 0 58.54 16.25 24.6 18.19 24.61 53.63v114.65z"%2F%3E%3Cpath fill%3D"%23333" d%3D"M174.74 116.9l54.74-40-.7-2.44C130 86.57 85.08 95.15 0 144.47l.79 2.24 6.76.07c-.62 6.81-1.7 23.64-.32 48.95-9.44 27.32-.24 45.88 8.4 66.07 1.37-21 1.23-44-5.22-66.89-1.35-25.14-.24-41.67.37-48.1l56.4.54a258 258 0 001.67 33.06c50.4 17.71 101.09-.06 128-43.72-7.47-8.37-22.11-19.79-22.11-19.79z"%2F%3E%3C%2Fsvg%3E';
  document.head.append( icon );

  while ( document.body.lastChild ) {
    document.body.lastChild.remove();
  }

  render(
    <SettingsPage />,
    document.body
  );
};

let settingsPageSetState;
class SettingsPage extends Component {
  state = {
    courses: [],

    notificationString: null,

    inputStates: {
      urlVal: '',
      fileVal: null,
      copyVal: null,

      current: null,
    },

    loggedOut: false,
    loggedOutCallback: null,
  };

  inputRefs = {};

  render = (
    _props,
    { courses, selectedCourse, inputStates, notificationString }
  ) => <div class="container">
    <Sidebar
      courses={courses}
      handleClick={this.handleSidebarClick}
      blur={`${ notNullOrUndef( notificationString ) }`}
    />
    <Main
      selectedCourse={selectedCourse}
      courses={courses}
      handleInput={this.handleMainInput}
      inputStates={inputStates}
      handleSave={this.handleSave}
      inputRefs={this.inputRefs}
      blur={`${ notNullOrUndef( notificationString ) }`}
      loggedOut={this.state.loggedOut}
      loggedOutCallback={this.loggedOutCallbackHandler}
    />
    {notificationString
        && <Notification
          handleClick={this.handleNotificationClick}
          notificationString={notificationString}
        />
    }
  </div>;

  loggedOutCallbackHandler = vals => {
    this.state.loggedOutCallback( vals );
    this.setState( { loggedOut: false, loggedOutCallback: null } );
  };

  handleSidebarClick = e => {
    const { target } = e;
    const row = target.closest( '.row' );
    const svg = target.closest( 'svg' );
    const svgCL = svg?.classList;
    const { id } = row.dataset;

    if ( notNullOrUndef( svg ) && svgCL.contains( 'svg-icon-x' ) ) {
      deleteVal( id );
      const courses = [ ...this.state.courses ];

      for ( let i = 0; i < courses.length; i++ ) {
        if ( courses[ i ].id === id ) {
          courses[ i ] = {
            ...courses[ i ],
            dataURI: null,
            rawXML: null,
            isXML: null,
          };
          break;
        }
      }
      this.setState( {
        selectedCourse: null,
        courses,
      } );
    }
    else if ( notNullOrUndef( row ) ) {
      const item = this.state.courses.find( el => el.id === id );

      this.setState( {
        selectedCourse: { ...item },
      } );
      scroll( {
        top: 0,
        left: 0,
        behavior: 'smooth',
      } );
    }
  };

  saveHandlers = {
    url: inputStates => new Promise( (
      resolve, reject
    ) => {
      const url = inputStates.urlVal;

      GM_xmlhttpRequest( {
        method: 'GET',
        url,
        timeout: 15000,
        responseType: 'blob',
        anonymous: true,
        onabort: () => reject( errors.abort ),
        onerror: () => {
          reject( errors.error );
        },
        ontimeout: () => reject( errors.timeout ),
        onload: res => {
          if ( res.status === 200 ) {
            this.saveHandlers
              .useFileReader( res.response )
              .then( resolve )
              .catch( reject );
          }
          else {
            reject( errors.statusCode(
              res.status,
              res.statusText
            ) );
          }
        },
      } );
    } ),
    file: inputStates => new Promise( (
      resolve, reject
    ) => {
      this.saveHandlers
        .useFileReader( inputStates.fileVal )
        .then( resolve )
        .catch( reject );
    } ),
    copy: inputStates => new Promise( (
      resolve, reject
    ) => {
      const val = inputStates.copyVal;
      const pointers = GM_getValue( 'pointers' );

      if ( pointers.hasOwnProperty( val ) ) {
        const { id } = this.state.selectedCourse;

        deleteVal( id );
        pointers[ id ] = pointers[ val ];
        GM_setValue(
          'pointers',
          pointers
        );
        resolve();
      }
      else {
        reject( errors.invalidSelector );
      }
    } ),

    useFileReader: file => new Promise( (
      resolve, reject
    ) => {
      const fr = new FileReader();

      fr.onload = () => {
        const img = document.createElement( 'img' );

        img.onerror = () => reject( errors.error );
        img.onload = () => {
          const { id } = this.state.selectedCourse;
          const pointers = GM_getValue( 'pointers' );
          const uuid = generateUUIDv4();

          deleteVal( id );

          // update "values" first because it needs to be ready
          // by the time GM_addValueChangeListener fires
          const values = GM_getValue( 'values' );
          const { mediaType, isBase64, rawByteString } = fr.result.match( /^data:(?<mediaType>[\w+/]+);(?<isBase64>base64,)?(?<rawByteString>.+)$/ ).groups;
          const obj = { mediaType };

          if ( mediaType === 'image/svg+xml' ) {
            const rawXML = decodeURI( isBase64
              ? atob( rawByteString )
              : rawByteString );

            obj.rawXML = rawXML;
          }
          else {
            obj.rawByteString = isBase64
              ? rawByteString
              : btoa( decodeURI( rawByteString ) );
          }

          values[ uuid ] = obj;

          GM_setValue(
            'values',
            values
          );

          pointers[ id ] = uuid;
          GM_setValue(
            'pointers',
            pointers
          );

          resolve();
        };

        img.src = fr.result;
      };
      fr.onerror = () => reject( errors.error );
      fr.readAsDataURL( file );
    } ),
  };

  handleSave = () => {
    const { inputStates, selectedCourse } = this.state;

    if ( notNullOrUndef( selectedCourse ) ) {
      const type = inputStates.current;

      if ( notNullOrUndef( type ) ) {
        this.saveHandlers[ type ]( inputStates )
          .then( () => {
            const { id } = this.state.selectedCourse;

            this.setState( state => {
              const courses = [ ...state.courses ];

              for ( let i = 0; i < courses.length; i++ ) {
                if ( courses[ i ].id === id ) {
                  const iconObj = getDataURI( id );

                  if ( ( courses[ i ].isXML = iconObj.isXML ) ) {
                    courses[ i ].rawXML = iconObj.rawXML;
                  }
                  else {
                    const { mediaType, rawByteString } = iconObj;

                    courses[
                      i
                    ].dataURI = `data:${ mediaType };base64,${ rawByteString }`;
                  }

                  break;
                }
              }

              return {
                courses,
              };
            } );

            const refs = Object.values( this.inputRefs );

            for ( let i = 0; i < refs.length; i++ ) {
              refs[ i ].value = null;
            }

            this.setState( {
              inputStates: {
                urlVal: '',
                fileVal: null,
                copyVal: null,

                current: null,
              },
              selectedCourse: null,
            } );
          } )
          .catch( err => {
            this.setState( { notificationString: err.message } );
          } );
      }
      else {
        this.setState( { notificationString: "You haven't submitted an icon" } );
      }
    }
    else {
      this.setState( { notificationString: "You haven't selected a course" } );
    }
  };

  handleNotificationClick = ( { target } ) => {
    const svg = target.closest( 'svg' );

    if (
      notNullOrUndef( svg )
      || target.classList.contains( 'outer-notification' )
    ) {
      this.setState( {
        notificationString: null,
      } );
    }
  };

  // mutates the given obj because they are passed by reference
  inputHandlers = {
    file: (
      target, obj
    ) => {
      const file = target.files[ 0 ];

      obj.fileVal = file;
      obj.current = notNullOrUndef( file )
        ? 'file'
        : null;
    },
    url: (
      target, obj
    ) => {
      const url = target.value.trim();

      obj.urlVal = url;
      obj.current = url === ''
        ? null
        : 'url';
    },
    copy: (
      target, obj
    ) => {
      const selected = target.value;

      [ obj.copyVal, obj.current ]
        = selected === 'null'
          ? [ null, null ]
          : [ selected, 'copy' ];
    },
  };

  handleMainInput = e => {
    const { target } = e;

    this.setState( state => {
      const inputStates = {
        ...state.inputStates,
      };

      const type = target.dataset.inputType;

      this.inputHandlers[ type ](
        target,
        inputStates
      );

      return { inputStates };
    } );
  };

  componentDidMount() {
    settingsPageSetState = this.setState.bind( this );

    getCourses(
      false,
      settingsPageSetState
    ).then( coursesObj => {
      const courses = Object.entries( coursesObj ).map( ( [ id, fullname ] ) => {
        const dataURIObj = getDataURI( id );
        let dataURI;
        let rawXML;
        let isXML;

        if ( typeof dataURIObj === 'object' ) {
          ( { isXML } = dataURIObj );

          if ( isXML ) {
            ( { rawXML } = dataURIObj );
          }
          else {
            const { mediaType, rawByteString } = dataURIObj;

            dataURI = `data:${ mediaType };base64,${ rawByteString }`;
          }
        }

        return {
          id,
          name: fullname.trim(),
          dataURI,
          isXML,
          rawXML,
        };
      } );

      courses.sort( (
        a, b
      ) => {
        const aText = a.name.toLowerCase();
        const bText = b.name.toLowerCase();

        return aText < bText
          ? -1
          : aText > bText
            ? 1
            : 0;
      } );

      this.setState( { courses } );
    } );
  }
}

const Sidebar = ( { blur, courses, handleClick } ) => <div data-blur={blur} class="outer-sidebar" onClick={handleClick}>
  <div class="sidebar">
    {courses?.map( ( { id, dataURI, name, isXML, rawXML } ) => <div class="row" data-id={id} key={id}>
      {typeof isXML === 'boolean'
            && <>
              {isXML
                ? <span class="icon">{html( [ rawXML ] )}</span>
                : <img class="icon" src={dataURI} />
              }
              <SvgX type="del-icon" />
            </>
      }
      <span>{name}</span>
    </div> )}
  </div>
</div>;
class Notification extends Component {
  render = ( { handleClick, notificationString } ) => <div onClick={handleClick} class="outer-notification">
    <div class="inner-notification">
      <SvgX type="close" />
      <div class="notification-string">{notificationString}</div>
    </div>
  </div>
  ;

  componentDidMount() {
    scroll( {
      top: 0,
      left: 0,
      behavior: 'smooth',
    } );
  }
}

const SvgX = props => <svg
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  data-svg-type={props.type}
  class="svg-icon svg-icon-x"
  viewBox="0 0 24 24"
  onClick={props.handleClick}
>
  <path d="M24 0L0 24M0 0l24 24" />
</svg>;
class Main extends Component {
  inputs = {};

  render = ( {
    selectedCourse,
    courses,
    inputStates,
    blur,
    handleInput,
    inputRefs,
    handleSave,
    loggedOut,
  } ) => {
    const dataURIObj = getDataURI( selectedCourse?.id );
    let dataURI;
    let isXML;
    let rawXML;

    if ( typeof dataURIObj === 'object' ) {
      ( { isXML } = dataURIObj );

      if ( isXML ) {
        ( { rawXML } = dataURIObj );
      }
      else {
        const { mediaType, rawByteString } = dataURIObj;

        dataURI = `data:${ mediaType };base64,${ rawByteString }`;
      }
    }

    const name = selectedCourse?.name;
    const id = selectedCourse?.id;
    const { fileVal } = inputStates;

    return (
      <div class="outer-main" data-blur={blur}>
        <div class="main" onInput={handleInput}>
          {loggedOut
            ? <div class="replace-flex-input">
              <h2>Login</h2>
              <input
                placeholder="Username"
                ref={e => {
                  this.inputs.username = e;
                }}
              />
              <input
                placeholder="Password"
                ref={e => {
                  this.inputs.password = e;
                }}
                type="password"
              />
              <button class="btn-save" onClick={this.handleLoggedOutBtnClick}>
                  Login
              </button>
            </div>

            : <>
              <h2>Modify existing or add an icon</h2>
              <div>
                {dataURI
                  && ( isXML
                    ? html( [ rawXML ] )
                    : <img src={dataURI} class="icon" /> )}
                <span>{name ?? 'Select course on left'}</span>
              </div>

              <h3>Upload image from URL</h3>
              <input
                type="url"
                placeholder="Image url"
                URL
                data-input-type="url"
                ref={e => {
                  inputRefs.url = e;
                }}
                disabled={
                  inputStates.current !== null && inputStates.current !== 'url'
                }
              />

              <h3>Upload image from file</h3>
              <input
                data-input-type="file"
                type="file"
                hidden
                ref={e => {
                  inputRefs.file = e;
                }}
              />
              <button
                disabled={
                  inputStates.current !== null && inputStates.current !== 'file'
                }
                onClick={() => {
                  inputRefs.file.click();
                }}
              >
                {notNullOrUndef( fileVal )
                  ? fileVal.name
                  : 'Upload file'}
                {notNullOrUndef( fileVal )
                  && <SvgX type="clear" handleClick={this.clearFile} />
                }
              </button>

              <h3>Copy image from other course</h3>
              <select
                disabled={
                  inputStates.current !== null && inputStates.current !== 'copy'
                }
                ref={e => {
                  inputRefs.copy = e;
                }}
                data-input-type="copy"
              >
                <option value="null" defaultValue>
                  Select course to copy icon from
                </option>
                {courses?.map( ( { id: curId, name: curName, dataURI, rawXML } ) => ( dataURI || rawXML )
                      && <option key={id} value={curId} disabled={curId === id}>
                        {curName}
                      </option> )}
              </select>

              <button onClick={handleSave} class="btn-save">
                Save
              </button>
            </>
          }
        </div>
      </div>
    );
  };

  handleLoggedOutBtnClick = () => {
    const username = this.inputs.username.value.trim();
    const password = this.inputs.password.value;

    if ( username && password ) {
      this.props.loggedOutCallback( { username, password } );
    }
  };

  clearFile = e => {
    const fileInput = this.props.inputRefs.file;

    if ( fileInput.files.length > 0 ) {
      fileInput.value = null;
      this.props.handleInput( { target: fileInput } );
    }
    e.stopPropagation();
  };
}

const getSidebar = context => context.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' )
  ?? context.getElementById( 'label_3_21' )?.closest( 'ul[role="group"]' );

const notNullOrUndef = val => val !== null && val !== undefined;
const isNullOrUndef = val => val === null || val === undefined;
const generateUUIDv4 = a => a
  ? ( a ^ ( ( Math.random() * 16 ) >> ( a / 4 ) ) ).toString( 16 )
  : ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace(
    /[018]/g,
    generateUUIDv4
  );

const getDataURI = id => {
  if ( isNullOrUndef( id ) ) {
    return undefined;
  }
  const pointers = GM_getValue( 'pointers' );

  if ( isNullOrUndef( pointers ) ) {
    GM_setValue(
      'values',
      {}
    );
    GM_setValue(
      'pointers',
      {}
    );

    return undefined;
  }
  const pointerId = pointers[ id ];

  if ( isNullOrUndef( pointerId ) ) {
    return undefined;
  }

  const obj = GM_getValue( 'values' )[ pointerId ];

  if ( obj.hasOwnProperty( 'rawXML' ) ) {
    return { rawXML: obj.rawXML, isXML: true };
  }
  return { ...obj, isXML: false };
};

const deleteVal = id => {
  const pointers = GM_getValue( 'pointers' );
  const values = GM_getValue( 'values' );
  const uuid = pointers[ id ];

  if ( notNullOrUndef( uuid ) ) {
    delete pointers[ id ];

    const shouldNotDelete = Object.values( pointers ).includes( uuid );

    if ( shouldNotDelete === false ) {
      delete values[ uuid ];
      GM_setValue(
        'values',
        values
      );
    }
    GM_setValue(
      'pointers',
      pointers
    );
  }
};

if ( !( /^\/cleanmoodle/iu ).test( location.pathname ) ) {
  const functionToRun = isFrontpage
    ? runOnceOnFrontPage
    : initSettingspage;

  document.readyState === 'complete'
    ? functionToRun()
    : addEventListener(
      'DOMContentLoaded',
      functionToRun,
      { once: true }
    );
}
