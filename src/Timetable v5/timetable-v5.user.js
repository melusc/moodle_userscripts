// ==UserScript==
// @name      Moodle Timetable v5
// @version   2021.05.03a
// @author    lusc
// @updateURL https://git.io/Jqlt4
// @include   *://moodle.ksasz.ch/
// @include   *://moodle.ksasz.ch/?*
// @include   *://moodle.ksasz.ch/timetable/v5*
// @grant     GM_addValueChangeListener
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_registerMenuCommand
// @grant     GM_addStyle
// @grant     GM_notification
// @run-at    document-start
// ==/UserScript==

if ( location.protocol !== 'https:' ) {
  location.protocol = 'https:';
}

import { Component, Fragment, h, render } from 'preact';
import { initSettingsPage } from './settingspage.js';

import frontPageStyle from './frontpage.scss';
import { parseTimeToString, uniqueId } from './shared.js';

const notificationUrl = 'https://i.imgur.com/ZtPH8v7.png';

const TimetableRow = ( { values, isNow } ) => {
  const { from, to, id, content } = values ?? {};
  return (
    typeof values === 'object'
      && <div class="tt-tr">
        <div class="tt-th">
          {isNow
            ? 'Now'
            : 'Next'}
          {from
            && to
            && ` (${ parseTimeToString( from ) } - ${ parseTimeToString( to ) })`}
          :
        </div>
        <div class="tt-td">
          {typeof id === 'string'
            ? <a
              href={`/course/view.php?id=${ id }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
            : content ?? 'Free lesson'
          }
        </div>
      </div>

  );
};

const FrontPage = ( () => {
  const currentDay = new Date().getDay();
  let currentVals = ( GM_getValue( 'days' )?.[ currentDay - 1 ] ?? [] ).map( item => ( {
    ...item,
    key: uniqueId(),
  } ) );

  // - 1 because monday is 0
  // but in javascript dates monday would be 1 with sunday as 0
  const BEFORELESSONS = 'BEFORELESSONS';
  const AFTERLESSONS = 'AFTERLESSONS';
  const DURINGLESSONS = 'DURINGLESSONS';

  return class FrontPage extends Component {
    state = {
      curCourse: 1,
      tableRows: [],
      isHoliday:
        GM_getValue( 'isHoliday' ) ?? ( GM_setValue(
          'isHoliday',
          false
        ), false ),
      isEmpty: false,
      type: undefined,
    };

    componentDidMount = () => {
      GM_addValueChangeListener(
        'days',
        () => {
          currentVals = GM_getValue( 'days' )?.[ currentDay - 1 ] ?? [];
          this.timeout.clearTimeout();
          /* It will set another timeout if necessary
             and if not it would never be cleared so it gets
             cleared here */
          this.updateCourse();
        }
      );
      GM_addValueChangeListener(
        'isHoliday',
        () => {
          this.timeout.clearTimeout();
          this.setState( { isHoliday: GM_getValue( 'isHoliday' ) } );
          if ( !GM_getValue( 'isHoliday' ) ) {
            this.updateCourse();
          }
        }
      );

      if ( !this.state.isHoliday ) {
        this.updateCourse();
      }
    };

    timeout = {
      clearTimeout: () => {
        clearTimeout( this.timeout._t );
        this.timeout._t = undefined;
      },

      setCoursesTimeout: delay => {
        this.timeout.clearTimeout();
        this.timeout._t = setTimeout(
          this.updateCourse.bind( this ),
          delay,
          true
        );
      },
    };

    updateCourse = notify => {
      if ( currentVals.length === 0 ) {
        this.setState( { isEmpty: true } );
        return;
      }

      const currentDate = new Date();
      const currentTimeInMinutes
        = ( currentDate.getHours() * 60 )
        + currentDate.getMinutes()
        + ( currentDate.getSeconds() / 60 )
        + ( currentDate.getMilliseconds() / 60 / 1000 );

      const totalFrom = currentVals[ 0 ].from;
      const totalTo = currentVals[ currentVals.length - 1 ].to;

      if ( currentTimeInMinutes < totalFrom ) {
        this.setState( {
          type: BEFORELESSONS,
          tableRows: [ undefined, currentVals[ 0 ] ],
        } );

        const nextInMinutesSinceMidnight = currentVals[ 0 ].from;
        const nextMinutes = nextInMinutesSinceMidnight % 60;
        const nextHours = Math.floor( nextInMinutesSinceMidnight / 60 );

        const nextDate = new Date();
        nextDate.setHours(
          nextHours,
          nextMinutes,
          0,
          0
        );

        this.timeout.setCoursesTimeout( nextDate - currentDate );
      }
      else if ( currentTimeInMinutes >= totalTo ) {
        this.setState( {
          type: AFTERLESSONS,
        } );
      }
      else {
        let currentIndex = 0;

        while ( currentVals[ currentIndex ].to < currentTimeInMinutes ) {
          ++currentIndex;
        }

        const currentValue = currentVals[ currentIndex ];
        const nextValue = currentVals[ currentIndex + 1 ];

        this.setState( {
          type: DURINGLESSONS,
          tableRows: [ currentValue, nextValue ],
        } );

        if (
          notify
          && !this.state.isHoliday
          && currentValue
          && 'content' in currentValue
        ) {
          GM_notification( {
            text: currentValue.content,
            title: 'Now',
            image: notificationUrl,
            timeout: 4000,
            silent: true,
            onclick: () => {
              open( 'id' in currentValue
                ? `/course/view.php?id=${ currentValue.id }`
                : '/' );
            },
          } );
        }

        const nextInMinutesSinceMidnight = currentVals[ currentIndex ].to;
        const nextHours = Math.floor( nextInMinutesSinceMidnight / 60 );
        const nextMinutes = nextInMinutesSinceMidnight % 60;

        const nextDate = new Date();
        nextDate.setHours(
          nextHours,
          nextMinutes,
          0,
          0
        );

        this.timeout.setCoursesTimeout( nextDate - currentDate );
      }
    };

    render = (
      _properties, { isEmpty, isHoliday, type, tableRows }
    ) => {
      const isWeekend = currentDay === 0 || currentDay === 6;

      return (
        <div>
          <div class="mod-indent-outer">
            <div class="contentwithoutlink">
              <div class="no-overflow">
                <hr />
                <div>
                  <div class="tt-title">Timetable</div>
                  <div class="tt-table">
                    <div class="tt-tbody">
                      {!isWeekend && !isHoliday
                        && <>
                          {type === BEFORELESSONS
                            && <TimetableRow
                              values={{ content: 'No lesson' }}
                              isNow
                            />
                          }
                          {type === AFTERLESSONS
                            && <div class="tt-title">No school anymore</div>
                          }
                          {!isEmpty
                            && ( type === BEFORELESSONS
                              || type === DURINGLESSONS )
                            && tableRows?.map( (
                              // eslint-disable-next-line default-param-last
                              { key, ...values } = {},
                              index
                            ) => values
                                  && <TimetableRow
                                    key={key}
                                    values={values}
                                    isNow={index === 0}
                                  /> )}
                        </>
                      }
                      {isWeekend && !isHoliday
                        && <div class="tt-title">Weekend</div>
                      }
                      {isHoliday && <div class="tt-title">Holiday</div>}
                      {isEmpty && !isWeekend
                        && <>
                          {"Today's timetable is empty, you can update it "}
                          <a
                            href="/timetable/v5"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            here
                          </a>
                        </>
                      }
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      );
    };
  };
} )();

const initFrontpage = () => {
  GM_registerMenuCommand(
    'Open settings',
    () => {
      open(
        '/timetable/v5',
        '_blank'
      );
    }
  );

  GM_registerMenuCommand(
    'Toggle holiday',
    () => {
      GM_setValue(
        'isHoliday',
        !GM_getValue( 'isHoliday' )
      );
    }
  );

  GM_addStyle( frontPageStyle );

  const main = document.querySelector( '#region-main-box ul.section' );
  const li = document.createElement( 'li' );

  li.id = 'module-timetable-v5';
  li.className = 'activity label modtype_label';
  main.prepend( li );

  render(
    <FrontPage />,
    li
  );
};

const functionToRun = ( /^\/timetable\/v5/iu ).test( location.pathname )
  ? initSettingsPage
  : initFrontpage;

document.readyState === 'complete'
  ? functionToRun()
  : addEventListener(
    'DOMContentLoaded',
    functionToRun,
    { once: true }
  );
