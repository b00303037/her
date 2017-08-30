$(function() {
	cookie = getCookie()
})

let cookie = {}

function getCookie() {
	const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    const c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf('her=') == 0) {
    	console.log('cookie \'her\' exist')
      return JSON.parse(c.substring('her='.length, c.length));
    }
  }
  setCookie(cookie, 7)
}

function setCookie(cookie, exdays) {
	console.log('set cookie')
  const now = new Date();
  now.setTime(now.getTime() + (exdays*24*60*60*1000));
  const expires = "expires="+ now.toUTCString();
  document.cookie = "her=" + JSON.stringify(cookie) + ";" + expires + ";path=/";
}

function addToBasket(id) {
	console.log('addToBasket(' + id + ')')
	const prefix = id.slice(0, 1).toLowerCase()

	let type
	switch(prefix) {
		case 'c':
			type = 'card'
			break;
		case 'f':
			type = 'font'
			break;
		case 'g':
			type = 'gift'
			break;
	}

	if(type === 'card' || type === 'font') {
		cookie[type] = id
	} else if(type === 'gift') {
		if(cookie.hasOwnProperty('gifts')) {
			cookie.gifts[id] =  1
		} else {
			cookie = {
				gifts: {
					[id]: 1
				}
			}
		}
	}

	setHer(cookie, 7)
	loadCookieToBasket()
}

function removeFromBasket(id) {
	console.log('removeFromBasket(' + id + ')')
	const prefix = id.slice(0, 1).toLowerCase()

	let type
	switch(prefix) {
		case 'c':
			type = 'card'
			break;
		case 'f':
			type = 'font'
			break;
		case 'g':
			type = 'gift'
			break;
	}

	if(type === 'card' || type === 'font') {
		delete cookie[type]
	} else if(type === 'gift') {
		console.log('delete: '+ id)
		delete cookie.gifts[id]
		if($.isEmptyObject(cookie.gifts)) {
			delete cookie.gifts
		}
	}

	setHer(cookie, 7)
	loadCookieToBasket()
}

function loadCookieToBasket() {
	console.log('loadCookieToBasket()')
}
