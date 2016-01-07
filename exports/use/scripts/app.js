const app = (function(history) {
    
    "use strict";
    
    let api = {}
    
    let pageTitle = document.title;
    
    api.dispatch = (action, store) => {
        store = store || app.store
        
        store.dispatch(action);
    }
    
    api.renderInto = (el, contents, store) => {
        store = store || app.store
        
        let state = store.getState()
        history[state.history || 'pushState'](
            state.view, 
            document.title = `${pageTitle} // ${state.view}`, 
            state.view
        )
        
        if (contents.innerHTML) {
            el.innerHTML = ''
            el.appendChild(contents)
        } else {
            el.innerHTML = contents
        }
    }
    
    let output = document.querySelector('output');
    
    api.listenTo = (store) => {
        store = store || app.store
        
        store.subscribe(
            () => {
                const id = store.getState().view;
                app.renderInto(
                    output,
                    app.views.filter(
                        (item) => item.id === (id || '1')
                    )[0].el
                ) 
            }
        )
    }
    
    window.addEventListener('popstate', 
        (evt) => {
            app.dispatch(
                {
                    type: 'render',
                    view: evt.state,
                    history: 'replaceState'
                }
            )
        }
    )
    
    return api;
    
})(history);