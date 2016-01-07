(function () {
    "use strict";
    
    const Presenter = (state, action) => {
        state = state || '1';

        if (action.type === 'render') {
            return {
                view: action.view,
                history: action.history
            }
        }
        
        return state;
    }
    
    app.store = Redux.createStore(Presenter);
    
    
    let imports = document.querySelector('[rel=import]').import
    
    app.views = Array.from( imports.querySelectorAll('[rel=import]') ).map(
         view => {
             let el = view.import.body.firstElementChild
             return {
                 id: el.id,
                 el
             }
         }
   )
})()