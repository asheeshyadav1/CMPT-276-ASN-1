/*
    calculator.js 
    Description: Implementation of the "Mean", "Weighted", and "Add Row" buttons 
                 as described in the HTML file. Made the buttons function in accordance 
                 to there names. Also calculates and displays the percentage for each row.
    Author: Asheesh Yadav
    Date: May 31st, 2024
*/

// This function calculates the mean of the grades
// using the onclick method in the HTML file
function calculateMean() {
    // get grade1 and 2 from the user
    let inpGradeOne = document.querySelectorAll('input[name="grade1"]');
    let inpGradeTwo = document.querySelectorAll('input[name="grade2"]');

    let totalCalc = 0;
    //calculate the mean through all the inputs
    for (let i = 0; i < inpGradeOne.length; i++) {
        let numOne = Number(inpGradeOne[i].value);
        let numTwo = Number(inpGradeTwo[i].value);
        totalCalc += (numOne / numTwo);
    }

    // divide by the total number of inputs and multiply by 100 to get the percentage
    let meanCalc = 100*totalCalc * (1/inpGradeOne.length);
    
    if(meanCalc === Infinity){
        document.getElementById('resultant').textContent = 'ERROR: Division by zero or missing values';
    }
    else{
        // display the result under the Result heading
        document.getElementById('resultant').textContent = meanCalc.toFixed(1) + '%';
    }
}

// This function calculates the Weighted mean of the grades
// using the onclick method in the HTML file
function calculateWeighted() {
    // get grade1 & 2 + weight from the user
    let inpGradeOne = document.querySelectorAll('input[name="grade1"]');
    let inpGradeTwo = document.querySelectorAll('input[name="grade2"]');
    let inpWeight = document.querySelectorAll('input[name="weight"]');

    //initilize the counters
    let totalCalc = 0;
    let totalWeight = 0;

    //calc the weighted mean for all rows
    //calc the weight total as well
    for (let i = 0; i < inpGradeOne.length; i++) {
        //use the Number construcotr(this converts the user string value to a number value)
        let numOne = Number(inpGradeOne[i].value);
        let numTwo = Number(inpGradeTwo[i].value);
        let weight = Number(inpWeight[i].value);
        //formula for weighted mean(as seen on canvas)
        totalCalc += (numOne / numTwo) * weight;
        totalWeight += weight;
    }

    // to accuratley display the percentage, multiply by 100
    let weightedCalc = 100*(totalCalc / totalWeight);

    if(weightedCalc === Infinity){
        document.getElementById('resultant').textContent = 'ERROR: Division by zero or missing values';
    }else{
        // display the result under the Result heading
        document.getElementById('resultant').textContent = weightedCalc.toFixed(1) + '%';
    }
    
}

// This function calculates the percentage for each row
function calculatePercentageForRow(row) {
    //selct the inputs and the cell to display the percentage
    let grade1Input = row.querySelector('input[name="grade1"]');
    let grade2Input = row.querySelector('input[name="grade2"]');
    let percentCell = row.querySelector('#percent');

    // using the Number() contructor we convert string input to number input
    let grade1 = Number(grade1Input.value);
    let grade2 = Number(grade2Input.value);

    //calculate the percentage and display it
    if (grade2 !== 0) {
        let percentage = (grade1 / grade2) * 100;
        percentCell.textContent = percentage.toFixed(1) + '%';
        
      // in case of div by zero
    } else if(grade2Input.value === '0'){
        percentCell.textContent = 'ERROR: Division by zero';
    }else if(grade2 == 0){
        percentCell.textContent = 'Please enter second value';
    }

}

//This section deals with the adding rows, and the percent calculations
//copilot gave me a hand for this process(more specfically the live percentage calculation part)

//initialize the activity number
let activityNumber = 1;

// this allows for the percentages to be calculated for each row live
document.addEventListener('DOMContentLoaded', (event) => {
    let rows = document.querySelectorAll('table .gradeRow');
    rows.forEach(row => {
        let grade1Input = row.querySelector('input[name="grade1"]');
        let grade2Input = row.querySelector('input[name="grade2"]');

        if (grade1Input && grade2Input) {
            grade1Input.addEventListener('input', () => calculatePercentageForRow(row));
            grade2Input.addEventListener('input', () => calculatePercentageForRow(row));
        }
    });
});
//function to add rows
function addRow() {
    //increment the activity number
    // this is because we are adding another row to the orig row
    // so we need to inc first rather than later
    activityNumber++;
    var table = document.querySelector('table');
    //add to the bottom of the table
    var newRow = table.insertRow(-1);

    //insert the cells for each row
    //for Name
    var cell1 = newRow.insertCell(0);
    //for Short Name
    var cell2 = newRow.insertCell(1);
    //for weight
    var cell3 = newRow.insertCell(2);
    //for Grade
    var cell4 = newRow.insertCell(3);
    //for Percentage
    var cell5 = newRow.insertCell(4);

    // this is the format that will be copied to each row
    cell1.textContent = 'Activity ' + activityNumber;
    cell2.textContent = 'A' + activityNumber;
    cell3.innerHTML = '<input name="weight" type="text">';
    cell4.innerHTML = '<input name="grade1" type="text"> / <input name="grade2" type="text">';
    cell5.id = 'percent';
    cell5.textContent = '';

    //add the class to the row
    newRow.classList.add('gradeRow');

    // this is to calculate the percentage for each row
    // we have event listeners to listen for an input when the user enters there grade values
    let grade1Input = newRow.querySelector('input[name="grade1"]');
    let grade2Input = newRow.querySelector('input[name="grade2"]');
    grade1Input.addEventListener('input', () => calculatePercentageForRow(newRow));
    grade2Input.addEventListener('input', () => calculatePercentageForRow(newRow));
}

