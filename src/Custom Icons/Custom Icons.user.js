// ==UserScript==
// @name      Custom Icons Preact
// @version   2021.01.28a
// @author    lusc
// @updateURL https://github.com/melusc/moodle_userscripts/raw/master/dist/Custom%20Icons/Custom%20Icons.user.js
// @include   *://moodle.ksasz.ch/*
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM_deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @grant     GM_xmlhttpRequest
// @run-at    document-start
// @connect   *
// ==/UserScript==

if ( location.protocol !== 'https:' ) {
  location.protocol = 'https:';
}

import { render, html } from 'htm/preact';
import { getCourses } from '../shared/moodle-functions';
import { setupSettingsPage } from './settingspage';
import { deleteVal } from './shared';

const isFrontpage = !( /^\/customiconspreact/i ).test( location.pathname );

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

  if ( sidebar ) {
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

  if ( anchor ) {
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
  getCourses().then( courses => {
    if ( !courses.hasOwnProperty( id ) ) {
      deleteVal( id );
      alert( `You appear to not be in the course with the id "${ id }" anymore.\nThe course will not be checked for anymore` );
    }
  } );
};

const getSidebar = context => context.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' )
  ?? context.getElementById( 'label_3_21' )?.closest( 'ul[role="group"]' );

const getDataURI = id => {
  const pointers = GM_getValue( 'pointers' );

  if ( !pointers ) {
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
  const uuid = pointers[ id ];

  if ( !uuid ) {
    return undefined;
  }
  const obj = GM_getValue( 'values' )[ uuid ];

  if ( obj.hasOwnProperty( 'rawXML' ) ) {
    return { rawXML: obj.rawXML, isXML: true };
  }
  return { ...obj, isXML: false };
};

if ( !( /^\/cleanmoodle/i ).test( location.pathname ) ) {
  const functionToRun = isFrontpage
    ? runOnceOnFrontPage
    : setupSettingsPage;

  document.readyState === 'complete'
    ? functionToRun()
    : addEventListener(
      'DOMContentLoaded',
      functionToRun,
      { once: true }
    );
}
