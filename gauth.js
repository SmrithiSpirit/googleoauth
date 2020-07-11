window.addEventListener('message', function(eventData) {
	console.log(eventData)
	let event = JSON.parse(eventData.data);
	console.log("I want to login" + event)
})
