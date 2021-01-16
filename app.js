const app = () => {

  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  // sounds
  const sounds = document.querySelectorAll(".sound-picker button");

  //time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");

  // Get length of the circle outline with getTotalLength Function
  const outlineLength = outline.getTotalLength();

  // Duration (set in the HTML)
  let fakeDuration = 600; // default

  // Moving circle effect
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;


  // play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // select sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`;
    });
  });


  // Create a function specific to stop and play the sounds
  const checkPlaying = song => {

    // if song is paused
    if (song.paused) {
      song.play(); // play song
      video.play(); // play video
      play.src="./svg/pause.svg"; //change icon to pause
    }
    else {
      song.pause(); // pause song
      video.pause(); // pause video
      play.src="./svg/play.svg"; // change icon to play
      }
    } // end check playing function

    // animate the circle and update time
    // this runs when song is playing
    song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      let elapsed = fakeDuration - currentTime;
      let seconds = Math.floor(elapsed % 60); // once 60 seconds, set back to 0
      let minutes = Math.floor(elapsed / 60); // one minute

      // Animate the circle
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      // animate the text
      timeDisplay.textContent = `${minutes}:${seconds}`;

      if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
      }
    };

  }; // end app function


app();
