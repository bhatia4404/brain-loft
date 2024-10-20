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
      <div id="brain" style='display:hidden;' >
      <div class="textArea" onmouseover="this.style.overflowY=scroll" onmouseout="this.style.overflowY=hidden" style='background-color:#C0C0C0;overflow-y: scroll;width:150px;text-wrap:pretty;height:100px;color: #1F305E;padding:5px;border-radius:10%'>
      <span style="font-weight:bold">Click on </span>
    <img src="https://www.svgrepo.com/show/395921/brain.svg" width="15" height="15" />
    <span style=style="font-weight:bold">to get an explanation.</span>
      </div>
      <div style='display:flex;justify-content: flex-end'>
      <button id="brainBtn" style='background-color:white;padding:"2px";border-radius:50%;border-color:white;cursor: pointer'>
      <img src="https://www.svgrepo.com/show/395921/brain.svg" width="15" height="15" />
      </button>
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
      `position: fixed; right:20px; top:200px;z-index:1500"`
      // `position: fixed; left:${positionX}px; top:
      // ${positionY - 150}
      // px;z-index:1500"`
    );
  } else {
    brain.setAttribute("style", "display : hidden");
    textArea.innerHTML = `
    <span style="font-weight:bold">Click on </span>
    <img src="https://www.svgrepo.com/show/395921/brain.svg" width="15" height="15" />
    <span style="font-weight:bold">to get an explanation.</span>
    `;
  }
});
