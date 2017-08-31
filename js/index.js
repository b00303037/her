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


let showingData

function setCategory(type) {
	console.log('setCategory(' + type + ')')

	setCategoryBlocks(type)

	showingData = getData(type)

	renderCategoryView('ID_ASC')
}

function setCategoryBlocks(type) {
	$('#Content_block').empty()

	const categoryBlocks = `
		<div class='box820 flex_spacebetween'>
			<div class='block40 flex_spacebetween'>
				<div
					id='js_title'
					class='rec_text_40'></div>
				<div class='rec40'>
					<select
						id='js_order'
						class="rec_input163 border chi_16_30"
						onchange='renderCategoryView(this.value)'>
		          <option value="ID_ASC">依上架時間</option>
		          <option value="SALES_DESC">依熱銷度</option>
		          <option value="PRICE_ASC">依價格：低至高</option>
		          <option value="PRICE_DESC">依價格：高至低</option>
		      </select>
				</div>
			</div>
			<div
				id='js_category'
				class='block flex_left'>
			</div>
		</div>
	`

	$('#Content_block').append(categoryBlocks)

	switch(type) {
		case 'card':
			document.title = 'her - CARD'
			$('#js_title').text('卡片｜CARD')
			break
		case 'font':
			document.title = 'her - FONT'
			$('#js_title').text('手寫字｜FONT')
			break
		case 'gift':
			document.title = 'her - GIFT'
			$('#js_title').text('禮物｜GIFT')
			break
	}
}

function getData(type) {
	return data[type]
}

function renderCategoryView(order) {
	let data

	switch(order) {
		case 'ID_ASC':
			data = orderByAndTakeN('id', -1, 'asc')(showingData)
			break
		case 'SALES_DESC':
			data = orderByAndTakeN('sales', -1, 'desc')(showingData)
			break
		case 'PRICE_ASC':
			data = orderByAndTakeN('price', -1, 'asc')(showingData)
			break
		case 'PRICE_DESC':
			data = orderByAndTakeN('price', -1, 'desc')(showingData)
			break
		default:
			data = orderByAndTakeN('id', -1, 'asc')(showingData)
	}

	$('#js_category').empty()

	const categoryContent =
		data.reduce((acc, cur) => {
			const rec_category = `
				<div class='rec_category'>
						<div class="square190">
							<img
								src='${cur.cover}'
								width='190'
								height='190' />
	            <button
	            	type='button'
								class='button_circle bgi_add_to_collection'></button>
							<button
								type='button'
								class='button_circle bgi_add_to_basket'
								onclick='addToBasket("${cur.id}")'></button>
	          </div>
	          <div class='js_name rec_text_60 chi_16_30'>${cur.name}</div>
	          <div class='js_price rec_text_40 flex_right'>$ ${cur.price}</div>
					</div>
			`
			return acc.concat(rec_category)
		}, '')

		$('#js_category').append(categoryContent)
}

const orderByAndTakeN = (key, n, ascOrDesc) => {
	const orderBy = R.prop(key)

	return R.pipe(
		R.sortWith([((R.toLower(ascOrDesc) === 'desc') ? R.descend(orderBy) : R.ascend(orderBy))]),
		R.take(n)
		)
}
