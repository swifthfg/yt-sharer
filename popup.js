function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getChannelList(authToken, userId){
    $.ajax({
       url: "https://yoncateknoloji.rocket.chat/api/v1/channels.list",
       data: {},
       type: "GET",
       beforeSend: function(xhr){
           xhr.setRequestHeader('X-Auth-Token', authToken);
           xhr.setRequestHeader('X-User-Id', userId);
      },
       success: function(res) { console.log(res); }
    });
}

document.addEventListener('DOMContentLoaded', function() {
  var yt_submit_button = document.getElementById('yt-submit');
  yt_submit_button.addEventListener('click', function() {
      var img_url = null;
      var username = document.getElementById("yt-username").value;
      var password = document.getElementById("yt-password").value;
      var commitstrip_url = "http://www.commitstrip.com/en/page/";
      var yt_rc_url = "https://yoncateknoloji.rocket.chat";
      var api_login = "/api/v1/login";
      var api_share = "/api/v1/chat.postMessage";
      var login_obj = {
          "user": username,
          "password": password
      }
      var rand_page = getRandomInt(2,50);
      var rand_offset = getRandomInt(1,21);
      $.get(commitstrip_url+rand_page.toString(), function(res) {
          strip_url = $(res).find(".excerpt")[rand_offset].getElementsByTagName("a")[0].getAttribute("href");
          $.get(strip_url, function(res) {
              img_url = $(res).find(".entry-content")[0].getElementsByTagName("p")[0]
                                                        .getElementsByTagName("img")[0].getAttribute("src");
              $.post(yt_rc_url+api_login, login_obj, function(res){
                  var authToken = res.data.authToken;
                  var userId = res.data.userId;
                  var share_obj = {
                      "roomId": "4vWAeWb4g6ddkSTGY",
                      "channel": "geyik",
                      "text": img_url,
                      "emoji": ":smirk:"
                  };
                  $.ajax({
                     url: yt_rc_url+api_share,
                     data: share_obj,
                     type: "POST",
                     beforeSend: function(xhr){
                         xhr.setRequestHeader('X-Auth-Token', authToken);
                         xhr.setRequestHeader('X-User-Id', userId);
                    },
                     success: function(res) { console.log(res); }
                  });
              });
          });
      });
  }, false);
}, false);
