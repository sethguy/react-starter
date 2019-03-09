var getPathVariables = () => {
  var url = window.location.href;

  var hashpath = url.substring(url.indexOf('#') + 1)

  if (hashpath.indexOf('?') > -1) {

    hashpath = url.substring(url.indexOf('#') + 1, url.indexOf('?'))

  }

  var paths = hashpath.split('/');

  return paths

}

var getQueryParams = function() {

  var url = window.location.href;
  console.log('url', url)

  var queryString = url.substring(url.indexOf('?') + 1)

  if (url.indexOf('?') > -1) {

    var splits = queryString.split('&')

    var queryParams = splits

      .map(split => split.split('='))

      .map(([name, value]) => {

        return {

          [name]: value
        }

      })

      .reduce((params, splitItem) => {

        return {
          ...params,
          ...splitItem
        }

      }, {})

    console.log('queryParams', queryParams)

    return queryParams

  } else {


    return {}
  }

}

export { getQueryParams, getPathVariables }