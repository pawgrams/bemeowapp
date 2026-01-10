export const disableJupButton = async () => {
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  try{
    const jupButton = document.querySelector(".jupiter-button") as HTMLButtonElement;
    const jupButtonHover = document.querySelector(".jupiter-button:hover") as HTMLButtonElement;
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (jupButton) {
        jupButton.style.cursor = "none"; 
        jupButton.style.pointerEvents = "none";
        jupButton.style.opacity = "0.3";  
      }
      //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      if (jupButtonHover) {
        jupButtonHover.style.boxShadow = "none";
        jupButtonHover.style.opacity = "0.3";  
        jupButtonHover.style.pointerEvents = "none";
      }
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  } catch (err) {}
}
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const enableJupButton = async () => {
  try{
    const jupButton = document.querySelector(".jupiter-button") as HTMLButtonElement;
    const jupButtonHover = document.querySelector(".jupiter-button:hover") as HTMLButtonElement;
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (jupButton) {
        jupButton.style.cursor = "normal"; 
        jupButton.style.pointerEvents = "all";
        jupButton.style.opacity = "1";  
      }
      //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      if (jupButtonHover) {
        jupButtonHover.style.boxShadow = "auto";
        jupButtonHover.style.opacity = "1";  
        jupButtonHover.style.pointerEvents = "all";
      }
  //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  } catch (err) {}
}  
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -