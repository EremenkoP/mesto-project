// * функции открытия и закрытия модалок.
function popupOpened(popup){
  popup.classList.add('popup_opened');
  event.stopPropagation()
};

function popupClosed(popup){
  popup.classList.remove('popup_opened');
};





export {popupOpened, popupClosed};
