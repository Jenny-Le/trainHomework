  var config = {
    apiKey: "AIzaSyCF55pWEBCYO8doOwffqmYRn8_W5a-WPSI",
    authDomain: "trnTime-8f3c9.firebaseapp.com",
    databaseURL: "https://traintime-8f3c9.firebaseio.com",
    projectId: "traintime-8f3c9",
    storageBucket: "traintime-8f3c9.appspot.com",
    messagingSenderId: "597308026326"
  };
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function () {
    event.preventDefault();

    var trnName = $("#t-time").val().trim();
    var trnDestination = $("#t-destination").val().trim();
    var trnTime = $("#first-time").val().trim();
    var trnFrequency = $("#t-frequency").val().trim();
    console.log(database)
    database.ref().push({
        TrainName: trnName,
        TrainDestination: trnDestination,
        TrainTime: trnTime,
        TrainFrequency: trnFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (childSnapShot) {
    var tableRow = $("<tr>");
    var tdName = $("<td>");
    tdName.text(childSnapShot.val().TrainName);
    var tdDestination = $("<td>");
    tdDestination.text(childSnapShot.val().TrainDestination);
    var tdTime = $("<td>");
    tdTime.text(childSnapShot.val().TrainTime);
    var tdFrequency = $("<td>");
    tdFrequency.text("calcuated");
    var tdNextArrival= $("<td>");
    tdNextArrival.text("$" + childSnapShot.val().TrainFrequency);
    var tdMinutesAway = $("<td>");
    tdMinutesAway.text("calculated");

    tableRow.append(tdName);
    tableRow.append(tdDestination);
    tableRow.append(tdFrequency);
    tableRow.append(tdNextArrival);
    tableRow.append(tdMinutesAway);
    $("#train-table").append(tableRow);
});