$(function() {
	setHomePage()
})

function setHomePage() {
	document.title = 'her - HOME'
	setHomeBlocks()
	setRecommend()
	setAd()
	setNew()
}

function setHomeBlocks() {
	$('#Content_block').empty()

	const homeBlocks = `
		<div class='block'>
			<div class='block40'>
				<div class='rec_text_40'>人氣推薦｜RECOMMEND</div>
			</div>
			<div class='block400 flex_block'>
				<div
					id='js_recommend'
					class='box700 flex_box'>
				</div>
				<div
					id='js_ad'
					class='box340'>
				</div>
			</div>
		</div>
		<div class='block20'></div>
		<div class='block'>
			<div class='block40'>
				<div class='rec_text_40'>新品推薦｜RECENT</div>
			</div>
			<div
				id='js_new'
				class='block412 flex_box'>
			</div>
		</div>
		<div class='block20'></div>
	`

	$('#Content_block').append(homeBlocks)
}

function setAd() {
	const adCovers = getData('ad').reduce((acc, cur) => {
		acc.push(cur.cover)
		return acc
	}, [])

	const length = adCovers.length

	if(length > 0) {
		$('#js_ad').append("<img src='"+ adCovers[0] +"' width='340' height='400' />")
	}

	if(length > 1) {
		let i = 1
		setInterval(function() {
			$('#js_ad img').attr('src', adCovers[i % length])
			i++
		}, 3000)
	}
}

const recommendInfo = {
	card: {
		key: 'sales',
		n: 2,
		ascOrDesc: 'desc'
	}, font: {
		key: 'sales',
		n: 1,
		ascOrDesc: 'desc'
	}, gift: {
		key: 'sales',
		n: 4,
		ascOrDesc: 'desc'
	}
}

function setRecommend() {
	const products = getDatas(recommendInfo)

	renderProductView(products, [220, 220, 160], 'js_recommend')
}

const newInfo = {
	card: {
		key: 'id',
		n: 3,
		ascOrDesc: 'desc',
	}, font: {
		key: 'id',
		n: 2,
		ascOrDesc: 'desc',
	}, gift: {
		key: 'id',
		n: 5,
		ascOrDesc: 'desc',
	}
}

function setNew() {
	const products = getDatas(newInfo)

	renderProductView(products, [196, 196, 196], 'js_new')
}

function renderProductView(data, sizes, boxId) {

	Object.keys(data).map((key, index) => {
		const size = sizes[index]
		const products = data[key].reduce((acc, cur, index) => {
			const id = cur.id
			const cover = cur.cover

			let product = `
				<div class='square${size}'>
					<img src='${cover}'
						width='${size}'
						height='${size}'>
					<button
						type='button'
						class='button_circle bgi_add_to_collection'></button>
					<button
						type='button'
						class='button_circle bgi_add_to_basket'
						onclick='addToBasket("${id}")'></button>
				</div>
			`

			return acc.concat(product)
		}, '')

		$('#' + boxId).append(products)
	})
}

function getDatas(info) {
	const datas = {}

	Object.keys(info).map((key) => {
		const i = info[key]
		datas[key] = orderByAndTakeN(i.key, i.n, i.ascOrDesc)(data[key])
	})

	return datas
}

const orderByAndTakeN = (key, n, ascOrDesc) => {
	const orderBy = R.prop(key)

	return R.pipe(
		R.sortWith([((R.toLower(ascOrDesc) === 'desc') ? R.descend(orderBy) : R.ascend(orderBy))]),
		R.take(n)
		)
}
