/**
 * FAQ on PDP - Above the fold
 */
let fold =
  document.getElementsByClassName('cbb-frequently-bought-container')?.offsetTop || 500;

window.addEventListener('scroll', function (e) {
  if (this.scrollY > fold - window.innerHeight) {
    if (window.runExperiment != 'fbt') {
      window.runExperiment = 'fbt';

      window._conv_q = window._conv_q || [];
      window._conv_q.push(['executeExperiment', '100433096']);
      _conv_q.push(['executeExperiment', '100433096']);

      window._conv_q.push(['triggerConversion', '100420805']);
      _conv_q.push(['triggerConversion', '100420805']);
      
      console.log("FBT run correctly")
    }
  } 
});
