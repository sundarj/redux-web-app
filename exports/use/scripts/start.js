(function() {
        "use strict";
    
        if (!app) return;
        
        
        app.listenTo(app.store)
        
        let anchors = document.querySelectorAll('[data-view]')
        
        let length = anchors.length
        let index = -1
        
        while (++index < length) {
            anchors[index].addEventListener('click', 
                (evt) => {
                    app.dispatch(
                        {
                            type: 'render',
                            view: evt.target.dataset.view
                        }
                    )
                }
            )
        }
        
        app.dispatch(
            {
                type: 'render',
                view: (function() {
                    let paths = location.pathname.split('/');
                    return paths[paths.length-1]
                })(),
                history: 'replaceState'
            }
        )
        
})();