// ==UserScript==
// @name         Clean Moodle Rewrite
// @version      2020.09.14a
// @author       lusc
// @include      *://moodle.ksasz.ch/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @run-at       document-start
// @downloadURL  https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20Rewrite.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20Rewrite.user.js
// ==/UserScript==
'use strict';

const lang = {
  nonExistant: name => {
    alert( `You appear to not be in "${ name }" anymore. ${ name } has been removed from your list.` );
  },
  selectCourse: 'Select course on left',
  renameTitle: 'Rename course',
  sortTitle: 'Sort sidebar',
  saveButton: 'Save',
  sorting: {
    sorting: 'Sorting',
    not: 'Not sorting',
  },
  title: 'Clean Moodle Rewrite Setup',
  openSettings: 'Open settings',
  toggleSorting: 'Toggle sorting',
  spanAfter: 'Reset to "{{{s}}}"',
};

/**
 * Throws error when called
 * Use in function arguments as default value
 * @param {string} e - The name of the variable
 * @returns {void}
 */
const required = ( e = 'Variable' ) => {
  throw new Error( `${ e } not defined` );
};

/**
 * Changes text of element with [title=name] to newName
 * @param {string} name Name of link
 * @param {string} newName Name to replace it with
 * @param {HTMLElement} sidebar HTMLElement where link can be found
 * @param {Boolean} [setupPage=false] If set to true will add FontAwesome undo icon
 * @returns {void}
 */
const replace = (
  name = required( 'name' ),
  newName = required( 'newName' ),
  sidebar = required( 'sidebar' ),
  setupPage = false
) => {
  const element = sidebar.querySelector( `a[title="${ name }"]` );
  if ( element === null ) {
    removeElement(
      name,
      true
    );
    lang.nonExistant( name );
  }
  else {
    const liClassList = element.closest( 'li' ).classList;
    if ( liClassList.contains( 'item_with_icon' ) ) {
      element.getElementsByTagName( 'span' )[ 0 ].textContent = newName;
      if ( setupPage ) {
        const icon = document.createElement( 'i' );
        icon.classList.add(
          'icon',
          'fa',
          'fa-fw',
          'navicon',
          'fa-undo'
        );
        element.getElementsByTagName( 'span' )[ 0 ].after( icon );
      }
    }
    else if (
      liClassList.contains( 'contains_branch' )
      || liClassList.contains( 'current_branch' )
    ) {
      element.textContent = newName;
      if ( setupPage ) {
        const icon = document.createElement( 'i' );
        icon.classList.add(
          'icon',
          'fa',
          'fa-fw',
          'navicon',
          'fa-undo'
        );
        element.after( icon );
      }
    }
  }
};

/**
 * Removes element with [title=name]
 * @param {String} name Name of link
 * @param {HTMLElement} sidebar HTMLElement where link can be found
 * @returns {void}
 */
const remove = (
  name = required( 'name' ),
  sidebar = required( 'sidebar' )
) => {
  const element = sidebar.querySelector( `a[title="${ name }"]` );
  if ( element === null ) {
    removeElement(
      name,
      true
    );
    lang.nonExistant( name );
  }
  else {
    const liClassList = element.closest( 'li' ).classList;
    if (
      !liClassList.contains( 'contains_branch' )
      || !liClassList.contains( 'current_branch' )
    ) {
      sidebar.removeChild( element.closest( 'li' ) );
    }
  }
};

/**
 * Sorts children of sidebar by textContent
 * @param {HTMLElement} sidebar HTMLElement where the children to be sorted can be found
 * @returns {void}
 */
const sort = ( sidebar = required() ) => {
  if ( GM_getValue( 'sort' ) === true ) {
    const children = filterCourses( [ ...sidebar.children ] );
    children.sort( (
      a, b
    ) => {
      const aText = a.firstElementChild.textContent.toLowerCase();
      const bText = b.firstElementChild.textContent.toLowerCase();
      return aText < bText
        ? -1
        : aText > bText
          ? 1
          : 0;
    } );
    sidebar.prepend( ...children );
  }
  else if ( GM_getValue( 'sort' ) !== false ) {
    GM_setValue(
      'sort',
      true
    );
  }
};

/**
 * Gets last digits
 * @param {HTMLElement} e HTMLElement from which the digits should taken
 * @returns {Number} Number from HTMLElement
 */
const getNum = e => +e.getAttribute( 'aria-labelledby' ).match( /(?<num>\d+)$/u ).groups.num;

/**
 * Undoes sorting by bringing it back to default sorting
 * @param {HTMLElement} sidebar HTMLElement where the children to be unsorted can be found
 * @returns {void}
 */
const unsort = ( sidebar = required() ) => {
  const children = filterCourses( [ ...sidebar.children ] ).sort( (
    a, b
  ) => getNum( a ) - getNum( b ) );
  sidebar.prepend( ...children );
};

/**
 * Filters courses that don't have nodeName 'li' and don't have the className 'type_course'
 * @param {ArrayLike|Array} children Children that need to be filtered
 * @returns {Array} Filtered children
 */
const filterCourses = children => [ ...children ].filter( e => e.nodeName === 'LI' && e.classList.contains( 'type_course' ) );

/**
 * Remove element from TM storage
 * @param {String} name Exact string that needs to be removed from storage
 * @param {Boolean} [setRemove=true] Update storage for removers
 * @param {Boolean} [setReplace=true] Update storage for replacers
 *
 * @returns {Object} newVals An object containing the new replacer- and remover values
 * @returns {Array} newVals.remove The new removers
 * @returns {Array} newVals.replace The new replacers
 */
const removeElement = (
  name = required(),
  setRemove = true,
  setReplace = true
) => {
  const origReplacers = GM_getValue( 'replace' );
  const newReplacers = origReplacers.map( e => e.slice() );

  for ( let i = 0; i < newReplacers.length; i++ ) {
    if ( newReplacers[ i ][ 0 ] === name ) {
      newReplacers.splice(
        i--,
        1
      );
    }
  }

  const origRemovers = GM_getValue( 'remove' );
  const newRemovers = origRemovers.slice();
  for ( let i = 0; i < newRemovers.length; i++ ) {
    if ( newRemovers[ i ] === name ) {
      newRemovers.splice(
        i--,
        1
      );
    }
  }

  if ( setRemove === true && origRemovers.length !== newRemovers.length ) {
    GM_setValue(
      'remove',
      newRemovers
    );
  }
  if ( setReplace === true && origReplacers.length !== newReplacers.length ) {
    GM_setValue(
      'replace',
      newReplacers
    );
  }

  return {
    replace: newReplacers,
    remove: newRemovers,
  };
};

/**
 * Adds a new replacer to TM storage
 * @param {String} name Name of new replacer
 * @param {String} replaceWith String to replace old val with
 * @returns {void}
 */
const addReplacer = (
  name = required(), replaceWith = required()
) => {
  const trimmedReplaceWith = replaceWith.trim().replace(
    /\s{2,}/gu,
    ' '
  );
  if ( trimmedReplaceWith === '' || trimmedReplaceWith === name ) {
    removeElement( name );
  }
  else {
    const { replace: replacers } = removeElement(
      name,
      true,
      false
    );
    replacers.push( [ name, trimmedReplaceWith ] );
    replacers.sort( (
      a, b
    ) => {
      const aText = a[ 0 ].toLowerCase();
      const bText = b[ 0 ].toLowerCase();
      return aText < bText
        ? -1
        : aText > bText
          ? 1
          : 0;
    } );
    GM_setValue(
      'replace',
      replacers
    );
  }
};
/**
 * Adds a new remover to TM storage
 * @param {String} name Name of new remover
 * @returns {void}
 */
const addRemover = ( name = required() ) => {
  const removers = removeElement(
    name,
    false,
    true
  ).remove.concat( name );
  removers.sort( (
    a, b
  ) => {
    const aText = a.toLowerCase();
    const bText = b.toLowerCase();
    return aText < bText
      ? -1
      : aText > bText
        ? 1
        : 0;
  } );
  GM_setValue(
    'remove',
    removers
  );
};

/**
 * Get sidebar from any context
 * @param {Document} ctx Context where sidebar can be found
 * @returns {HTMLElement} Sidebar
 */
const getSidebar = ctx => ctx.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' ) ?? ctx.getElementById( 'label_3_21' )?.closest( 'ul[role="group"]' );

/**
 * Returns only values from origArr that aren't in compareTo
 * @param {Array} origArr Original Array
 * @param {Array} compareTo Array compared to
 * @returns {Array} Unique values in origArr
 */
const compareReplacers = (
  origArr, compareTo
) => origArr.filter( curOrig => compareTo.every( curCompareTo => curOrig[ 0 ] !== curCompareTo[ 0 ] || curOrig[ 1 ] !== curCompareTo[ 1 ] ) );

/**
 * Update sidebar i.e. set names correctly, remove all elements that should be, sort or unsort
 * @param {String} name Name of TM Storage item
 * @param {*} [oldVal] Old value in storage
 * @param {*} [newVal] New value already in storage
 * @param {Boolean} [remote=true] Whether storage was updated in current or remote tab
 * @returns {void}
 */
const refresh = (
  name, oldVal, newVal, remote = true
) => {
  if (
    remote
    && !( /^\/cleanmoodle/iu ).test( location.pathname )
    && !( /^\/customicons/iu ).test( location.pathname )
  ) {
    const sidebar = getSidebar( document );
    if ( name === 'replace' ) {
      const oldDiff = compareReplacers(
        oldVal,
        newVal
      );
      for ( let i = 0; i < oldDiff.length; i++ ) {
        const element = sidebar
          .querySelector( `a[title="${ oldDiff[ i ][ 0 ] }` )
          ?.closest( 'li' );
        if ( element !== null && element !== undefined ) {
          const liClassList = element.classList;
          if ( liClassList.contains( 'item_with_icon' ) ) {
            element.getElementsByTagName( 'span' )[ 0 ].textContent = element.getElementsByTagName( 'a' )[ 0 ].title;
          }
          else {
            const anchor = element.getElementsByTagName( 'a' )[ 0 ];
            anchor.textContent = anchor.title;
          }
        }
      }
      const newDiff = compareReplacers(
        newVal,
        oldVal
      );
      for ( let i = 0; i < newDiff.length; i++ ) {
        replace(
          ...newDiff[ i ],
          sidebar
        );
      }
      refresh( 'sort' );
    }
    else if ( name === 'sort' ) {
      ( GM_getValue( 'sort' )
        ? sort
        : unsort )( sidebar );
    }
    else {
      const oldDiff = oldVal.filter( e => newVal.indexOf( e ) === -1 );
      if ( oldDiff.length === 0 ) {
        const newDiff = newVal.filter( e => oldVal.indexOf( e ) === -1 );
        for ( let i = 0; i < newDiff.length; i++ ) {
          remove(
            newDiff[ i ],
            sidebar
          );
        }
      }
      else if ( sidebar === null ) {
        location.reload();
      }
      else {
        fetch( location.href )
          .then( e => e.text() )
          .then( e => {
            const parsed = new DOMParser().parseFromString(
              e,
              'text/html'
            );
            sidebar.replaceWith( getSidebar( parsed ) );
            dispatchEvent( new Event( 'cleanMoodleRewrite' ) );
            dispatchEvent( new Event( 'customIconsRewrite' ) );
            dispatchEvent( new Event( 'moreSidebarLinks' ) );
          } )
          .catch( () => location.reload() );
      }
    }
  }
};

/**
 * Adds fontAwesome's fa-check to element for toggling the visibility of an item
 * @param {String} name Name of link
 * @param {*} sidebar sidebar where element can be found
 * @returns {void}
 */
const setupCustomRemove = (
  name = required(), sidebar = required()
) => {
  const element = sidebar.querySelector( `a[title="${ name }"]` );
  if ( element === null ) {
    removeElement( name );
    lang.nonExistant( name );
  }
  else {
    element
      .getElementsByTagName( 'i' )[ 0 ]
      .classList.replace(
        'fa-check',
        'fa-times'
      );
    element.style.color = 'red';
  }
};

/**
 * Handles click of sidebar and calls various functions depending on the clicked element
 * @param {Object} e Eventobject
 * @returns {void}
 *
 * @listens Click
 */
const sidebarClick = e => {
  e.preventDefault();
  e.stopPropagation();

  if ( e.target.nodeName === 'I' ) {
    const { classList } = e.target;
    if ( classList.contains( 'fa-times' ) || classList.contains( 'fa-undo' ) ) {
      removeElement( e.target.closest( 'a' ).title );
    }
    else if ( classList.contains( 'fa-check' ) ) {
      addRemover( e.target.closest( 'a' ).title );

      const selectedCourseDiv = document.getElementById( 'selectedCourseDiv' );
      selectedCourseDiv.dataset.selectedCourse = null;
      while ( selectedCourseDiv.lastChild ) {
        selectedCourseDiv.removeChild( selectedCourseDiv.lastChild );
      }
      selectedCourseDiv.textContent = lang.selectCourse;
    }
    cleanSetup( false );
  }
  else if (
    e.target.nodeName !== 'UL'
    || e.target.getAttribute( 'role' ) !== 'group'
  ) {
    selectCourse( e );
  }
};

/**
 * Copies link to main region for setting a replacer
 * @param {Object} e Eventobject
 * @returns {void}
 */
const selectCourse = e => {
  const p = ( e.target.nodeName === 'LI'
    ? e.target.getElementsByTagName( 'p' )[ 0 ]
    : e.target.closest( 'p' )
  ).cloneNode( true );
  if ( p ) {
    const selectedCourseDiv = document.getElementById( 'selectedCourseDiv' );
    const span = p.getElementsByTagName( 'span' )[ 0 ];
    const anchor = p.getElementsByTagName( 'a' )[ 0 ];
    const icon = p.getElementsByTagName( 'i' )[ 0 ];

    if ( anchor.getElementsByClassName( 'fa-undo' )[ 0 ] ) {
      anchor.removeChild( anchor.getElementsByClassName( 'fa-undo' )[ 0 ] );
    }

    const origAnchor = e.target.closest( 'li' ).getElementsByTagName( 'a' )[ 0 ];
    if ( origAnchor.style.color === 'red' ) {
      removeElement( anchor.title );
      const origIcon = origAnchor.getElementsByTagName( 'i' )[ 0 ];
      origAnchor.style.color = 'green';
      origIcon.classList.remove( 'fa-times' );
      origIcon.classList.add( 'fa-check' );
    }

    while ( selectedCourseDiv.lastChild ) {
      selectedCourseDiv.lastChild.remove();
    }
    selectedCourseDiv.appendChild( p );
    span.contentEditable = true;
    span.id = 'spanEditable';
    selectedCourseDiv.dataset.selectedCourse = p.getElementsByTagName( 'a' )[ 0 ].title;

    p.addEventListener(
      'keydown',
      updateSelectedCourse
    );

    anchor.style.color = '';
    icon.classList.remove(
      'fa-check',
      'fa-times'
    );
    icon.classList.add( 'fa-graduation-cap' );

    selectSpan();

    const style = document.getElementById( 'spanEditableStyle' );
    style.textContent = `#spanEditable:empty::after{
        content: '${ lang.spanAfter.replace(
    '{{{s}}}',
    anchor.title
  ) }';
    }`;
  }
};

/**
 * Adds replacer to TM storage
 * @param {Object} e Eventobject
 * @returns {void}
 * @listens Keydown
 * @listens Click
 */
const updateSelectedCourse = e => {
  if ( ( e.type === 'keydown' && e.key === 'Enter' ) || e.type === 'click' ) {
    e.preventDefault();
    e.stopPropagation();

    const selectedCourse = document.getElementById( 'selectedCourseDiv' );

    if ( selectedCourse.dataset.selectedCourse !== 'null' ) {
      const replaceWith = document.getElementById( 'spanEditable' ).textContent;
      const name = selectedCourse.dataset.selectedCourse;

      addReplacer(
        name,
        replaceWith
      );
      selectedCourse.dataset.selectedCourse = null;
      while ( selectedCourse.lastChild ) {
        selectedCourse.removeChild( selectedCourse.lastChild );
      }
      selectedCourse.textContent = lang.selectCourse;

      cleanSetup( false );
    }
  }
};

/**
 * Updates sorting in TM storage to checkbox value and sorts sidebar accordingly
 * @returns {void}
 */
const updateSort = () => {
  const checkbox = document.getElementById( 'sortCheckbox' );
  GM_setValue(
    'sort',
    checkbox.checked
  );

  document.querySelector( 'label[for="sortCheckbox"]' ).textContent
    = lang.sorting[ checkbox.checked
      ? 'sorting'
      : 'not' ];

  if ( checkbox.checked === false ) {
    unsort( getSidebar( document ) );
  }
  cleanSetup( false );
};

/**
 * Cleans settings page and resets everything
 * To be used only on settings page
 * @param {Boolean} [isNewPage=true] If set to true adds event listener to sidebar
 * @returns {void}
 */
const cleanSetup = ( isNewPage = true ) => {
  /* Remove "Dashboard" */
  const dashboard = document.querySelector( 'li[aria-labelledby="label_2_2"]' );
  if ( dashboard !== null ) {
    dashboard.parentNode.removeChild( dashboard );
  }

  /* Clean sidebar */
  const sidebar = getSidebar( document );

  /* Turn all icons into ticks ✓ and make text green*/
  const icons = sidebar.getElementsByTagName( 'i' );
  for ( let i = 0; i < icons.length; i++ ) {
    icons[ i ].classList.remove(
      'fa-graduation-cap',
      'fa-times'
    );
    icons[ i ].classList.add( 'fa-check' );
    icons[ i ].closest( 'a' ).style.color = 'green';
  }

  /* Reset all text and remove undo icons */
  const span = sidebar.querySelectorAll( 'li span' );
  for ( let i = 0; i < span.length; i++ ) {
    span[ i ].textContent = span[ i ].closest( 'a' ).title.trim();

    const icon = span[ i ].nextSibling;
    if ( icon !== null ) {
      icon.parentNode.removeChild( icon );
    }
  }

  const replacers = GM_getValue( 'replace' );
  if ( Array.isArray( replacers ) ) {
    for ( let i = 0; i < replacers.length; i++ ) {
      replace(
        ...replacers[ i ],
        sidebar,
        true
      );
    }
  }
  else {
    GM_setValue(
      'replace',
      []
    );
  }

  const removers = GM_getValue( 'remove' );
  if ( Array.isArray( removers ) ) {
    for ( let i = 0; i < removers.length; i++ ) {
      setupCustomRemove(
        removers[ i ],
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

  if ( isNewPage ) {
    sidebar.addEventListener(
      'click',
      sidebarClick
    );
  }

  /* Remove links */
  const anchors = sidebar.getElementsByTagName( 'a' );
  for ( let i = 0; i < anchors.length; i++ ) {
    anchors[ i ].removeAttribute( 'href' );
  }
};

/**
 * Generates settings page
 * @returns {void}
 */
const setup = () => {
  const icon = document.createElement( 'link' );
  icon.rel = 'shortcut icon';
  icon.href = '/theme/image.php/classic/theme/1588340020/favicon';
  document.head.appendChild( icon );

  const style = document.createElement( 'link' );
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = '/theme/styles.php/classic/1588340020_1588339031/all';
  document.head.appendChild( style );

  GM_addStyle( `
#page {
  margin-top: auto !important;
}
@media (min-width: 768px) {
  #page-content.blocks-pre.blocks-post .region-main {
    flex-basis: 68%;
    max-width: 68%;
  }
}
@media (min-width: 992px) {
  #page-content.blocks-pre.blocks-post .region-main {
    flex-basis: 75%;
    max-width: 75%;
  }
}
@media (min-width: 1200px) {
  #page-content.blocks-pre.blocks-post .region-main {
    flex-basis: 80%;
    max-width: 80%;
  }
}
#page-content.blocks-pre.blocks-post .region-main {
  padding-right: 1rem;
}
ul.section {
  list-style: none;
}
button {
  margin-top: 10px;
}
i.fa-undo {
  margin-left: 3px !important;
}
` );

  GM_addStyle( '#spanEditable:empty::after{content:"Reset to null"}' ).id
    = 'spanEditableStyle';

  history.replaceState(
    {},
    '',
    '/cleanMoodleRewrite/'
  );

  document.title = lang.title;

  while ( document.body.lastChild ) {
    document.body.lastChild.remove();
  }

  fetch( '/' )
    .then( e => e.text() )
    .then( e => {
      const parsed = new DOMParser().parseFromString(
        e,
        'text/html'
      );

      const sidebar = parsed.getElementById( 'inst4' );
      const mainRegion = parsed.getElementById( 'region-main-box' );

      /* Only direct path to elements */
      let tempElement = sidebar.cloneNode( true );
      let current = sidebar;
      while ( current.parentNode.nodeName !== 'BODY' ) {
        current = current.parentNode;

        const temp = tempElement;
        tempElement = current.cloneNode( false );
        tempElement.appendChild( temp );
      }
      document.body.appendChild( tempElement );
      document.getElementById( 'page-content' ).appendChild( mainRegion );
    } )
    .then( () => {
      /* Clear main region */
      const mainRegion = document
        .getElementById( 'maincontent' )
        .parentNode.querySelector( 'ul.section.img-text' );
      while ( mainRegion.lastChild ) {
        mainRegion.removeChild( mainRegion.lastChild );
      }

      cleanSetup( true );

      const replaceLi = document.createElement( 'li' );

      const replaceTitle = document.createElement( 'h2' );
      replaceTitle.textContent = lang.renameTitle;
      replaceTitle.style.userSelect = 'none';
      replaceLi.appendChild( replaceTitle );

      const course = document.createElement( 'div' );
      course.textContent = lang.selectCourse;
      course.style.userSelect = 'none';
      course.dataset.selectedCourse = null;
      course.id = 'selectedCourseDiv';
      replaceLi.appendChild( course );

      const saveButton = document.createElement( 'button' );
      saveButton.textContent = lang.saveButton;
      saveButton.style.userSelect = 'none';
      saveButton.addEventListener(
        'click',
        updateSelectedCourse
      );
      replaceLi.appendChild( saveButton );

      mainRegion.appendChild( replaceLi );

      const sortLi = document.createElement( 'li' );

      sortLi.appendChild( document.createElement( 'hr' ) );

      const sortTitle = document.createElement( 'h2' );
      sortTitle.textContent = lang.sortTitle;
      sortLi.appendChild( sortTitle );

      const inputDiv = document.createElement( 'div' );

      const sortCheckbox = document.createElement( 'input' );
      sortCheckbox.type = 'checkbox';
      sortCheckbox.id = 'sortCheckbox';
      sortCheckbox.checked = GM_getValue( 'sort' );
      sortCheckbox.addEventListener(
        'change',
        updateSort
      );
      inputDiv.appendChild( sortCheckbox );

      const label = document.createElement( 'label' );
      label.textContent = lang.sorting[ GM_getValue( 'sort' )
        ? 'sorting'
        : 'not' ];
      label.setAttribute(
        'for',
        'sortCheckbox'
      );
      label.style.marginLeft = '5px';
      inputDiv.appendChild( label );

      sortLi.appendChild( inputDiv );

      mainRegion.appendChild( sortLi );
    } );
};

/**
 * Adds a gear that links to settings
 * @param {HTMLElement} sidebar sidebar where settings gear should be added
 * @returns {void}
 */
const settingsGear = ( sidebar = required() ) => {
  const p = sidebar.previousSibling;

  if ( p.lastChild.getAttribute( 'href' ) !== '/cleanMoodleRewrite/' ) {
    const anchor = document.createElement( 'a' );
    anchor.target = '_blank';
    anchor.href = '/cleanMoodleRewrite/';
    anchor.addEventListener(
      'click',
      e => {
        e.stopPropagation();
        e.preventDefault();
        open(
          '/cleanMoodleRewrite/',
          '_blank'
        );
      }
    );

    const icon = document.createElement( 'i' );
    icon.classList.add(
      'icon',
      'fa',
      'fa-fw',
      'navicon',
      'fa-cogs'
    );
    icon.style.marginLeft = '5px';
    anchor.appendChild( icon );
    p.appendChild( anchor );
  }
};

/**
 * Sets cursor at position
 * @param {Number} [position] Position of cursor, defaults to textlength
 * @returns {void}
 */
const selectSpan = position => {
  const span = document.getElementById( 'spanEditable' );
  const range = new Range();
  const sel = getSelection();
  const start = typeof position === 'number'
    ? position
    : span.textContent.length;

  span.focus();
  range.setStart(
    span.childNodes[ 0 ],
    start
  );
  range.collapse( true );
  sel.removeAllRanges();
  sel.addRange( range );
};

addEventListener(
  'cleanMoodleRewrite',
  () => {
    const sidebar = getSidebar( document );

    if ( sidebar !== null ) {
      const replacers = GM_getValue( 'replace' );
      if ( Array.isArray( replacers ) ) {
        for ( let i = 0; i < replacers.length; i++ ) {
          replace(
            ...replacers[ i ],
            sidebar
          );
        }
      }
      else {
        GM_setValue(
          'replace',
          []
        );
      }

      const removers = GM_getValue( 'remove' );
      if ( Array.isArray( removers ) ) {
        for ( let i = 0; i < removers.length; i++ ) {
          remove(
            removers[ i ],
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

      settingsGear( sidebar );
    }
  }
);

if ( ( /^\/cleanmoodlerewrite/iu ).test( location.pathname ) ) {
  document.readyState === 'complete'
    ? setup()
    : addEventListener(
      'DOMContentLoaded',
      setup
    );
}
else if ( !( /^\/customicons/iu ).test( location.pathname ) ) {
  GM_registerMenuCommand(
    lang.openSettings,
    () => {
      open( 'https://moodle.ksasz.ch/cleanMoodleRewrite/' );
    }
  );
  GM_registerMenuCommand(
    lang.toggleSorting,
    () => {
      const val = GM_getValue( 'sort' );
      GM_setValue(
        'sort',
        !val
      );
      refresh(
        'sort',
        val,
        !val,
        true
      );
    }
  );

  const cleanMoodleEvent = new Event( 'cleanMoodleRewrite' );

  document.readyState === 'complete'
    ? dispatchEvent( cleanMoodleEvent )
    : addEventListener(
      'DOMContentLoaded',
      () => {
        dispatchEvent( cleanMoodleEvent );
      }
    );
}

GM_addValueChangeListener(
  'replace',
  refresh
);
GM_addValueChangeListener(
  'remove',
  refresh
);
GM_addValueChangeListener(
  'sort',
  refresh
);
