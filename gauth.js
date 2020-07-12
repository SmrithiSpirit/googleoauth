
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '944947769762-aqm905hggfioqk8jp8fh6a3n1vmek7ml.apps.googleusercontent.com',
                'redirect_uri': 'https://app.yellowmessenger.com/integrations/redirect-url',
                'response_type': 'code',
                'scope': 'https://www.googleapis.com/auth/userinfo.email',
                'include_granted_scopes': 'true',
                'state': 'eyJib3QiOiJ4MTU5MDY0NDMxMDc1NSIsInNlbmRlciI6IjE3NzQ4MjM5MjAyOTE0MjQ2NDQyMjc2ODM2In0='};

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
	console.log(eventData)
	let event = JSON.parse(eventData.data);
	console.log("I want to login")
	if (event.data == "Login"){
		oauthSignIn();
	}
})
