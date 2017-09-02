function setPackPage() {
	setPackBlocks()
	loadCookieToPack(getPackCookie())
	addConstrains()
	checkMaxWords()
}

function setPackBlocks() {
	$('#Content_block').empty()

	const packBlocks = `
		<form
			id='Pack_form'
			class='box820 flex_block'
			method='post'>
			<div class='block40 flex_spacebetween'>
				<div class='rec_text_40'>包裹｜PACK</div>
				<div class='rec40'>
					<button
						type='button'
						class='button_roundcorner chi_16_30 bgc_gray'
						onclick='resetPack()'>清空</button>
					<button
						type='button'
						class='button_roundcorner chi_16_30 bgc_green'
						onclick='savePack()'>儲存修改</button>
					<button
						type='submit'
						form='Pack_form'
						class='button_roundcorner chi_16_30 bgc_pink'
						onclick='sendPack()'>寄出包裹</button>
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
							id='Recipient_disrict'
							data-role='district'
							data-name='recipient_disrict'
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
							id='Sender_disrict'
							data-role='district'
							data-name='recipient_disrict'
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
						class='rec_textarea800 border chi_16_30'
						onkeyup='checkMaxWords()'></textarea>
				</div>
			</div>
		</form>
	`

	$('#Content_block').append(packBlocks)

	$("#Date_mailed").datepicker({ minDate: +14 })
		.datepicker("option", "changeMonth", true)
		.datepicker("option", "changeYear", true)
		.datepicker("option", "dateFormat", "yy-mm-dd");
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

function loadCookieToPack(packCookie) {
	$('#Pack_name').val(cookie.pack.pack_name)
	$('#Date_mailed').val(cookie.pack.date_mailed)
	$('#Recipient_name').val(cookie.pack.recipient_name)
	$('#Recipient_phone').val(cookie.pack.recipient_phone)
	$('#Recipient_addrs').twzipcode({
			'readonly': true,
			'zipcodeSel': cookie.pack.recipient_postal_code
		})
	$('#Recipient_addr').val(cookie.pack.recipient_addr)
	$('#Sender_name').val(cookie.pack.sender_name)
	$('#Sender_phone').val(cookie.pack.sender_phone)
	$('#Sender_addrs').twzipcode({
			'readonly': true,
			'zipcodeSel': cookie.pack.sender_postal_code
		})
	$('#Sender_city select').val(cookie.pack.sender_city)
	$('#Sender_district select').val(cookie.pack.sender_district)
	$('#Sender_addr').val(cookie.pack.sender_addr)
	$('#Content').val(cookie.pack.content)
}

function sendPack() {
	checkPack()
}

function checkPack() {

}

function resetPack() {
	if(confirm('確認清空包裹？')) {
		$('#Pack_form')[0].reset()
		cookie.pack = {}
		setCookie(cookie, 7)
	}
}

function savePack() {
	cookie.pack.pack_name = $('#Pack_name').val()
	cookie.pack.date_mailed = $('#Date_mailed').val()
	cookie.pack.recipient_name = $('#Recipient_name').val()
	cookie.pack.recipient_phone = $('#Recipient_phone').val()
	cookie.pack.recipient_postal_code = $('#Recipient_postal_code input').val()
	cookie.pack.recipient_addr = $('#Recipient_addr').val()
	cookie.pack.sender_name = $('#Sender_name').val()
	cookie.pack.sender_phone = $('#Sender_phone').val()
	cookie.pack.sender_postal_code = $('#Sender_postal_code input').val()
	cookie.pack.sender_addr = $('#Sender_addr').val()
	cookie.pack.content = $('#Content').val()

	setCookie(cookie, 7)

	alert('儲存成功')
}
