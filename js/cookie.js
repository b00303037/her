$(function() {
	cookie = getCookie()
})

// Object cookie
let cookie = {}

// get cookie named 'her', parse to Object & return
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
  // if cookie doesn't exist yet, set cookie with Object cookie {} & return
  setCookie(cookie, 7)
  return cookie
}

// set cookie with Object cookie
function setCookie(cookie, exdays) {
	console.log('set cookie')
  const now = new Date();
  now.setTime(now.getTime() + (exdays*24*60*60*1000));
  const expires = "expires="+ now.toUTCString();
  document.cookie = "her=" + JSON.stringify(cookie) + ";" + expires + ";path=/";
}

// add product's id to Object cookie & reset cookie
function addToBasket(id) {
	console.log('addToBasket(' + id + ')')

	const type = getType(id)

	if(type === 'card' || type === 'font') {
		cookie[type] = id
	} else if(type === 'gift') {
		if(cookie.hasOwnProperty('gifts')) {
			cookie.gifts[id] =  1
		} else {
			cookie.gifts = {}
			cookie.gifts[id] =  1
		}
	}

	setCookie(cookie, 7)

	switch(type) {
		case 'card':
			loadCard()
			break
		case 'font':
			loadFont()
			break
		case 'gift':
			loadGifts()
			break
	}
}

// remove product's id to Object cookie & reset cookie
function removeFromBasket(id) {
	console.log('removeFromBasket(' + id + ')')

	const type = getType(id)

	if(type === 'card' || type === 'font') {
		delete cookie[type]
	} else if(type === 'gift') {
		console.log('delete: '+ id)
		delete cookie.gifts[id]
		if($.isEmptyObject(cookie.gifts)) {
			delete cookie.gifts
		}
	}

	setCookie(cookie, 7)

	switch(type) {
		case 'card':
			loadCard()
			break
		case 'font':
			loadFont()
			break
		case 'gift':
			loadGifts()
			break
	}
}
