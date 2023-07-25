const selectors = {
    readMoreBtn: document.querySelector('[data-readMoreBtn]'),
    readMoreContainer: document.querySelector('[data-readMoreContainer]')
  };
  class templateCollectionJS {
    constructor() {
        this.readMore();
        this.gridViews();
    }

    // Read More and Read Less
    readMore(){
        if(selectors.readMoreBtn){
            selectors.readMoreBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                let currentTarget = e.target;
                let readMoreEle = selectors.readMoreContainer.querySelector('.hidden-text');
                if(readMoreEle){ 
                    if(selectors.readMoreContainer.classList.contains('open')){
                        Utility.toggleElement(selectors.readMoreContainer, 'close');
                        currentTarget.innerHTML = 'Read More'
                    }else{
                        Utility.toggleElement(selectors.readMoreContainer, 'open');
                        currentTarget.innerHTML = 'Read Less'
                    }
                }
            });
        }
    }

    getSiblings(e) {
        // for collecting siblings
        let siblings = []; 
        // if no parent, return no sibling
        if(!e.parentNode) {
            return siblings;
        }
        // first child of the parent node
        let sibling  = e.parentNode.firstChild;
        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };

    gridViews(){
        let collectionViews = Array.from(document.querySelectorAll('[data-view-desktop]'));
        const handleClick = (e) => {
            e.preventDefault();
            collectionViews.forEach(node => {
                node.classList.remove('grid-active');
                let olddesktop = node.getAttribute('data-view-desktop');
                document.querySelector('#template-collection').classList.remove(olddesktop);
                
            });
            e.currentTarget.classList.add('grid-active');
            let newDesktop = e.currentTarget.getAttribute('data-view-desktop');
            document.querySelector('#template-collection').classList.add(newDesktop);
            document.querySelector('#template-collection').setAttribute('data-final-view',newDesktop);
        }
        collectionViews.forEach(node => {
           node.addEventListener('click', handleClick)
        });

        window.addEventListener('resize', function(event) {
            let view = document.querySelector('#template-collection').getAttribute('data-final-view');
            document.querySelectorAll('[data-view-desktop="'+view+'"]').forEach(ele => {
                ele.classList.add('grid-active');
            });
        }, true);

        
    }


}

typeof templateCollectionJS !== 'undefined' && new templateCollectionJS();



 