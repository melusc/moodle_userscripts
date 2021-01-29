import { render, h, Component, Fragment, createRef } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { html } from 'htm/preact';
import style from './style.scss';
import { getCourses } from '../shared/moodle-functions';
import { deleteVal } from './shared';

const FILE_CONSTANT = 'FILE';
const COPY_CONSTANT = 'COPY';
const URL_CONSTANT = 'URL';
const errors = {
  error: Error( 'An error occured' ),
  timeout: Error( 'Request timed out' ),
  abort: Error( 'Request was aborted' ),
  invalidSelector: Error( 'Invalid option selected' ),
  statusCode: (
    status, statusText
  ) => new Error( `Error ${ status }: ${ statusText }` ),
};

export const setupSettingsPage = () => {
  if ( location.protocol !== 'https:' ) {
    location.protocol = 'https:';
  }

  const { body, head } = document;
  while ( body.lastChild ) {
    body.lastChild.remove();
  }
  while ( head.lastChild ) {
    head.lastChild.remove();
  }

  const icon = document.createElement( 'link' );
  icon.rel = 'shortcut icon';
  icon.href = '/theme/image.php/classic/theme/1606210545/favicon';
  document.head.append( icon );

  document.title = 'Custom Icons Setup';

  history.replaceState(
    {},
    '',
    '/customIconsPreact'
  );

  GM_addStyle( style );

  render(
    <SettingsPage />,
    body
  );
};

class SettingsPage extends Component {
  state = {
    courses: [],
    selected: { isSelected: false },
    notificationString: null,

    inputVals: {
      current: false,
    },
  };

  form = createRef();

  render = (
    _props,
    {
      courses,
      selected,
      inputVals: { current, val },
      loggedOut,
      loggedOutCallback,
      notificationString,
    }
  ) => <>
    <div class={`container${ notificationString
      ? ' blur'
      : '' }`}>
      <Sidebar
        courses={courses}
        rowClick={this.rowClick}
        delIcon={this.delIcon}
      />
      <Main
        courses={courses}
        selected={selected}
        handleInput={this.handleMainInput}
        currentInput={current}
        currentInputVal={val}
        loggedOut={loggedOut}
        loggedOutCallback={loggedOutCallback}
        handleSave={this.handleSave}
        formRef={this.form}
        reset={this.reset}
      />
    </div>
    {notificationString
          && <Notification
            handleClick={this.closeNotification}
            notificationString={notificationString}
          />
    }
  </>
    ;

  closeNotification = (
    e, testForClass
  ) => {
    e.stopImmediatePropagation();
    if ( !( testForClass && e.target.classList.contains( 'outer-notification' ) ) ) {
      this.setState( { notificationString: null } );
    }
  };

  handleSave = e => {
    e.preventDefault();

    const { isSelected } = this.state.selected;
    if ( isSelected ) {
      const type = this.state.inputVals.current;

      if ( type ) {
        const { val } = this.state.inputVals;
        type === URL_CONSTANT
          ? this.saveHandlers.saveByURL( val )
          : type === FILE_CONSTANT
            ? this.saveHandlers.saveWithFileHandler( val )
            : type === COPY_CONSTANT && this.saveHandlers.saveByCopy( val );
      }
      else {
        this.setState( { notificationString: "You haven't submitted an icon" } );
      }
    }
    else {
      this.setState( { notificationString: "You haven't selected a course" } );
    }
  };

  handleMainInput = (
    e, type
  ) => {
    const { target } = e;
    const { value } = target;
    this.setState( () => {
      const inputVals = { current: false };

      if ( type === URL_CONSTANT ) {
        inputVals.val = value;
        inputVals.current = value.trim() !== '' && URL_CONSTANT;
      }
      else if ( type === COPY_CONSTANT ) {
        inputVals.val = value;
        inputVals.current = value !== 'null' && COPY_CONSTANT;
      }
      else if ( type === FILE_CONSTANT ) {
        inputVals.val = target.files[ 0 ];
        inputVals.current = target.files?.length !== 0 && FILE_CONSTANT;
      }
      if ( !inputVals.current ) {
        return { inputVals: { current: false } };
      }
      return { inputVals };
    } );
  };

  rowClick = (
    e, item
  ) => {
    this.setState( { selected: { ...item, isSelected: true } } );
  };

  delIcon = (
    e, { courseId }
  ) => {
    e.stopImmediatePropagation();
    deleteVal( courseId );
    this.updateCourseById( courseId );
  };

  updateCourseById = id => {
    this.setState( ( { courses } ) => {
      for ( const course of courses ) {
        if ( course.courseId === id ) {
          course.iconVals = getIcon( id );

          break;
        }
      }

      return { courses };
    } );
  };

  componentDidMount = () => {
    this.updateCourses();
  };

  updateCourses = () => {
    getCourses(
      false,
      this.setState.bind( this )
    ).then( coursesObj => {
      const courses = Object.entries( coursesObj )
        .sort( (
          a, b
        ) => {
          const aText = a[ 1 ].toLowerCase();
          const bText = b[ 1 ].toLowerCase();

          return aText < bText
            ? -1
            : aText > bText
              ? 1
              : 0;
        } )
        .map( ( [ courseId, courseName ] ) => ( {
          courseId,
          courseName,
          iconVals: getIcon( courseId ),
        } ) );

      this.setState( { courses } );
    } );
  };

  reset = ( resetSelected = true ) => {
    this.form.current?.reset();
    const obj = {
      inputVals: { current: false },
      ...resetSelected && { selected: { isSelected: false } },
    };

    this.setState( obj );
  };

  saveHandlers = {
    saveByURL: val => {
      GM_xmlhttpRequest( {
        method: 'GET',
        url: val,
        timeout: 15000,
        responseType: 'blob',
        anonymous: true,
        onabort: () => {
          this.setState( { notificationString: errors.abort } );
        },
        onerror: () => {
          this.setState( { notificationString: errors.error } );
        },
        ontimeout: () => {
          this.setState( { notificationString: errors.timeout } );
        },
        onload: res => {
          if ( res.status === 200 ) {
            this.saveHandlers.saveWithFileHandler( res.response );
          }
          else {
            this.setState( {
              notificationString: errors.statusCode(
                res.status,
                res.statusText
              ),
            } );
          }
        },
      } );
    },

    saveWithFileHandler: blobLike => {
      const fr = new FileReader();

      fr.onload = () => {
        const img = new Image();
        img.onerror = () => {
          this.setState( { notificationString: errors.error } );
        };

        img.onload = () => {
          const id = this.state.selected.courseId;

          deleteVal( id );

          const pointers = GM_getValue( 'pointers' );
          const uuid = uuidv4();
          const values = GM_getValue( 'values' );

          const obj = { mediaType: blobLike.type };

          const { rawByteString } = fr.result.match( /^data:[\w+/]+;base64,(?<rawByteString>.+)$/ ).groups;
          if ( blobLike.type === 'image/svg+xml' ) {
            const rawXML = decodeURI( atob( rawByteString ) );

            obj.rawXML = rawXML;
          }
          else {
            obj.rawByteString = rawByteString;
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

          this.updateCourseById( id );
          this.reset();
        };

        img.src = fr.result;
      };
      fr.readAsDataURL( blobLike );
    },

    saveByCopy: val => {
      const { courseId } = this.state.selected;
      const pointers = GM_getValue( 'pointers' );
      pointers[ courseId ] = pointers[ val ];
      GM_setValue(
        'pointers',
        pointers
      );
      this.updateCourseById( courseId );
      this.reset();
    },
  };
}

const SvgX = ( { class: _class, ...props } ) => <svg
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  class={`svg-icon svg-icon-x${ _class
    ? ` ${ _class }`
    : '' }`}
  viewBox="0 0 24 24"
  {...props}
>
  <path d="M24 0L0 24M0 0l24 24" />
</svg>;
const Sidebar = ( { courses, ...rest } ) => <div class="outer-sidebar">
  <div class="sidebar">
    {courses.length === 0 && <div>Loading courses....</div>}
    {courses.map( item => <SidebarRow item={item} {...rest} /> )}
  </div>
</div>;
const SidebarRow = ( { item, rowClick, delIcon } ) => {
  const { courseName, iconVals } = item;

  return (
    <div
      class="row"
      onClick={e => {
        rowClick(
          e,
          item
        );
      }}
    >
      <Icon
        renderX={true}
        iconVals={iconVals}
        delIcon={e => {
          delIcon(
            e,
            item
          );
        }}
      />
      <span>{courseName}</span>
    </div>
  );
};
const Icon = ( {
  iconVals: { hasIcon, isXML, rawXML, dataURI },
  delIcon,
  renderX = false,
} ) => hasIcon
    && <>
      {isXML
        ? <span class="icon">{html( [ rawXML ] )}</span>
        : <img src={dataURI} class="icon" />
      }
      {renderX && <SvgX class="svg-del-icon" onClick={delIcon} />}
    </>;
const getIcon = id => {
  const courseUUID = GM_getValue( 'pointers' )[ id ];
  if ( courseUUID ) {
    const value = GM_getValue( 'values' )[ courseUUID ];

    if ( value ) {
      const returnObj = { isXML: 'rawXML' in value, hasIcon: true };
      if ( returnObj.isXML ) {
        returnObj.rawXML = value.rawXML;
      }

      const { mediaType, rawByteString } = value;

      returnObj.dataURI = `data:${ mediaType };base64,${ rawByteString }`;

      return returnObj;
    }
  }
  return { hasIcon: false };
};

const Main = ( {
  selected: { iconVals, courseName, isSelected, courseId },
  courses,
  handleInput,
  currentInput,
  currentInputVal,
  handleSave,
  loggedOut,
  loggedOutCallback,
  formRef,
  reset,
} ) => {
  const fileRef = useRef( null );
  const fileBtnClick = e => {
    e.preventDefault(); // because form
    fileRef.current?.click();
  };
  const resetFile = e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    reset();
  };
  const usernameRef = useRef( null );
  const passwordRef = useRef( null );

  const loggedOutCallbackValidator = () => {
    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value;

    if ( username && password ) {
      loggedOutCallback( { username, password } );
    }
  };

  return (
    <div class="outer-main">
      <div class="main">
        {loggedOut
          ? <div class="replace-flex-input">
            <h2>Login</h2>
            <input placeholder="Username" ref={usernameRef} />
            <input placeholder="Password" ref={passwordRef} type="password" />
            <button class="btn-save" onClick={loggedOutCallbackValidator}>
              Login
            </button>
          </div>

          : <form ref={formRef}>
            <h2>Change or add an icon</h2>
            <div>
              {isSelected
                ? <>
                  <Icon iconVals={iconVals} />
                  <span>{courseName}</span>
                </>
                : 'Select course to the left'
              }
            </div>
            <h3>Upload image from URL</h3>
            <input
              type="url"
              placeholder="Image url"
              disabled={currentInput && currentInput !== URL_CONSTANT}
              onInput={e => {
                handleInput(
                  e,
                  URL_CONSTANT
                );
              }}
            />
            <h3>Upload image from file</h3>
            <input
              type="file"
              hidden
              ref={fileRef}
              onInput={e => {
                handleInput(
                  e,
                  FILE_CONSTANT
                );
              }}
            />
            <button
              onClick={fileBtnClick}
              disabled={currentInput && currentInput !== FILE_CONSTANT}
            >
              {currentInput === FILE_CONSTANT
                ? <>
                  {currentInputVal.name}
                  <SvgX class="svg-clear" onClick={resetFile} />
                </>
                : 'Upload file'
              }
            </button>
            <h3>Copy image from other course</h3>
            <select
              disabled={currentInput && currentInput !== COPY_CONSTANT}
              onInput={e => {
                handleInput(
                  e,
                  COPY_CONSTANT
                );
              }}
            >
              <option selected value="null">
                Select course to copy icon from
              </option>
              {courses.map( ( {
                courseName,
                courseId: curCourseId,
                iconVals: { hasIcon },
              } ) => hasIcon
                  && ( !isSelected || courseId !== curCourseId )
                    && <option value={curCourseId}>{courseName}</option> )}
            </select>
            <button class="btn-save" onClick={handleSave}>
              Save
            </button>
          </form>
        }
      </div>
    </div>
  );
};

const Notification = ( { handleClick, notificationString } ) => {
  useEffect(
    () => {
      scroll( {
        top: 0,
        left: 0,
        behavior: 'smooth',
      } );
    },
    []
  );

  return (
    <div
      class="outer-notification"
      onClick={e => {
        handleClick(
          e,
          true
        );
      }}
    >
      <div class="inner-notification">
        <SvgX class="svg-close" onClick={handleClick} />
        <div class="notification-string">{notificationString}</div>
      </div>
    </div>
  );
};

/* https://stackoverflow.com/a/2117523 */
const uuidv4 = () => ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace(
  /[018]/g,
  c => (
    c
      ^ ( crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & ( 15 >> ( c / 4 ) ) )
  ).toString( 16 )
);
