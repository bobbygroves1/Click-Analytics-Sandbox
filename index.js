const searchClient = algoliasearch('6PZ4DAKX3S', '4039afceb67603529e515096f03b0dd1');



const search = instantsearch({
  indexName: 'movies_Production_copy1',
  searchClient,
  insightsClient: window.aa
});

const userToken = isAuthenticated
       ? currentUser.id
       : instantsearch.getInsightsAnonymousUserToken();

search.addWidgets([
    instantsearch.widgets.configure({
      "clickAnalytics": true,
      userToken
    
    }),
  
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search movies...'
  }),

  instantsearch.widgets.hits({
    container: '#hits-container',
    templates: {
      item(hit) {
        return `
          
            <button type="button" class="btn" ${
              instantsearch.insights('clickedObjectIDsAfterSearch', {
                eventName: 'Clicked On Hit',
                objectIDs: [hit.objectID]
              })
            }>
            ${hit.title}
            </button>
      
        `;
      },
    },
    
    // {
    //   item: '<button type="button" class="btn">{{{ _highlightResult.title.value }}}</button>',
    // }

    
  }),
  instantsearch.widgets.refinementList({
      container: '#refinement-list-genre',
      attribute: 'genre',
      limit: 7,
      showMore: true,
      searchable: true,
      searchablePlaceholder: 'Search genres...',
      cssClasses: {
        list: 'text-primary',}
    }),

    instantsearch.widgets.refinementList({
      container: '#refinement-list-rating',
      attribute: 'rating',
      sortBy: ["name:desc"],
      templates: {
        searchableNoResults: 'No results'
      },
      cssClasses: {
        list: 'text-primary'}

    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
    })
]);

search.start();
