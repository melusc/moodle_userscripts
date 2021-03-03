// ==UserScript==
// @name      Moodle open folders inline preact
// @version   2021.03.03a
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/main/dist/Open%20folders%20inline/open-folders-inline.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==

import { render, Fragment, h } from 'preact';
import {
  login,
  logout,
  setLastValidatedToken
} from '../shared/moodle-functions/index.js';

import style from './style.scss';

GM_addStyle( style );

const getPageContent = noCache => login( noCache ).then( wstoken => {
  const courseId = new URLSearchParams( location.search ).get( 'id' );
  const requestParameters = new URLSearchParams( {
    courseid: courseId,
    'options[0][name]': 'includestealthmodules',
    'options[0][value]': 1,
    wstoken,
  } );

  return fetch(
    '/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_course_get_contents',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: requestParameters.toString(),
    }
  )
    .then( response => response.json() )
    .then( responseJSON => {
      if ( 'exception' in responseJSON ) {
        logout();
        return getPageContent( true );
      }

      setLastValidatedToken();
      return responseJSON;
    } );
} );

const generateImageURL = ( () => {
  const imageURLs = {
    'application/pdf': 'pdf-256',
    'application/zip': 'archive-256',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'document-256',
    'application/msword': 'document-256',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'spreadsheet-256',
    'application/vnd.ms-excel': 'spreadsheet-256',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'powerpoint-256',
    'application/vnd.ms-powerpoint': 'powerpoint-256',

    'text/plain': 'sourcecode-256',

    'audio/mp3': 'mp3-256',
    'audio/mp4': 'mp3-256',
    'video/quicktime': 'quicktime-256',
    'video/mp4': 'mpeg-256',

    /* I'm copying moodle by using these
       urls for the various mimetypes,
       I found all these in moodle and
       got them from there */
  };

  return (
    mimetype, defaultValue
  ) => mimetype in imageURLs
    ? `/theme/image.php/classic/core/1601902087/f/${ imageURLs[ mimetype ] }`
    : defaultValue;
} )();

const Folder = ( { contents, base, directoryDepth = 0 } ) => {
  const filePaths = {
    '/': [],
  };

  for ( const item of contents ) {
    const path = item.filepath[ directoryDepth ] ?? '/';

    const filePathArray = filePaths[ path ] ?? ( filePaths[ path ] = [] );

    filePathArray.push( item );
  }

  const root = filePaths[ '/' ].sort( (
    a, b
  ) => {
    const aL = a.filename.toLowerCase();
    const bL = b.filename.toLowerCase();

    return aL < bL
      ? -1
      : aL > bL
        ? 1
        : 0;
  } );
  delete filePaths[ '/' ];

  const entries = Object.entries( filePaths ).sort( (
    a, b
  ) => {
    const aL = a[ 0 ].toLowerCase();
    const bL = b[ 0 ].toLowerCase();

    return aL < bL
      ? -1
      : aL > bL
        ? 1
        : 0;
  } );

  return (
    <>
      {typeof base === 'string'
        && <div class="fp-filename-icon folders-inline-icon">
          <div class="folders-inline-icon-div">
            <i class="icon fa fa-caret-right fa-fw navicon folders-inline-caret" />
            <img
              class="iconlarge activityicon"
              alt={base}
              role="presentation"
              title={base}
              aria-hidden="true"
              src="/theme/image.php/classic/core/1601902087/f/folder-128"
            />
          </div>
          <span class="fp-filename">{base}</span>
        </div>
      }

      <ul style={{ listStyle: 'none' }} hidden={!!base}>
        {entries.map( ( [ key, value ] ) => <li key={key}>
          <Folder
            contents={value}
            base={key}
            directoryDepth={directoryDepth + 1}
          />
        </li> )}
        {root.map( ( { fileurl, mimetype, filename } ) => {
          const fileURL = new URL( fileurl );
          fileURL.pathname = fileURL.pathname.replace(
            /^\/webservice/,
            ''
          );

          const imgPath = new URL( fileURL );

          if ( !mimetype.startsWith( 'image' ) ) {
            imgPath.searchParams.set(
              'preview',
              1
            );
          }

          return (
            <li key={filename}>
              <span class="fp-filename-icon">
                <a href={fileURL.href}>
                  <span class="fp-icon">
                    <img
                      alt={filename}
                      title={filename}
                      src={generateImageURL(
                        mimetype,
                        imgPath.href
                      )}
                    />
                  </span>
                  <span class="fp-filename">{filename}</span>
                </a>
              </span>
            </li>
          );
        } )}
      </ul>
    </>
  );
};

const handleClick = ( () => {
  let pageContent;

  return event_ => {
    const anchor = event_.target.closest( 'a' );
    const icon = anchor?.querySelector( 'svg.svg-refresh' )?.parentNode;
    const folder = anchor?.closest( 'li.activity.folder' );
    const subFolder = event_.target.closest( 'div.fp-filename-icon' );

    if ( subFolder ) {
      const subFolderContent = subFolder.nextElementSibling;
      subFolderContent.hidden = !subFolderContent.hidden;
      const caretIcon = subFolder.querySelector( '.folders-inline-caret' );
      caretIcon.classList.toggle( 'fa-caret-right' );
      caretIcon.classList.toggle( 'fa-caret-down' );

      event_.preventDefault();
      event_.stopPropagation();
      return;
    }

    if ( event_.target.closest( 'span' ) === icon ) {
      event_.preventDefault();
      event_.stopPropagation();
      folder.lastElementChild.remove();
      pageContent = undefined;
      anchor.click();
      return;
    }

    if ( anchor?.pathname === '/mod/folder/view.php' ) {
      if ( event_.ctrlKey === true ) {
        return;
      }

      event_.preventDefault();
      event_.stopPropagation();

      if ( folder.childElementCount > 1 ) {
        folder.lastElementChild.remove();
        icon?.remove();
        return;
      }

      if ( !icon ) {
        const refresh = document.createElement( 'span' );
        render(
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            aria-hidden="true"
            class="icon navicon svg-refresh"
            style={{ marginLeft: 5 }}
            viewBox="0 0 512 512"
          >
            <path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z" />
          </svg>,
          refresh
        );
        anchor.append( refresh );
      }

      if ( typeof pageContent === 'undefined' ) {
        pageContent = getPageContent();
      }

      pageContent.then( pageContentJSON => {
        const section = anchor.closest( 'li.section.main' );
        const sectionId = +section
          .getAttribute( 'aria-labelledby' )
          .match( /(?<=-)\d+(?=-)/ )[ 0 ];
        const sectionObject = pageContentJSON.find( ( { id } ) => id === sectionId );
        const { modules } = sectionObject;

        const folderId = +folder.id.match( /\d+$/ )[ 0 ];

        const folderObject = modules.find( ( { id } ) => id === folderId );
        const { contents } = folderObject;

        if ( contents.length > 0 && !Array.isArray( contents[ 0 ].filepath ) ) {
          for ( const item of contents ) {
            item.filepath = item.filepath
              .split( '/' )
              .filter( pathSection => pathSection !== '' );
          }
        }

        const frag = document.createDocumentFragment();

        render(
          <Folder contents={contents} />,
          frag
        );

        folder.append( frag );
      } );
    }
  };
} )();

const init = () => {
  document
    .querySelector( 'div.course-content > ul.topics' )
    ?.addEventListener(
      'click',
      handleClick
    );
};

document.readyState === 'complete'
  ? init()
  : addEventListener(
    'DOMContentLoaded',
    init,
    { once: true }
  );
