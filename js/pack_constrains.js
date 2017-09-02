const constrains = {
	'#Pack_name': {
		maxlength: 12,
	}, '#Recipient_name': {
		placeholder: '請輸入中文姓名',
		maxlength: 12,
		pattern: '[\u4e00-\u9fa5]',
		required: 'required',
	}, '#Recipient_phone': {
		placeholder: '0987-654-321',
		pattern: '^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$',
		required: 'required',
	}, '#Content': {
		maxlength: 100,
	}
}

function addConstrains() {
	Object.keys(constrains).map((id) => {
		Object.keys(constrains[id]).map((key) => {
			$(id).attr(key, constrains[id][key])
		})
	})
}

function checkMaxWords() {
	const length = $('#Content').val().length
	const maxlength = $('#Content').attr('maxlength')

	$('#js_words').text(((maxlength - length > 0)? maxlength - length : 0))
}
