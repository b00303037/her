function setPackPage() {
	setPackBlocks()
	loadCookieToPack(getPackCookie())

	/* pack_constrains.js */
	addAttributes(events)
	addAttributes(constrains)
	checkMaxWords()
}

/*

Content 在有選卡片下才顯示
刪除卡片時移除 Content Block

*/

function setPackBlocks() {
	$('#Content_block').empty()

	const packBlocks = `
		<form
			id='Pack_form'
			class='box820 flex_block'>
			<div class='block40 flex_spacebetween'>
				<div
					id='js_title'
					class='rec_text_40'></div>
				<div class='rec40'>
					<button
						id='Reset_button'
						type='button'
						class='button_roundcorner chi_16_30 bgc_gray'>清空</button>
					<button
						id='Save_button'
						type='button'
						class='button_roundcorner chi_16_30 bgc_green'>儲存修改</button>
					<button
						id='Send_button'
						type='submit'
						form='Pack_form'
						class='button_roundcorner chi_16_30 bgc_pink'>寄出包裹</button>
				</div>
			</div>
			<div class='box400'>
				<div class='block40 flex_left bgc_lightgray'>
					<label
						for='Pack_name'
						class='rec_lable'>包裹名稱</label>
					<input
						id='Pack_name'
						name='pack_name'
						class='rec_input163 border chi_16_30' />
				</div>
				<div class='block20'></div>
				<div class='block240'>
					<div class='block40 flex_left bgc_lightgray'>
						<div class='rec_lable'>收件人</div>
					</div>
					<div class='block40 flex_left'>
						<label
							for='Recipient_name'
							class='rec_lable'>姓名</label>
						<input
							id='Recipient_name'
							name='recipient_name'
							class='rec_input163 border chi_16_30' />
					</div>
					<div class='block40 flex_left'>
						<label
							for='Recipient_phone'
							class='rec_lable'>手機</label>
						<input
							id='Recipient_phone'
							name='recipient_phone'
							class='rec_input163 border chi_16_30' />
					</div>
					<div
						id='Recipient_addrs'
						class='block40 flex_left'>
						<label
							for='Recipient_city'
							class='rec_lable'>地址</label>
						<div
							id='Recipient_postal_code'
							data-role='zipcode'
							data-name='recipient_postal_code'
							data-style='rec_digit chi_16_20'></div>
						<div
							id='Recipient_city'
							data-role='county'
							data-name='recipient_city'
							data-style='rec_input113 border chi_16_30'></div>
						<div
							id='Recipient_district'
							data-role='district'
							data-name='recipient_district'
							data-style='rec_input113 border chi_16_30'></div>
					</div>
					<div class='block80 flex_left'>
						<div class='rec_lable'></div>
						<textarea
							id='Recipient_addr'
							name='recipient_addr'
							class='rec_textarea286 border chi_16_30'></textarea>
					</div>
				</div>
			</div>

			<div class='box400'>
				<div class='block40 flex_left bgc_lightgray'>
					<label
						for='Date_mailed'
						class='rec_lable'>寄達日期</label>
					<input
						id='Date_mailed'
						name='date_mailed'
						class='rec_input163 border chi_16_30' />
				</div>
				<div class='block20'></div>
				<div class='block240'>
					<div class='block40 flex_left bgc_lightgray'>
						<div class='rec_lable'>寄件人</div>
					</div>
					<div class='block40 flex_left'>
						<label
							for='Sender_name'
							class='rec_lable'>姓名</label>
						<input
							id='Sender_name'
							name='sender_name'
							class='rec_input163 border chi_16_30' />
					</div>
					<div class='block40 flex_left'>
						<label
							for='Sender_phone'
							class='rec_lable'>手機</label>
						<input
							id='Sender_phone'
							name='sender_phone'
							class='rec_input163 border chi_16_30' />
					</div>
					<div
						id='Sender_addrs'
						class='block40 flex_left'>
						<label
							for='Sender_city'
							class='rec_lable'>地址</label>
						<div
							id='Sender_postal_code'
							data-role='zipcode'
							data-name='recipient_postal_code'
							data-style='rec_digit chi_16_20'></div>
						<div
							id='Sender_city'
							data-role='county'
							data-name='recipient_city'
							data-style='rec_input113 border chi_16_30'></div>
						<div
							id='Sender_district'
							data-role='district'
							data-name='recipient_district'
							data-style='rec_input113 border chi_16_30'></div>
					</div>
					<div class='block80 flex_left'>
						<div class='rec_lable'></div>
						<textarea
							id='Sender_addr'
							name='sender_addr'
							class='rec_textarea286 border chi_16_30'></textarea>
					</div>
				</div>
			</div>
			<div class='block20'></div>
			<div class='block'>
				<div class='block40 flex_spacebetween bgc_lightgray'>
					<label
						for='Content'
						class='rec_lable'>卡片內容</label>
					<div class='rec_text_40'>剩餘字數
						<span
							id='js_words'
							class='rec40'></span>
					字</div>
				</div>
				<div class='block100'>
					<textarea
						id= "Content"
						class='rec_textarea800 border chi_16_30'></textarea>
				</div>
			</div>
		</form>
	`
	$('#Content_block').append(packBlocks)

	// why this CAN NOT be placed after function setPackBlocks()
	$("#Date_mailed")
		.datepicker({ minDate: +14 })
		.datepicker("option", "changeMonth", true)
		.datepicker("option", "changeYear", true)
		.datepicker("option", "dateFormat", "yy-mm-dd");

	document.title = 'her - PACK'
	$('#js_title').text('包裹｜PACK')
}

function getPackCookie() {
	if(cookie.hasOwnProperty('pack')) {
		return cookie.pack
	} else {
		cookie.pack = {}
		setCookie(cookie, 7)
		return cookie.pack
	}
}

const packContents = [
		'Pack_name', 'Date_mailed',
		'Recipient_name', 'Recipient_phone', 'Recipient_addr',
		'Sender_name', 'Sender_phone', 'Sender_addr',
		'Content'
	]

function loadCookieToPack(packCookie) {
	packContents.map((name) => {
		$('#' + name).val(cookie.pack[name])
		console.log(name + ': ' + cookie.pack[name])
	})
	$('#Recipient_addrs').twzipcode({
			'readonly': true,
			'zipcodeSel': cookie.pack.Recipient_postal_code
		})
	$('#Sender_addrs').twzipcode({
			'readonly': true,
			'zipcodeSel': cookie.pack.Sender_postal_code
		})
}

const airTableUrl = 'https://api.airtable.com/v0/appX2N31o7ZsFILRK/Packs'
const headers = new Headers()

headers.append('Authorization', 'Bearer keybHkSnVMmPswTGI')
headers.append('Content-type', 'application/json')

function sendPack() {

	savePack()
	checkPack()

	if($('input:invalid').length !== 0 || $('textarea:invalid').length !== 0 || $('select:invalid').length !== 0) {
		console.log('There is something wrong')
	} else {

		const record = {
			'fields': cookie.pack
		}

		record.fields.card = cookie.card
		record.fields.font = cookie.font
		record.fields.gifts = JSON.stringify(cookie.gifts)

		fetch(airTableUrl, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(record)
		})
		.then((response) => response.json())
		.then((result) => {
			console.log(result)
			$('input:invalid').removeClass(':invalid')
			$('textarea:invalid').removeClass(':invalid')
			$('select:invalid').removeClass(':invalid')
			clearPack()
			alert('寄出成功')
		})
	}
}

function checkPack() {

}

function resetPack() {
	if(confirm('確認清空包裹嗎？')) {
		clearPack()
	}
}

function clearPack() {
	$('#Pack_form')[0].reset()
	$('#Recipient_addrs').twzipcode('reset')
	$('#Sender_addrs').twzipcode('reset')
	checkMaxWords()

	cookie.pack = {}
	setCookie(cookie, 7)
}

function savePack() {
	packContents.map((name) => {
		cookie.pack[name] = $('#' + name).val()
	})
	cookie.pack.Recipient_postal_code = $('#Recipient_postal_code input').val()
	cookie.pack.Recipient_city = $('#Recipient_city select').val()
	cookie.pack.Recipient_district = $('#Recipient_district select').val()
	cookie.pack.Sender_postal_code = $('#Sender_postal_code input').val()
	cookie.pack.Sender_city = $('#Sender_city select').val()
	cookie.pack.Sender_district = $('#Sender_district select').val()

	setCookie(cookie, 7)
}
