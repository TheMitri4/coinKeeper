let sideNav = document.querySelector('.side-nav');
// let sideNavShowBtn = document.querySelector('.side-nav__show-button')

// sideNavShowBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     sideNav.classList.toggle('side-nav--hidden');
//     sideNavShowBtn.classList.toggle('side-nav__show-button--left');
// });

let addButton = document.querySelector('.add-button');
let addForm = document.querySelector('.add-cost');

addButton.addEventListener('click', function(event){
	event.preventDefault();
	if(addForm.classList.contains('hidden')){
		addForm.classList.remove('hidden');
		addForm.classList.add('add-cost__appear');
		this.classList.add('add-button--close');
		setTimeout(() => {
			addForm.classList.remove('add-cost__appear');
		}, 400);
	}else{
		addForm.classList.add('add-cost__disappear');
		this.classList.remove('add-button--close');
		setTimeout(() => {
			addForm.classList.add('hidden');
			addForm.classList.remove('add-cost__disappear');
		}, 400);
	}
	
});

let main = document.querySelector('.main');
let swipeSideNav = new SideNavigation(sideNav);
//DragSide



function SideNavigation(el) {
	var container = el,
		sidenav = el.querySelector('.side-nav__content'),
		// close = el.querySelector('.side-nav__close'),
		startPosition = 0,
		currentPosition = 0,
		isGestureStarted = false,
		sideNavShowBtn = document.querySelector('.side-nav__show-button');

	this.hide = hide;
	this.show = show;

	// let sideSwiping = false;
	// document.addEventListener('pointerdown', function(e){
	// 	if(event.pageX < 20){
	// 		console.log('privet');
	// 		sideSwiping = true;
	// 		currentPosition = startPosition = e.pageX;
	// 		disableTransition();
	// 	}
	// });

	// document.addEventListener('pointermove', function(e){
	// 	if(!sideSwiping){
	// 		return;
	// 	}
	// 	e.preventDefault();
	// 	currentPosition = e.pageX;
	// 	requestAnimationFrame(function() {
	// 		var diff = Math.min(10, currentPosition - startPosition);
	// 		console.log(diff);
	// 		sidenav.style.transform = 'translateX(' + (-sidenav.clientWidth - diff) + 'px)';
	// 	});
	// });

	// close.addEventListener('click', this.hide);
	container.addEventListener('click', onContainerClick);

	sidenav.addEventListener('pointerdown', onPointerDown);
	sidenav.addEventListener('pointermove', onPointerMove);
	sidenav.addEventListener('pointerup', onPointerUp);
	sidenav.addEventListener('pointercancel', onPointerUp);
	sidenav.addEventListener('pointerleave', onPointerUp);

	container.addEventListener('pointerdown', onPointerDown);
	container.addEventListener('pointermove', onPointerMove);
	container.addEventListener('pointerup', onPointerUp);
	container.addEventListener('pointercancel', onPointerUp);
	container.addEventListener('pointerleave', onPointerUp);

	sideNavShowBtn.addEventListener('click', function(event){
		if(sidenav.classList.contains('side-nav__content--hidden')){
			show();
		}else{
			hide();
		}
		// sideNavShowBtn.classList.toggle('side-nav__show-button--left');
	});

	function show() {
		sidenav.classList.remove('side-nav__content--hidden');
		container.classList.remove('side-nav--hidden');
		// sideNavShowBtn.classList.add('side-nav__show-button--left');
	}

	function hide() {
		sidenav.classList.add('side-nav__content--hidden');
		// sideNavShowBtn.classList.remove('side-nav__show-button--left');
		container.classList.add('side-nav--hidden');
	}

	function onContainerClick(e) {
		// Close only on non content click
		if (e.target === container) {
			hide();
		}
	}

	/**
	 * Start drag
	 * @param {PointerEvent} e
	 */
	function onPointerDown(e) {
		currentPosition = startPosition = e.pageX;
		isGestureStarted = true;

		// Необязательно https://w3c.github.io/pointerevents/#h-implicit-pointer-capture
		sidenav.setPointerCapture(e.pointerId);

		disableTransition();
	}

	/**
	 * Move draggable element
	 * @param {PointerEvent} e
	 */
	function onPointerMove(e) {
		if (!isGestureStarted) {
			return;
		}

		currentPosition = e.pageX;
		console.log(currentPosition);
		updatePosition();
	}

	/**
	 * Stop drag
	 * @param {PointerEvent} e
	 */
	function onPointerUp(e) {
		currentPosition = e.pageX;
		isGestureStarted = false;

		sidenav.releasePointerCapture(e.pointerId);

		enableTransition();
		resetPosition();

		if (currentPosition - startPosition < -50) {
			hide();
		} else {
			show();
		}
	}

	/**
	 * Update sidenav translateX value
	 */
	function updatePosition() {
		requestAnimationFrame(function() {
			var diff = Math.min(10, currentPosition - startPosition);
			sidenav.style.transform = 'translateX(' + diff + 'px)';
		});
	}

	function resetPosition() {
		requestAnimationFrame(function() {
			sidenav.style.transform = '';
		});
	}

	function disableTransition() {
		sidenav.style.transition = 'none';
	}

	function enableTransition() {
		sidenav.style.transition = '';
	}
}

function Cost(title , categories	, price, date){
	this.title = title,
	this.price = price,
	this.date = date,
	this.categories = categories
}

function costCardTemplate(obj) {
	return {
		tag: 'li',
		cls: ['costs__item', 'cost-card'],
		content: [
			{
				tag: 'div',
				cls: 'cost-card__text-block',
				content: [
					{
						tag: 'p',
						cls: 'cost-card__text',
						content: obj.title
					},
					{
						tag: 'p',
						cls: 'cost-card__category-icon',
						content: obj.categories
					}
				]
			},
			{
				tag: 'p',
				cls: 'cost-card__price',
				content: obj.price
			},
			{
				tag: 'p',
				cls: 'cost-card__date',
				content: obj.date
			}
		]	
	}
}

function browserJSEngine(block) {
	if ((block === undefined) || (block === null) || (block === false)) {
		return document.createTextNode('');
	}
	if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
		return document.createTextNode(block.toString());
	}
	if (Array.isArray(block)) {
		return block.reduce(function(f, elem) {
			f.appendChild(browserJSEngine(elem));

			return f;
		}, document.createDocumentFragment());
	}
	var element = document.createElement(block.tag || 'div');

	element.classList.add(
		...[].concat(block.cls).filter(Boolean)
	);

	if (block.attrs) {
		Object.keys(block.attrs).forEach(function(key) {
			if(block.attrs[key] === ''){
				element.setAttribute(key, true);
			}
			element.setAttribute(key, block.attrs[key]);
		});
	}

	if (block.content) {
		element.appendChild(browserJSEngine(block.content));
	}

	return element;
}