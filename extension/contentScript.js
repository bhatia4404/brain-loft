async function ClickHandler(text) {
  // console.log(`Prompt : Explain ${text}`);
  const res = await fetch("http://localhost:3000/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: text,
    }),
  });
  const data = await res.json();
  return data;
}
let positionX, positionY, text, brainButton, textArea, brain;
window.onload = () => {
  // console.log("WINDOW LOADED");
  const body = document.querySelector("body");
  const buttonHTML = `
      <div id="brain" style='display:hidden;padding:10px;box-shadow: -2px 2px 4px #E3DAC9;background-color:#F5F5DC;border-radius:10%' >
      <div class="brain_buttons" style="display:grid;grid-template-columns:70px 70px;gap:5px">
      
          <button class="button-translate" style="display: flex;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Translate</button>
          <button class="button-define" role="button" style="display: flex;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: #2ea44f;
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Define</button>        
        
          <button class="button-explain" role="button" style="display: flex;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: #FF4742;
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Explain</button>
          <button class="button-summarise" role="button" style="display: flex;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: rgb(251,188,5,1);
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Summarise</button>        
      
          </div>
          <br/>
      <div class="textArea" onmouseover="this.style.overflowY=scroll" onmouseout="this.style.overflowY=hidden" style='width:140px;background-color:white;overflow-y: scroll;text-wrap:pretty;height:100px;color: #1F305E;padding:1px;border-radius:10%'>Click on any button to proceed.
      </div>
      </div>
      </div>
        `;
  body.insertAdjacentHTML("beforeend", buttonHTML);
  // console.log("button inserted");
};

document.addEventListener("mousedown", async function (e) {
  // console.log(e);
  positionX = e.clientX;
  positionY = e.clientY;
  brainButton = document.getElementById("brainBtn");
  brain = document.getElementById("brain");
  textArea = document.querySelector(".textArea");
  if (e.target.closest("#brainBtn") == brainButton) {
    // console.log("Button Clicked");
    const response = await ClickHandler(text);
    // console.log(response);
    textArea.innerHTML = `<span style="font-weight:bold">
    ${response.explanation}  </span>`;
  }
  // console.log(brainButton);
});
document.addEventListener("selectionchange", () => {
  text = window.getSelection().toString();
  const exists = Boolean(text);

  if (exists && text.length >= 3) {
    brain.setAttribute(
      "style",
      `position: fixed; right:20px; top:200px;z-index:1500;padding:10px;box-shadow: -2px 2px 4px #E3DAC9;background-color:#F5F5DC;border-radius:10%"`
      // `position: fixed; left:${positionX}px; top:
      // ${positionY - 150}
      // px;z-index:1500"`
    );
  } else {
    brain.setAttribute("style", "display : hidden");
    textArea.innerHTML = `<p>Click on any button to proceed.</p>`;
  }
});
