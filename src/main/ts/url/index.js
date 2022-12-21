function urlParse(url, parseQueryString, slashesDenoteHost) {
  return {
    hostname: 'localhost',
    protocol: 'http',
    port: '8080',
    pathname: '',
    search: '',
    hash: ''
  }
}

exports.parse = urlParse;
