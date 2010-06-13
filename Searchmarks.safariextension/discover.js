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
    )
  }
);
