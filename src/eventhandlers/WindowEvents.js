function addWindowResizer(store) {
(function() {
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle("resize", "optimizedResize");
})();

// handle event
window.addEventListener("optimizedResize", function() {
  // console.log("Resource conscious resize callback!");
});

var optimizedResize = (function() {

  var callbacks = [],
    running = false;

  // fired on resize event
  function resize() {

    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }

  }

  // run the actual callbacks
  function runCallbacks() {

    callbacks.forEach(function(callback) {
      callback();
    });

    running = false;
  }

  // adds callback to loop
  function addCallback(callback) {

    if (callback) {
      callbacks.push(callback);
    }

  }

  return {
    // public method to add additional callback
    add: function(callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    }
  }
}());

// start process
optimizedResize.add(function() {
  // console.log('Resource conscious resize callback!')
});

(function() {

  window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  function actualResizeHandler() {
    let svgW = window.innerHeight;
    let listW = (window.innerWidth - svgW)*0.95;
    if ((listW/window.innerWidth) < 0.26) {
      svgW = window.innerWidth*0.7;
      listW = window.innerWidth*0.27;
    }
    store.svgWidth = svgW;
    store.svgHeight = svgW;
    store.listWidth = listW;

    store.bubblesStore.saveAllCoordsToOriginalCoords();
    store.papersStore.saveAllCoordsToOriginalCoords();
  }

}());
}

export default addWindowResizer;