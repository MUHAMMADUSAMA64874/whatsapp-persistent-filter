(function () {

  var SEARCH_TEXT = "deco";
  var APPLYING = false;
  var observer = null;

  function findSearchBox() {
    return document.querySelector(
      'div[contenteditable="true"][role="textbox"]'
    );
  }

  function safelySetText(el, text) {
    if (!el || APPLYING) return;

    var current = el.textContent.trim().toLowerCase();
    if (current === text) return;

    APPLYING = true;

    // Stop observing while we mutate
    if (observer) observer.disconnect();

    el.focus();

    // Clear safely
    document.execCommand("selectAll", false, null);
    document.execCommand("delete", false, null);

    // Insert text safely (Lexical-friendly)
    document.execCommand("insertText", false, text);

    // Let React settle, then resume observing
    setTimeout(function () {
      observeSearchBox();
      APPLYING = false;
    }, 200);
  }

  function observeSearchBox() {
    var box = findSearchBox();
    if (!box) return;

    observer = new MutationObserver(function () {
      if (APPLYING) return;

      var current = box.textContent.trim().toLowerCase();
      if (current === "") {
        safelySetText(box, SEARCH_TEXT);
      }
    });

    observer.observe(box, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function waitForSearchBox() {
    var timer = setInterval(function () {
      var box = findSearchBox();
      if (box) {
        clearInterval(timer);
        safelySetText(box, SEARCH_TEXT);
        observeSearchBox();
      }
    }, 400);
  }

  waitForSearchBox();

})();
