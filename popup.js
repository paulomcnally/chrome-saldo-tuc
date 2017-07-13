$(document).ready(function() {
  $('.input').keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    // Allow: Ctrl+A
    (e.keyCode == 65 && e.ctrlKey === true) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
  
  $('.btn').on('click', function() {
    var $balance = $('.balance');
    var number = $('.input').val();

    if (number !== ''){
      $balance.addClass('loading')
        .removeClass('error')
        .text('');

      $.ajax({
        url: 'http://tuc.herokuapp.com/v2/' + number,
        type: 'GET'
      }).done(function(json) {
        $balance.removeClass('loading');

        if (json.error) {
          $balance.addClass('error').text(json.error.message);
        } else {
          $balance.text('C$ ' + json.balance);
        }
      });
    }
  });
});
