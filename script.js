let input = document.getElementById('input-section');
let click = 0;

/**************************************Creating Unique Id Using ShortUniueId***********************/
var uid = new ShortUniqueId();

/***********************Add Cross Container  Box Selectors*****************************************/
let lockContainer = document.querySelector('.lock-container');
let unlockContainer = document.querySelector('.unlock-container');
let plusContainer = document.querySelector('.plus-container');
let minusContainer = document.querySelector('.minus-container');

/******************************Input Event Listener*************************************************/

input.addEventListener('keydown', function (e) {
  if (e.key == 'Enter') {
    let uuid = uid();
    let value = input.value;
    console.log(value);
    input.value = "";
    let div = document.getElementsByClassName('main-container');
    let newDiv = document.createElement('div');
    newDiv.innerHTML = innerHtml();
    div[0].appendChild(newDiv);
    let textDiv = document.getElementsByClassName('text');
    textDiv[textDiv.length - 1].textContent = value;
    let idDiv = document.getElementsByClassName('task-id');
    idDiv[idDiv.length - 1].textContent = `#${uuid}`;
  }
})

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
})

unlockContainer.addEventListener('click', function (e) {
  let textList = document.querySelectorAll('.text');
  for (let i = 0; i < textList.length; i++) {
    textList[i].setAttribute('contentEditable', 'true');
  }
  lockContainer.classList.remove('boxShadow');
  unlockContainer.classList.add('boxShadow');
})


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

