/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  loadTweets();
  $('#submit-form').on('submit', (e) => {
    const tweetText = $('#tweet-text').val();
    e.preventDefault();

    if (validate(tweetText)) {
      $('#error-container').slideUp('slow');
    }

    if (validate(tweetText)) {
      $.ajax('/tweets', {
        method: 'POST', // http method
        data: { text: tweetText }
      }).then(() => {
        loadTweets();
      });
      $('#tweet-text').val('');
      $('#chars').val('140');
    }
  });

  //Get the button
  const scrollBtn = document.getElementById('scrollButton');

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = () => {
    scrollFunction();
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      $('#scrollingNav').removeClass('navbar').addClass('nav-up');
    } else {
      $('#scrollingNav').removeClass('nav-up').addClass('navbar');
    }
  };
 

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  };

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  // calls the function when button is clicked
  $('#scrollButton').click(() => {
    topFunction();
    $('#disappear').slideDown('slow');
  });

  //makes the user tweet section scroll up when button is clicked
  $('#flip').click(() => {
    $('#disappear').slideToggle('slow');
    $('#tweet-text').focus();
  });
});

const addClass = () => {
  const errorMessage = document.getElementById('error-container');
  errorMessage.classList.add('error');
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET', dataType: 'json' }).then((tweets) => {
    renderTweets(tweets);
  });
};

const validate = (str) => {
  addClass();
  if (str.length > 140) {
    $('#error-container')
      .text(
        " ⚠  You've exceed the character count. Please try to shorten your tweet :)  ⚠"
      )
      .slideDown('slow');
    return false;
  }

  if (str.length === 0) {
    $('#error-container')
      .text(
        ' ⚠  Come on, I know you have more to say. Please input some text.  ⚠'
      )
      .slideDown('slow');
    return false;
  }
  return true;
};

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-section').prepend($tweet);
  }
};

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const markup = `
  <article class="tweet-container"> 
    <header class="tweet-header">
      <div class="user-logo-name">
      <img class="image-spacing" src="${tweet.user.avatars}">
      <h1>${tweet.user.name}</h1>
      </div>
      <h1>${tweet.user.handle}</h1>
      </header>
      <h4 class="user-tweet">${escape(tweet.content.text)}</h4>
      <hr class="solid-line">
      <footer class="tweet-days-icons">
        <p>${timeago.format(tweet.created_at)}</p>
        <div class="tweet-icons">
          <i class="fas fa-flag flag"></i>
          <i class="fas fa-retweet retweet"></i>
          <i class="fas fa-heart heart"></i>
        </div>
      </footer>
  </article> 
`;
  return markup;
};
