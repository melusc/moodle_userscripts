// ==UserScript==
// @name      Moodle explore profiles rest
// @version   2021.03.12a
// @author    lusc
// @updateURL https://github.com/melusc/moodle_userscripts/raw/main/dist/Explore%20Profiles/explore-profiles.user.js
// @include   https://moodle.ksasz.ch/user/profile.php?id=*
// @grant     GM_addStyle
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @run-at    document-start
// ==/UserScript==

/* globals
  M: false
*/

import dayjs from 'dayjs';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime';
import DOMPurify from 'dompurify';
import style from './style.scss';
import COUNTRY_CODES from './countries.js';
import {
  setLastValidatedToken,
  login,
  logout,
  getUserId
} from '../shared/moodle-functions/index.js';

dayjs.extend( dayjsPluginRelativeTime );

import { render, Component, Fragment, h } from 'preact';

let USER_ID;
let CONTACTS;

let mainSetState;
let headerSetState;
let sidebarSetState;
let notificationSetState;
let initialState = {
  email: undefined,
  country: undefined,
  city: undefined,
  id: undefined,
  courses: [],
  firstaccess: undefined,
  lastaccess: undefined,
  fullname: undefined,
  description: undefined,
  url: undefined,
  interests: undefined,
  image: undefined,
};

class Notification extends Component {
  state = {
    from: undefined,
    to: undefined,
  };

  componentDidMount = () => {
    notificationSetState = this.setState.bind( this );
  };

  render = (
    _properties, { from, to }
  ) => from !== undefined
      && <div class="epr-notification">
        <div class="epr-centered">
          <div class="epr-spinner">
            <div class="bounce1" />
            <div class="bounce2" />
            <div class="bounce3" />
          </div>
          <div class="epr-text-center">
            {`Checking ${ to === undefined
              ? from
              : Math.min(
                to,
                from
              ) }`}
            {to !== undefined && ` to ${ Math.max(
              to,
              from
            ) }`}
          </div>
        </div>
      </div>
    ;
}

class Header extends Component {
  state = initialState;

  componentDidMount = () => {
    headerSetState = this.setState.bind( this );
  };

  render = (
    _properties,
    { id, image, fullname, firstaccess, lastaccess, isContact, isUserProfile }
  ) => <div class="col-12 pt-3 pb-3">
    <div class="card ">
      <div class="card-body ">
        <div class="d-flex align-items-center">
          <div class="mr-auto">
            <div class="page-context-header">
              <div class="page-header-image">
                <a
                  href={`https://moodle.ksasz.ch/user/profile.php?id=${ id }`}
                  class="d-inline-block aabtn"
                >
                  <img
                    src={image}
                    class="userpicture defaultuserpic"
                    alt={`Picture of ${ fullname }`}
                    title={`Picture of ${ fullname }`}
                    width="100"
                    height="100"
                  />
                </a>
              </div>
              <div class="page-header-headings">
                <h1>{fullname}</h1>
                <h5>
                  {'First accessed Moodle: '}
                  <span class="epr-coloured">
                    {dayjs
                      .unix( firstaccess )
                      .format( 'ddd, D MMM YYYY HH:mm:ss' )}
                  </span>
                </h5>
                <h5>
                  {'Last accessed Moodle ' /* for the trailing space */}
                  <span class="epr-coloured">
                    {dayjs.unix( lastaccess ).fromNow( true )}
                  </span>
                  {' ago' /* for the leading space */}
                </h5>
              </div>
              <div class="btn-group header-button-group">
                <a
                  id="message-user-button"
                  role="button"
                  data-conversationid="0"
                  data-userid={id}
                  class="btn"
                  href={`https://moodle.ksasz.ch/message/index.php?id=${ id }`}
                >
                  <span>
                    <i
                      class="icon fa fa-comment fa-fw iconsmall"
                      title="Message"
                      aria-label="Message"
                    />
                    <span class="header-button-title">Message</span>
                  </span>
                </a>
                <span
                  class="sr-only sr-only-focusable"
                  data-region="jumpto"
                  tabIndex="-1"
                />

                {isUserProfile === false
                    && <a
                      data-userid={id}
                      data-is-contact={isContact
                        ? 1
                        : 0}
                      id="toggle-contact-button"
                      role="button"
                      class="ajax-contact-button btn"
                      href={`https://moodle.ksasz.ch/message/index.php?user1=${ USER_ID }&user2=${ id }&${
                        isContact
                          ? 'removecontact'
                          : 'addcontact'
                      }=${ id }&sesskey=${ M.cfg.sesskey }`}
                    >
                      <span>
                        {isContact
                          ? <i
                            class="icon fa fa-user-times fa-fw iconsmall"
                            title="Remove from contacts"
                            aria-label="Remove from contacts"
                          />
                          : <i
                            class="icon fa fa-address-card fa-fw iconsmall"
                            title="Add to contacts"
                            aria-label="Add to contacts"
                          />
                        }
                        <span class="header-button-title">
                          {isContact
                            ? 'Remove from contacts'
                            : 'Add to contacts'}
                        </span>
                      </span>
                      <span class="loading-icon icon-no-margin">
                        <i
                          class="icon fa fa-circle-o-notch fa-spin fa-fw "
                          title="Loading"
                          aria-label="Loading"
                        />
                      </span>
                    </a>
                }
              </div>
            </div>
          </div>
          <div
            class="header-actions-container flex-shrink-0"
            data-region="header-actions-container"
          />
        </div>
        <div class="d-flex flex-wrap">
          <div id="page-navbar">
            <nav aria-label="Navigation bar">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="https://moodle.ksasz.ch/">Home</a>
                </li>

                <li class="breadcrumb-item">Users</li>

                <li class="breadcrumb-item">
                  <a
                    href={`https://moodle.ksasz.ch/user/profile.php?id=${ id }`}
                    aria-current="page"
                  >
                    {fullname}
                  </a>
                </li>
              </ol>
            </nav>
          </div>
          <div class="ml-auto d-flex">
            {isUserProfile
                && <>
                  <div class="singlebutton">
                    <form
                      method="post"
                      action="https://moodle.ksasz.ch/user/profile.php"
                    >
                      <input type="hidden" name="edit" value="1" />
                      <input type="hidden" name="reset" value="1" />
                      <input type="hidden" name="id" value={USER_ID} />
                      <input
                        type="hidden"
                        name="sesskey"
                        value={M.cfg.sesskey}
                      />
                      <button
                        type="submit"
                        class="btn btn-secondary"
                        id="single_button5fcba57352eb71"
                        title=""
                      >
                        Reset page to default
                      </button>
                    </form>
                  </div>
                  <div class="singlebutton">
                    <form
                      method="post"
                      action="https://moodle.ksasz.ch/user/profile.php"
                    >
                      <input type="hidden" name="edit" value="1" />
                      <input type="hidden" name="id" value={USER_ID} />
                      <input
                        type="hidden"
                        name="sesskey"
                        value={M.cfg.sesskey}
                      />
                      <button
                        type="submit"
                        class="btn btn-secondary"
                        id="single_button5fcba57352eb72"
                        title=""
                      >
                        Customise this page
                      </button>
                    </form>
                  </div>
                </>
            }
          </div>
          <div id="course-header" />
        </div>
      </div>
    </div>
  </div>
  ;
}

class Main extends Component {
  state = initialState;

  componentDidMount = () => {
    mainSetState = this.setState.bind( this );
  };

  // Copied and merged from multiple profile
  render = (
    _properties,
    {
      description,
      email,
      country,
      city,
      url,
      interests,
      courses,
      id,
      firstaccess,
      lastaccess,
      isUserProfile,
    }
  ) => <section id="region-main" class="region-main-content" aria-label="Content">
    <span class="notifications" id="user-notifications" />
    <div role="main">
      <span id="maincontent" />
      <div class="userprofile">
        {typeof description !== 'undefined' && description !== ''
            && <div
              class="description"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize( description ),
              }}
            />
        }
        <aside
          id="block-region-content"
          class="block-region"
          data-blockregion="content"
          data-droptarget="1"
        />
        <div class="profile_tree">
          {[ email, country, city, url, interests ].some( item => typeof item !== 'undefined' )
              && <section class="node_category card d-inline-block w-100 mb-3">
                <div class="card-body">
                  <h3 class="lead">User details</h3>
                  <ul>
                    {typeof email !== 'undefined'
                      && <li class="contentnode">
                        <dl>
                          <dt>Email address</dt>
                          <dd>
                            <a href={`mailto:${ encodeURIComponent( email ) }`}>
                              {email}
                            </a>
                          </dd>
                        </dl>
                      </li>
                    }
                    {typeof country !== 'undefined'
                      && <li class="contentnode">
                        <dl>
                          <dt>Country</dt>
                          <dd>{country}</dd>
                        </dl>
                      </li>
                    }
                    {typeof city !== 'undefined'
                      && <li class="contentnode">
                        <dl>
                          <dt>City/town</dt>
                          <dd>{city}</dd>
                        </dl>
                      </li>
                    }
                    {typeof url !== 'undefined'
                      && <li class="contentnode">
                        <dl>
                          <dt>Web page</dt>
                          <dd>
                            <a href={url} rel="noopener noreferrer">
                              {url}
                            </a>
                          </dd>
                        </dl>
                      </li>
                    }
                    {typeof interests !== 'undefined'
                      && <li class="contentnode">
                        <dl>
                          <dt>Interests</dt>
                          <dd>
                            <div class="tag_list hideoverlimit ">
                              <ul class="inline-list">
                                {interests.map( interest => <li key={interest}>
                                  <a
                                    href={`https://moodle.ksasz.ch/tag/index.php?tag=${ encodeURIComponent( interest ) }`}
                                    class="badge badge-info"
                                  >
                                    {interest}
                                  </a>
                                </li> )}
                              </ul>
                            </div>
                          </dd>
                        </dl>
                      </li>
                    }
                  </ul>
                </div>
              </section>
          }
          {Array.isArray( courses ) && courses.length > 0
              && <section class="node_category card d-inline-block w-100 mb-3">
                <div class="card-body">
                  <h3 class="lead">Course details</h3>
                  <ul>
                    <li class="contentnode">
                      <dl>
                        <dt>Course profiles</dt>
                        <dd>
                          <ul>
                            {courses.map( item => <li key={item.id}>
                              <a
                                href={`/user/view.php?id=${ id }&course=${ item.id }`}
                              >
                                {item.coursename}
                              </a>
                            </li> )}
                          </ul>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </div>
              </section>
          }
          <section class="node_category card d-inline-block w-100 mb-3">
            <div class="card-body">
              <h3 class="lead">Miscellaneous</h3>
              <ul>
                <li>
                  <span>
                    <a
                      href={`https://moodle.ksasz.ch/blog/index.php?userid=${ id }`}
                    >
                        View all blog entries
                    </a>
                  </span>
                </li>
                <li>
                  <span>
                    <a
                      href={`https://moodle.ksasz.ch/mod/forum/user.php?id=${ id }`}
                    >
                        Forum posts
                    </a>
                  </span>
                </li>
                <li>
                  <span>
                    <a
                      href={`https://moodle.ksasz.ch/mod/forum/user.php?id=${ id }&mode=discussions`}
                    >
                        Forum discussions
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </section>
          {isUserProfile
              && <section class="node_category card d-inline-block w-100 mb-3">
                <div class="card-body">
                  <h3 class="lead">Reports</h3>
                  <ul>
                    <li>
                      <span>
                        <a href="https://moodle.ksasz.ch/report/usersessions/user.php">
                          Browser sessions
                        </a>
                      </span>
                    </li>
                    <li>
                      <span>
                        <a
                          href={`https://moodle.ksasz.ch/grade/report/overview/index.php?userid=${ USER_ID }&id=1`}
                        >
                          Grades overview
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </section>
          }
          <section class="node_category card d-inline-block w-100 mb-3">
            <div class="card-body">
              <h3 class="lead">Login activity</h3>
              <ul>
                {typeof firstaccess !== 'undefined'
                    && <li class="contentnode">
                      <dl>
                        <dt>First access to site</dt>
                        <dd>
                          {dayjs
                            .unix( firstaccess )
                            .format( 'dddd, D MMMM YYYY, H:mm' )}
                          {' ('}
                          {dayjs.unix( firstaccess ).fromNow( false )})
                        </dd>
                      </dl>
                    </li>
                }
                {typeof lastaccess !== 'undefined'
                    && <li class="contentnode">
                      <dl>
                        <dt>Last access to site</dt>
                        <dd>
                          {dayjs
                            .unix( lastaccess )
                            .format( 'dddd, D MMMM YYYY, H:mm' )}
                          {' ('}
                          {dayjs.unix( lastaccess ).fromNow( false )})
                        </dd>
                      </dl>
                    </li>
                }
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
  ;
}

class Sidebar extends Component {
  state = initialState;

  componentDidMount = () => {
    sidebarSetState = this.setState.bind( this );
  };

  render = (
    _properties, { isUserProfile, id, fullname }
  ) => !isUserProfile
      && <>
        <p
          class="tree_item branch"
          role="treeitem"
          aria-expanded="true"
          aria-owns="random5fcb9ae3999e64_group"
          tabIndex="-1"
          aria-selected="false"
        >
          <span tabIndex="-1" id="label_2_34">
            Users
          </span>
        </p>
        <ul role="group" tabIndex="-1">
          <li
            class="type_user depth_3 contains_branch current_branch"
            aria-labelledby="label_3_35"
            tabIndex="-1"
          >
            <p
              class="tree_item branch active_tree_node"
              role="treeitem"
              aria-expanded="true"
              aria-owns="random5fcb9ae3999e65_group"
              tabIndex="-1"
              aria-selected="false"
            >
              <a
                tabIndex="-1"
                id="label_3_35"
                href={`https://moodle.ksasz.ch/user/profile.php?id=${ id }`}
              >
                {fullname}
              </a>
            </p>
            <ul role="group" tabIndex="-1">
              <li
                class="type_container depth_4 contains_branch"
                aria-labelledby="label_4_36"
                tabIndex="-1"
              >
                <p
                  class="tree_item branch"
                  role="treeitem"
                  aria-expanded="false"
                  aria-owns="random5fcb9ae3999e66_group"
                  tabIndex="-1"
                  aria-selected="false"
                >
                  <span tabIndex="-1" id="label_4_36">
                    Blogs
                  </span>
                </p>
                <ul role="group" aria-hidden="true" tabIndex="-1">
                  <li
                    class="type_custom depth_5 item_with_icon"
                    aria-labelledby="label_5_37"
                    tabIndex="-1"
                  >
                    <p
                      class="tree_item hasicon"
                      role="treeitem"
                      tabIndex="-1"
                      aria-selected="false"
                    >
                      <a
                        tabIndex="-1"
                        id="label_5_37"
                        href={`https://moodle.ksasz.ch/blog/index.php?userid=${ id }`}
                      >
                        <i
                          class="icon fa fa-square fa-fw navicon"
                          aria-hidden="true"
                          tabIndex="-1"
                        />
                        <span class="item-content-wrap" tabIndex="-1">
                          View all entries by {fullname}
                        </span>
                      </a>
                    </p>
                  </li>
                </ul>
              </li>
              <li
                class="type_setting depth_4 item_with_icon"
                aria-labelledby="label_4_38"
                tabIndex="-1"
              >
                <p
                  class="tree_item hasicon"
                  role="treeitem"
                  tabIndex="-1"
                  aria-selected="false"
                >
                  <a
                    tabIndex="-1"
                    id="label_4_38"
                    href={`https://moodle.ksasz.ch/message/index.php?user1=${ USER_ID }&user2=${ id }`}
                  >
                    <i
                      class="icon fa fa-square fa-fw navicon"
                      aria-hidden="true"
                      tabIndex="-1"
                    />
                    <span class="item-content-wrap" tabIndex="-1">
                      Messages
                    </span>
                  </a>
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </>
    ;
}

const clearNode = node => {
  while ( node.lastChild !== null ) {
    node.lastChild.remove();
  }
};

/**
 *
 * @param {number} start Start value
 * @param {number} range range to find more profiles in
 * @example start = 1940, range = -9, will return profiles 1931 up to and including 1940
 */
const getProfilesInRange = (
  start, range
) => login().then( token => {
  let lower = start;
  let upper = start + range;

  if ( lower > upper ) {
    [ lower, upper ] = [ upper, lower ];
  }

  const bodyParameters = new URLSearchParams();

  for ( let index = 0; index <= upper - lower; ++index ) {
    bodyParameters.set(
      `userlist[${ index }][userid]`,
      lower + index
    );
    bodyParameters.set(
      `userlist[${ index }][courseid]`,
      32 // Allgemeine informationen
    );
  }

  bodyParameters.set(
    'wsfunction',
    'core_user_get_course_user_profiles'
  );
  bodyParameters.set(
    'wstoken',
    token
  );

  return fetch(
    'https://moodle.ksasz.ch/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_user_get_course_user_profiles',
    {
      method: 'POST',
      body: bodyParameters.toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    }
  )
    .then( response => response.json() )
    .then( response => {
      if ( 'errorcode' in response ) {
        logout();
        return getProfilesInRange(
          start,
          range
        );
      }

      setLastValidatedToken();

      return response;
    } );
} );

const getContacts = noCache => login( noCache )
  .then( token => fetch(
    'https://moodle.ksasz.ch/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_message_get_user_contacts',
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: `userid=${ USER_ID }&wsfunction=core_message_get_user_contacts&wstoken=${ token }`,
      method: 'POST',
    }
  ).then( response => response.json() ) )
  .then( response => {
    if ( 'exception' in response ) {
      logout();
      return getContacts( true );
    }

    setLastValidatedToken();

    return response.map( ( { id } ) => id );
  } );

const unescapeHTML = string => `${ string }`
  .replace(
    /&amp;/g,
    '&'
  )
  .replace(
    /&lt;/g,
    '<'
  )
  .replace(
    /&gt;/g,
    '>'
  )
  .replace(
    /&quot;/g,
    '"'
  )
  .replace(
    /&#039;|&apos;/g /* Second one just in case because I don't know how moodle escapes apostrophies */,
    "'"
  );

/**
 * Listens to click on buttons
 * @param {EventListenerObject} event_ Event obj
 * @listens click
 */
const fetchNewProfile = async event_ => {
  const { target, type } = event_;
  const isPopState = type === 'popstate';

  if ( isPopState === false ) {
    if ( target.nodeName !== 'BUTTON' ) {
      return;
    }

    event_.preventDefault();
    event_.stopImmediatePropagation();
  }

  const id = +new URL( location ).searchParams.get( 'id' );
  const action = +( target?.dataset?.action ?? 0 );
  let profile;

  if ( Number.isFinite( action ) ) {
    const isNegative = action < 0;
    const origNewId = id + action;
    let newId = origNewId;
    let profiles = [];

    while ( profiles.length === 0 ) {
      if ( newId < 1 ) {
        newId = GM_getValue( 'highest' );
      }
      else if ( newId > GM_getValue( 'highest' ) ) {
        newId = 1;
      }

      const range = newId + ( isNegative
        ? -9
        : 9 );

      notificationSetState( { from: newId, to: range } );

      // eslint-disable-next-line no-await-in-loop
      profiles = await getProfilesInRange(
        newId,
        isNegative
          ? -9
          : 9 // 10 profiles so newId through newId +/- 9 (incl.)
      );
      newId += isNegative
        ? -10
        : 10; // +/- 10 because above
    }

    const highest = profiles[ profiles.length - 1 ];

    if ( highest.id > GM_getValue( 'highest' ) - 10 ) {
      GM_setValue(
        'highest',
        highest.id + 10
      );
    }

    profile = profiles.find( ( { id } ) => id === origNewId );

    if ( !profile ) {
      profile = isNegative
        ? profiles.pop()
        : profiles[ 0 ];
    }
  }
  else {
    let profiles = [];

    while ( profiles.length === 0 ) {
      const randProfile
        = Math.floor( Math.random() * ( GM_getValue( 'highest' ) + 1 ) ) + 1;

      notificationSetState( { from: randProfile, to: undefined } );

      // eslint-disable-next-line no-await-in-loop
      profiles = await getProfilesInRange(
        randProfile,
        0
      );
    }

    profile = profiles[ 0 ];
  }

  if ( isPopState === false ) {
    const url = new URL( location );

    url.searchParams.set(
      'id',
      profile.id
    );
    history.pushState(
      {},
      '',
      url
    );
  }

  notificationSetState( { from: undefined, to: undefined } );

  document.title = `${ profile.fullname }: Public profile`;

  if ( !Array.isArray( CONTACTS ) ) {
    CONTACTS = await getContacts();
  }

  /* {
      email,
      country,
      city,
      id,
      cours,
      firstaccess,
      lastaccess,
      fullname,
      description,
      interests,
      url,
      image,
    } */

  const isUserProfile = 'preferences' in profile;
  const isContact = CONTACTS.includes( profile.id );
  const state = {
    isContact,
    isUserProfile,
    email: profile.email,
    city: profile.city,
    id: profile.id,
    firstaccess: profile.firstaccess,
    lastaccess: profile.lastaccess,
    description: profile.description,
    url: profile.url,
    country: COUNTRY_CODES[ profile.country ],
    courses: profile.enrolledcourses?.map( ( { id, fullname } ) => ( {
      id,
      coursename: unescapeHTML( fullname.trim() ),
    } ) ),
    fullname: profile.fullname?.trim(),
    interests: profile.interests?.split( ',' )?.map( interest => interest.trim() ),
    image: profile.profileimageurl,
  };

  if ( typeof mainSetState === 'function' ) {
    mainSetState( state );
    headerSetState( state );
    sidebarSetState( state );
  }
  else {
    initialState = state;

    const regionMainBox = document.querySelector( '#region-main-box' );
    const pageHeader = document.querySelector( '#page-header' );

    clearNode( pageHeader );
    clearNode( regionMainBox );

    render(
      <Main />,
      regionMainBox
    );
    render(
      <Header />,
      pageHeader
    );
    let li
      = document.querySelector( 'li[aria-labelledby="label_2_34"]' )
      ?? document.querySelector( 'li[aria-labelledby="label_2_31"]' );

    if ( li ) {
      clearNode( li );
    }
    else {
      li = document.createElement( 'li' );

      li.className = 'type_system depth_2 contains_branch';
      li.setAttribute(
        'aria-labelledby',
        'label_2_34'
      );
      li.tabIndex = -1;

      document.querySelector( 'li[aria-labelledby="label_2_4"]' ).after( li );
    }

    render(
      <Sidebar />,
      li
    );
  }
};

const runOnce = () => {
  const notification = document.createElement( 'div' );

  render(
    <Notification />,
    notification
  );
  document.body.append( notification );

  getUserId().then( id => {
    USER_ID = id;
    GM_getValue( 'highest' )
      ?? GM_setValue(
        'highest',
        1946 // Highest + 10 at time of creation
        // This number only really matters for rand anyway
      );

    GM_addStyle( style );

    const buttons = document.createElement( 'div' );
    buttons.classList.add( 'btn-group' );

    render(
      <>
        <button data-action="-1" class="btn btn-secondary" type="button">
          Previous profile
        </button>
        <button data-action="1" class="btn btn-secondary" type="button">
          Next profile
        </button>
        <button data-action="rand" class="btn btn-secondary" type="button">
          Random profile
        </button>
        <button data-action="-10" class="btn btn-secondary" type="button">
          -10 profiles
        </button>
        <button data-action="10" class="btn btn-secondary" type="button">
          +10 profiles
        </button>
      </>,
      buttons
    );

    buttons.addEventListener(
      'click',
      fetchNewProfile
    );
    document.querySelector( 'ul.navbar-nav.d-none.d-md-flex' ).after( buttons );
    addEventListener(
      'popstate',
      fetchNewProfile
    );
  } );
};

document.readyState === 'complete'
  ? runOnce()
  : addEventListener(
    'DOMContentLoaded',
    runOnce,
    { once: true }
  );
