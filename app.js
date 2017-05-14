var youtube_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(query) {
  axios.get(youtube_URL, {
    params: {
      part: 'snippet',
      key: 'AIzaSyABEG1EiZyTt2kxzYWbcU2Nhka23N538Sg',
      q: query,
      maxResults: 9
    }
  }).then(displayYoutubeSearchData)
}

function displayYoutubeSearchData(response) {
  var videos = response.data.items.map(function (item) {
    var videoEl = $('.template > div').clone()
    // videoEl.find('iframe').attr('src', `https://www.youtube.com/embed/${item.id.videoId}`)
    videoEl.find('img').attr('src', item.snippet.thumbnails.high.url)
      .attr('data-video', item.id.videoId)
    return videoEl
  })
  // console.log(videos)
 $('.results').html(videos)

}

function thumbnailClickHandler() {
  $('.results').on('click', '.image-thumbnail', function() {
    var videoId = $(this).data('video')
    $('.melody-overlay').find('iframe').attr('src', `https://www.youtube.com/embed/${videoId}?version=3&enablejsapi=1`)
    $('.melody-overlay').removeClass('hidden')

  })
}

function overlayClickHandler() {
  $('.melody-overlay').on('click', function() {
    $('.melody-overlay').addClass('hidden')
    var videoSource = $('.melody-overlay').find('iframe').attr('src')
    $('.melody-overlay').find('iframe').attr('src', videoSource)
  })
}

function watchSubmit() {
  $('.name-and-search').submit(function(event) {
    event.preventDefault();
    var query = $(this).find('#search').val();
    getDataFromApi(query);
  });
}

$(function() {
  watchSubmit();
  thumbnailClickHandler();
  overlayClickHandler();
});

// $(document).ready(function() {
//     watchSubmit();
// })
