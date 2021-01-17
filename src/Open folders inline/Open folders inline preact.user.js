// ==UserScript==
// @name         Moodle open folders inline preact
// @version      2021.01.17b
// @author       lusc
// @include      https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Open%20folders%20inline/Open%20folders%20inline%20preact.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

import { render, Fragment, h } from 'preact';

import style from './style.scss';

GM_addStyle( style );

const init = () => {
  document
    .querySelector( 'div.course-content > ul.topics' )
    ?.addEventListener(
      'click',
      handleClick
    );
};

const handleClick = ( () => {
  let pageContent;

  return e => {
    const anchor = e.target.closest( 'a' );
    const icon = anchor?.querySelector( 'svg.svg-refresh' )?.parentNode;
    const folder = anchor?.closest( 'li.activity.folder' );
    const subFolder = e.target.closest( 'div.fp-filename-icon' );

    if ( subFolder ) {
      const subFolderContent = subFolder.nextElementSibling;
      subFolderContent.hidden = !subFolderContent.hidden;
      const caretIcon = subFolder.getElementsByClassName( 'folders-inline-caret' )[ 0 ];
      caretIcon.classList.toggle( 'fa-caret-right' );
      caretIcon.classList.toggle( 'fa-caret-down' );

      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if ( e.target.closest( 'span' ) === icon ) {
      e.preventDefault();
      e.stopPropagation();
      folder.lastElementChild.remove();
      pageContent = undefined;
      anchor.click();
      return;
    }

    if ( anchor?.pathname === '/mod/folder/view.php' ) {
      if ( e.ctrlKey === true ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

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
            viewBox="0 0 512 512"
          >
            <path
              d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
            />
          </svg>,
          refresh
        );
        anchor.append( refresh );
      }

      login().then( token => {
        const courseId = new URLSearchParams( location.search ).get( 'id' );
        const requestParams = new URLSearchParams();
        requestParams.set(
          'courseid',
          courseId
        );
        requestParams.set(
          'options[0][name]',
          'includestealthmodules'
        );
        requestParams.set(
          'options[0][value]',
          1
        );
        requestParams.set(
          'wstoken',
          token
        );

        if ( typeof pageContent === 'undefined' ) {
          pageContent = fetch(
            '/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_course_get_contents',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              body: requestParams.toString(),
            }
          ).then( e => e.json() );
        }

        pageContent.then( pageContentJSON => {
          const section = anchor.closest( 'li.section.main' );
          const sectionId = +section
            .getAttribute( 'aria-labelledby' )
            .match( /(?<=-)\d+(?=-)/ )[ 0 ];
          const sectionObj = pageContentJSON.find( ( { id } ) => id === sectionId );
          const { modules } = sectionObj;

          const folderId = +folder.id.match( /\d+$/ )[ 0 ];

          const folderObj = modules.find( ( { id } ) => id === folderId );
          const { contents } = folderObj;

          for ( let i = 0; i < contents.length; i++ ) {
            if ( Array.isArray( contents[ i ].filepath ) ) {
              break;
            }

            contents[ i ].filepath = contents[ i ].filepath
              .split( '/' )
              .filter( e => e !== '' );
          }

          const frag = document.createDocumentFragment();

          render(
            <GenerateFolder contents={ contents } />,
            frag
          );

          folder.append( frag );
        } );
      } );
    }
  };
} )();

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

    'text/plain': 'sourcecode-256', // moodle's decision

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
    mimetype, defaultVal
  ) => imageURLs.hasOwnProperty( mimetype )
    ? `/theme/image.php/classic/core/1601902087/f/${ imageURLs[ mimetype ] }`
    : defaultVal;
} )();

const GenerateFolder = ( { contents, base, directoryDepth = 0 } ) => {
  const filePaths = {
    '/': [],
  };

  for ( let i = 0; i < contents.length; i++ ) {
    const path = contents[ i ].filepath[ directoryDepth ] ?? '/';

    const filePathArr = filePaths[ path ] ?? ( filePaths[ path ] = [] );

    filePathArr.push( contents[ i ] );
  }

  const root = filePaths[ '/' ];
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
      { typeof base === 'string'
    && <div class="fp-filename-icon folders-inline-icon">
      <div class="folders-inline-icon-div">
        <i
          class="icon fa fa-caret-right fa-fw navicon folders-inline-caret"
        />
        <img class="iconlarge activityicon" alt={ base } role="presentation"
          title={ base } aria-hidden="true"
          src="/theme/image.php/classic/core/1601902087/f/folder-128" />
      </div>
      <span class="fp-filename">{ base }</span>
    </div>
      }

      <ul style="list-style: none;" hidden={ Boolean( base ) }>
        { entries.map( ( [ key, val ] ) => <li>
          <GenerateFolder
            contents={ val }
            base={ key }
            directoryDepth={ directoryDepth + 1 }
          />
        </li> ) }
        { root.map( ( { fileurl, mimetype, filename } ) => {
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

          return <span class="fp-filename-icon">
            <a href={ fileURL.href }>
              <span class="fp-icon">
                <img
                  alt={ filename }
                  title={ filename }
                  src={ generateImageURL(
                    mimetype,
                    imgPath.href
                  ) }
                />
              </span>
              <span class="fp-filename">{ filename }</span>
            </a>
          </span>;
        } ) }
      </ul>
    </>
  );
};

const setLastValidatedToken = () => GM_setValue(
  'lastValidatedToken',
  new Date().getTime()
);

const login = ( () => {
  let cachedToken;

  return ( noCache = false ) => {
    if ( cachedToken ) {
      return cachedToken;
    }

    const storedToken = GM_getValue( 'token' );
    const lastValidated = GM_getValue( 'lastValidatedToken' );
    if (
      !cachedToken
      && storedToken
      && new Date().getTime() - lastValidated < 18000000
    ) {
      // less than 5h
      cachedToken = Promise.resolve( storedToken ); // to make it a Promise and as such "thenable"
    }

    if ( noCache || !cachedToken ) {
      const username = getVal(
        'username',
        'Username'
      );
      const password = getVal(
        'password',
        'Password'
      );

      const loginParams = new URLSearchParams();

      loginParams.set(
        'username',
        username
      );
      loginParams.set(
        'password',
        password
      );
      loginParams.set(
        'service',
        'moodle_mobile_app'
      );
      cachedToken = fetch(
        '/login/token.php',
        {
          method: 'POST',
          body: loginParams.toString(),
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then( e => e.json() )
        .then( response => {
          if ( response.hasOwnProperty( 'errorcode' ) ) {
            logout( true );
            return login( true );
          }

          GM_setValue(
            'token',
            response.token
          );
          setLastValidatedToken();

          return response.token;
        } );
    }

    return cachedToken;
  };
} )();

const getVal = (
  storageName, promptMsg
) => {
  const storageVal = GM_getValue( storageName );
  if ( typeof storageVal !== 'undefined' ) {
    return storageVal;
  }

  const newVal = prompt( promptMsg );
  GM_setValue(
    storageName,
    newVal
  );
  return newVal;
};

const logout = ( removeCredentials = false ) => {
  [ 'token', 'lastValidatedToken' ].map( GM_deleteValue );
  if ( removeCredentials ) {
    [ 'username', 'password' ].map( GM_deleteValue );
  }
};

document.readyState === 'complete'
  ? init()
  : addEventListener(
    'DOMContentLoaded',
    init,
    { once: true }
  );
