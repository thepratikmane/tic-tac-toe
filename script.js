// comments
//1. looping through each element in boxes and adding click eventlistener
// addeventlisterner automatically passes event object with the function is called in its second parameter (here changecolor)

//2. event object contains information like which elemnt actucally triggerd the event. This can be accssed using event.target

//3 . It is important to removeeventlistern once X or O is been inserted. If the event listener stays it will manipulate the count when the same box is clicked again.
// also, if you want to remove all event listener from an element use this function, i didn't needed in the actual code
//function removeEventListners(event) {
//     const box = event.target;
//     const new_box = box.cloneNode(true);
//     box.parentNode.replaceChild(new_box, box);

//4.  Making a copy of boxes nodelist. This way the content would also get copied (x and o) at the appopritate place in the array and the i will convert that boxes_copy array into matrix

//5. extracting text from the children nodes of the container and converting it into an array

//6. Deleting the entire matrix, because if not the over the same matrix the slice will keep adding rows in it. At every click new X or O is added in "arr". Take that arr and covert into new 2d array every time.

//8.the default values of the elements in the matrix is ''. so when empty rows of cols are checked if they are equal, they return true. We need to ignore the empty elemens when checking of the rows or cols are filled with X or O 

//9. Checking if every element in the array is the equal (return true or false)

//10. Creating a clone (not reference) or the original matrix and transposing it. After transposing we can use checkRows function on the transposed matrix to check if the elems in cols are equal

//11. Diagoan matrix will have two arrays. The first array is simple ([i][i]). In the second array i and j increment and decremt respectively.

//12. returning the first element in the array who satisfied the win condition. This way we will know who won . X or O







let container = document.querySelector('.container');
let boxes = document.querySelectorAll('.grid-item'); // returns nodelist "boxes"
let player_turn_span = document.querySelector('.player_turn span');
let player_won_span = document.querySelector('.who_won span');
let new_game = document.querySelector('.new_game');
// initialising matrix
let mat = [];


//. 4  
boxes_copy = boxes;

// 1. - adding eventlistener
boxes.forEach(box => {
    box.addEventListener('click', insertXorO);
});


let count = -1;
// 2. - inserting X or O
function insertXorO(event) {
    count++;
    if (count % 2 == 0) {
        insertX(event);
    } else {
        insertO(event);
    }

    // console.log(mat)
}

//inserting X
function insertX(event) {
    const box = event.target;
    box.innerText = "X";
    //3. removing eventlistener
    box.removeEventListener('click', insertXorO);
    player_turn_span.innerText = "O";
    codeSameForXandO();

}

//inserting O
function insertO(event) {
    player_turn_span.innerText = "O";
    const box = event.target;
    box.innerText = 'O';
    box.removeEventListener('click', insertXorO);
    player_turn_span.innerText = "X";
    codeSameForXandO();

}

let timesClicked = 0;
function codeSameForXandO() {
    if (timesClicked >= 9) {
        return player_won_span.innerText = "It's a draw";
    }

    //5. 
    let arr = Array.from(container.children, child => child.innerText);
    //6. deleting the entire matrix 
    mat = [];
    //7. converting arr to 2d array
    for (let i = 0; i < arr.length; i = i + 3) {
        mat.push(arr.slice(i, i + 3));
    }
    if (checkRows(mat)) {
        functionAfterWin();
        return player_won_span.innerText = `player ${checkRows(mat)} won`;
    } else if (checkCols(mat)) {
        functionAfterWin();
        return player_won_span.innerText = `player ${checkCols(mat)} won`;
    } else if (checkDiagonals(mat)) {
        functionAfterWin();
        return player_won_span.innerText = `player ${checkDiagonals(mat)} won`;
    } else return;

}



//12. takes the matrix and checks if elems in each array is same
function checkIfEquals(mat) {
    for (let i = 0; i < mat.length; i++) {
        if (mat[i].includes('')) continue; //8. 
        //9. Every elem eq?
        if (mat[i].every((val, i, arr) => val === arr[0])) {
            return mat[i][0]; //12. 
        } else {
            return false;
        }
    }

}

function checkRows(mat) {
    return checkIfEquals(mat);
}

function checkCols(mat) {
    //10. 
    let trans_mat = [];
    for (let i = 0; i < mat.length; i++) {
        trans_mat.push(mat[i].slice());
    }

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            trans_mat[i][j] = mat[j][i];
        }
    }
    return checkIfEquals(trans_mat);
}


function checkDiagonals(mat) {
    //11. 
    let arr_1 = [];
    let arr_2 = [];
    let diagMat = [];
    for (let i = 0; i < mat.length; i++) {
        arr_1.push(mat[i][i]);
    }
    diagMat[0] = arr_1;

    let j = mat.length - 1;
    for (let i = 0; i < mat.length; i++) {
        arr_2.push(mat[i][j]);
        j--;
    }
    diagMat[1] = arr_2;
    // console.log(diagMat);

    return checkIfEquals(diagMat);


}

function functionAfterWin() {
    //no clicking after win condition
    function disableFurtherClicking() {
        container.style.pointerEvents = 'none';
    }

    function displayNone() {
        player_turn_span.parentElement.style.display = 'none';
    }

    function showNewGameButton() {
        new_game.style.display = 'block';
        new_game.addEventListener('click', () => {
            location.reload();
        });
    }

    disableFurtherClicking();
    displayNone();
    showNewGameButton();
}



