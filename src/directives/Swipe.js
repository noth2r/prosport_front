export default {
  name: "swipe",

  mounted(el, binding) {
    let params = binding.value;
    let firstTouch = Object; // Touchstart event
    let lastTouch = Object; // Touchend event

    function touchStart(e) {
      e.stopPropagation();

      firstTouch = e.touches[0];
    }

    function touchEnd(e) {
      e.stopPropagation();

      lastTouch = e.changedTouches[0];

      // If(swipeX >= dist) call function swipeToRightFn()
      if (
        lastTouch.clientX - firstTouch.clientX >= params.dist &&
        params.swipeToRightFn
      ) {
        params.swipeToRightFn();
      }
      // Else if(swipeX <= dist) call function swipeToLeftFn()
      else if (
        lastTouch.clientX - firstTouch.clientX <= params.dist &&
        params.swipeToLeftFn
      ) {
        params.swipeToLeftFn();
      }

      // If(swipeY >= dist) call function swipeToBotFn()
      if (
        lastTouch.clientY - firstTouch.clientY >= params.dist &&
        params.swipeToBotFn
      ) {
        params.swipeToBotFn();
      }
      // Else if(swipeY <= dist) call function swipeToTopFn()
      else if (
        lastTouch.clientY - firstTouch.clientY <= params.dist &&
        params.swipeToTopFn
      ) {
        params.swipeToTopFn();
      }
    }

    el.addEventListener("touchstart", touchStart);
    el.addEventListener("touchend", touchEnd);
  },
};
