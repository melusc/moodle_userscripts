import { render, h, Component, Fragment, createRef } from 'preact';

import { getCourses } from '../shared/moodle-functions/index.js';
import { quickSort } from '../shared/general-functions.js';

import { removeElementFromStorage } from './shared.js';
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
  head.append( link );
};

class SettingsPage extends Component {
  state = {
    courses: [],
    loadingCourses: true,
    selected: { isSelected: false },

    loggedOut: false,
    loggedOutCallback: undefined,
  };

  replaceInputRef = createRef();

  inputs = { username: createRef(), password: createRef() };

  render = (
    _properties, { courses, selected, loggedOut, loadingCourses }
  ) => <div class="container">
    <Sidebar
      courses={courses}
      handleClick={this.handleSidebarClick}
      toggleItem={this.toggleItem}
      resetItem={this.resetItem}
      loadingCourses={loadingCourses}
    />
    <Main
      selected={selected}
      replaceInputRef={this.replaceInputRef}
      handleSave={this.handleSave}
      loggedOut={loggedOut}
      loggedOutCallback={this.loggedOutCallbackHandler}
      loggedOutInputs={this.inputs}
    />
  </div>
  ;

  loggedOutCallbackHandler = () => {
    const username = this.inputs.username.current.value.trim();
    const password = this.inputs.password.current.value;

    this.state.loggedOutCallback( { username, password } );
  };

  componentDidMount = () => {
    getCourses(
      false,
      this.setState.bind( this )
    ).then( coursesObject => {
      const courses = Object.entries( coursesObject ).map( ( [ courseId, courseName ] ) => {
        const isReplaced = checkIsCourseReplaced( courseId );

        // { courseName, courseId, isReplaced, replacedName, isRemoved }
        return {
          courseName,
          courseId,
          isReplaced: isReplaced !== false,
          replacedName: isReplaced, // Only checks this if isReplaced is true, anyway
          isRemoved: checkIsCourseRemoved( courseId ),
        };
      } );

      sortCoursesArray( courses );

      this.setState( { courses, loadingCourses: false } );
    } );
  };

  handleSave = event_ => {
    if ( event_.type !== 'keydown' || event_.key === 'Enter' ) {
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
    event_, { isRemoved, courseId }
  ) => {
    event_.stopImmediatePropagation();
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
    event_, item
  ) => {
    const { courseId } = item;
    event_.stopImmediatePropagation();
    this.removeSelectedIfEqualId( courseId );

    removeElementFromStorage( courseId );

    this.updateCourseById( courseId );
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

      sortCoursesArray( courses );
      return { courses };
    } );
  };

  handleSidebarClick = (
    event_, item
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
const sortCoursesArray = array => quickSort(
  array,
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
  id, rawNewValue, rawOldValue
) => {
  const { replacers } = removeElementFromStorage(
    id,
    {
      updateReplacers: false,
    }
  );

  const newValue = ( rawNewValue ?? '' ).trim();
  const oldValue = ( rawOldValue ?? '' ).trim();

  if ( newValue !== '' && newValue !== oldValue ) {
    replacers[ id ] = newValue;
  }

  GM_setValue(
    'replace',
    replacers
  );
};

const Sidebar = ( { courses, loadingCourses, ...rest } ) => <div class="outer-sidebar">
  <div class="sidebar">
    {loadingCourses && <div>Loading courses...</div>}
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
      onClick={event_ => {
        handleClick(
          event_,
          item
        );
      }}
    >
      <span>
        <span
          onClick={event_ => {
            toggleItem(
              event_,
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
              onClick={event_ => {
                resetItem(
                  event_,
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
        ? <div class="replace-flex-input">
          <h5>Login</h5>
          <input placeholder="Username" ref={loggedOutInputs.username} />
          <input
            placeholder="Password"
            ref={loggedOutInputs.password}
            type="password"
          />
          <button class="btn-save" type="button" onClick={loggedOutCallback}>
            Login
          </button>
        </div>
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
              onKeyDown={handleSave}
              value={
                isSelected
                  ? isReplaced === false
                    ? courseName
                    : replacedName
                  : ''
              }
            />
            <button
              class="btn-save"
              disabled={!isSelected}
              onClick={handleSave}
              type="button"
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
