document.addEventListener('DOMContentLoaded', function() {
  if (!window.mz) {
    return
  }
  if (mz.context.filterShow) {
    // placeholder
  }
  function lazyLoadItem(el, item, callback) {
    fetch(`/collections/all?section_id=${mz.sectionId}&sort_by=mezereon:${item.handle}`)
    .then((response) => response.text())
    .then((responseText) => {
      const html = new DOMParser().parseFromString(responseText, 'text/html');
      const mzCardProduct = html.querySelector('.mz-card-product');
      callback(mzCardProduct.innerHTML);
    })
    .catch((e) => {
      console.log(e);
    });    
  }
  function afterUpdate() {
    // placeholder
  }
  function reloadSection(e) {
    if (e.detail.sectionId !== mz.sectionId){
      return
    }
    mz.initializeVueApp()
  }
  function closeSearch() {
    document.querySelector('.search-modal__close-button').click()
  }
  if (mz.app && mz.app.$bus) {
    mz.app.$bus.on('after-update', afterUpdate)
    mz.app.$bus.on('lazy-load-item', lazyLoadItem)    
    if (Shopify.designMode) {
      document.addEventListener('shopify:section:load', (e) => reloadSection(e))
    }
  }
  if (mz.suggest && mz.suggest.$bus) {
    mz.suggest.$bus.on('run-query', closeSearch)
  }
})
