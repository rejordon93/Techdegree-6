//Total number of items to display on the page
const pageCount = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page, numPerPage) => {
  const startIndex = page * pageCount - pageCount;
  const endIndex = page * pageCount;
  const studentList = document.querySelector("ul.student-list");

  //Remove any students that are currently on the page
  studentList.innerHTML = "";
  let studentHTML = "";

  for (let i = 0; i < list.length; i++) {
    //Add students based on start and end index.
    if (i >= startIndex && i < endIndex) {
      studentHTML += `
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
         </div>
      </li>
         `;
    }
  }

  //Add student data to list with class of student-list
  studentList.insertAdjacentHTML("beforeEnd", studentHTML);
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const addPagination = (list, numPerPage) => {
  //Calculates number of buttons based on dataset length divided by page count and rounds up to nearest integer
  const numOfButtons = Math.ceil(list.length / pageCount);
  const linkList = document.querySelector("ul.link-list");

  //Remove any buttons that are currently on the page
  linkList.innerHTML = "";

  let buttonHTML = "";

  //Loop through total number of buttons and add button element to the page
  for (let i = 1; i <= numOfButtons; i++) {
    buttonHTML += `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
  }

  //Add pagination buttons to list with class of link-list
  linkList.insertAdjacentHTML("beforeEnd", buttonHTML);

  //Add class of Active to first button
  const firstButton = document.querySelector(".link-list button");
  firstButton.classList.add("active");

  //Add Event Listener to all Pagination Buttons
  linkList.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      const paginationButtons = document.querySelectorAll(".link-list button");

      //Remove active class from all buttons
      paginationButtons.forEach((button) => {
        button.classList.remove("active");
      });

      //Add active class to clicked button
      e.target.classList.add("active");

      //Grab number from button that was clicked
      let currentButton = e.target.innerText;

      //Run showPage function for current button
      showPage(list, currentButton, pageCount);
    }
  });
};

//Add search bar to page
const addSearchBar = () => {
  const header = document.querySelector("header");
  let searchbarHTML =
    '<label for="search" class="student-search"><span>Search by name</span><input id="search" placeholder="Search by name..."><button type="button"><img src="img/icn-search.svg" alt="Search icon"></button></label>';

  //Appends searchbar html to header
  header.insertAdjacentHTML("beforeEnd", searchbarHTML);
};

//searchForStudents function checks search input to see if there are any matching values in data array. Matches are pushed to newList array
const searchForStudents = (list) => {
  const searchInput = document.querySelector("#search");

  //Stores search input in variables and converts to upper case
  const searchValue = searchInput.value.toUpperCase();
  let newList = [];

  for (let i = 0; i < list.length; i++) {
    //Stores student name for current element and converts to upper case
    const studentName =
      list[i].name.first.toUpperCase() + " " + list[i].name.last.toUpperCase();

    //If the student name contains input test, objects in array is pushed to newList
    if (studentName.indexOf(searchValue) >= 0) {
      newList.push(list[i]);
    }
  }
  return newList;
};

//showNoRecordsFound displays No Records Found text on page.
const showNoRecordsFound = () => {
  const linkList = document.querySelector("ul.link-list");
  const studentList = document.querySelector("ul.student-list");

  //Remove any buttons that are currently on the page
  linkList.innerHTML = "";

  //Remove any students that are currently on the page
  studentList.innerHTML = "";

  //Add No Records Found Text
  studentList.innerHTML = "No Records Found.";
};

//Shows student data on page.  If there is no student, page will show 'No Records Found.'
const showStudents = (list) => {
  //Store search results in variable
  const newList = searchForStudents(list);

  //Checks if search results array is empty or not.
  if (Array.isArray(newList) && newList.length) {
    //If array isn't empty, results are outputted to screen.
    addPagination(newList, pageCount);
    showPage(newList, 1, pageCount);
  } else {
    //If array is empty, text of No Records Found
    showNoRecordsFound();
  }
};

//Student search event handler function
const handleStudentSearch = (list) => {
  const header = document.querySelector("header");

  //Add event listener to header and see if input is selected
  header.addEventListener("keyup", (e) => {
    //Check to make sure selected element is input field
    if (e.target.nodeName === "INPUT") {
      showStudents(list);
    }
  });

  //Add event listener to header when input field is clicked
  header.addEventListener("click", (e) => {
    //Check to make sure selected element is input field and that there is a value
    if (e.target.nodeName === "INPUT" && e.target.value !== "") {
      showStudents(list);
    }
  });
};

// Call functions
showPage(data, 1, pageCount);

addPagination(data, pageCount);

addSearchBar();

handleStudentSearch(data);