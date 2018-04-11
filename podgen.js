var podCount = 0;
var podContainer = document.getElementById("content");
var imgContainer = document.getElementById("image-placeholder");
var histContainer = document.getElementById("history");
var btn = document.getElementById("btn");

console.log(podContainer);
console.log(btn);

btn.addEventListener("click", function() {
  //   podContainer.innerHTML = ""; // Clear previous podcast info
  //   imgContainer.innerHTML = ""; // Clear previous podcast image

  var req = new XMLHttpRequest();
  req.open("GET", "https://virtualdominic.github.io/podcasts/podlist.json"); // Location of podcast JSON
  req.onload = function() {
    if (req.status >= 200 && req.status < 400) {
      var dataToPrint = JSON.parse(req.responseText); // Using this as the input to my function to display random podcast, tweet link, history...
      print(dataToPrint);
    } else {
      console.log("Error");
      podContainer.innerHTML = ""; // remove contents of "content" div before displaying error message
      podContainer.insertAdjacentHTML(
        "beforeend",
        "<p class='error'>It looks like there's an error with the URL, server and/or data. Let me (Dom) know and I'll get to work with a fix!</p>"
      );
    }
  };

  req.onerror = function() {
    console.log("Connection error");
    podContainer.innerHTML = ""; // remove contents of "content" div before displaying error message
    podContainer.insertAdjacentHTML(
      "beforeend",
      "<p class='error'>Connection error :( </p>"
    );
  };

  req.send();

  podCount++;

  if (podCount > 12) {
    var newHist = histContainer.innerHTML.split("<a h");
    var newHistUnshift = newHist.pop();
    histContainer.innerHTML = newHist.join("<a h");
  }
});

function print(data) {
  var podDesc = "";
  var tweetUrl = "";

  var i = Math.floor(Math.random() * data.length);

  podDesc += "<h2>" + data[i].title + " by ";
  tweetUrl +=
    "https://twitter.com/intent/tweet?text=Check out " + data[i].title + " by ";

  for (j = 0, k = data[i].author.length; j < k; j++) {
    if (j === 0) {
      podDesc += data[i].author[j];
      tweetUrl += data[i].author[j];
    } else if (j === k - 1) {
      podDesc += " & " + data[i].author[j];
      tweetUrl += " and " + data[i].author[j];
    } else {
      podDesc += ", " + data[i].author[j];
      tweetUrl += ", " + data[i].author[j];
    }
  }

  podDesc += ":</h2> <br> <p>" + data[i].desc + " #";
  tweetUrl += ". " + data[i].desc + "&hashtags=";

  for (j = 0, k = data[i].cat.length; j < k; j++) {
    if (j == 0) {
      podDesc += data[i].cat[j];
      tweetUrl += data[i].cat[j];
    } else {
      podDesc += " #" + data[i].cat[j];
      tweetUrl += "," + data[i].cat[j];
    }
  }

  podDesc += "</p>";
  tweetUrl += '"';

  var imgUrl =
    ' <a href="' +
    tweetUrl +
    '" target="blank"><img src="' +
    data[i].image +
    '" alt="' +
    data[i].title +
    ' podcast logo. Click to tweet."></a>';

  podContainer.innerHTML = ""; // Clear previous podcast info - previously called at start of button click function, but caused flickering
  imgContainer.innerHTML = ""; // Clear previous podcast image - previously called at start of button click function, but caused flickering

  podContainer.insertAdjacentHTML("beforeend", podDesc);
  imgContainer.insertAdjacentHTML("beforeend", imgUrl);
  histContainer.insertAdjacentHTML("afterbegin", imgUrl);
}
