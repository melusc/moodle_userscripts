// ==UserScript==
// @name      Custom Icons Preact
// @version 2021.04.26a
// @author    lusc
// @updateURL https://git.io/Jqlt8
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

if ( typeof GM_getValue( 'pointers' ) !== 'object' ) {
  GM_setValue(
    'pointers',
    {}
  );
  GM_setValue(
    'values',
    {}
  );
}

import { render, html } from 'htm/preact';
import { getCourses } from '../shared/moodle-functions/index.ts';
import { setupSettingsPage } from './settingspage.js';
import { deleteIconFromStorage } from './shared.js';

const isFrontpage = !( /^\/customiconspreact/i ).test( location.pathname );

const getSidebar = context => context.querySelector( 'li[aria-labelledby="label_2_4"] ul[role="group"]' )
  ?? context.querySelector( '#label_3_21' )?.closest( 'ul[role="group"]' );

const getDataURI = id => {
  const pointers = GM_getValue( 'pointers' );

  const uuid = pointers[ id ];

  if ( !uuid ) {
    return;
  }

  const object = GM_getValue( 'values' )[ uuid ];

  if ( 'rawXML' in object ) {
    return { rawXML: object.rawXML, isXML: true };
  }

  return { ...object, isXML: false };
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
    const uintArray = new Uint8Array( arrayBuffer );

    for ( let index = 0; index < length; ++index ) {
      uintArray[ index ] = byteString.charCodeAt( index );
    }

    const blob = new Blob(
      [ uintArray ],
      {
        type: mediaType,
      }
    );

    return { blobURL: URL.createObjectURL( blob ), isXML: false };
  }
};

const testIfUserLeftCourse = id => {
  getCourses().then( courses => {
    if ( !( id in courses ) ) {
      deleteIconFromStorage( id );
      alert( `You appear to not be in the course with the id "${ id }" anymore.\nThe course will not be checked for anymore` ); // eslint-disable-line no-alert
    }
  } );
};

const applyIcon = (
  id, sidebar
) => {
  const anchor = sidebar.querySelector( `a[href="https://moodle.ksasz.ch/course/view.php?id=${ id }"]` );

  if ( anchor ) {
    if ( anchor.childElementCount > 0 ) {
      const blobURLObject = getBlobURL( id );

      if ( typeof blobURLObject !== 'object' ) {
        return;
      }

      if ( blobURLObject.isXML ) {
        const span = document.createElement( 'span' );

        span.className = 'icon navicon';
        span.style.display = 'inline-block';
        span.style.color = 'var(--svg-fill, inherit)';

        render(
          html( [ blobURLObject.rawXML ] ),
          span
        );

        anchor.firstElementChild.replaceWith( span );
      }
      else {
        const img = new Image();

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
        img.src = blobURLObject.blobURL;
        img.addEventListener(
          'load',
          () => {
            URL.revokeObjectURL( blobURLObject.blobURL );
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

const refresh = (
  _valueName,
  // I have no control over the order
  // eslint-disable-next-line default-param-last
  oldValue = {},
  // eslint-disable-next-line default-param-last
  newValue = {},
  remote
) => {
  /* If the user clears the storage newValue will be undefined,
    so default to empty object.
    If the user undoes the clearing oldValue will be undefined,
    so default to empty object. */

  if ( remote ) {
    const sidebar = getSidebar( document );
    const oldEntries = Object.entries( oldValue );
    const newEntries = Object.entries( newValue );
    const changedOrAdded = newEntries.filter( ( [ key, value ] ) => !( key in oldValue ) && oldValue[ key ] !== value );
    const removed = oldEntries.filter( ( [ key ] ) => !( key in newValue ) );

    for ( const [ id ] of removed ) {
      const img = sidebar.querySelector( `a[href="https://moodle.ksasz.ch/course/view.php?id=${ id }"] > .icon.navicon` );

      if ( img && ( img.nodeName === 'SPAN' || img.nodeName === 'IMG' ) ) {
        // Test nodeName to not update an icon accidentally
        const icon = document.createElement( 'i' );

        icon.classList.add(
          'icon',
          'fa',
          'fa-graduation-cap',
          'fa-fw',
          'navicon'
        );
        icon.setAttribute(
          'aria-hidden',
          true
        );
        icon.tabIndex = -1;
        img.replaceWith( icon );
      }
    }

    for ( const [ item ] of changedOrAdded ) {
      applyIcon(
        item,
        sidebar
      );
    }
  }
};

const updateIcons = () => {
  const sidebar = getSidebar( document );

  if ( sidebar ) {
    const pointers = Object.keys( GM_getValue( 'pointers' ) );

    for ( const id of pointers ) {
      applyIcon(
        id,
        sidebar
      );
    }

    GM_addValueChangeListener(
      'pointers',
      refresh
    ); // Only listen for changes to pointers because if values changes this will change
  }
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
    updateIcons
  );

  updateIcons();
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
