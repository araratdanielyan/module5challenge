$(document).ready(function(){
    
    // AddED a listener for click events on the save button.

    $('.saveBtn').click((e) => {
      let blockId = $(e.target).parent('.time-block').data('id');
      let text = $(e.target).parent('.time-block').find('textarea').val();
      let data = JSON.stringify({
        block: blockId,
        data: text
      });
      localStorage.setItem(blockId, data);
      let storageData = JSON.parse(localStorage.getItem(blockId));
      console.log(storageData.data);
    })
    
    //Setting current Time info
    let now = dayjs();

    // Code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour.
    let currentHour = now.format("HH:mm");

    $(".time-block").each(function () {
      let timeDiv = $(this).data('hour');
      if (currentHour == timeDiv) {
        $(this).removeClass("future");
        $(this).removeClass("past");
        $(this).addClass("present");
  
      } else if (currentHour < timeDiv) {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
  
      } else if (currentHour > timeDiv) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      }
    });

    // Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements.

    $('.time-block').each( (ind,elem) => {
      let dataId = $(elem).data('id');
      let localData = localStorage.getItem(dataId);
      if(localData) {
        localData = JSON.parse(localData);
        $(elem).find('textarea').val(localData.data);
      }
    })

  
    // Code to display the current date in the header of the page.
    const currDate = document.querySelector("#currentDay");
    currDate.innerText = now.format('MM/DD/YYYY');
});


