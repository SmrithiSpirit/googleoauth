
  var YOUR_CLIENT_ID = '944947769762-aqm905hggfioqk8jp8fh6a3n1vmek7ml.apps.googleusercontent.com';
  var YOUR_REDIRECT_URI = 'https://app.yellowmessenger.com/integrations/redirect-url';
  var fragmentString = location.href;
console.log("fragmentString"+fragmentString)
  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
    if (params['state'] && params['state'] == 'eyJib3QiOiJ4MTU5MDY0NDMxMDc1NSIsInNlbmRlciI6IjE3NzQ4MjM5MjAyOTE0MjQ2NDQyMjc2ODM2In0=') {
      trySampleRequest();
    }
  }

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.
  function trySampleRequest() {
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
    	console.log("in if condition")
      var xhr = new XMLHttpRequest();
      xhr.open('GET',
          'https://www.googleapis.com/drive/v3/about?fields=user&' +
          'access_token=' + params['access_token']);
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
	    console.log("in else condition :::")
      oauth2SignIn();
    }
  }

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': YOUR_CLIENT_ID,
                  'redirect_uri': YOUR_REDIRECT_URI,
                  'scope': 'https://www.googleapis.com/auth/userinfo.email',
                  'state': 'eyJib3QiOiJ4MTU5MDY0NDMxMDc1NSIsInNlbmRlciI6IjE3NzQ4MjM5MjAyOTE0MjQ2NDQyMjc2ODM2In0=',
                  'include_granted_scopes': 'true',
                  'response_type': 'code',
                  'fetch_basic_profile' : 'true'
                  };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }

window.addEventListener('message', function(eventData) {
	let event = JSON.parse(eventData.data);
	console.log(event.data)  //added
	 //console.log(event.data.landingPageUrl)
	if (event.data.code == "google-login"){
		trySampleRequest();
	}
})
