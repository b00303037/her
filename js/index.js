$(function() {
	setHomePage()
})

function setHomePage() {
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

function setRecommend() {

}

function setAd() {

}

function setNew() {

}


function setCategory(type) {
	console.log('setCategory(' + type + ')')

	setCategoryBlocks(type)

	renderCategoryView(getData(type))
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
						id='js_order_option'
						class="rec_input163 border chi_16_30">
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
			$('#js_title').text('卡片｜CARD')
			break
		case 'font':
			$('#js_title').text('手寫字｜FONT')
			break
		case 'gift':
			$('#js_title').text('禮物｜GIFT')
			break
	}
}

function getData(type) {
	return data[type]
}

function renderCategoryView(data) {
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
