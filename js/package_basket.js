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
			herObject.gifts = {}
			herObject.gifts[id] =  1
		}
	}

	setCookie(cookie, 7)
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

	setCookie(cookie, 7)
	loadCookieToBasket()
}

function loadCookieToBasket() {
	console.log('loadCookieToBasket()')

	if(cookie.hasOwnProperty('card')) {
		const cardId = cookie.card

		const cardData = getProductDetail(cardId)
		console.log(cardData)

		// renderBasketCardBoxView(cardData)

	} else {
		$('#Basket_card_box').html(cardBoxEmpty)
	}

	if(cookie.hasOwnProperty('font')) {
		const fontId = cookie.font

		const fontData = getProductDetail(fontId)
		console.log(fontData)

		// renderBasketFontBoxView(fontData)

	} else {
		$('#Basket_font_box').html(fontBoxEmpty)
	}

	if(cookie.hasOwnProperty('gifts')) {
		const gifts = cookie.gifts

		const giftsData = Object.keys(gifts).reduce((acc, giftId) => {

			let giftData = getProductDetail(giftId)
			giftData.quantity = gifts[giftId]
			console.log(giftData)

			acc.push(giftData)

			return acc
		}, [])

		// renderBasketGiftBoxView(giftsData)

	} else {
		$('#Basket_gift_box').html(giftBoxEmpty)
	}
}

const cardBoxEmpty = `
<div class='block220'>
	<img
		src= ${webapp + '/images/cover_card.png'}
		width='220'
		height='220' />
</div>
<div class='block60 flex_center bgc_white'>
	<img
		src= ${webapp + '/images/title_card.png'}
		width='40'
		height='40'
		class='cursor'
		onclick='setCategory("card")' />
</div>
<div class='block40 flex_spacebetween'>
	<div class='rec_text_40 chi_20'>CARD</div>
</div>
`

const fontBoxEmpty = `
<div class='block220'>
	<img
		src= ${webapp + '/images/cover_font.png'}
		width='220'
		height='220' />
</div>
<div class='block60 flex_center bgc_white'>
	<img
		src= ${webapp + '/images/title_font.png'}
		width='40'
		height='40'
		class='curosr'
		onclick='setCategory("font")' />
</div>
<div class='block40 flex_spacebetween'>
	<div class='rec_text_40 chi_20'>FONT</div>
</div>
`

const cardOrFontBoxContent = (data) => `
	<div class='square220'>
		<img src='${data.cover}'
			 width='220'
			 height='220' />
		<button
			type='button'
			class='button_circle bgi_remove_from_basket'
			onclick='removeFromBasket("${data.id}")'></button>
	</div>
	<div class='block60 flex_left bgc_white'>
		<div class='rec_text_60 chi_16_30'>${data.name}</div>
	</div>
	<div class='block40 flex_right'>
		<div class='rec_text_40 chi_20'>$ ${data.price}</div>
	</div>
`

const giftBoxEmpty = `
<div class='block220'>
	<img src= ${webapp + '/images/cover_gift.png'}
		 width='580'
		 height='220' />
</div>
<div class='block60 flex_center bgc_white'>
	<img src= ${webapp + '/images/title_gift.png'}
		 width='40'
		 height='40'
		 class='cursor'
		 onclick='setCategory(gift)' />
</div>
<div class='block40 flex_spacebetween'>
	<div class='rec_text_40 chi_20'>GIFT</div>
</div>
`

const getGiftsDataHTML = (giftsData) => {
	return giftsData.reduce((acc, gift) => acc += `
		<div class='rec60 flex_left'>
			<div class='square60'>
				<img src=''
					 width='60'
					 height='60' />
				<button
					type='button'
					class='button_circle bgi_remove_from_basket'
					onclick='removeFromBasket("${gift.id}")'></button>
			</div>
			<div class='box220'>
				<div class='rec_text_60 chi_16_30'>${gift.name}</div>
			</div>
			<div class='box90 flex_center'>
				<div class='rec_text_40'>$ ${gift.price}</div>
			</div>
			<div class='box90 flex_center'>
				<button
					type='button'
					class='square20 border bgi_minus'
					onclick='adjustGiftQuantity("${gift.id}", -1)'></button>
				<input class='rec_digit border chi_16_20 bgc_white'
					   value='${gift.quantity}'
					   disabled />
				<button
					type='button'
					class='square20 border bgi_plus'
					onclick='adjustGiftQuantity("${gift.id}", 1)'></button>
			</div>
			<div class='box90 flex_center'>
				<div class='rec_text_40'>$ ${gift.price * gift.quantity}</div>
			</div>
		</div>
	`, '')
}

const giftBoxContent = (giftsData) => `
	<div class='block280'>
		<div class='block40 flex_left bgc_lightgray'>
			<div class='box280 text_align'>商品名稱</div>
			<div class='box90 text_align'>單價</div>
			<div class='box90 text_align'>數量</div>
			<div class='box90 text_align'>小計</div>
		</div>
		<div class='block240 flex_block overflow_y bgc_white'>

			${getGiftsDataHTML(giftsData)}

		</div>
	</div>
	<div class='block40 flex_spacebetween'>
		<div class='rec_text_40 chi_20'>GIFT</div>
		<div class='rec_text_40 chi_20'>$ ${calculateGiftsSum(giftsData)}</div>
	</div>
`

function getProductDetail(id) {
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

	data[type].map((cur, index) => {
		if(cur.id === id) {
			console.log(data[type][index])
			const result = data[type][index]
			return result
		}
	})
}

function calculateGiftsSum(giftsData) {
	return giftsData.reduce((acc, gift) => {
		acc += gift.price * gift.quantity
		return acc
	}, 0)
}

function adjustGiftQuantity(id, n) {
	console.log('adjustQuantity: '+ id +', n:' + n)

	if(n===1 && cookie.gifts[id] < 6) {
		cookie.gifts[id] += 1
	}

	if(n===-1 && cookie.gifts[id] > 1) {
		cookie.gifts[id] -= 1
	}

	setCookie(cookie, 7)
	loadCookieToBasket()
}
