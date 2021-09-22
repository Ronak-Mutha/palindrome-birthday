const birthdateInput = document.querySelector('#birthdate-input');
const checkBtn = document.querySelector('#check-btn');
const output = document.querySelector('.output');

birthdateInput.addEventListener('focus', () => {
    const calenderWhiteSvg = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 24 24" ><path fill="%23f7f7f7" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>')`;
    birthdateInput.style.setProperty('--calender-svg', calenderWhiteSvg);
});

birthdateInput.addEventListener('blur', () => {
    const calenderWhiteSvg = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 24 24" ><path fill="%23161616" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>')`;
    birthdateInput.style.setProperty('--calender-svg', calenderWhiteSvg);
});


const reverseString = str => str.split('').reverse().join('');

const isStringPalindrome = str => str === reverseString(str);

const getDateAsString = date => {
    const dateInStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateInStr.day = '0' + date.day;
    } else {
        dateInStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateInStr.month = "0" + date.month;
    } else {
        dateInStr.month = date.month.toString();
    }

    dateInStr.year = date.year.toString();
    return dateInStr;
};

const getDateInAllFormats = date => {
    const ddmmyyyy = date.day + date.month + date.year;
    const mmddyyyy = date.month + date.day + date.year;
    const yyyymmdd = date.year + date.month + date.day;
    console.log
    const ddmmyy = date.day + date.month + date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

const checkPalindromeForAllDateFormats = date => {
    const allDateFormatList = getDateInAllFormats(date);

    for (listItem of allDateFormatList) {
        if (isStringPalindrome(listItem)) {
            return true;
        }
    }
    return false;
};

const isLeapYear = year => {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    if (year % 4 === 0) return true;

    return false;
};

const getNextDate = date => {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
};

const getNextPalindromeDate = date => {
    let nextDate = getNextDate(date);
    let ctr = 0;

    while (true) {
        ctr++;
        const dateString = getDateAsString(nextDate);
        const isPalindrome = checkPalindromeForAllDateFormats(dateString);
        if (isPalindrome) {
            return [ctr, nextDate];
        }
        nextDate = getNextDate(nextDate);
    }

};

const getPreviousDate = date => {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year
    };
};

const getPreviousPalindromeDate = date => {
    let previousDate = getPreviousDate(date);
    let ctr = 0;

    while (true) {
        ctr++;
        const dateString = getDateAsString(previousDate);
        const isPalindrome = checkPalindromeForAllDateFormats(dateString);
        if (isPalindrome) {
            return [ctr, previousDate];
        }
        previousDate = getPreviousDate(previousDate);
    }
}


const clickHandler = e => {
    const birthdateString = birthdateInput.value;

    if(!birthdateString) {
        output.innerText = "Please fill your birthdate in input field";
        return 
    }

        const [yyyy, mm, dd] = birthdateString.split("-");

        const date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };

        const dateString = getDateAsString(date);
        const isPalindrome = checkPalindromeForAllDateFormats(dateString);

        if (!isPalindrome) {
            const [ctr1, nextDate] = getNextPalindromeDate(date);
            const [ctr2, prevDate] = getPreviousPalindromeDate(date);

            if (ctr1 > ctr2) {
                output.innerText = `The nearest palindrome date is ${prevDate.month}-${prevDate.day}-${prevDate.year}, you missed by ${ctr2} days.`;
            } else {
                output.innerText = `The nearest palindrome date is ${nextDate.month}-${nextDate.day}-${nextDate.year}, you missed by ${ctr1} days.`;
            }
        } else {
            output.innerText = "Yay! Your birthday is palindrome!";
        }
};

checkBtn.addEventListener("click", clickHandler);