function insertData() {
    const Attend = document.querySelector('.js-Attended-class');
    const value = parseInt(Attend.value); // Ensure value is a number
    const Held = document.querySelector('.js-Classes-Held');
    const value2 = parseInt(Held.value); // Ensure value2 is a number

    let result = Calculation(value, value2);
    render(result);

    let attendanceRequired = calculateAttendanceRequired(value, value2);
    let leavesAllowed = calculateLeavesAllowed(value, value2);

    renderDetailedResults(attendanceRequired, leavesAllowed);

    saveToLocalStorage(value, value2, result, attendanceRequired, leavesAllowed);
}

function Calculation(value, value2) {
    let result = (value / value2) * 100;
    return result.toFixed(2);
}

function render(result) {
    const resultElement = document.querySelector('.js-output-element');
    resultElement.innerHTML = `<p>Attendance Percentage: ${result}%</p>`;
}

function renderDetailedResults(attendanceRequired, leavesAllowed) {
    const resultElement = document.querySelector('.js-output-element');
    resultElement.innerHTML += `<p>${attendanceRequired}</p>`;
    resultElement.innerHTML += `<p>${leavesAllowed}</p>`;
}

function calculateAttendanceRequired(value = 0, value2) {
    const requiredAttendanceRatio = 0.75;
    const requiredAttendance = requiredAttendanceRatio * value2;

    const remainingClassToAttend = requiredAttendance - value;
    return remainingClassToAttend > 0
        ? `You need to attend at least ${Math.ceil(remainingClassToAttend)} more classes out of the remaining ${value2 - value} to achieve 75% attendance.`
        : 'You have already achieved 75% attendance.';
}

function calculateLeavesAllowed(value, value2) {
    const requiredAttendanceRatio = 0.75;
    const requiredAttendance = requiredAttendanceRatio * value2;

    if (value >= requiredAttendance) {
        const leavesAllowed = Math.floor(value - requiredAttendance);
        return `You can leave up to ${leavesAllowed} more classes and still maintain at least 75% attendance.`;
    } else {
        return "You do not have enough attendance to take any leaves.";
    }
}

// Local Storage Functions
function saveToLocalStorage(value, value2, result, attendanceRequired, leavesAllowed) {
    const data = {
        attendedClasses: value,
        totalClasses: value2,
        attendancePercentage: result,
        requiredAttendance: attendanceRequired,
        leavesAllowed: leavesAllowed,
    };
    localStorage.setItem('attendanceData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('attendanceData'));
    if (storedData) {
        document.querySelector('.js-Attended-class').value = storedData.attendedClasses;
        document.querySelector('.js-Classes-Held').value = storedData.totalClasses;

        render(storedData.attendancePercentage);
        renderDetailedResults(storedData.requiredAttendance, storedData.leavesAllowed);
    }
}

// Call loadFromLocalStorage on page load
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
