var minesLeft = document.getElementById("minesLeft");
var minesLNum = 10;
var restartButton = document.getElementById("restartButton");
var boxes = document.querySelectorAll("div>div>div");
var win = document.getElementById("win");
var zero = document.getElementById("zero");
var loseSound = document.getElementById("loseSound");
var winSound = document.getElementById("winSound");
var wowSound = document.getElementById("wowSound");
var nMin = document.getElementById("nMin");
var test = document.getElementById("test");
var mineArray = [];
var mineFlaggedArray = [];
var winOrLostYet = false;
var balls = [];
restartButton.addEventListener("click", gameStart);
nMin.addEventListener("input", changeTest);
gameStart();

function changeTest() {
    test.innerHTML = "Test: " + this.value;
}

function dotheballs(array) {
    for (var i = 0; i < boxes.length; i++) {
        array.push(i);
    }
    shuffle(array);
}

function shuffle(array) {
    for (var i = 0; i < 100; i++) {
        var random = Math.floor(Math.random() * array.length);
        var random2 = Math.floor(Math.random() * array.length);
        var extracup = array[random];
        array[random] = array[random2];
        array[random2] = extracup;
    }
}

function gameStart() {
    win.innerHTML = "";
    win.style.display = "none";
    winOrLostYet = false;
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.add("squareO");
        for (var k = 0; k < 8; k++) {
            boxes[i].classList.remove("mines" + k);
        }
        boxes[i].classList.remove("caught");
        boxes[i].classList.remove("flaggedX");
        boxes[i].classList.remove("flagged");
        boxes[i].classList.remove("flaggedCheck");
        boxes[i].innerHTML = "";
        boxes[i].addEventListener("mousedown", makeNumber);
        boxes[i].addEventListener("contextmenu", disableContextMenu);
    }

    balls = [];
    mineArray = [];
    mineFlaggedArray = [];
    minesLNum = nMin.value;
    minesLeft.innerHTML = "Mines Left: " + minesLNum;
    dotheballs(balls);
    for (var i = 0; i < minesLNum; i++) {
        mineArray.push(boxes[balls[i]]);
    }
}

function makeNumber() {
    if (winOrLostYet != true) {
        if (event.buttons == 1) { // check if the left mouse button is pressed
            var toS = 0;
            for (var i = 0; i < 8; i++) {
                if (this.classList.contains("mines" + i)) {
                    toS += 1;
                }
                if (this.classList.contains("flagged")) {
                    toS += 1;
                }
            }
            if (toS == 0) {
                var squareToLeft = getSquareToLeft(this); // will be null if square is on left edge
                var squareToRight = getSquareToRight(this); // will be null if square is on right edge
                var squareAbove = getSquareAbove(this); // will be null if square is in first row
                var squareBelow = getSquareBelow(this); // will be null if square is in last row
                var squareUpLeftDia = getSquareUpLeftDia(this);
                var squareDownLeftDia = getSquareDownLeftDia(this);
                var squareUpRightDia = getSquareUpRightDia(this);
                var squareDownRightDia = getSquareDownRightDia(this);
                var minesNum = 0;
                var toSeeArray = [this, squareToLeft, squareToRight, squareAbove, squareBelow, squareUpLeftDia, squareDownLeftDia,
                    squareDownRightDia, squareUpRightDia
                ];
                for (var i = 0; i < toSeeArray.length; i++) {
                    if (toSeeArray[i] != null) {
                        for (var j = 0; j < mineArray.length; j++) {
                            if (toSeeArray[i] == mineArray[j]) {
                                if (toSeeArray[i] == this) {
                                    youLose();
                                    return;
                                }
                                else {
                                    minesNum += 1;
                                }
                            }
                        }

                    }
                }
                if (minesNum >= 4) {
                    wowSound.play();
                }
                if (minesNum != 0) {
                    this.innerHTML = minesNum;
                }
                else {
                    for (var i = 1; i < toSeeArray.length; i++) {
                        if (toSeeArray[i] != null) {
                            if (!toSeeArray[i].classList.contains("mines0") && !toSeeArray[i].classList.contains("flagged")) {
                                checking0(toSeeArray[i]);
                            }
                        }
                    }
                }
                this.classList.add("mines" + minesNum);
                checkIfWon();
            }
        }
        else if (event.buttons == 2) {
            var toSee = 0;
            for (var i = 0; i < 8; i++) {
                if (this.classList.contains("mines" + i)) {
                    toSee += 1;
                }
            }
            if (toSee == 0) {
                if (this.classList.contains("flagged")) {
                    this.classList.remove("flagged");
                    minesLNum += 1;
                    for (var i = 0; i < mineFlaggedArray.length; i++) {
                        if (mineFlaggedArray[i] == this) {
                            mineFlaggedArray.splice(i, 1);
                            break;
                        }
                    }
                }
                else {
                    this.classList.add("flagged");
                    minesLNum -= 1;
                    mineFlaggedArray.push(this);
                }
                minesLeft.innerHTML = "Mines Left: " + minesLNum;
                checkIfWon();
            }
        }
    }
}

function checking0(square) {
    if (square != null) {
        var squareToLeft = getSquareToLeft(square); // will be null if square is on left edge
        var squareToRight = getSquareToRight(square); // will be null if square is on right edge
        var squareAbove = getSquareAbove(square); // will be null if square is in first row
        var squareBelow = getSquareBelow(square); // will be null if square is in last row
        var squareUpLeftDia = getSquareUpLeftDia(square);
        var squareDownLeftDia = getSquareDownLeftDia(square);
        var squareUpRightDia = getSquareUpRightDia(square);
        var squareDownRightDia = getSquareDownRightDia(square);
        var minesNum = 0;
        var dArray = [square, squareToLeft, squareToRight, squareAbove, squareBelow, squareUpLeftDia, squareDownLeftDia,
            squareDownRightDia, squareUpRightDia
        ];
        for (var i = 0; i < dArray.length; i++) {
            if (dArray[i] != null) {
                for (var j = 0; j < mineArray.length; j++) {
                    if (dArray[i] == mineArray[j]) {
                        minesNum += 1;
                    }
                }
            }
        }
        square.classList.add("mines" + minesNum);
        if (minesNum >= 4) {
            wowSound.play();
        }
        if (minesNum != 0) {
            square.innerHTML = minesNum;
        }
        else {
            for (var i = 1; i < dArray.length; i++) {
                if (dArray[i] != null) {
                    if (!dArray[i].classList.contains("mines0") && !dArray[i].classList.contains("flagged")) { // if it has the 0 class or if it is flagged don't recursion
                        checking0(dArray[i]);
                    }
                }
                zero.play();
            }
        }
    }
}

function checkIfWon() {
    var toW = 0;
    var allR = 0;
    for (var i = 0; i < boxes.length; i++) {
        toW = 0;
        for (var j = 0; j < 8; j++) {
            if (boxes[i].classList.contains("mines" + j)) {
                toW += 1;
            }
            third:
                for (var k = 0; k < mineFlaggedArray.length; k++) {
                    if (boxes[i] == mineFlaggedArray[k]) {
                        toW += 1;
                        break third;
                    }
                }
        }
        if (toW >= 1) {
            allR += 1;
        }
    }
    //console.log(allR);
    if (allR == 81 && minesLNum == 0) { // mines Number have to be 0 in order to win
        for (var i = 0; i < mineFlaggedArray.length; i++) {
            mineFlaggedArray[i].classList.add("flaggedCheck");
        }
        winOrLostYet = true;
        win.style.display = "inline-block";
        win.innerHTML = "You win!";
        winSound.play();
    }
}

function youLose() {
    //var newArray = [];
    for (var i = 0; i < mineArray.length; i++) {
        if (!mineArray[i].classList.contains("flagged")) {
            mineArray[i].classList.add("caught");
        }
    }
    for (var i = 0; i < mineArray.length; i++) {
        for (var j = 0; j < mineFlaggedArray.length; j++) {
            if (mineFlaggedArray[j] != mineArray[i]) {
                mineFlaggedArray[j].classList.add("flaggedX");
            }
            else {
                mineFlaggedArray[j].classList.add("flaggedCheck");
            }
        }
    }
    win.innerHTML = "You lose!";
    win.style.display = "inline-block";
    winOrLostYet = true;
    setTimeout(function() {
        loseSound.play();
    }, 1250);
}

function disableContextMenu(event) {
    // the default browser action is to show the context menu
    // this prevents the default browser action from happening
    event.preventDefault();
}

function getSquareUpLeftDia(square) {
    var row = square.parentElement; // get the row of the square
    var rowAbove = row.previousElementSibling; // get the row above the square

    if (rowAbove == null) {
        return null; // square is in first row, so there is no square above
    }
    else {
        var x = square.getAttribute("data-x"); // get the x coordinate of the square
        x = parseInt(x, 10); // convert x from a string to an integer

        return rowAbove.children[x - 1]; // return the square in the row above with the same x coordinate
    }
}

function getSquareDownLeftDia(square) {
    var row = square.parentElement; // get the row of the square
    var rowAbove = row.nextElementSibling; // get the row above the square

    if (rowAbove == null) {
        return null; // square is in first row, so there is no square above
    }
    else {
        var x = square.getAttribute("data-x"); // get the x coordinate of the square
        x = parseInt(x, 10); // convert x from a string to an integer

        return rowAbove.children[x - 1]; // return the square in the row above with the same x coordinate
    }
}

function getSquareUpRightDia(square) {
    var row = square.parentElement; // get the row of the square
    var rowAbove = row.previousElementSibling; // get the row above the square

    if (rowAbove == null) {
        return null; // square is in first row, so there is no square above
    }
    else {
        var x = square.getAttribute("data-x"); // get the x coordinate of the square
        x = parseInt(x, 10); // convert x from a string to an integer

        return rowAbove.children[x + 1]; // return the square in the row above with the same x coordinate
    }
}

function getSquareDownRightDia(square) {
    var row = square.parentElement; // get the row of the square
    var rowAbove = row.nextElementSibling; // get the row above the square

    if (rowAbove == null) {
        return null; // square is in first row, so there is no square above
    }
    else {
        var x = square.getAttribute("data-x"); // get the x coordinate of the square
        x = parseInt(x, 10); // convert x from a string to an integer

        return rowAbove.children[x + 1]; // return the square in the row above with the same x coordinate
    }
}

function getSquareToLeft(square) {
    return square.previousElementSibling;
}

function getSquareToRight(square) {
    return square.nextElementSibling;
}

function getSquareAbove(square) {
    var row = square.parentElement; // get the row of the square
    var rowAbove = row.previousElementSibling; // get the row above the square

    if (rowAbove == null) {
        return null; // square is in first row, so there is no square above
    }
    else {
        var x = square.getAttribute("data-x"); // get the x coordinate of the square
        x = parseInt(x, 10); // convert x from a string to an integer

        return rowAbove.children[x]; // return the square in the row above with the same x coordinate
    }
}

function getSquareBelow(square) {
    var row = square.parentElement; // get the row of the square
    var rowBelow = row.nextElementSibling; // get the row below the square

    if (rowBelow == null) {
        return null; // square is in last row, so there is no square below
    }
    else {
        var x = square.getAttribute("data-x"); // get the x coordinate of the square
        x = parseInt(x, 10); // convert x from a string to an integer

        return rowBelow.children[x]; // return the square in the row below with the same x coordinate
    }
}
