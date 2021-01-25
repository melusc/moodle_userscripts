import { render, h, Component, Fragment, createRef } from 'preact';

import { getCourses } from '../shared/moodle-functions';
import { quickSort } from '../shared/general-functions';

import { removeElementFromStorage } from './shared';
import style from './settingspage.scss';

/**
 * Designed to run on the clean moodle settingspage
 * Sets up the settings by clearing the dom and rendering the settings
 *
 * @returns {void}
 */
export const setupSettingsPage = () => {
  const { head, body } = document;
  while ( head.lastChild ) {
    head.lastChild.remove();
  }
  while ( body.lastChild ) {
    body.lastChild.remove();
  }

  history.replaceState(
    {},
    '',
    '/cleanMoodlePreact'
  );

  document.title = 'Clean Moodle Setup';

  GM_addStyle( style );

  render(
    <SettingsPage />,
    body
  );

  const link = document.createElement( 'link' );
  link.rel = 'shortcut icon';
  link.href = '/theme/image.php/classic/theme/1588340020/favicon';
  document.head.append( link );
};

let settingsPageSetState;
class SettingsPage extends Component {
  state = {
    courses: [],
    selected: { isSelected: false },

    loggedOut: false,
    loggedOutCallback: null,
  };

  replaceInputRef = createRef();

  inputs = { username: createRef(), password: createRef() };

  render = (
    _props, { courses, selected }
  ) => <div class="container">
    <Sidebar
      courses={courses}
      handleClick={this.handleSidebarClick}
      toggleItem={this.toggleItem}
      resetItem={this.resetItem}
    />
    <Main
      selected={selected}
      replaceInputRef={this.replaceInputRef}
      handleSave={this.handleSave}
      loggedOut={this.state.loggedOut}
      loggedOutCallback={this.loggedOutCallbackHandler}
      loggedOutInputs={this.inputs}
    />
  </div>
  ;

  loggedOutCallbackHandler = () => {
    const username = this.inputs.username.current.value.trim();
    const password = this.inputs.password.current.value;

    if ( username && password ) {
      this.state.loggedOutCallback( { username, password } );
      this.setState( { loggedOut: false, loggedOutCallback: null } );
    }
  };

  componentDidMount = () => {
    settingsPageSetState = this.setState.bind( this );
    getCourses(
      false,
      settingsPageSetState
    ).then( coursesObj => {
      const courses = Object.entries( coursesObj ).map( ( [ courseId, courseName ] ) => {
        const isReplaced = checkIsCourseReplaced( courseId );

        // { courseName, courseId, isReplaced, replacedName, isRemoved }
        return {
          courseName,
          courseId,
          isReplaced: isReplaced !== false,
          replacedName: isReplaced, // only checks this if isReplaced is true, anyway
          isRemoved: checkIsCourseRemoved( courseId ),
        };
      } );

      sortCoursesArr( courses );

      this.setState( { courses } );
    } );
  };

  handleSave = e => {
    if ( e.type !== 'keydown' || e.key === 'Enter' ) {
      const input = this.replaceInputRef.current.value;

      const { courseId, courseName } = this.state.selected;

      setReplaced(
        courseId,
        input,
        courseName
      );

      this.setState( () => ( { selected: { isSelected: false } } ) );

      this.updateCourseById( courseId );
    }
  };

  toggleItem = (
    ev, { isRemoved, courseId }
  ) => {
    ev.stopImmediatePropagation();
    if ( isRemoved ) {
      removeElementFromStorage( courseId );
    }
    else {
      setRemoved( courseId );
    }

    this.updateCourseById( courseId );

    this.removeSelectedIfEqualId( courseId );
  };

  resetItem = (
    ev, item
  ) => {
    const { courseId } = item;
    ev.stopImmediatePropagation();
    this.removeSelectedIfEqualId( courseId );

    removeElementFromStorage( courseId );

    this.updateCourseById(
      courseId,
      course => {
        course.isReplaced = false;
        course.replacedName = false;
      }
    );
  };

  removeSelectedIfEqualId = id => {
    this.setState( ( { selected } ) => {
      if ( selected.courseId === id ) {
        return { selected: { isSelected: false } };
      }
      return {};
    } );
  };

  updateCourseById = id => {
    this.setState( ( { courses } ) => {
      for ( const course of courses ) {
        if ( course.courseId === id ) {
          course.isRemoved = checkIsCourseRemoved( id );
          const isReplaced = checkIsCourseReplaced( id );
          course.isReplaced = isReplaced !== false;
          course.replacedName = isReplaced;
          break;
        }
      }
      sortCoursesArr( courses );
      return { courses };
    } );
  };

  handleSidebarClick = (
    ev, item
  ) => {
    if ( item.isRemoved ) {
      removeElementFromStorage(
        item.courseId,
        { updateReplacers: false }
      );
      this.updateCourseById( item.courseId );
    }

    this.setState(
      { selected: { isSelected: true, ...item } },
      () => {
        const input = this.replaceInputRef.current;
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
  };
}

/**
 * Designed to sort the courses arr.
 * This function mutates the array
 * @param {Object[]} arr The courses
 * @return The sorted arr
 */
const sortCoursesArr = arr => quickSort(
  arr,
  (
    {
      courseName: courseNameA,
      isReplaced: isReplacedA,
      replacedName: replacedNameA,
    },
    {
      courseName: courseNameB,
      isReplaced: isReplacedB,
      replacedName: replacedNameB,
    }
  ) => {
    const lowerA = ( isReplacedA
      ? replacedNameA
      : courseNameA ).toLowerCase();
    const lowerB = ( isReplacedB
      ? replacedNameB
      : courseNameB ).toLowerCase();

    return lowerA < lowerB
      ? -1
      : lowerA > lowerB
        ? 1
        : 0;
  }
);

/**
 * Check if course is replaced
 * and if so return the replaced name
 * @param {string|number} id The id of the course
 * @returns {string|boolean} False if course is not replaced
 */
const checkIsCourseReplaced = id => {
  const replacers = GM_getValue( 'replace' ) ?? {};

  return typeof replacers[ id ] === 'string' && replacers[ id ];
};

/**
 * Check if course is removed
 * @param {string|number} id The course id
 * @returns {boolean} true if course is removed
 */
const checkIsCourseRemoved = id => ( GM_getValue( 'remove' ) ?? [] ).includes( id );

/**
 * Add item to removers
 * @param {number|string} id The course id
 * @returns {void}
 */
const setRemoved = id => {
  const { removers } = removeElementFromStorage(
    id,
    { updateRemovers: false }
  );
  removers.push( id );
  GM_setValue(
    'remove',
    removers
  );
};

/**
 * Add item to replacers
 * @param {string|number} id The course id
 * @param {string|null|undefined|number} _newVal
 * @param {string|null|undefined|number} _oldVal
 * @returns {void}
 */
const setReplaced = (
  id, _newVal, _oldVal
) => {
  const { replacers } = removeElementFromStorage(
    id,
    {
      updateReplacers: false,
    }
  );

  const newVal = ( _newVal ?? '' ).trim();
  const oldVal = ( _oldVal ?? '' ).trim();

  if ( newVal !== '' && newVal !== oldVal ) {
    replacers[ id ] = newVal;
  }

  GM_setValue(
    'replace',
    replacers
  );
};

const Sidebar = ( { courses, ...rest } ) => <div class="outer-sidebar">
  <div class="sidebar">
    {courses.map( course => <SidebarRow key={course.courseId} item={course} {...rest} /> )}
  </div>
</div>;
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
const SidebarRow = ( { item, handleClick, toggleItem, resetItem } ) => {
  const { courseName, isReplaced, replacedName, isRemoved } = item;
  return (
    <div
      class={`row${ isRemoved
        ? ' removed'
        : '' }`}
      onClick={e => {
        handleClick(
          e,
          item
        );
      }}
    >
      <span>
        <span
          onClick={e => {
            toggleItem(
              e,
              item
            );
          }}
        >
          {isRemoved
            ? <SvgX />
            : <SvgCheck />}
        </span>
        {isReplaced
          ? <>
            {replacedName}
            <span
              onClick={e => {
                resetItem(
                  e,
                  item
                );
              }}
            >
              <SvgArrowBack />
            </span>
          </>

          : courseName
        }
      </span>
    </div>
  );
};
class Main extends Component {
  render = ( {
    selected: { isSelected, courseName, isReplaced, replacedName },
    replaceInputRef,
    handleSave,
    loggedOut,
    loggedOutCallback,
    loggedOutInputs,
  } ) => <div class="outer-main">
    <div class="main">
      {loggedOut
        ? <>
          <div class="replace-flex-input">
            <h5>Login</h5>
            <input placeholder="Username" ref={loggedOutInputs.username} />
            <input
              placeholder="Password"
              ref={loggedOutInputs.password}
              type="password"
            />
            <button class="btn-save" onClick={loggedOutCallback}>
                Login
            </button>
          </div>
        </>
        : <>
          <div class="section-title">Rename course</div>
          <div class="replace-flex-inputs">
            <div>
              {isSelected
                ? `Selected: ${ courseName }`
                : 'Select course to the left'}
            </div>
            <input
              class="replace-input"
              placeholder="Select course to the left"
              disabled={!isSelected}
              ref={replaceInputRef}
              onKeydown={handleSave}
              value={
                isSelected
                  ? isReplaced === false
                    ? courseName
                    : replacedName
                  : null
              }
            />
            <button
              class="btn-save"
              disabled={!isSelected}
              onClick={handleSave}
            >
                Save
            </button>
          </div>
        </>
      }
    </div>
  </div>
  ;
}
