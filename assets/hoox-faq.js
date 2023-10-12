const accordionsHolders = document.querySelectorAll('.hoox-js-accordions');

if(accordionsHolders && !!accordionsHolders.length) {
    accordionsHolders.forEach(holder => {
        const accordions = holder.querySelectorAll('.hoox-accordion');

        accordions.forEach(accordion => {
            const accordionBtn = accordion.querySelector('.hoox-accordion__header');
            const panel = accordion.querySelector('.hoox-accordion__panel');
            accordionBtn.addEventListener('click', () => {
                accordion.classList.toggle('show-text');
                panel.style.maxHeight = panel.scrollHeight + 'px';
                !accordion.classList.contains('show-text') ? panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + 40 + 'px';
            });
        })
    });
}