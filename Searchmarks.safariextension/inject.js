SearchmarksJQuery = jQuery.noConflict(true);

SearchmarksJQuery(document).ready(
  function()
  {

    SearchmarksJQuery('link').each(
      function (index)
      {
        if (this.rel == 'search' && this.type == 'application/opensearchdescription+xml')
        {
          safari.self.tab.dispatchMessage("discover-opensearch", this.href);
        }
      }
    );

    // the 'window' object in the extension toolbar does not work as you would expect -
    // it fires focus and blur events based on the toolbar, not the entire window.
    // therefore, we detect those events in this injected script instead, and dispatch
    // messages to the extension toolbar.
    SearchmarksJQuery(window).bind("focus", function()
      {
        safari.self.tab.dispatchMessage("window-focus", this.href);
      }
    );
    SearchmarksJQuery(window).bind("blur", function()
      {
        safari.self.tab.dispatchMessage("window-blur", this.href);
      }
    );

  }
);
