const elements = {
    textInput: document.querySelector('.input-text'),
    priorityOptions: document.querySelector('.priority-options'),
    addBtn: document.querySelector('.add-btn'),
    deleteAllBtn: document.querySelector('.delete-all-btn'),
    deleteBtn: document.querySelector('.delete-btn'),
    todoList: document.querySelector('.todo-list'),
    checkBtn: document.querySelector('.checkmarkBtn'),
    listItem: document.querySelector('.list-item'),
};

const allData = [];

//////////////////////////////////////////////////////////////////////////////
// MODULES

class Note {
    constructor(id, text, priority) {
        this.id = id;
        this.text = text;
        this.priority = priority;
    }
};

const getPriority = () => {
    const selItem = elements.priorityOptions;
    const value = selItem.options[selItem.selectedIndex].value;
    return value;
};

const uniqueId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

const getData = (obj) => {
    // create unique id for the obj
    obj.id = uniqueId();
    // return the value of textentry
    obj.text = elements.textInput.value;
    // get the entered priority info
    obj.priority = getPriority();
    return obj;
};

const clearField = () => {
    elements.textInput.value = '';
};

const deleteNote = (event) => {
    // get which item was clicked -> itemID
    const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    //console.log(itemID);
    if (itemID) {
        //delete item from data
        deleteData(itemID, allData);
    } 
};

const deleteData = (id, arr) => {
    arr.forEach((cur, i) => {
        if (id === cur.id) {
            arr.splice(i, 1);
        }
    });
};


/////////////////////////////////////////////////////////////////////////////////
// UI VIEW

const renderNote = obj => {
    const markup = `
        <li class="list-item" id="${obj.id}">
            <div class="item__data">
                <div class="item__text">${obj.text}</div>
                <div class="item__status">
                    <div class="item__prio ${obj.priority}"></div>
                    <!--
                    <div class="item__prio" id="medium"></div>
                    <div class="item__prio" id="low"></div>
                    -->
                    <div class="item__checkmark">
                        <ion-icon class="checkmark-btn" name="checkmark"></ion-icon>
                    </div>
                        
                    <div class="item__delete">
                        <ion-icon class="delete-btn" name="close"></ion-icon>
                    </div>
                </div>
            </div>
        </li>
    `;

    elements.todoList.insertAdjacentHTML('beforeend', markup);

};

const renderPrio = (obj) => {
    if (obj.priority === 'high') {
        document.querySelector('.high').classList.add('color1');
        document.querySelector('.high').classList.remove('high');
    }
    else if (obj.priority === 'medium') {
        document.querySelector('.medium').classList.add('color2');
        document.querySelector('.medium').classList.remove('medium');
    }
    else if (obj.priority === 'low') {
        document.querySelector('.low').classList.add('color3');
        document.querySelector('.low').classList.remove('low');
    }
};


/////////////////////////////////////////////////////////////////////////////////
// CONTROLlER

const addItem = () => {
    // if there's some entered text, then:
    if(elements.textInput.value) {
        // create new data object
        const data = new Note();
        // fill object with text and priority
        const newItem = getData(data);
        // render new note to the UI
        renderNote(newItem);
        // render the priority color to the item
        renderPrio(newItem);
        // fill the allData array with the new object
        allData.push(newItem);
        // delete the textentry field to prevent entering the same text twice
       clearField();
    }
    console.log(allData)
    return allData;
};

// add an item
elements.addBtn.addEventListener('click', addItem);

// delete all items from data and UI
elements.deleteAllBtn.addEventListener('click', () => {
    if (allData != undefined || allData.length > 0) {
        // empty all items from allData array
        allData.length = 0;
        // delete all items from UI
        elements.todoList.innerHTML = '';
    }
});

document.querySelector('.todo-list').addEventListener('click', (event) =>{
    // event.target is the clicked item
    if (!event.target) {
        return;
    }
    if (event.target.matches('.delete-btn')) {
        // delete item from data
        deleteNote(event);
        // delete item from UI
        event.target.closest('.list-item').remove();
    }
    // toggle check button color - green if checked
    else if (event.target.matches('.checkmark-btn')) {
        event.target.classList.toggle('checked');
    }
});
