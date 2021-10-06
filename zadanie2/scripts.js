"use strict"



let todoList = [];

let initList = function() {

    let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else{
        todoList.push(
            {
                title: "Learn JS",
                description: "Create a demo application for my TODO's",
                place: "445",
                dueDate: new Date(2019,10,16)
            },
            {
                title: "Lecture test",
                description: "Quick test from the first three lectures",
                place: "F6",
                dueDate: new Date(2019,10,17)
            }
        );
    }
}

$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: 'https://api.jsonbin.io/b/615c662eaa02be1d4454978e/latest',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
      'secret-key': "$2b$10$6QQnAOQzu/BMCZI2MQYH6usFHc2hRgxT57l/lKZb3Ff9yAqFutQti"
    },
    success: (data) => {
      //console.log(data);

      todoList = data;
    },
    error: (err) => {
      console.log(err.responseJSON);
    }
   });
   
   let deleteTodo = function(index) {
    todoList.splice(index,1);
    updateJSONbin();
}

let updateJSONbin = function() {
    $.ajax({
        url: 'https://api.jsonbin.io/b/615c662eaa02be1d4454978e',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2b$10$6QQnAOQzu/BMCZI2MQYH6usFHc2hRgxT57l/lKZb3Ff9yAqFutQti"
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
})};

//initList();



let updateTodoList = function() {

    let todoTable = document.getElementById("todoTable");

    
    while (todoTable.rows.length != 1){
        todoTable.deleteRow(todoTable.rows.length - 1);
    }

    /*

    let todoListDiv =
    document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }
*/
    //add all elements
    let filterInput = document.getElementById("inputSearch");  
    let startFilterDate = document.getElementById("fromInputDateSearch"); 
    let endFilterDate = document.getElementById("toInputDateSearch"); 
    for (let todo in todoList) {

        if (
            (filterInput.value == "") ||
            (todoList[todo].title.includes(filterInput.value)) ||
            (todoList[todo].description.includes(filterInput.value))
          ) {
                if ((!startFilterDate.value && !endFilterDate.value) ||
                (todoList[todo].dueDate >= startFilterDate.value && !endFilterDate.value) ||
                (!startFilterDate.value && endFilterDate.value >= todoList[todo].dueDate) ||
                (todoList[todo].dueDate >= startFilterDate.value && todoList[todo].dueDate <= endFilterDate.value)){

                    
                /*
                    let newDeleteButton = document.createElement("input");
                    newDeleteButton.type = "button";
                    newDeleteButton.value = "x";
                    newDeleteButton.addEventListener("click",
                        function() {
                            deleteTodo(todo);
                        });

                    let newElement = document.createElement("div");
                    let newContent = document.createTextNode(
                        todoList[todo].title + " " + todoList[todo].description);
                    newElement.appendChild(newContent);
                    newElement.appendChild(newDeleteButton);
                    todoListDiv.appendChild(newElement);
                    */

                    let row = document.createElement("tr");

                    row.className = "table-primary";
                    
                    let cellTitle = document.createElement("td");
                    let cellTextTitle = document.createTextNode(todoList[todo].title);

                    cellTitle.appendChild(cellTextTitle);
                    row.appendChild(cellTitle);
                    
                    let cellDescription = document.createElement("td");
                    let cellTextDescription = document.createTextNode(todoList[todo].description);

                    cellDescription.appendChild(cellTextDescription);
                    row.appendChild(cellDescription);

                    let cellPlace = document.createElement("td");
                    let cellTextPlace = document.createTextNode(todoList[todo].place);

                    cellPlace.appendChild(cellTextPlace);
                    row.appendChild(cellPlace);

                    let cellDueDate = document.createElement("td");
                    let cellTextDueDate = document.createTextNode(todoList[todo].dueDate);

                    cellDueDate.appendChild(cellTextDueDate);
                    row.appendChild(cellDueDate);

                    let cellDeleteButton = document.createElement("td");

                    let newDeleteButton = document.createElement("input");
                    newDeleteButton.type = "button";
                    newDeleteButton.value = "Delete";
                    
                    newDeleteButton.className = "btn btn-outline-danger";

                    newDeleteButton.addEventListener("click",
                        function() {
                            deleteTodo(todo);
                        });

                    
                    

                    cellDeleteButton.appendChild(newDeleteButton);

                    row.appendChild(cellDeleteButton);

                    todoTable.appendChild(row);
                }
          }
    }
}

setInterval(updateTodoList, 1000);

let addTodo = function() {
    //get the elements in the form
      let inputTitle = document.getElementById("inputTitle");
      let inputDescription = document.getElementById("inputDescription");
      let inputPlace = document.getElementById("inputPlace");
      let inputDate = document.getElementById("inputDate");
    //get the values from the form
      let newTitle = inputTitle.value;
      let newDescription = inputDescription.value;
      let newPlace = inputPlace.value;
      let newDate = new Date(inputDate.value);
    //create new item
      let newTodo = {
          dueDate: newDate,
          place: newPlace,
          description: newDescription,
          title: newTitle
          
      };
    //add item to the list
      todoList.push(newTodo);

      //window.localStorage.setItem("todos", JSON.stringify(todoList));

      updateJSONbin();
  }