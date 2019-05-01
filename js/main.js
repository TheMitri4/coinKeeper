let sideNav = document.querySelector('.side-nav');
// let sideNavShowBtn = document.querySelector('.side-nav__show-button')

// sideNavShowBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     sideNav.classList.toggle('side-nav--hidden');
//     sideNavShowBtn.classList.toggle('side-nav__show-button--left');
// });

let addButton = document.querySelector('.add-button');
let addForm = document.querySelector('.add-cost');

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    addForm.classList.toggle('hidden');
});


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

    // close.addEventListener('click', this.hide);
    container.addEventListener('click', onContainerClick);

    sidenav.addEventListener('pointerdown', onPointerDown);
    sidenav.addEventListener('pointermove', onPointerMove);
    sidenav.addEventListener('pointerup', onPointerUp);
    sidenav.addEventListener('pointercancel', onPointerUp);
    sidenav.addEventListener('pointerleave', onPointerUp);

    sideNavShowBtn.addEventListener('click', function(event){
        sidenav.classList.toggle('side-nav__content--hidden');
        // sideNavShowBtn.classList.toggle('side-nav__show-button--left');
    });

    function show() {
        sidenav.classList.remove('side-nav__content--hidden');
        // sideNavShowBtn.classList.add('side-nav__show-button--left');
    }

    function hide() {
        sidenav.classList.add('side-nav__content--hidden');
        // sideNavShowBtn.classList.remove('side-nav__show-button--left');
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
