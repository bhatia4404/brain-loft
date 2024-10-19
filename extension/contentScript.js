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
  console.log("WINDOW LOADED");
  const body = document.querySelector("body");
  const buttonHTML = `
      <div id="brain" style="z-index: 10;" >
      <div class="textArea" style='background-color:white;overflow-y: scroll;display : inline-block;width:"30px" ;height:"50px"'>Select Text and click on button.</div>
      <br/>
      <button id="brainBtn">
      <img src="https://www.svgrepo.com/show/395921/brain.svg" width="15" height="15" />
      </button>
      </div>
        `;
  body.insertAdjacentHTML("beforeend", buttonHTML);
  console.log("button inserted");
};

document.addEventListener("mousedown", async function (e) {
  // console.log(e);
  positionX = e.clientX;
  positionY = e.clientY;
  brainButton = document.getElementById("brainBtn");
  brain = document.getElementById("brain");
  textArea = document.querySelector(".textArea");
  if (e.target.closest("#brainBtn") == brainButton) {
    console.log("Button Clicked");
    chrome.runtime.sendMessage({
      type: "BUTTON",
      text,
    });
    const response = await ClickHandler(text);
    console.log(response);
    textArea.innerHTML = response.explanation;
  }
  // console.log(brainButton);
});
document.addEventListener("selectionchange", () => {
  text = window.getSelection().toString();
  const exists = Boolean(text);

  if (exists && text.length >= 3) {
    brain.setAttribute(
      "style",
      `display : inline-block; position: absolute; left:${
        positionX + 80
      }px; top: ${positionY - 120}px;`
    );
  } else {
    brain.setAttribute("style", "display : hidden");
    textArea.innerHTML = "Select Text and click on button.";
  }
  chrome.runtime.sendMessage({
    type: "SELECT",
    text,
    // position: {
    //   positionX,
    //   positionY,
    // },
  });
});
