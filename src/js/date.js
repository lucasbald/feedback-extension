const body = document.getElementsByTagName('body');

body[0].addEventListener("click", function () {
  currentDate = new Date();
  document.getElementById('date').value = (addZero(currentDate.getFullYear()).toString()) + "-" + (addZero(currentDate.getMonth()+1).toString()) + "-" + (addZero(currentDate.getDate().toString()));

  function addZero(number){
    if (number <= 9) return "0" + number;
    return number; 
  }
})