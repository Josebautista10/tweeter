/* eslint-disable no-undef */
$(document).ready(function () {
  $('#tweet-text').on('input', charCounter);
});

const charCounter = function () {
  // Finds the length of the input
  const input = $(this).val().length;
  const outputLength = 140 - input;
  $('#chars').text(outputLength);
  if (outputLength < 0) {
    // If output is less than 0 the counter and the words will turn red.
    $('#chars').css({ color: 'red' });
    $('#tweet-text').css({ color: 'red' });
  }
  if (outputLength > 0) {
    // If output is less than 0 the counter and the words will turn black again.
    $('#chars').css({ color: 'white' });
    $('#tweet-text').css({ color: 'black' });
  }

};
