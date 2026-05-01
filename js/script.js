$(document).ready(function () {
  var vibeClasses = ["", "vibe-two", "vibe-three"];
  var currentVibe = 0;

  function updateDateTime() {
    var dateTimeElement = document.getElementById("dateTime");

    if (!dateTimeElement) {
      return;
    }

    var now = new Date();
    var formattedDateTime = now.toLocaleString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    dateTimeElement.textContent = formattedDateTime;
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);

  $("#changeVibeBtn").on("click", function () {
    currentVibe = (currentVibe + 1) % vibeClasses.length;
    $("body").removeClass("vibe-two vibe-three");

    if (vibeClasses[currentVibe]) {
      $("body").addClass(vibeClasses[currentVibe]);
    }
  });

  $("#toggleToolsBtn").on("click", function () {
    $("#toolsPanel").slideToggle(450);
  });

  $("#recommendBtn").on("click", function () {
    var mood = $("#moodSelect").val();
    var recommendations = {
      focused: "Try a strategy game with deep focus music and a clean desk timer.",
      happy: "Play an arcade game, turn on upbeat pop, and keep the brightness high.",
      chill: "Choose a cozy exploration game with mellow lo-fi in the background.",
      competitive: "Queue a fast multiplayer match with high-energy electronic music."
    };

    $("#recommendationResult").hide().text(recommendations[mood] || "Select a mood to get your VYBE recommendation.").fadeIn(300);
  });

  $("#addTaskBtn").on("click", addTask);

  $("#taskInput").on("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    var taskText = $("#taskInput").val().trim();

    if (!taskText) {
      $("#taskInput").focus();
      return;
    }

    var taskItem = $("<li></li>");
    var textSpan = $("<span></span>").addClass("task-text").text(taskText);
    var completeButton = $("<button></button>").addClass("mini-btn complete-btn").text("Done");
    var deleteButton = $("<button></button>").addClass("mini-btn delete-btn").text("Delete");
    var actions = $("<div></div>").addClass("d-flex gap-2").append(completeButton, deleteButton);

    taskItem.append(textSpan, actions).hide();
    $("#taskList").append(taskItem);
    taskItem.fadeIn(250);
    $("#taskInput").val("").focus();
  }

  $("#taskList").on("click", ".complete-btn", function () {
    $(this).closest("li").toggleClass("completed");
  });

  $("#taskList").on("click", ".delete-btn", function () {
    $(this).closest("li").fadeOut(220, function () {
      $(this).remove();
    });
  });

  $("#sortBtn").on("click", function () {
    var rawNumbers = $("#numberInput").val().split(",");
    var numbers = rawNumbers
      .map(function (item) {
        return Number(item.trim());
      })
      .filter(function (item) {
        return !Number.isNaN(item);
      });

    if (!numbers.length) {
      $("#sortResult").hide().text("Please enter valid numbers separated by commas.").fadeIn(300);
      return;
    }

    numbers.sort(function (a, b) {
      return a - b;
    });

    $("#sortResult").hide().text(numbers.join(", ")).fadeIn(300);
  });

  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    var nameInput = $("#name");
    var emailInput = $("#email");
    var name = nameInput.val().trim();
    var email = emailInput.val().trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;

    $(".form-control").removeClass("is-invalid");
    $("#formMessage").removeClass("success error").text("");

    if (!name) {
      nameInput.addClass("is-invalid");
      isValid = false;
    }

    if (!emailPattern.test(email)) {
      emailInput.addClass("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      $("#formMessage").addClass("error").text("Please fix the highlighted fields.");
      return;
    }

    $("#formMessage").addClass("success").text("Thanks! Your details were submitted successfully.");
    this.reset();
  });
});
