
$(document).ready(function(){
  $('img').hover(function(e){
    $(e.target)
      .closest('.painting')
      .find('.painting-title')
      .fadeIn('slow')
  }, function(e){
    $(e.target)
      .closest('.painting')
      .find('.painting-title')
      .fadeOut('fast')
  });
})
