// ==UserScript==
// @name         Clean Moodle Rewrite
// @version      2020.09.27a
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
const colors = {
  red: '#ff4136',
  green: '#2ecc40',
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
 * @param {boolean} [setupPage=false] If set to true will add FontAwesome undo icon
 * @returns {void}
 */
const replace = (
  name = required( 'name' ),
  newName = required( 'newName' ),
  sidebar = required( 'sidebar' ),
  setupPage = false
) => {
  const element = sidebar.querySelector( `a[title="${ name }"]` );
  if ( element === null || element === undefined ) {
    testRemovedCourse( name );
  }
  else {
    const liClassList = element.closest( 'li' ).classList;
    if ( liClassList.contains( 'item_with_icon' ) ) {
      element.getElementsByTagName( 'span' )[ 0 ].textContent = newName;
      if ( setupPage ) {
        element.getElementsByTagName( 'span' )[ 0 ].after( CustomElement(
          'i',
          {
            class: 'icon fa fa-fw navicon fa-undo',
          }
        ) );
      }
    }
    else if (
      liClassList.contains( 'contains_branch' )
      || liClassList.contains( 'current_branch' )
    ) {
      element.textContent = newName;
      if ( setupPage ) {
        element.after( CustomElement(
          'i',
          {
            class: 'icon fa fa-fw navicon fa-undo',
          }
        ) );
      }
    }
  }
};

/**
 * Removes element with [title=name]
 * @param {string} name Name of link
 * @param {HTMLElement} sidebar HTMLElement where link can be found
 * @returns {void}
 */
const remove = (
  name = required( 'name' ),
  sidebar = required( 'sidebar' )
) => {
  const element = sidebar.querySelector( `a[title="${ name }"]` );
  if ( element === null || element === undefined ) {
    testRemovedCourse( name );
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
    const children = filteredSidebarChildren( sidebar );
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
 * @param {HTMLElement} li HTMLElement from which the digits should taken
 * @returns {number} Number from HTMLElement
 */
const getNum = li => +li.getAttribute( 'aria-labelledby' ).match( /(?<num>\d+)$/u ).groups.num;

/**
 * Undoes sorting by bringing it back to default sorting
 * @param {HTMLElement} sidebar HTMLElement where the children to be unsorted can be found
 * @returns {void}
 */
const unsort = ( sidebar = required() ) => {
  const children = filteredSidebarChildren( sidebar ).sort( (
    a, b
  ) => getNum( a ) - getNum( b ) );
  sidebar.prepend( ...children );
};

/**
 * Filters courses that don't have nodeName 'li' and don't have the className 'type_course'
 * @param {HTMLElement} sidebar Sidebar of which the children shall be returned filtered
 * @returns {Array} Filtered children
 */
const filteredSidebarChildren = ( sidebar = required() ) => [ ...sidebar.children ].filter( e => e.nodeName === 'LI' && e.classList.contains( 'type_course' ) );

/**
 * Remove element from TM storage
 * @param {string} name Exact string that needs to be removed from storage
 * @param {boolean} [setRemove=true] Update storage for removers
 * @param {boolean} [setReplace=true] Update storage for replacers
 *
 * @returns {object} newVals An object containing the new replacer and remover values
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
 * @param {string} name Name of new replacer
 * @param {string} replaceWith String to replace old val with
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
 * @param {string} name Name of new remover
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
 * @param {document} context Context where sidebar can be found
 * @returns {HTMLElement} Sidebar
 */
const getSidebar = context => context.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' ) ?? context.getElementById( 'label_3_21' )?.closest( 'ul[role="group"]' );

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
 * Most commonly called by Tampermonkey itself from GM_addValueChangeListener
 * @param {string} name Name of TM Storage item
 * @param {*} [oldVal] Old value in storage
 * @param {*} [newVal] New value already in storage
 * @param {boolean} [remote=true] Whether storage was updated in current or remote tab, defaults to true so only the name has to be given when called manually
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
      else if ( sidebar === null || sidebar === undefined ) {
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
 * @param {string} name Name of link
 * @param {*} sidebar sidebar where element can be found
 * @returns {void}
 */
const setupCustomRemove = (
  name = required(), sidebar = required()
) => {
  const element = sidebar.querySelector( `a[title="${ name }"]` );
  if ( element === null || element === undefined ) {
    testRemovedCourse( name );
  }
  else {
    element
      .getElementsByTagName( 'i' )[ 0 ]
      .classList.replace(
        'fa-check',
        'fa-times'
      );
    element.style.color = colors.red;
  }
};

/**
 * Handles click of sidebar and calls various functions depending on the clicked element
 * @param {object} event Eventobject
 * @returns {void}
 *
 * @listens Click
 */
const sidebarClick = event => {
  event.preventDefault();
  event.stopPropagation();

  if ( event.target.nodeName === 'I' ) {
    const { classList } = event.target;
    if ( classList.contains( 'fa-times' ) || classList.contains( 'fa-undo' ) ) {
      removeElement( event.target.closest( 'a' ).title );
    }
    else if ( classList.contains( 'fa-check' ) ) {
      addRemover( event.target.closest( 'a' ).title );

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
    event.target.nodeName !== 'UL'
    || event.target.getAttribute( 'role' ) !== 'group'
  ) {
    selectCourse( event );
  }
};

/**
 * Copies link to main region for setting a replacer
 * @param {object} event Eventobject
 * @returns {void}
 */
const selectCourse = event => {
  const p = ( event.target.nodeName === 'LI'
    ? event.target.getElementsByTagName( 'p' )[ 0 ]
    : event.target.closest( 'p' )
  )?.cloneNode( true );
  if ( p !== null && p !== undefined ) {
    const selectedCourseDiv = document.getElementById( 'selectedCourseDiv' );
    const span = p.getElementsByTagName( 'span' )[ 0 ];
    const anchor = p.getElementsByTagName( 'a' )[ 0 ];
    const icon = p.getElementsByTagName( 'i' )[ 0 ];

    if ( anchor.getElementsByClassName( 'fa-undo' )[ 0 ] ) {
      anchor.removeChild( anchor.getElementsByClassName( 'fa-undo' )[ 0 ] );
    }

    const origAnchor = event.target.closest( 'li' ).getElementsByTagName( 'a' )[ 0 ];
    const origIcon = origAnchor.firstElementChild;
    if ( origIcon.classList.contains( 'fa-times' ) ) {
      removeElement( anchor.title );
      const origIcon = origAnchor.getElementsByTagName( 'i' )[ 0 ];
      origAnchor.style.color = colors.green;
      origIcon.classList.replace(
        'fa-times',
        'fa-check'
      );
    }

    while ( selectedCourseDiv.lastChild ) {
      selectedCourseDiv.lastChild.remove();
    }
    selectedCourseDiv.append( p );
    span.contentEditable = true;
    span.id = 'spanEditable';
    span.setAttribute(
      'original-name',
      selectedCourseDiv.dataset.selectedCourse = p.getElementsByTagName( 'a' )[ 0 ].title
    );

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
  }
};

/**
 * Adds replacer to TM storage
 * @param {object} event Eventobject
 * @returns {void}
 * @listens Keydown
 * @listens Click
 */
const updateSelectedCourse = event => {
  if ( ( event.type === 'keydown' && event.key === 'Enter' ) || event.type === 'click' ) {
    event.preventDefault();
    event.stopPropagation();

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
 * @param {boolean} [isNewPage=error] If set to true adds eventlistener to sidebar, throws error if not given
 * @returns {void}
 */
const cleanSetup = ( isNewPage = required() ) => {
  /* Remove "Dashboard" */
  const dashboard = document.querySelector( 'li[aria-labelledby="label_2_2"]' );
  if ( dashboard !== null && dashboard !== undefined ) {
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
    icons[ i ].closest( 'a' ).style.color = colors.green;
  }

  /* Reset all text and remove undo icons */
  const span = sidebar.querySelectorAll( 'li span' );
  for ( let i = 0; i < span.length; i++ ) {
    span[ i ].textContent = span[ i ].closest( 'a' ).title.trim();

    const icon = span[ i ].nextSibling;
    if ( icon !== null && icon !== undefined ) {
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
  document.head.append(
    CustomElement(
      'link',
      {
        rel: 'shortcut icon',
        href: '/theme/image.php/classic/theme/1588340020/favicon',
      }
    ),
    CustomElement(
      'link',
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/theme/styles.php/classic/1588340020_1588339031/all',
      }
    )
  );

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
#spanEditable:empty::after {
  content: 'Reset to "' attr(original-name) '"';
}
` );

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
        tempElement.append( temp );
      }
      document.body.append( tempElement );
      document.getElementById( 'page-content' ).append( mainRegion );
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

      const replaceLi = CustomElement( 'li' );

      replaceLi.append(
        CustomElement(
          'h2',
          {
            textContent: lang.renameTitle,
            style: 'user-select: none',
          }
        ),
        CustomElement(
          'div',
          {
            textContent: lang.selectCourse,
            style: 'user-select: none;',
            'data-selected-course': null,
            id: 'selectedCourseDiv',
          }
        )
      );

      const saveButton = CustomElement(
        'button',
        {
          textContent: lang.saveButton,
          style: 'user-select: none;',
        }
      );
      saveButton.addEventListener(
        'click',
        updateSelectedCourse
      );
      replaceLi.append( saveButton );

      mainRegion.append( replaceLi );

      const sortLi = CustomElement( 'li' );

      sortLi.append(
        CustomElement( 'hr' ),
        CustomElement(
          'h2',
          {
            textContent: lang.sortTitle,
          }
        )
      );

      const inputDiv = CustomElement( 'div' );

      const sortCheckbox = CustomElement(
        'input',
        {
          type: 'checkbox',
          id: 'sortCheckbox',
        }
      );
      sortCheckbox.checked = GM_getValue( 'sort' );
      sortCheckbox.addEventListener(
        'change',
        updateSort
      );
      inputDiv.append(
        sortCheckbox,
        CustomElement(
          'label',
          {
            textContent: lang.sorting[ GM_getValue( 'sort' )
              ? 'sorting'
              : 'not' ],
            for: 'sortCheckbox',
            style: 'margin-left: 5px;',
          }
        )
      );

      sortLi.append( inputDiv );

      mainRegion.append( sortLi );
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
    const anchor = CustomElement(
      'a',
      {
        target: '_blank',
        href: '/cleanMoodleRewrite/',
      }
    );
    // Because otherwise it collapses "My courses"
    anchor.addEventListener(
      'click',
      e => e.stopPropagation()
    );

    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    svg.setAttributeNS(
      null,
      'fill',
      'none'
    );
    svg.setAttributeNS(
      null,
      'stroke',
      'currentColor'
    );
    svg.setAttributeNS(
      null,
      'viewBox',
      '0 0 24 24'
    );
    svg.style.height = '1.3em';
    svg.setAttributeNS(
      null,
      'stroke-width',
      1.5
    );
    const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    path.setAttributeNS(
      null,
      'd',
      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM9 12a3 3 0 106 0 3 3 0 10-6 0'
    );
    svg.append( path );
    anchor.append( svg );

    p.append( anchor );
  }
};

/**
 * Tests if user is still in course by name or not and if not removes that element from storage
 * @param {string} name Name of course to test
 * @returns {void}
 */
const testRemovedCourse = ( name = required() ) => {
  fetch( '/' )
    .then( response => response.text() )
    .then( responseText => {
      const parsed = new DOMParser().parseFromString(
        responseText,
        'text/html'
      );
      const sidebar = getSidebar( parsed );
      const course = sidebar.querySelector( `a[title="${ name }"]` );
      if ( course === null || course === undefined ) {
        lang.nonExistant( name );
      }
    } );
};

/**
 * Sets cursor at position
 * @param {number} [position] Position of cursor, defaults to textlength
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

    if ( sidebar !== null && sidebar !== undefined ) {
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

/**
 * Creates an HTMLElement
 * @param {string} nodeName Nodename
 * @param {object} [props={}] Attributes
 * @returns {HTMLElement} HTMLElement
 */
const CustomElement = (
  nodeName, props = {}
) => {
  const element = document.createElement( nodeName );
  const propEntries = Object.entries( props );
  for ( let i = 0; i < propEntries.length; i++ ) {
    const [ key, val ] = propEntries[ i ];
    switch ( key.toLowerCase() ) {
      case 'textcontent':
      case 'innerhtml':
      case 'innertext':
        element[ key ] = val;
        break;
      default:
        element.setAttribute(
          key,
          val
        );
        break;
    }
  }
  return element;
};

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
