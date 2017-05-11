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
    videoEl.find('iframe').attr('src', `https://www.youtube.com/embed/${item.id.videoId}`)
    return videoEl
  })
  // console.log(videos)
 $('.results').html(videos)
}

function watchSubmit() {
  $('.name-and-search').submit(function(event) {
    event.preventDefault();
    var query = $(this).find('#search').val();
    getDataFromApi(query);
  });
}

$(function(){watchSubmit();});
