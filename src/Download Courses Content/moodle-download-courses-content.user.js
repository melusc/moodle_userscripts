// ==UserScript==
// @name      Moodle Download Course's Content
// @version   2021.02.07a
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/main/dist/Download%20Courses%20Content/moodle-download-courses-content.user.js
// @grant     GM_getValue
// @grant     GM_setValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_xmlhttpRequest
// @run-at    document-start
// @connect   *
// ==/UserScript==

// this is so webpack doesn't remove the metadata above
if ( location.protocol !== 'https:' ) {
  /* This should never happen as moodle itself upgrades to https */
  location.protocol = 'https:';
}

import saveAs from 'file-saver';
import JSZip from 'jszip/dist/jszip';
import { login, logout, setLastValidatedToken } from '../shared/moodle-functions/index.js';

const init = () => {
  if ( !document.querySelector( '#region-main div.errorbox.alert.alert-danger' ) ) {
    const saveButton = document.createElement( 'button' );
    saveButton.textContent = 'Save contents to zip';
    saveButton.className = 'btn btn-secondary';
    document
      .querySelector( '#page-header div.card > div.card-body > div.d-flex' )
      ?.append( saveButton );

    saveButton.addEventListener(
      'click',
      initDownload
    );
  }
};

const padStart = d => `${ d }`.padStart(
  2,
  '0'
);

// https://en.wikipedia.org/wiki/Filename
const sanitizeFileName = string => string.replace(
  /["%*/:<>?\\|]/g,
  '_'
);

const initDownload = (
  event, noChache = false
) => {
  event.preventDefault?.();
  event.stopImmediatePropagation?.();
  const { target } = event;

  if ( target.disabled ) {
    return;
  }

  target.disabled = true;
  target.textContent = '0.00%';

  login( noChache ).then( token => {
    const courseId = new URLSearchParams( location.search ).get( 'id' );
    const body = `courseid=${ courseId }&options[0][name]=includestealthmodules&options[0][value]=1&wstoken=${ token }`;

    fetch(
      '/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_course_get_contents',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body,
      }
    )
      .then( response => response.json() )
      .then( jsonPageContent => {
        if ( !Array.isArray( jsonPageContent ) && 'exception' in jsonPageContent ) {
          logout();
          return initDownload(
            { target },
            true
          );
        }

        setLastValidatedToken();

        const body = `token=${ token }`;

        const zipFile = new JSZip();

        for ( const section of jsonPageContent ) {
          const { modules } = section;
          const sectionName = sanitizeFileName( section.name );

          for ( const module of modules ) {
            const { modname } = module;
            if ( modname === 'resource' || modname === 'folder' ) {
              const { contents } = module;
              const folderName = sanitizeFileName( module.name );

              for ( const content of contents ) {
                const { fileurl, filepath, timemodified: timeModified } = content;
                const filename = sanitizeFileName( content.filename );
                const date = new Date( timeModified * 1000 );

                const zipFileName = modname === 'resource'
                  ? `${ sectionName }/${ filename }`
                  : `${ sectionName }/${ folderName }${ filepath }${ filename }`;

                zipFile.file(
                  zipFileName,
                  fetch(
                    fileurl,
                    {
                      body,
                      method: 'POST',
                      headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                    }
                  ).then( response => response.blob() ),
                  { date }
                );
              }
            }
            else if ( modname === 'url' ) {
              const url = new URL( module.url );
              const defaultFile = `[InternetShortcut]\nURL=${ url.href }`;

              url.searchParams.set(
                'redirect',
                1
              );

              zipFile.file(
                `${ sectionName }/${ module.name }.url`,
                new Promise( resolve => {
                  GM_xmlhttpRequest( {
                    url,
                    method: 'HEAD',
                    onerror() {
                      resolve( defaultFile );
                    },
                    ontimeout() {
                      resolve( defaultFile );
                    },
                    onload( { finalUrl } ) {
                      resolve( `[InternetShortcut]\nURL=${ finalUrl }` );
                    },
                  } );
                } )
              );
            }
          }
        }

        const date = new Date();

        zipFile
          .generateAsync(
            {
              type: 'blob',
              compression: 'DEFLATE',
              compressionOptions: {
                level: 9,
              },
              comment: 'https://github.com/melusc/moodle_userscripts',
            },
            metadata => {
              target.textContent = `${ metadata.percent.toFixed( 2 ) }%`;
            }
          )
          .then(
            blob => {
              saveAs(
                blob,
                `course-${
                  courseId
                }_${
                  date.getFullYear()
                }${
                  padStart( date.getMonth() + 1 )
                }${
                  padStart( date.getDate() )
                }-${
                  padStart( date.getHours() )
                }${
                  padStart( date.getMinutes() )
                }${
                  padStart( date.getSeconds() )
                }.zip`
              );

              target.disabled = false;
              target.textContent = 'Save contents to zip';
            },
            console.error
          );
      } );
  } );
};

document.readyState === 'complete'
  ? init()
  : addEventListener(
    'DOMContentLoaded',
    init,
    { once: true }
  );
