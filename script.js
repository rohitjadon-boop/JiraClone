let click = 0;
let deleteMode = false;
let modaleFlag = false;
/**************************************Creating Unique Id Using ShortUniueId***********************/

var uid = new ShortUniqueId();

/***********************Add Cross Container  Box Selectors*****************************************/

let lockContainer = document.querySelector('.lock-container');
let unlockContainer = document.querySelector('.unlock-container');
let plusContainer = document.querySelector('.plus-container');
let deleteContainer = document.querySelector('.multiply-container');
let modale = document.querySelector('.modale');

modale.addEventListener('keydown', function(e) {
  if(e.key==='Enter'){
    let value=e.target.value;
    e.target.value="";
    let id=uid();
    console.log(id);
    createBox(id, value, 'black', true);
    getAndAddToLocalStorage(id, 'black', value);
    modale.style.display='none';
    modaleFlag=false;
  }
})

plusContainer.addEventListener('click', function (e) {
  if(modaleFlag==false){
    modale.style.display='flex';
    modaleFlag=true;
  }
  else{
   modale.style.display='none';
   modaleFlag=false;
  }
});

/**************************Fetching Data From Local Storage******************************** */

function init() {
  let currentData = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log(currentData.length);
  for (let i = 0; i < currentData.length; i++) {
    createBox(currentData[i].id, currentData[i].value, currentData[i].color, false);
  }
};

/******************************Adding Content To Main Div Event Listener*******************************/

/**************************************Main Container Event Listener********************************* */

let div = document.querySelector('.main-container');
div.addEventListener('click', function (e) {
  click++;
  click = (click % 4);
  if (e.target.getAttribute('class') === 'task-header') {
    let headerDiv = e.target;
    switch (click) {
      case 0:
        headerDiv.style.backgroundColor = 'black';
        break;
      case 1:
        headerDiv.style.backgroundColor = 'lightpink';
        break;
      case 2:
        headerDiv.style.backgroundColor = 'lightblue';
        break;
      default:
        headerDiv.style.backgroundColor = 'lightgreen';
        break;
    }
    console.log(e.target.nextElementSibling);
    updateColorInLocalStorage(e.target.nextElementSibling.querySelector('.task-id').textContent, headerDiv.style.backgroundColor);
  }
});

/***********************Filtering The Color Elements ****************************************************/

let color_group_div = document.querySelector('.color-group_container');
color_group_div.addEventListener('click', function (e) {
  console.log(e);
  let color = e.target.classList[1];
  filterCards(color);
});


function filterCards(color) {
  let mainContainer = document.querySelector('.main-container');
  let taskContainer = mainContainer.children;
  let taskHeader = document.querySelectorAll('.task-header');
  for (let i = 0; i < taskHeader.length; i++) {
    let backgroundColor = taskHeader[i].style.backgroundColor;
    console.log(backgroundColor, color);
    if (backgroundColor === color) {
      taskContainer[i].style.display = 'block';
    }
    else {
      taskContainer[i].style.display = 'none';
    }
  }
};

/***********************Content Editable in Div Using content Editable***********************************/

lockContainer.addEventListener('click', function (e) {
  let textList = document.querySelectorAll('.text');
  for (let i = 0; i < textList.length; i++) {
    textList[i].setAttribute('contentEditable', 'false');
  }
  console.log(lockContainer.classList);
  lockContainer.classList.add('boxShadow');
  unlockContainer.classList.remove('boxShadow');
});

unlockContainer.addEventListener('click', function (e) {
  let textList = document.querySelectorAll('.text');
  for (let i = 0; i < textList.length; i++) {
    textList[i].setAttribute('contentEditable', 'true');
  }
  lockContainer.classList.remove('boxShadow');
  unlockContainer.classList.add('boxShadow');
});


/***********************Creating The Inner Html Fro Main Container***************************************/

function innerHtml() {
  return ` <div class="task-container">
<div class="task-header"></div>
<div class="task-main-container">
  <div class="task-id"></div>
  <div class="text" contentEditable='false'></div>
</div>
</div>`
}

/************************************Box Shadow For Delete Button**************************************** */

deleteContainer.addEventListener('click', function (e) {
  console.log(deleteMode);
  deleteMode = !deleteMode;
  if (deleteMode == true) {
    deleteContainer.classList.add('boxShadow');
  }
  else {
    deleteContainer.classList.remove('boxShadow');
  }
})


/******************************Adding TO Local Storage**************************************************** */


function getAndAddToLocalStorage(id, color, value) {
  console.log('Inside');
  let tasksString = localStorage.getItem('tasks');
  let tasksArr = JSON.parse(tasksString) || [];
  let taskObj = {
    color: color,
    id: `#${id}`,
    value: value,
  }
  tasksArr.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

/*****************************Creating The Box****************************************************** */

function createBox(id, value, color, flag) {
  console.log('Times');
  console.log(value);
  let div = document.getElementsByClassName('main-container');
  let newDiv = document.createElement('div');
  newDiv.innerHTML = innerHtml(color);
  
  
/******************************Adding Event Listener To Delete The Div****************************** */
  div[0].appendChild(newDiv);
  
  deleteBox(newDiv)
  updateText(newDiv);
  
  let textDiv = document.getElementsByClassName('text');
  textDiv[textDiv.length - 1].textContent = value;
  let idDiv = document.getElementsByClassName('task-id');
  idDiv[idDiv.length - 1].textContent = flag ? `#${id}` : `${id}`;
  
  if (flag == false) {
    let header = newDiv.querySelector('.task-header');
    header.style.backgroundColor = color;
  }
  

};

/********************Updating Color In Local Storage********************************************** */

function updateColorInLocalStorage(id, color) {
  console.log(color);
  let taskArr = JSON.parse(localStorage.getItem('tasks'));
  let updatedArr = taskArr.map((ob) => {
    if (ob.id === id) {
      return {
        ...ob,
        color: color,
      }
    }
    else {
      return {
        ...ob,
      }
    }
  });
  console.log(updatedArr);
  localStorage.setItem('tasks', JSON.stringify(updatedArr));
}

/***********************Function To Update The  Text************************************************ */

function updateText(newDiv) {
  newDiv.addEventListener('click', function (e) {
    let textClass = e.target;
    console.log(textClass);
    textClass.addEventListener('blur', function () {
      let id = textClass.previousElementSibling.textContent;
      let taskArr = JSON.parse(localStorage.getItem('tasks'));
      for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].id === id) {
          taskArr[i].value = textClass.textContent;
          break;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(taskArr));
    });
  });
}

/*************************************Function TO Delete The Box****************************************** */

function deleteBox(newDiv) {
  newDiv.addEventListener('click', function () {
    if (deleteMode === true) {
      newDiv.remove();
      let taskString = localStorage.getItem('tasks');
      let tasksArr = JSON.parse(taskString);
      let updatedArr = tasksArr.filter((ob) => {
        return ob.id !== `#${id}`;
      });
      console.log(updatedArr);
      updatedArr.length > 0 ? localStorage.setItem('tasks', JSON.stringify(updatedArr)) : localStorage.clear();
    }
  });
}

init();