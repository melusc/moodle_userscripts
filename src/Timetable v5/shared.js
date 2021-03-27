const parseTimeToString = int => {
  int = +int;

  if ( Number.isNaN( int ) ) {
    return false;
  }

  const minutes = int % 60;
  const hours = Math.floor( int / 60 );

  return `${ hours.toString().padStart(
    2,
    '0'
  ) }:${ minutes
    .toString()
    .padStart(
      2,
      '0'
    ) }`;
};

const toString = value => {
  if ( value === undefined || value === null ) {
    return '';
  }

  return value.toString();
};

// Based on lodash
let counter = 0;
const uniqueId = prefix => `${ toString( prefix ) }${ counter++ }`;

const moodleIcon = () => {
  const mediaType = 'image/svg+xml';
  const rawByteString = '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2074%2051%22%3E%3Cpath%20fill%3D%22%23f98012%22%20d%3D%22M61.9%2050.3V27.4c0-4.8-2-7.2-5.9-7.2-4%200-5.9%202.4-5.9%207.2v22.9H38.4V27.4c0-4.8-1.9-7.2-5.8-7.2-4%200-5.9%202.4-5.9%207.2v22.9H15V26.1c0-5%201.7-8.8%205.2-11.3%203-2.3%207.2-3.4%2012.4-3.4%205.3%200%209.2%201.4%2011.6%204.1%202.2-2.7%206.1-4.1%2011.8-4.1%205.2%200%209.3%201.1%2012.4%203.4%203.5%202.6%205.2%206.3%205.2%2011.3v24.3H61.9z%22%2F%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M37.6%209.5L49.2%201%2049%20.6C28.1%203.1%2018.6%204.9.7%2015.4l.2.5h1.4c-.1%201.4-.4%205-.1%2010.4-2%205.8%200%209.7%201.8%2014%20.3-4.4.3-9.3-1.1-14.1-.3-5.3%200-8.8.1-10.2h11.9s-.1%203.6.4%207c10.7%203.7%2021.4%200%2027.1-9.2-1.7-1.9-4.8-4.3-4.8-4.3z%22%2F%3E%3C%2Fsvg%3E';

  const byteString = decodeURIComponent( rawByteString );
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

  return URL.createObjectURL( blob );
};

export { parseTimeToString, uniqueId, moodleIcon };
