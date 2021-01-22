// ==UserScript==
// @name         Clean Moodle with Preact
// @version      2021.01.22a
// @author       lusc
// @include      *://moodle.ksasz.ch/*
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Clean%20Moodle/Clean%20Moodle.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @run-at       document-start
// ==/UserScript==

import { getCourses } from '../shared/moodle-functions';
import settingsPageCss from './settingspage.scss';

import { render, Component, Fragment, h } from 'preact';

if ( location.protocol !== 'https:' ) {
  location.protocol = 'https:';
}

const isFrontpage = !( /^\/cleanmoodlepreact/iu ).test( location.pathname );

const runOnceOnFrontpage = () => {
  const sidebar = getSidebar( document );

  GM_registerMenuCommand(
    'Open settings',
    () => {
      open( 'https://moodle.ksasz.ch/cleanMoodlePreact/' );
    }
  );

  initFrontPage();
  if ( isNullOrUndef( sidebar ) ) {
    return;
  }

  GM_addValueChangeListener(
    'replace',
    refresh
  );
  GM_addValueChangeListener(
    'remove',
    refresh
  );

  addEventListener(
    'cleanMoodleReact',
    initFrontPage
  );

  const p = sidebar.previousSibling;
  const span = document.createElement( 'span' );
  p.append( span );
  render(
    <SvgSettingsGear />,
    span
  );
};

const initFrontPage = () => {
  const sidebar = getSidebar( document );

  if ( isNullOrUndef( sidebar ) ) {
    return;
  }

  const replaceObj = GM_getValue( 'replace' );

  if ( typeof replaceObj === 'object' ) {
    const replaceEntries = Object.entries( replaceObj );
    for ( const item of replaceEntries ) {
      replace(
        ...item,
        sidebar
      );
    }
  }
  else {
    GM_setValue(
      'replace',
      {}
    );
  }

  const removeArr = GM_getValue( 'remove' );
  if ( Array.isArray( removeArr ) ) {
    for ( const id of removeArr ) {
      remove(
        id,
        sidebar
      );
    }
  }
  else {
    GM_setValue(
      'remove',
      []
    );
  }

  sort( sidebar );
};

const SvgSettingsGear = () => <a
  href="/cleanMoodlePreact/"
  target="_blank"
  rel="noreferrer noopener"
  onClick={e => {
    e.stopPropagation();
  }}
>
  <svg
    style={{ marginLeft: '0.2em' }}
    fill="currentColor"
    class="icon svg-icon-gear"
    viewBox="0 0 16 16"
  >
    <path d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z" />
  </svg>
</a>;
const replace = (
  id, newVal, sidebar
) => {
  const anchor = getElem(
    id,
    sidebar
  );

  if ( isNullOrUndef( anchor ) ) {
    testForInexistantCourse( id );
  }
  else if ( anchor.childElementCount === 0 ) {
    anchor.textContent = newVal;
  }
  else {
    // because custom icons can use a span with an svg in it
    // so we need to be more specific about which span
    anchor.querySelector( 'span.item-content-wrap' ).textContent = newVal;
  }
};

const resetReplaced = (
  id, sidebar
) => {
  const anchor = getElem(
    id,
    sidebar
  );

  if ( isNullOrUndef( anchor ) ) {
    testForInexistantCourse( id );
  }
  else {
    const text = anchor.title;

    if ( anchor.childElementCount === 0 ) {
      anchor.textContent = text;
    }
    else {
      // because custom icons can use a span with an svg in it
      // so we need to be more specific about which span
      anchor.querySelector( 'span.item-content-wrap' ).textContent = text;
    }
  }
};

const remove = (
  id, sidebar
) => {
  const anchor = getElem(
    id,
    sidebar
  );

  if ( isNullOrUndef( anchor ) ) {
    testForInexistantCourse( id );
  }
  else {
    const li = anchor.closest( 'li.type_course' );
    if ( !li.classList.contains( 'contains_branch' ) ) {
      li.remove();
    }
  }
};

const sort = sidebar => {
  const children = [ ...sidebar.querySelectorAll( ':scope > li.type_course' ) ];

  quickSort(
    children,
    (
      a, b
    ) => {
      const aText = a.firstElementChild.textContent.toLowerCase();
      const bText = b.firstElementChild.textContent.toLowerCase();
      return aText < bText
        ? -1
        : aText > bText
          ? 1
          : 0;
    }
  );
  sidebar.prepend( ...children );
};

const quickSort = ( () => {
  const sortingUsingPivot = (
    arr, fn, left, right
  ) => {
    const pivot = arr[ ( right + left ) >>> 1 ];
    let l = left;
    let r = right;

    while ( l <= r ) {
      while ( fn(
        arr[ l ],
        pivot
      ) === -1 ) {
        l++;
      }

      while ( fn(
        arr[ r ],
        pivot
      ) === 1 ) {
        r--;
      }

      if ( l <= r ) {
        swap(
          arr,
          l,
          r
        );
        l++;
        r--;
      }
    }

    return l;
  };

  const swap = (
    arr, l, r
  ) => {
    [ arr[ l ], arr[ r ] ] = [ arr[ r ], arr[ l ] ];
  };

  return (
    arr, fn, left = 0, right = arr.length - 1
  ) => {
    let index;

    if ( arr.length > 1 ) {
      index = sortingUsingPivot(
        arr,
        fn,
        left,
        right
      );

      if ( left < index - 1 ) {
        quickSort(
          arr,
          fn,
          left,
          index - 1
        );
      }

      if ( index < right ) {
        quickSort(
          arr,
          fn,
          index,
          right
        );
      }
    }

    return arr;
  };
} )();

const testDiff = (
  oldVal, newVal
) => {
  if ( Array.isArray( oldVal ) ) {
    if ( Array.isArray( newVal ) ) {
      const addedOrChanged = newVal.filter( cur => oldVal.includes( cur ) === false );
      const removed = oldVal.filter( cur => newVal.includes( cur ) === false );
      return { addedOrChanged, removed };
    }
    location.reload();
  }
  const oldArr = Object.keys( oldVal );
  const newArr = Object.keys( newVal );
  const addedOrChanged = newArr.filter( id => oldArr.includes( id ) === false || oldVal[ id ] !== newVal[ id ] );
  const removed = oldArr.filter( id => newArr.includes( id ) === false );
  return { addedOrChanged, removed };
};

const refresh = ( () => {
  let sidebar;

  return (
    name, oldValue, newValue, remote
  ) => {
    if ( remote === true ) {
      if ( !sidebar && !( sidebar = getSidebar( document ) ) ) {
        return;
      }

      const { removed: removedVals, addedOrChanged } = testDiff(
        oldValue,
        newValue
      );

      if ( name === 'replace' ) {
        for ( const item of removedVals ) {
          resetReplaced(
            item,
            sidebar
          );
        }

        for ( const item of addedOrChanged ) {
          replace(
            item,
            newValue[ item ],
            sidebar
          );
        }
        sort( sidebar );
        // adding anchors leavers the sidebar potentially (slightly) unsorted
      }
      else if ( name === 'remove' ) {
        for ( const item of addedOrChanged ) {
          remove(
            item,
            sidebar
          );
        }
        // removing anchors leaves the sidebar still sorted

        if ( removedVals.length > 0 ) {
          getCourses(
            false,
            settingsPageSetState
          ).then( coursesObj => {
            for ( const id of removedVals ) {
              const fullname = coursesObj[ id ];

              if ( !getElem(
                id,
                sidebar
              ) ) {
                const li = document.createElement( 'li' );
                li.className = 'type_course depth_3 item_with_icon';
                li.tabIndex = -1;
                sidebar.prepend( li );

                render(
                  <p
                    class="tree_item hasicon"
                    role="treeitem"
                    id={`expandable_branch_20_${ id }`}
                    tabindex="-1"
                    aria-selected="false"
                  >
                    <a
                      tabindex="-1"
                      title={fullname}
                      href={`https://moodle.ksasz.ch/course/view.php?id=${ id }`}
                    >
                      <i
                        class="icon fa fa-graduation-cap fa-fw navicon"
                        aria-hidden="true"
                        tabindex="-1"
                      />
                      <span class="item-content-wrap" tabindex="-1">
                        {fullname}
                      </span>
                    </a>
                  </p>,
                  li
                );
              }
            }

            sort( sidebar );

            dispatchEvent( new Event( 'customIconsPreact' ) );
          } );
        }
      }
    }
  };
} )();

const getElem = (
  id, sidebar
) => sidebar.querySelector( `a[href="https://moodle.ksasz.ch/course/view.php?id=${ id }"]` );

const testForInexistantCourse = id => {
  getCourses(
    false,
    settingsPageSetState
  ).then( courses => {
    if ( !courses.hasOwnProperty( id ) ) {
      removeElementFromStorage( id );
      alert( `You appear to not be in the course with the id "${ id }" anymore.\nThe course will not be checked for anymore` );
    }
  } );
};

const initSettingsPage = () => {
  while ( document.body.lastChild ) {
    document.body.lastChild.remove();
  }

  history.replaceState(
    {},
    '',
    '/cleanMoodlePreact/'
  );

  render(
    <SettingsPage />,
    document.body
  );

  while ( document.head.lastChild ) {
    document.head.lastChild.remove();
  }

  document.title = 'Clean Moodle Preact Setup';

  const link = document.createElement( 'link' );
  link.rel = 'shortcut icon';
  link.href = '/theme/image.php/classic/theme/1588340020/favicon';
  document.head.append( link );

  GM_addStyle( settingsPageCss );

  /* const style = document.createElement( 'link' );
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = 'http://localhost:5000/Clean%20Moodle/settingspage.css';
  document.head.append( style ); */
};

const SvgCheck = () => <svg
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  class="icon svg-icon-check"
  viewBox="0 0 24 24"
>
  <path d="M5 12l5 5L20 7" />
</svg>;
const SvgX = () => <svg
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  class="icon svg-icon-x"
  viewBox="0 0 24 24"
>
  <path d="M18 6L6 18M6 6l12 12" />
</svg>;
const SvgArrowBack = () => <svg
  fill="none"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  class="icon svg-icon-arrow-back"
  viewBox="0 0 24 24"
>
  <path d="M9 11l-4 4 4 4m-4-4h11a4 4 0 000-8h-1" />
</svg>;
const Sidebar = ( { handleClick, courses } ) => <div class="outerSidebar">
  <div class="sidebar">
    {courses.map( ( { id, name, isReplaced, isRemoved } ) => <div
      key={id}
      class={`row${ isRemoved
        ? ' removed'
        : '' }`}
      onClick={e => {
        handleClick(
          e,
          id
        );
      }}
    >
      <span>
        {isRemoved
          ? <SvgX />
          : <SvgCheck />}
        {isReplaced === false
          ? name
          : isReplaced}
        {isReplaced !== false && <SvgArrowBack />}
      </span>
    </div> )}
  </div>
</div>;
class Main extends Component {
  inputs = {};

  render = ( {
    selected,
    handleInput,
    handleKeyDown,
    handleBtnClick,
    inputRef,
    loggedOut,
  } ) => {
    const { replacedText } = selected;
    return (
      <div class="outerMain">
        <div class="main">
          {loggedOut
            ? <div class="replace-flex-input">
              <h5>Login</h5>
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
              <div class="section-title">Rename course</div>
              <div class="replace-flex-inputs">
                <div>
                  {typeof selected.text === 'string'
                    ? `Selected: ${ selected.text }`
                    : 'Select course to the left'}
                </div>

                <input
                  placeholder={
                    notNullOrUndef( replacedText )
                      ? `Reset text to ${ selected.text }`
                      : 'Select course to the left'
                  }
                  class="replace-input"
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  value={replacedText}
                  disabled={isNullOrUndef( selected.id )}
                  ref={inputRef}
                />
                <button
                  disabled={isNullOrUndef( selected.id )}
                  onClick={handleBtnClick}
                  class="btn-save"
                >
                  Save
                </button>
              </div>
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
}

let settingsPageSetState;

class SettingsPage extends Component {
  state = {
    courses: [],

    selected: {},

    loggedOut: false,
    loggedOutCallback: null,
  };

  inputRef = a => {
    this.input = a;
  };

  render = (
    _props, { selected, courses, loggedOut }
  ) => <div class="container">
    <Sidebar handleClick={this.handleSidebarClick} courses={courses} />
    <Main
      inputRef={this.inputRef}
      selected={selected}
      handleBtnClick={this.handleBtnClick}
      handleInput={this.handleInput}
      handleKeyDown={this.handleKeyDown}
      loggedOut={loggedOut}
      loggedOutCallback={this.loggedOutCallbackHandler}
    />
  </div>
  ;

  loggedOutCallbackHandler = vals => {
    this.state.loggedOutCallback( vals );
    this.setState( { loggedOut: false, loggedOutCallback: null } );
  };

  handleInput = e => {
    const { target } = e;

    if ( notNullOrUndef( this.state.selected.id ) ) {
      this.setState( state => {
        const { selected } = state;

        selected.replacedText = target.value;

        return {
          selected,
        };
      } );
    }
  };

  handleKeyDown = e => {
    if ( e.key === 'Enter' ) {
      this.handleBtnClick();
    }
  };

  handleBtnClick = () => {
    const { replacedText, id, text } = this.state.selected;

    setReplace(
      id,
      replacedText,
      text
    );

    this.updateCourses( id );

    this.input.value = '';

    this.setState( {
      selected: {},
    } );
  };

  updateCourses = id => {
    this.setState( state => {
      const { courses } = state;
      for ( let i = 0; i < courses.length; ++i ) {
        if ( courses[ i ].id === id ) {
          courses[ i ].isRemoved = courseIsRemoved( id );
          courses[ i ].isReplaced = courseIsReplaced( id );
          break;
        }
      }

      sortCoursesArr( courses );

      return { courses };
    } );
  };

  clearSelectedIfEqualId = id => {
    this.setState( state => {
      const selectedId = state.selected.id;
      if ( selectedId === id ) {
        this.input.value = '';
        return {
          selected: {},
        };
      }
      return {};
    } );
  };

  handleSidebarClick = (
    e, id
  ) => {
    const { target } = e;
    const svg = target.closest( 'svg' );
    const row = target.closest( '.row' );
    if ( row ) {
      if ( svg ) {
        const svgCl = svg.classList;
        if ( svgCl.contains( 'svg-icon-check' ) || svgCl.contains( 'svg-icon-x' ) ) {
          const isRemoved = courseIsRemoved( id );
          setRemove(
            id,
            !isRemoved // toggle between removed and not
          );
        }
        else if ( svgCl.contains( 'svg-icon-arrow-back' ) ) {
          setReplace( id );
        }

        this.clearSelectedIfEqualId( id );
        this.updateCourses( id );
      }
      else {
        const { courses } = this.state;
        let text;
        for ( let i = 0; i < courses.length; ++i ) {
          if ( courses[ i ].id === id ) {
            text = courses[ i ].name;
            break;
          }
        }

        const replacedText = courseIsReplaced( id ) || text;

        this.setState(
          {
            selected: {
              text,
              id,
              replacedText,
            },
          },
          () => {
            const { input } = this;
            if ( input ) {
              input.focus();
              input.scrollIntoView( {
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
              } );
            }
          }
        );

        removeElementFromStorage(
          id,
          { replace: false }
        );
        this.updateCourses( id );
      }
    }
  };

  componentDidMount = () => {
    settingsPageSetState = state => {
      this.setState( state );
    };

    getCourses(
      false,
      settingsPageSetState
    ).then( coursesObj => {
      const courses = Object.entries( coursesObj ).map( ( [ id, fullname ] ) => ( {
        id,
        name: fullname,
        isReplaced: courseIsReplaced( id ),
        isRemoved: courseIsRemoved( id ),
      } ) );
      sortCoursesArr( courses );

      this.setState( { courses } );
    } );
  };
}

const courseIsRemoved = id => GM_getValue( 'remove' )?.includes( id ) ?? false;

const courseIsReplaced = id => {
  const replaceObj = GM_getValue( 'replace' ) ?? {};
  return typeof replaceObj[ id ] === 'string' && replaceObj[ id ];
};

const removeElementFromStorage = (
  id,
  {
    replace: updateReplaceStorage = true,
    remove: updateRemoveStorage = true,
  } = {}
) => {
  const replaceObj = GM_getValue( 'replace' ) ?? {};
  const removeArr = ( GM_getValue( 'remove' ) ?? [] ).filter( e => e !== id );

  delete replaceObj[ id ];

  if ( updateReplaceStorage ) {
    GM_setValue(
      'replace',
      replaceObj
    );
  }
  if ( updateRemoveStorage ) {
    GM_setValue(
      'remove',
      removeArr
    );
  }
  return {
    remove: removeArr,
    replace: replaceObj,
  };
};

const setRemove = (
  id, addToRemovers
) => {
  const removeArr = removeElementFromStorage(
    id,
    { remove: !addToRemovers }
    /* if it should be added to the removers
      and for whatever reason already in the removers
      removeElementFromStorage will remove it from that array
      but not update the storage, which this function will,
      avoids unnecessary updates to refresh() */
  ).remove;

  if ( addToRemovers ) {
    removeArr.push( id );
    sortRemoveArr( removeArr );
    GM_setValue(
      'remove',
      removeArr
    );
  }
};

const sortRemoveArr = arr => arr.sort( (
  a, b
) => a - b );

const sortCoursesArr = courses => {
  quickSort(
    courses,
    (
      a, b
    ) => {
      const aText = ( typeof a.isReplaced === 'string'
        ? a.isReplaced
        : a.name
      ).toLowerCase();
      const bText = ( typeof b.isReplaced === 'string'
        ? b.isReplaced
        : b.name
      ).toLowerCase();
      return aText < bText
        ? -1
        : aText > bText
          ? 1
          : 0;
    }
  );
  return courses;
};

const setReplace = (
  id, newVal, defaultVal
) => {
  const replaceObj = removeElementFromStorage(
    id,
    {
      replace: false,
    }
  ).replace;

  if ( typeof newVal === 'string' && typeof defaultVal === 'string' ) {
    const trimNewVal = newVal.trim();
    const trimDefaultVal = defaultVal.trim();
    if ( trimNewVal !== '' && trimNewVal !== trimDefaultVal ) {
      replaceObj[ id ] = trimNewVal;
    }
  }
  GM_setValue(
    'replace',
    replaceObj
  );
};

const isNullOrUndef = val => val === undefined || val === null;

const notNullOrUndef = val => val !== undefined && val !== null;

const getSidebar = context => context.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' )
  ?? context.getElementById( 'label_3_21' )?.closest( 'ul[role="group"]' );

{
  // Because I changed the removers from an object to an array
  const removeVals = GM_getValue( 'remove' );
  if ( typeof removeVals === 'object' && !Array.isArray( removeVals ) ) {
    GM_setValue(
      'remove',
      sortRemoveArr( Object.keys( removeVals ) )
    );
  }
}

if ( !( /^\/customicons/iu ).test( location.pathname ) ) {
  const functionToRun = isFrontpage
    ? runOnceOnFrontpage
    : initSettingsPage;

  document.readyState === 'complete'
    ? functionToRun()
    : addEventListener(
      'DOMContentLoaded',
      functionToRun,
      { once: true }
    );
}
