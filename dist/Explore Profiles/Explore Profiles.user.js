// ==UserScript==
// @name         Moodle explore profiles rest
// @version      2021.01.12a
// @author       lusc
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Explore%20Profiles/Explore%20Profiles.user.js
// @include      https://moodle.ksasz.ch/user/profile.php?id=*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/dayjs@1.9.7/dayjs.min.js
// @require      https://cdn.jsdelivr.net/npm/dayjs@1.9.7/plugin/relativeTime.js
// _@require     https://cdn.jsdelivr.net/npm/htm@3.0.4/preact/standalone.umd.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.5.9/dist/preact.min.js
// ==/UserScript==

/* globals
dayjs: false
dayjs_plugin_relativeTime: false
M: false */
dayjs.extend(dayjs_plugin_relativeTime); // to switch forth and back between htmPreact and preact
// /* globals htmPreact: false */
// const { render, Component, html } = htmPreact;

/* globals preact: false, html: false */

const {
  render,
  Component,
  // eslint-disable-next-line no-unused-vars
  h
} = preact;
let USER_ID;
let CONTACTS; // prettier-ignore

const COUNTRY_CODES = {
  AD: 'Andorra',
  AE: 'United Arab Emirates',
  AF: 'Afghanistan',
  AG: 'Antigua and Barbuda',
  AI: 'Anguilla',
  AL: 'Albania',
  AM: 'Armenia',
  AO: 'Angola',
  AQ: 'Antarctica',
  AR: 'Argentina',
  AS: 'American Samoa',
  AT: 'Austria',
  AU: 'Australia',
  AW: 'Aruba',
  AX: 'Åland Islands',
  AZ: 'Azerbaijan',
  BA: 'Bosnia and Herzegovina',
  BB: 'Barbados',
  BD: 'Bangladesh',
  BE: 'Belgium',
  BF: 'Burkina Faso',
  BG: 'Bulgaria',
  BH: 'Bahrain',
  BI: 'Burundi',
  BJ: 'Benin',
  BL: 'Saint Barthélemy',
  BM: 'Bermuda',
  BN: 'Brunei Darussalam',
  BO: 'Bolivia (Plurinational State of)',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  BR: 'Brazil',
  BS: 'Bahamas',
  BT: 'Bhutan',
  BV: 'Bouvet Island',
  BW: 'Botswana',
  BY: 'Belarus',
  BZ: 'Belize',
  CA: 'Canada',
  CC: 'Cocos (Keeling) Islands',
  CD: 'Congo (the Democratic Republic of the)',
  CF: 'Central African Republic',
  CG: 'Congo',
  CH: 'Switzerland',
  CI: "Côte d'Ivoire",
  CK: 'Cook Islands',
  CL: 'Chile',
  CM: 'Cameroon',
  CN: 'China',
  CO: 'Colombia',
  CR: 'Costa Rica',
  CU: 'Cuba',
  CV: 'Cabo Verde',
  CW: 'Curaçao',
  CX: 'Christmas Island',
  CY: 'Cyprus',
  CZ: 'Czechia',
  DE: 'Germany',
  DJ: 'Djibouti',
  DK: 'Denmark',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  DZ: 'Algeria',
  EC: 'Ecuador',
  EE: 'Estonia',
  EG: 'Egypt',
  EH: 'Western Sahara',
  ER: 'Eritrea',
  ES: 'Spain',
  ET: 'Ethiopia',
  FI: 'Finland',
  FJ: 'Fiji',
  FK: 'Falkland Islands (Malvinas)',
  FM: 'Micronesia (Federated States of)',
  FO: 'Faroe Islands',
  FR: 'France',
  GA: 'Gabon',
  GB: 'United Kingdom',
  GD: 'Grenada',
  GE: 'Georgia',
  GF: 'French Guiana',
  GG: 'Guernsey',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GL: 'Greenland',
  GM: 'Gambia',
  GN: 'Guinea',
  GP: 'Guadeloupe',
  GQ: 'Equatorial Guinea',
  GR: 'Greece',
  GS: 'South Georgia and the South Sandwich Islands',
  GT: 'Guatemala',
  GU: 'Guam',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HK: 'Hong Kong',
  HM: 'Heard Island and McDonald Islands',
  HN: 'Honduras',
  HR: 'Croatia',
  HT: 'Haiti',
  HU: 'Hungary',
  ID: 'Indonesia',
  IE: 'Ireland',
  IL: 'Israel',
  IM: 'Isle of Man',
  IN: 'India',
  IO: 'British Indian Ocean Territory',
  IQ: 'Iraq',
  IR: 'Iran (Islamic Republic of)',
  IS: 'Iceland',
  IT: 'Italy',
  JE: 'Jersey',
  JM: 'Jamaica',
  JO: 'Jordan',
  JP: 'Japan',
  KE: 'Kenya',
  KG: 'Kyrgyzstan',
  KH: 'Cambodia',
  KI: 'Kiribati',
  KM: 'Comoros',
  KN: 'Saint Kitts and Nevis',
  KP: "Korea (the Democratic People's Republic of)",
  KR: 'Korea (the Republic of)',
  KW: 'Kuwait',
  KY: 'Cayman Islands',
  KZ: 'Kazakhstan',
  LA: "Lao People's Democratic Republic",
  LB: 'Lebanon',
  LC: 'Saint Lucia',
  LI: 'Liechtenstein',
  LK: 'Sri Lanka',
  LR: 'Liberia',
  LS: 'Lesotho',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  LV: 'Latvia',
  LY: 'Libya',
  MA: 'Morocco',
  MC: 'Monaco',
  MD: 'Moldova (the Republic of)',
  ME: 'Montenegro',
  MF: 'Saint Martin (French part)',
  MG: 'Madagascar',
  MH: 'Marshall Islands',
  MK: 'North Macedonia',
  ML: 'Mali',
  MM: 'Myanmar',
  MN: 'Mongolia',
  MO: 'Macao',
  MP: 'Northern Mariana Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MS: 'Montserrat',
  MT: 'Malta',
  MU: 'Mauritius',
  MV: 'Maldives',
  MW: 'Malawi',
  MX: 'Mexico',
  MY: 'Malaysia',
  MZ: 'Mozambique',
  NA: 'Namibia',
  NC: 'New Caledonia',
  NE: 'Niger',
  NF: 'Norfolk Island',
  NG: 'Nigeria',
  NI: 'Nicaragua',
  NL: 'Netherlands',
  NO: 'Norway',
  NP: 'Nepal',
  NR: 'Nauru',
  NU: 'Niue',
  NZ: 'New Zealand',
  OM: 'Oman',
  PA: 'Panama',
  PE: 'Peru',
  PF: 'French Polynesia',
  PG: 'Papua New Guinea',
  PH: 'Philippines',
  PK: 'Pakistan',
  PL: 'Poland',
  PM: 'Saint Pierre and Miquelon',
  PN: 'Pitcairn',
  PR: 'Puerto Rico',
  PS: 'Palestine, State of',
  PT: 'Portugal',
  PW: 'Palau',
  PY: 'Paraguay',
  QA: 'Qatar',
  RE: 'Réunion',
  RO: 'Romania',
  RS: 'Serbia',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  SA: 'Saudi Arabia',
  SB: 'Solomon Islands',
  SC: 'Seychelles',
  SD: 'Sudan',
  SE: 'Sweden',
  SG: 'Singapore',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  SI: 'Slovenia',
  SJ: 'Svalbard and Jan Mayen',
  SK: 'Slovakia',
  SL: 'Sierra Leone',
  SM: 'San Marino',
  SN: 'Senegal',
  SO: 'Somalia',
  SR: 'Suriname',
  SS: 'South Sudan',
  ST: 'Sao Tome and Principe',
  SV: 'El Salvador',
  SX: 'Sint Maarten (Dutch part)',
  SY: 'Syrian Arab Republic',
  SZ: 'Eswatini',
  TC: 'Turks and Caicos Islands',
  TD: 'Chad',
  TF: 'French Southern Territories',
  TG: 'Togo',
  TH: 'Thailand',
  TJ: 'Tajikistan',
  TK: 'Tokelau',
  TL: 'Timor-Leste',
  TM: 'Turkmenistan',
  TN: 'Tunisia',
  TO: 'Tonga',
  TR: 'Turkey',
  TT: 'Trinidad and Tobago',
  TV: 'Tuvalu',
  TW: 'Taiwan',
  TZ: 'Tanzania, the United Republic of',
  UA: 'Ukraine',
  UG: 'Uganda',
  UM: 'United States Minor Outlying Islands',
  US: 'United States',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VA: 'Holy See',
  VC: 'Saint Vincent and the Grenadines',
  VE: 'Venezuela (Bolivarian Republic of)',
  VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (U.S.)',
  VN: 'Viet Nam',
  VU: 'Vanuatu',
  WF: 'Wallis and Futuna',
  WS: 'Samoa',
  YE: 'Yemen',
  YT: 'Mayotte',
  ZA: 'South Africa',
  ZM: 'Zambia',
  ZW: 'Zimbabwe'
};

const runOnce = () => {
  const notification = document.createElement('div');
  render(h(Notification, null), notification);
  document.body.append(notification);
  USER_ID = +new URLSearchParams(document.querySelector('.logininfo > a[href^="https://moodle.ksasz.ch/user/profile.php?id="]').search.slice(1)).get('id');
  GM_getValue('highest') ?? GM_setValue('highest', 1946 // highest + 10 at time of creation
  // this number only really matters for rand anyway
  );
  /* render(
    html`<link href="http://localhost:5000/Explore%20Profiles/style.css"
    type=text/css rel=stylesheet/>`,
    document.head
  ); */

  GM_addStyle('@keyframes epr-bounce{0%,80%,to{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.epr-notification{width:100%;height:100%;z-index:10001;user-select:none;position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center}.epr-notification .epr-centered{border:2px solid #ced4da;background-color:#fff;border-radius:3px;padding:2% 4%}.epr-notification .epr-text-center{text-align:center}.epr-coloured{color:#1177d1}.epr-spinner{width:100%;text-align:center}.epr-spinner>div{width:18px;height:18px;background-color:currentColor;border-radius:100%;display:inline-block;-webkit-animation:epr-bounce 1.4s infinite ease-in-out both;animation:epr-bounce 1.4s infinite ease-in-out both}.epr-spinner .bounce1{animation-delay:-.32s}.epr-spinner .bounce2{animation-delay:-.16s}');
  const buttons = document.createElement('div');
  buttons.classList.add('btn-group');
  render([h("button", {
    "data-action": "-1",
    "class": "btn btn-secondary"
  }, "Previous profile"), h("button", {
    "data-action": "1",
    "class": "btn btn-secondary"
  }, "Next profile"), h("button", {
    "data-action": "rand",
    "class": "btn btn-secondary"
  }, "Random profile"), h("button", {
    "data-action": "-10",
    "class": "btn btn-secondary"
  }, "-10 profiles"), h("button", {
    "data-action": "10",
    "class": "btn btn-secondary"
  }, "+10 profiles")], buttons);
  buttons.addEventListener('click', fetchNewProfile);
  document.querySelector('ul.navbar-nav.d-none.d-md-flex').after(buttons);
  addEventListener('popstate', fetchNewProfile);
};

let mainSetState;
let headerSetState;
let sidebarSetState;
let notificationSetState;
let initialState = {
  email: null,
  country: null,
  city: null,
  id: null,
  courses: [],
  firstaccess: null,
  lastaccess: null,
  fullname: null,
  description: null,
  url: null,
  interests: null,
  image: null
};

class Notification extends Component {
  state = {
    from: null,
    to: null
  };
  componentDidMount = () => {
    notificationSetState = data => {
      this.setState(data);
    };
  };
  render = (_props, {
    from,
    to
  }) => from !== null && h("div", {
    "class": "epr-notification"
  }, h("div", {
    "class": "epr-centered"
  }, h("div", {
    "class": "epr-spinner"
  }, h("div", {
    "class": "bounce1"
  }), h("div", {
    "class": "bounce2"
  }), h("div", {
    "class": "bounce3"
  })), h("div", {
    "class": "epr-text-center"
  }, `Checking ${to === null ? from : Math.min(to, from)}`, to !== null && ` to ${Math.max(to, from)}`)));
}

class Header extends Component {
  state = initialState;
  componentDidMount = () => {
    headerSetState = data => {
      this.setState(data);
    };
  };
  render = (_props, {
    id,
    image,
    fullname,
    firstaccess,
    lastaccess,
    isContact,
    isUserProfile
  }) => h("div", {
    "class": "col-12 pt-3 pb-3"
  }, h("div", {
    "class": "card "
  }, h("div", {
    "class": "card-body "
  }, h("div", {
    "class": "d-flex align-items-center"
  }, h("div", {
    "class": "mr-auto"
  }, h("div", {
    "class": "page-context-header"
  }, h("div", {
    "class": "page-header-image"
  }, h("a", {
    href: `https://moodle.ksasz.ch/user/profile.php?id=${id}`,
    "class": "d-inline-block aabtn"
  }, h("img", {
    src: image,
    "class": "userpicture defaultuserpic",
    alt: `Picture of ${fullname}`,
    title: `Picture of ${fullname}`,
    width: "100",
    height: "100"
  }))), h("div", {
    "class": "page-header-headings"
  }, h("h1", null, fullname), h("h5", null, 'First accessed Moodle: ', h("span", {
    "class": "epr-coloured"
  }, dayjs.unix(firstaccess).format('ddd, D MMM YYYY HH:mm:ss'))), h("h5", null, 'Last accessed Moodle '
  /* for the trailing space*/
  , h("span", {
    "class": "epr-coloured"
  }, dayjs.unix(lastaccess).fromNow(false)), ' ago'
  /* for the leading space */
  )), h("div", {
    "class": "btn-group header-button-group"
  }, h("a", {
    id: "message-user-button",
    role: "button",
    "data-conversationid": "0",
    "data-userid": id,
    "class": "btn",
    href: `https://moodle.ksasz.ch/message/index.php?id=${id}`
  }, h("span", null, h("i", {
    "class": "icon fa fa-comment fa-fw iconsmall",
    title: "Message",
    "aria-label": "Message"
  }), h("span", {
    "class": "header-button-title"
  }, "Message"))), h("span", {
    "class": "sr-only sr-only-focusable",
    "data-region": "jumpto",
    tabIndex: "-1"
  }), isUserProfile === false && h("a", {
    "data-userid": id,
    "data-is-contact": isContact ? 1 : 0,
    id: "toggle-contact-button",
    role: "button",
    "class": "ajax-contact-button btn",
    href: `https://moodle.ksasz.ch/message/index.php?user1=${USER_ID}&user2=${id}&${isContact ? 'removecontact' : 'addcontact'}=${id}&sesskey=${M.cfg.sesskey}`
  }, h("span", null, isContact ? h("i", {
    "class": "icon fa fa-user-times fa-fw iconsmall",
    title: "Remove from contacts",
    "aria-label": "Remove from contacts"
  }) : h("i", {
    "class": "icon fa fa-address-card fa-fw iconsmall",
    title: "Add to contacts",
    "aria-label": "Add to contacts"
  }), h("span", {
    "class": "header-button-title"
  }, isContact ? 'Remove from contacts' : 'Add to contacts')), h("span", {
    "class": "loading-icon icon-no-margin"
  }, h("i", {
    "class": "icon fa fa-circle-o-notch fa-spin fa-fw ",
    title: "Loading",
    "aria-label": "Loading"
  })))))), h("div", {
    "class": "header-actions-container flex-shrink-0",
    "data-region": "header-actions-container"
  })), h("div", {
    "class": "d-flex flex-wrap"
  }, h("div", {
    id: "page-navbar"
  }, h("nav", {
    "aria-label": "Navigation bar"
  }, h("ol", {
    "class": "breadcrumb"
  }, h("li", {
    "class": "breadcrumb-item"
  }, h("a", {
    href: "https://moodle.ksasz.ch/"
  }, "Home")), h("li", {
    "class": "breadcrumb-item"
  }, "Users"), h("li", {
    "class": "breadcrumb-item"
  }, h("a", {
    href: `https://moodle.ksasz.ch/user/profile.php?id=${id}`,
    "aria-current": "page"
  }, fullname))))), h("div", {
    "class": "ml-auto d-flex"
  }, isUserProfile && [h("div", {
    "class": "singlebutton"
  }, h("form", {
    method: "post",
    action: "https://moodle.ksasz.ch/user/profile.php"
  }, h("input", {
    type: "hidden",
    name: "edit",
    value: "1"
  }), h("input", {
    type: "hidden",
    name: "reset",
    value: "1"
  }), h("input", {
    type: "hidden",
    name: "id",
    value: USER_ID
  }), h("input", {
    type: "hidden",
    name: "sesskey",
    value: M.cfg.sesskey
  }), h("button", {
    type: "submit",
    "class": "btn btn-secondary",
    id: "single_button5fcba57352eb71",
    title: ""
  }, "Reset page to default"))), h("div", {
    "class": "singlebutton"
  }, h("form", {
    method: "post",
    action: "https://moodle.ksasz.ch/user/profile.php"
  }, h("input", {
    type: "hidden",
    name: "edit",
    value: "1"
  }), h("input", {
    type: "hidden",
    name: "id",
    value: USER_ID
  }), h("input", {
    type: "hidden",
    name: "sesskey",
    value: M.cfg.sesskey
  }), h("button", {
    type: "submit",
    "class": "btn btn-secondary",
    id: "single_button5fcba57352eb72",
    title: ""
  }, "Customise this page")))]), h("div", {
    id: "course-header"
  })))));
}

class Main extends Component {
  state = initialState;
  componentDidMount = () => {
    mainSetState = data => {
      this.setState(data);
    };
  }; // copied directly from a profile

  render = (_props, {
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
    isUserProfile
  }) => h("section", {
    id: "region-main",
    "class": "region-main-content",
    "aria-label": "Content"
  }, h("span", {
    "class": "notifications",
    id: "user-notifications"
  }), h("div", {
    role: "main"
  }, h("span", {
    id: "maincontent"
  }), h("div", {
    "class": "userprofile"
  }, typeof description !== 'undefined' && description !== '' && h("div", {
    "class": "description",
    dangerouslySetInnerHTML: {
      __html: description
    }
  }), h("aside", {
    id: "block-region-content",
    "class": "block-region",
    "data-blockregion": "content",
    "data-droptarget": "1"
  }), h("div", {
    "class": "profile_tree"
  }, [email, country, city, url, interests].some(e => typeof e !== 'undefined') && h("section", {
    "class": "node_category card d-inline-block w-100 mb-3"
  }, h("div", {
    "class": "card-body"
  }, h("h3", {
    "class": "lead"
  }, "User details"), h("ul", null, typeof email !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "Email address"), h("dd", null, h("a", {
    href: `mailto:${encodeURIComponent(email)}`
  }, email)))), typeof country !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "Country"), h("dd", null, country))), typeof city !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "City/town"), h("dd", null, city))), typeof url !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "Web page"), h("dd", null, h("a", {
    href: url,
    rel: "noopener noreferrer"
  }, url)))), typeof interests !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "Interests"), h("dd", null, h("div", {
    "class": "tag_list hideoverlimit "
  }, h("ul", {
    "class": "inline-list"
  }, interests.map((e, i) => h("li", {
    key: i
  }, h("a", {
    href: `https://moodle.ksasz.ch/tag/index.php?tag=${encodeURIComponent(e)}`,
    "class": "badge badge-info"
  }, e))))))))))), Array.isArray(courses) && courses.length > 0 && h("section", {
    "class": "node_category card d-inline-block w-100 mb-3"
  }, h("div", {
    "class": "card-body"
  }, h("h3", {
    "class": "lead"
  }, "Course details"), h("ul", null, h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "Course profiles"), h("dd", null, h("ul", null, courses.map(e => h("li", {
    key: e.id
  }, h("a", {
    href: `/user/view.php?id=${id}&course=${e.id}`
  }, e.coursename)))))))))), h("section", {
    "class": "node_category card d-inline-block w-100 mb-3"
  }, h("div", {
    "class": "card-body"
  }, h("h3", {
    "class": "lead"
  }, "Miscellaneous"), h("ul", null, h("li", null, h("span", null, h("a", {
    href: `https://moodle.ksasz.ch/blog/index.php?userid=${id}`
  }, "View all blog entries"))), h("li", null, h("span", null, h("a", {
    href: `https://moodle.ksasz.ch/mod/forum/user.php?id=${id}`
  }, "Forum posts"))), h("li", null, h("span", null, h("a", {
    href: `https://moodle.ksasz.ch/mod/forum/user.php?id=${id}&mode=discussions`
  }, "Forum discussions")))))), isUserProfile && h("section", {
    "class": "node_category card d-inline-block w-100 mb-3"
  }, h("div", {
    "class": "card-body"
  }, h("h3", {
    "class": "lead"
  }, "Reports"), h("ul", null, h("li", null, h("span", null, h("a", {
    href: "https://moodle.ksasz.ch/report/usersessions/user.php"
  }, "Browser sessions"))), h("li", null, h("span", null, h("a", {
    href: `https://moodle.ksasz.ch/grade/report/overview/index.php?userid=${USER_ID}&id=1`
  }, "Grades overview")))))), h("section", {
    "class": "node_category card d-inline-block w-100 mb-3"
  }, h("div", {
    "class": "card-body"
  }, h("h3", {
    "class": "lead"
  }, "Login activity"), h("ul", null, typeof firstaccess !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "First access to site"), h("dd", null, dayjs.unix(firstaccess).format('dddd, D MMMM YYYY, H:mm'), ' (', dayjs.unix(firstaccess).fromNow(false), ")"))), typeof lastaccess !== 'undefined' && h("li", {
    "class": "contentnode"
  }, h("dl", null, h("dt", null, "Last access to site"), h("dd", null, dayjs.unix(lastaccess).format('dddd, D MMMM YYYY, H:mm'), ' (', dayjs.unix(lastaccess).fromNow(false), ")"))))))))));
}

class Sidebar extends Component {
  state = initialState;
  componentDidMount = () => {
    sidebarSetState = data => {
      this.setState(data);
    };
  };
  render = (_props, {
    isUserProfile,
    id,
    fullname
  }) => {
    if (isUserProfile) {
      return undefined;
    }

    return [h("p", {
      "class": "tree_item branch",
      role: "treeitem",
      "aria-expanded": "true",
      "aria-owns": "random5fcb9ae3999e64_group",
      tabindex: "-1",
      "aria-selected": "false"
    }, h("span", {
      tabIndex: "-1",
      id: "label_2_34"
    }, "Users")), h("ul", {
      role: "group",
      tabindex: "-1"
    }, h("li", {
      "class": "type_user depth_3 contains_branch current_branch",
      "aria-labelledby": "label_3_35",
      tabindex: "-1"
    }, h("p", {
      "class": "tree_item branch active_tree_node",
      role: "treeitem",
      "aria-expanded": "true",
      "aria-owns": "random5fcb9ae3999e65_group",
      tabindex: "-1",
      "aria-selected": "false"
    }, h("a", {
      tabindex: "-1",
      id: "label_3_35",
      href: `https://moodle.ksasz.ch/user/profile.php?id=${id}`
    }, fullname)), h("ul", {
      role: "group",
      tabindex: "-1"
    }, h("li", {
      "class": "type_container depth_4 contains_branch",
      "aria-labelledby": "label_4_36",
      tabindex: "-1"
    }, h("p", {
      "class": "tree_item branch",
      role: "treeitem",
      "aria-expanded": "false",
      "aria-owns": "random5fcb9ae3999e66_group",
      tabindex: "-1",
      "aria-selected": "false"
    }, h("span", {
      tabIndex: "-1",
      id: "label_4_36"
    }, "Blogs")), h("ul", {
      role: "group",
      "aria-hidden": "true",
      tabindex: "-1"
    }, h("li", {
      "class": "type_custom depth_5 item_with_icon",
      "aria-labelledby": "label_5_37",
      tabindex: "-1"
    }, h("p", {
      "class": "tree_item hasicon",
      role: "treeitem",
      tabindex: "-1",
      "aria-selected": "false"
    }, h("a", {
      tabindex: "-1",
      id: "label_5_37",
      href: `https://moodle.ksasz.ch/blog/index.php?userid=${id}`
    }, h("i", {
      "class": "icon fa fa-square fa-fw navicon",
      "aria-hidden": "true",
      tabIndex: "-1"
    }), h("span", {
      "class": "item-content-wrap",
      tabIndex: "-1"
    }, "View all entries by ", fullname)))))), h("li", {
      "class": "type_setting depth_4 item_with_icon",
      "aria-labelledby": "label_4_38",
      tabindex: "-1"
    }, h("p", {
      "class": "tree_item hasicon",
      role: "treeitem",
      tabindex: "-1",
      "aria-selected": "false"
    }, h("a", {
      tabindex: "-1",
      id: "label_4_38",
      href: `https://moodle.ksasz.ch/message/index.php?user1=${USER_ID}&user2=${id}`
    }, h("i", {
      "class": "icon fa fa-square fa-fw navicon",
      "aria-hidden": "true",
      tabIndex: "-1"
    }), h("span", {
      "class": "item-content-wrap",
      tabIndex: "-1"
    }, "Messages")))))))];
  };
}

const clearNode = el => {
  while (el.lastChild !== null) {
    el.lastChild.remove();
  }
};
/**
 * Listens to click on buttons
 * @param {EventListenerObject} e Event obj
 * @listens click
 */


const fetchNewProfile = async e => {
  const {
    target
  } = e;
  const isPopState = e.type === 'popstate';

  if (isPopState === false) {
    if (target.nodeName !== 'BUTTON') {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  const id = +new URL(location).searchParams.get('id');
  const action = +(target?.dataset?.action ?? 0);
  let profile;

  if (isFinite(action)) {
    const isNegative = action < 0;
    const origNewId = id + action;
    let newId = origNewId;
    let profiles = [];

    while (profiles.length === 0) {
      if (newId < 1) {
        newId = GM_getValue('highest');
      } else if (newId > GM_getValue('highest')) {
        newId = 1;
      }

      const range = newId + (isNegative ? -9 : 9);
      notificationSetState({
        from: newId,
        to: range
      });
      profiles = await getProfilesInRange(newId, isNegative ? -9 : 9 // 10 profiles so newId through newId +/- 9 (incl.)
      );
      newId += isNegative ? -10 : 10; // +/- 10 because above
    }

    const highest = profiles[profiles.length - 1];

    if (highest.id > GM_getValue('highest') - 10) {
      GM_setValue('highest', highest.id + 10);
    }

    profile = profiles.find(({
      id
    }) => id === origNewId);

    if (!profile) {
      if (isNegative) {
        profile = profiles.pop();
      } else {
        profile = profiles[0];
      }
    }
  } else {
    let profiles = [];

    while (profiles.length === 0) {
      const randProfile = Math.floor(Math.random() * (GM_getValue('highest') + 1)) + 1;
      notificationSetState({
        from: randProfile,
        to: null
      });
      profiles = await getProfilesInRange(randProfile, 0);
    }

    profile = profiles[0];
  }

  if (isPopState === false) {
    const url = new URL(location);
    url.searchParams.set('id', profile.id);
    history.pushState({}, '', url);
  }

  notificationSetState({
    from: null,
    to: null
  });
  document.title = `${profile.fullname}: Public profile`;

  if (typeof CONTACTS === 'undefined') {
    CONTACTS = (await fetch('https://moodle.ksasz.ch/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_message_get_user_contacts', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: `userid=${USER_ID}&wsfunction=core_message_get_user_contacts&wstoken=f115c49a1e7095268eef4dc43b27bde4`,
      method: 'POST'
    }).then(e => e.json())).map(({
      id
    }) => id);
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


  const isUserProfile = profile.hasOwnProperty('preferences');
  const isContact = CONTACTS.indexOf(profile.id) !== -1;
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
    country: COUNTRY_CODES[profile.country],
    courses: profile.enrolledcourses?.map(({
      id,
      fullname
    }) => ({
      id,
      coursename: unescapeHTML(fullname.trim())
    })),
    fullname: profile.fullname?.trim(),
    interests: profile.interests?.split(',')?.map(e => e.trim()),
    image: profile.profileimageurl
  };

  if (typeof mainSetState === 'function') {
    mainSetState(state);
    headerSetState(state);
    sidebarSetState(state);
  } else {
    initialState = state;
    const regionMainBox = document.getElementById('region-main-box');
    const pageHeader = document.getElementById('page-header');
    clearNode(pageHeader);
    clearNode(regionMainBox);
    render(h(Main, null), regionMainBox);
    render(h(Header, null), pageHeader);
    let li = document.querySelector('li[aria-labelledby="label_2_34"]') ?? document.querySelector('li[aria-labelledby="label_2_31"]');

    if (li) {
      clearNode(li);
    } else {
      li = document.createElement('li');
      li.className = 'type_system depth_2 contains_branch';
      li.setAttribute('aria-labelledby', 'label_2_34');
      li.tabIndex = -1;
      document.querySelector('li[aria-labelledby="label_2_4"]').after(li);
    }

    render(h(Sidebar, null), li);
  }
};
/**
 *
 * @param {number} start Start value
 * @param {number} range range to find more profiles in
 * @example start = 1940, range = -9, will return profiles 1931 up to and including 1940
 */


const getProfilesInRange = async (start, range) => {
  let lower = start;
  let upper = start + range;

  if (lower > upper) {
    [lower, upper] = [upper, lower];
  }

  const bodyParams = new URLSearchParams();

  for (let i = 0; i <= upper - lower; i++) {
    bodyParams.set(`userlist[${i}][userid]`, lower + i);
    bodyParams.set(`userlist[${i}][courseid]`, 32 // allgemeine informationen
    );
  }

  bodyParams.set('wsfunction', 'core_user_get_course_user_profiles');
  bodyParams.set('wstoken', await login());
  const response = await fetch('https://moodle.ksasz.ch/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_user_get_course_user_profiles', {
    method: 'POST',
    body: bodyParams.toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(e => e.json());

  if (Array.isArray(response) === false && response.hasOwnProperty('errorcode')) {
    logout();
    return getProfilesInRange(start, range);
  }

  return response;
};

const login = async () => {
  const tmToken = GM_getValue('token');
  const last = GM_getValue('lastValidatedToken');

  if (typeof tmToken !== 'undefined' && new Date().getTime() - last < 1000 * 60 * 60 * 3) {
    // 3 hours
    return tmToken;
  }

  const username = getVal('username', 'Username');
  const password = getVal('password', 'Password');
  const loginParams = new URLSearchParams();
  loginParams.set('username', username);
  loginParams.set('password', password);
  loginParams.set('service', 'moodle_mobile_app');
  const response = await fetch('/login/token.php', {
    method: 'POST',
    body: loginParams.toString(),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(e => e.json());

  if (response.hasOwnProperty('errorcode')) {
    logout(true);
    return login();
  }

  GM_setValue('token', response.token);
  GM_setValue('lastValidatedToken', new Date().getTime());
  return response.token;
};

const logout = removeCredentials => {
  ['token', 'lastValidatedToken'].map(GM_deleteValue);

  if (removeCredentials === true) {
    ['username', 'password'].map(GM_deleteValue);
  }
};

const getVal = (valName, promptMsg) => {
  const tmVal = GM_getValue(valName);

  if (typeof tmVal !== 'undefined') {
    return tmVal;
  }

  const promptedVal = prompt(promptMsg);
  GM_setValue(valName, promptedVal);
  return promptedVal;
};

const unescapeHTML = val => `${val}`.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, // second one just in case
//                   because i don't know how moodle escapes apostrophies
"'");

document.readyState === 'complete' ? runOnce() : addEventListener('DOMContentLoaded', runOnce, {
  once: true
});