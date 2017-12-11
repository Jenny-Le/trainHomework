var config = {
    apiKey: "AIzaSyCbknc-HKGGggnd6NRadZoIlwKBC_sZ3Jk",
    authDomain: "trainproject-e52ad.firebaseapp.com",
    databaseURL: "https://trainproject-e52ad.firebaseio.com",
    projectId: "trainproject-e52ad",
    storageBucket: "trainproject-e52ad.appspot.com",
    messagingSenderId: "967996273382"
  };
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function () {
    event.preventDefault();

    var trnName = $("#t-name").val().trim();
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