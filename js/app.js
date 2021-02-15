$(function(){

  $(document).on("keypress", function(event){
    if (event.which==32) {
      event.preventDefault();
      $("body, container").animate({
        backgroundColor: "#606060"
      })
    }
  })

})
