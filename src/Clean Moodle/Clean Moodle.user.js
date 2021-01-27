// ==UserScript==
// @name      Clean Moodle with Preact
// @version   2021.01.27a
// @author    lusc
// @include   *://moodle.ksasz.ch/*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/master/dist/Clean%20Moodle/Clean%20Moodle.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// ==/UserScript==

import { render, h } from 'preact';

import { getCourses } from '../shared/moodle-functions';
import { quickSort } from '../shared/general-functions';

import { setupSettingsPage } from './settingspage';
import { removeElementFromStorage } from './shared';

if ( location.protocol !== 'https:' ) {
  location.protocol = 'https:';
}

const isFrontpage = !( /^\/cleanmoodlepreact/i ).test( location.pathname );

const setupFrontpage = () => {
  const sidebar = getSidebar( document );

  GM_registerMenuCommand(
    'Open settings',
    () => {
      open( 'https://moodle.ksasz.ch/cleanMoodlePreact/' );
    }
  );

  if ( sidebar ) {
    cleanFrontpage( sidebar );

    GM_addValueChangeListener(
      'replace',
      refresh
    );
    GM_addValueChangeListener(
      'remove',
      refresh
    );

    const p = sidebar.previousSibling;
    const span = document.createElement( 'span' );
    p.append( span );
    render(
      <SvgSettingsGear />,
      span
    );
  }
};

const cleanFrontpage = sidebar => {
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

  sortSidebar( sidebar );
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

/**
 * Replace the text of a course
 * @param {number|string} id The id of the course to replace
 * @param {[string]} newVal The new value, defaults to the anchors title (for resetting it)
 * @param {Element} sidebar The sidebar where the course is
 */
const replace = (
  id, newVal, sidebar
) => {
  const anchor = getElem(
    id,
    sidebar
  );

  if ( !anchor ) {
    return testForInexistantCourse( id );
  }

  const text = newVal ?? anchor.title; // instead of now removed resetReplaced()

  if ( anchor.childElementCount === 0 ) {
    anchor.textContent = text;
  }
  else {
    // because custom icons can use a span with an svg in it
    // so we need to be more specific about which span
    anchor.querySelector( 'span.item-content-wrap' ).textContent = text;
  }
  return undefined;
};

/**
 * Removes a course from the sidebar by the id
 * @param {number|string} id The id of the course to remove
 * @param {Element} sidebar The sidebar where the course is
 */
const remove = (
  id, sidebar
) => {
  const anchor = getElem(
    id,
    sidebar
  );

  if ( anchor ) {
    const li = anchor.closest( 'li.type_course' );
    if ( !li.classList.contains( 'contains_branch' ) ) {
      li.remove();
    }
  }
  else {
    testForInexistantCourse( id );
  }
};

/**
 * Sort the sidebar by the courses' name
 * @param {Element} sidebar The sidebar where the course is
 */
const sortSidebar = sidebar => {
  const children = [ ...sidebar.querySelectorAll( ':scope > li.type_course' ) ];

  quickSort(
    children,
    (
      a, b
    ) => {
      const aText = a.firstElementChild.textContent.toLowerCase();
      //              ^ if we're on the courses page it has more text like "participants" or "grades"
      // but we only want to sort it by the course's name
      // normally it would sort it in the same way if we allowed the additional text
      // but if two courses start with the same name it can sort it wrong
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

const testDiff = (
  oldVal, newVal
) => {
  if ( Array.isArray( oldVal ) ) {
    const addedOrChanged = newVal.filter( cur => !oldVal.includes( cur ) );
    const removedVals = oldVal.filter( cur => !newVal.includes( cur ) );
    return { addedOrChanged, removedVals };
  }
  const oldArr = Object.keys( oldVal );
  const newArr = Object.keys( newVal );
  const addedOrChanged = newArr.filter( id => !oldArr.includes( id ) || oldVal[ id ] !== newVal[ id ] );
  const removedVals = oldArr.filter( id => !newArr.includes( id ) );
  return { addedOrChanged, removedVals };
};

const refresh = ( () => {
  let sidebar;

  return (
    name, oldValue, newValue, remote
  ) => {
    if ( remote ) {
      // more readable by seperating them and terser optimises this into one anyway
      if ( sidebar || ( sidebar = getSidebar( document ) ) ) {
        const { removedVals, addedOrChanged } = testDiff(
          oldValue,
          newValue
        );

        if ( name === 'replace' ) {
          for ( const item of removedVals ) {
            replace(
              item,
              null, // defaults to the anchor title which is exactly what we want
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
          sortSidebar( sidebar );
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
            getCourses().then( coursesObj => {
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

              sortSidebar( sidebar );

              dispatchEvent( new Event( 'customIconsPreact' ) );
            } );
          }
        }
      }
    }
  };
} )();

const getElem = (
  id, sidebar
) => sidebar.querySelector( `a[href="https://moodle.ksasz.ch/course/view.php?id=${ id }"]` );

const testForInexistantCourse = id => {
  getCourses().then( courses => {
    if ( !courses.hasOwnProperty( id ) ) {
      removeElementFromStorage( id );
      alert( `You appear to not be in the course with the id "${ id }" anymore.\nThe course will not be checked for anymore` );
    }
  } );
};

const getSidebar = context => context.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' )
  ?? context.getElementById( 'label_3_21' )?.closest( 'ul[role="group"]' );
  // second one assumes user is in "allgemeine informationen" and is for worst case scenario where the above doesn't work

if ( !( /^\/customicons/iu ).test( location.pathname ) ) {
  const functionToRun = isFrontpage
    ? setupFrontpage
    : setupSettingsPage;

  document.readyState === 'complete'
    ? functionToRun()
    : addEventListener(
      'DOMContentLoaded',
      functionToRun,
      { once: true }
    );
}
