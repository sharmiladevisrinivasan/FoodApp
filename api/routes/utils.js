global.Buffer = global.Buffer || require('buffer').Buffer;


if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}

global.parseToken=(token)=>{
 
  return JSON.parse(global.atob(token.split('.')[1]));
}

