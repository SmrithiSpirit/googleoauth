window.addEventListener('message', function(eventData) {
	let event = JSON.parse(eventData.data);
	console.log("I want to login" + event.data.code)
})
