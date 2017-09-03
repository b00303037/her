const constrains = {
	'#Pack_form': {
		'onsubmit': 'event.preventDefault()'
	},
	'#Pack_name': {
		maxlength: 12,
	},
	'#Recipient_name': {
		placeholder: '請輸入中文姓名',
		maxlength: 12,
		pattern: '[\u4e00-\u9fa5]',
		required: 'required',
	},
	'#Recipient_phone': {
		placeholder: '0900-000-000',
		pattern: '^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$',
		required: 'required',
	},
	'#Recipient_postal_code input': {
		required: 'required',
	},
	'#Recipient_addr' : {
		'required': 'required',
	},
	'#Date_mailed': {
		pattern: '^[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$',
		required: 'required',
	},
	'#Sender_name': {
		placeholder: '請輸入中文姓名',
		maxlength: 12,
		pattern: '[\u4e00-\u9fa5]',
		required: 'required',
	},
	'#Sender_phone': {
		placeholder: '0900-000-000',
		pattern: '^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$',
		required: 'required',
	},
	'#Sender_postal_code input': {
		required: 'required',
	},
	'#Sender_addr' : {
		'required': 'required',
	},
	'#Content': {
		maxlength: 100,
	}
}

function addAttributes(attributes) {
	Object.keys(attributes).map((id) => {
		Object.keys(attributes[id]).map((key) => {
			$(id).attr(key, attributes[id][key])
		})
	})
}

function checkMaxWords() {
	const length = $('#Content').val().length
	const maxlength = $('#Content').attr('maxlength')

	$('#js_words').text(((maxlength - length > 0)? maxlength - length : 0))
}
