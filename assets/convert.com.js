/**
 * FAQ on PDP - Above the fold
 */
let fold =
  document.getElementById('hoox-reviews')?.parentElement?.offsetTop || 500;

window.addEventListener('scroll', function (e) {
  if (this.scrollY > fold - window.innerHeight) {
    if (window.runExperiment != 'before-after') {
      window.runExperiment = 'before-after';

      window._conv_q = window._conv_q || [];
      window._conv_q.push(['executeExperiment', '100430641']);
      _conv_q.push(['executeExperiment', '100430641']);

      console.log('Activated FAQs A/B Experiment');

      window._conv_q.push(['triggerConversion', '100418583']);
      _conv_q.push(['triggerConversion', '100418583']);
      
      console.log("before-after run correctly")
    }

    console.log(window.runExperiment);
  } 
});
