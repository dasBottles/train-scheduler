// Variables to hold data
let name;
let destination;
let firstTrain;
let frequency = 0;

$('#addTrainForm').on('submit', () => {
    event.preventDefault();
    console.log('hi');

    name = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain = $('#firstTrain').val().trim();
    frequency = $('#freqMin').val().trim();

    db.collection('trains').add({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    $('form')[0].reset();
})

$('#currentTrain').on('click', '#toggleAddTrain', function () {
    let state = $('#addTrainForm').attr('data-visible');

    if (state === 'invisible') {
        $('#addTrainForm').addClass('visible');
        $('#addTrainForm').removeClass('invisible');
        $('#addTrainForm').attr('data-visible', 'visible')
        $('#toggleAddTrain').html('Add a Train!');
    } else {
        $('#addTrainForm').addClass('invisible');
        $('#addTrainForm').removeClass('visible');
        $('#addTrainForm').attr('data-visible', 'invisible')
        $('#toggleAddTrain').html('Dismiss');

    }
})

// Render function
const renderTrains = (doc) => {

    let nextArr;
    let minAway;

    let firstTrainNew = moment(doc.data().firstTrain, 'hh:mm').subtract(1, 'years');
    let diffTime = moment().diff(moment(firstTrainNew), "minutes");
    let remainder = diffTime % doc.data().frequency;
    minAway = doc.data().frequency - remainder;
    let nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    $('#add-row').append(`
        <tr>
            <td>${doc.data().name}</td>
            <td>${doc.data().destination}</td>
            <td>${doc.data().frequency}</td>
            <td>${nextTrain}</td>
            <td>${minAway}</td>
        </tr>
    `)
}

// Renders database to #currentSchedule in real time
db
.collection('trains')
.orderBy('name')
.onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added') {
            renderTrains(change.doc)
        }
    })
})