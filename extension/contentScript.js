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
let positionX,
  positionY,
  text,
  brainButton,
  textArea,
  brain,
  translateBtnContainer,
  translateBtn,
  translateOptions,
  defineBtn,
  explainBtn,
  summariseBtn,
  isCurrentlementBrain = false;
window.onload = () => {
  // console.log("WINDOW LOADED");
  const body = document.querySelector("body");
  const buttonHTML = `
      <div id="brain" style='display:none;padding:10px;box-shadow: -2px 2px 4px #E3DAC9;width:180px;background-color:#F5F5DC;border-radius:10%' >
      
      <div>
      <div class="brain_buttons" style="display:grid;grid-template-columns:85px 85px;gap:5px;justify-items:center">
          <div class="container-button-translate">
          <button class="button-translate" style="display: flex;cursor:pointer;width:100%;
          flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
          background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
          background-origin: border-box;
          box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
          user-select: none;-webkit-user-select: none;touch-action: manipulation;">Translate</button>
          </div>
          <button class="button-define" role="button" style="width:100%;display: flex;cursor:pointer;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: #2ea44f;
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Define</button>        
        
          <button class="button-explain" role="button" style="width:100%;display: flex;cursor:pointer;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: #FF4742;
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Explain</button>
          <button class="button-summarise" role="button" style="width:100%;display: flex;cursor:pointer;
            flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
            background: rgb(251,188,5,1);
             background-origin: border-box;
            box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
            user-select: none;-webkit-user-select: none;touch-action: manipulation;">Summarise</button>        
      
          </div>
          <br/>
      <div class="textArea" onmouseover="this.style.overflowY=scroll" onmouseout="this.style.overflowY=hidden" style='background-color:white;overflow-y: scroll;text-wrap:pretty;height:160px;color: #1F305E;padding:1px;border-radius:10%;padding:5px;font-weight: 500;font-family: monospace;font-size: 16px;'>Click on any button to proceed.
      </div>
      </div>
      </div>
        </div>
        `;
  body.insertAdjacentHTML("beforeend", buttonHTML);
  // console.log("button inserted");
  translateBtn = body.querySelector(".button-translate");
  translateBtnContainer = body.querySelector(".container-button-translate");
  defineBtn = body.querySelector(".button-define");
  explainBtn = body.querySelector(".button-explain");
  summariseBtn = body.querySelector(".button-summarise");
  //   translateBtn.addEventListener("click", async function () {
  //     console.log("clicked");
  //     translateBtnContainer.innerHTML = `<select
  //       id="languages"
  //       style="width: 85px; height: 31.1px; border-radius: 6px"
  //       onchange=""
  //     >
  //       <option value="None" selected disabled>Language</option>
  //       <option value="Hindi">Hindi</option>
  //       <option value="German">German</option>
  //       <option value="French">French</option>
  //       <option value="Spanish">Spanish</option>
  //       <option value="Arabic">Arabic</option>
  //       <option value="Russian">Russian</option>
  //     </select>`;
  //     translateOptions = document.querySelector("#languages");
  //     translateOptions.addEventListener("change", async function (e) {
  //       // console.log(translateOptions.value);
  //       textArea.innerHTML = `
  //     <div style="display:flex;justify-content:center;margin-top: 50px">
  //     <div style="width:fit-content">
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(50 42)">
  //   <g transform="scale(0.8)">
  //     <g transform="translate(-50 -50)">
  //       <polygon points="72.5 50 50 11 27.5 50 50 50" fill="#2ea44f">
  //         <animateTransform keyTimes="0;1" values="0 50 38.5;360 50 38.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
  //       </polygon>
  //       <polygon points="5 89 50 89 27.5 50" fill="#ff4742">
  //         <animateTransform keyTimes="0;1" values="0 27.5 77.5;360 27.5 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
  //       </polygon>
  //       <polygon points="72.5 50 50 89 95 89" fill="#fbbc05">
  //         <animateTransform keyTimes="0;1" values="0 72.5 77.5;360 72 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
  //       </polygon>
  //     </g>
  //   </g>
  // </g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>
  //     </div>
  //     </div>
  //     `;
  //       try {
  //         const res = await fetch("http://localhost:3000/translate", {
  //           method: "POST",
  //           headers: { "Content-type": "application/json" },
  //           body: JSON.stringify({
  //             text: text,
  //             language: translateOptions.value,
  //           }),
  //         });
  //         const data = await res.json();
  //         if (data.error) {
  //           textArea.innerHTML = data.error.err_msg;
  //         } else {
  //           textArea.innerHTML = data.translation.replaceAll("*", "");
  //         }
  //       } catch (e) {
  //         console.log("error occured");
  //         textArea.innerHTML = "Something went wrong!";
  //       }
  //     });
  //   });
  defineBtn.addEventListener("click", async function () {
    textArea.innerHTML = `
    <div style="display:flex;justify-content:center;margin-top: 50px">
    <div style="width:fit-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(50 42)">
  <g transform="scale(0.8)">
    <g transform="translate(-50 -50)">
      <polygon points="72.5 50 50 11 27.5 50 50 50" fill="#2ea44f">
        <animateTransform keyTimes="0;1" values="0 50 38.5;360 50 38.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
      <polygon points="5 89 50 89 27.5 50" fill="#ff4742">
        <animateTransform keyTimes="0;1" values="0 27.5 77.5;360 27.5 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
      <polygon points="72.5 50 50 89 95 89" fill="#fbbc05">
        <animateTransform keyTimes="0;1" values="0 72.5 77.5;360 72 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
    </g>
  </g>
</g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>  
    </div>
    </div>
    `;
    try {
      const res = await fetch("http://localhost:3000/define", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await res.json();
      if (data.error) {
        textArea.innerHTML = data.error.err_msg;
        console.log(data);
      } else {
        textArea.innerHTML = data.definition;
      }
    } catch (e) {
      textArea.innerHTML = "Something went wrong!";
    }
  });
  explainBtn.addEventListener("click", async function () {
    textArea.innerHTML = `
    <div style="display:flex;justify-content:center;margin-top: 50px">
    <div style="width:fit-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(50 42)">
  <g transform="scale(0.8)">
    <g transform="translate(-50 -50)">
      <polygon points="72.5 50 50 11 27.5 50 50 50" fill="#2ea44f">
        <animateTransform keyTimes="0;1" values="0 50 38.5;360 50 38.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
      <polygon points="5 89 50 89 27.5 50" fill="#ff4742">
        <animateTransform keyTimes="0;1" values="0 27.5 77.5;360 27.5 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
      <polygon points="72.5 50 50 89 95 89" fill="#fbbc05">
        <animateTransform keyTimes="0;1" values="0 72.5 77.5;360 72 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
    </g>
  </g>
</g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>  
    </div>
    </div>
    `;
    try {
      const res = await fetch("http://localhost:3000/explain", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await res.json();
      if (data.error) {
        textArea.innerHTML = data.error.err_msg;
      } else {
        textArea.innerHTML = data.explanation;
      }
    } catch (e) {
      textArea.innerHTML = "Something went wrong!";
    }
  });
  summariseBtn.addEventListener("click", async function () {
    textArea.innerHTML = `
    <div style="display:flex;justify-content:center;margin-top: 50px">
    <div style="width:fit-content">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(50 42)">
  <g transform="scale(0.8)">
    <g transform="translate(-50 -50)">
      <polygon points="72.5 50 50 11 27.5 50 50 50" fill="#2ea44f">
        <animateTransform keyTimes="0;1" values="0 50 38.5;360 50 38.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
      <polygon points="5 89 50 89 27.5 50" fill="#ff4742">
        <animateTransform keyTimes="0;1" values="0 27.5 77.5;360 27.5 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
      <polygon points="72.5 50 50 89 95 89" fill="#fbbc05">
        <animateTransform keyTimes="0;1" values="0 72.5 77.5;360 72 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
      </polygon>
    </g>
  </g>
</g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>  
    </div>
    </div>
    `;
    try {
      const res = await fetch("http://localhost:3000/summarise", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          text: text,
        }),
      });
      const data = await res.json();
      if (data.error) {
        textArea.innerHTML = data.error.err_msg;
      } else {
        textArea.innerHTML = data.summary;
      }
    } catch (e) {
      textArea.innerHTML = "Something went wrong!";
    }
  });
};

document.addEventListener("mousedown", async function (e) {
  // console.log(e);
  positionX = e.clientX;
  positionY = e.clientY;
  brain = document.getElementById("brain");
  textArea = document.querySelector(".textArea");
  if (!e.target.closest("#brain")) {
    brain.setAttribute("style", "display : none");
    textArea.innerHTML = `<p>Click on any button to proceed.</p>`;
  }
  // console.log(brainButton);
});
document.addEventListener("selectionchange", (e) => {
  text = window.getSelection().toString();
  const exists = Boolean(text);
  if (exists && text.length >= 1) {
    brain.setAttribute(
      "style",
      `position: fixed; right:20px; top:200px;z-index:1500;padding:10px;box-shadow: -2px 2px 4px #E3DAC9;background-color:#F5F5DC;border-radius:10%;width:200px`
      // `position: fixed; left:${positionX}px; top:
      // ${positionY - 150}
      // px;z-index:1500"`
    );
    translateBtnContainer.innerHTML = `<button class="button-translate" style="display: flex;cursor:pointer;width:100%;
          flex-direction: column;align-items: center;padding: 6px 14px;font-family: -apple-system,BlinkMacSystemFont, 'Roboto', sans-serif;border-radius: 6px;border: none;color: #fff;
          background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
          background-origin: border-box;
          box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
          user-select: none;-webkit-user-select: none;touch-action: manipulation;">Translate</button>`;
    translateBtn = document.querySelector(".button-translate");
    translateBtn.addEventListener("click", async function () {
      translateBtnContainer.innerHTML = `<select
        id="languages"
        style="width: 85px; height: 31.1px; border-radius: 6px;display:grid;grid-template-columns:85px 85px"
      >
        <option value="None" selected disabled>Language</option>
        <option value="Hindi">Hindi</option>
        <option value="Gujrati">Gujrati</option>
        <option value="Kannada">Kannada</option>
        <option value="Marathi">Marathi</option>
        <option value="Punjabi">Punjabi</option>
        <option value="Sanskrit">Sanskrit</option>
        <option value="Tamil">Tamil</option>
        <option value="Telugu">Telugu</option>
        <option value="Sindhi">Sindhi</option>
        <option value="Urdu">Urdu</option>
        <option value="Kashmiri">Kashmiri</option>
        <option value="German">German</option>
        <option value="French">French</option>
        <option value="Spanish">Spanish</option>
        <option value="Arabic">Arabic</option>
        <option value="Russian">Russian</option>
      </select>`;
      translateOptions = document.querySelector("#languages");
      translateOptions.addEventListener("change", async function (e) {
        // console.log(translateOptions.value);
        textArea.innerHTML = `
      <div style="display:flex;justify-content:center;margin-top: 50px">
      <div style="width:fit-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(50 42)">
    <g transform="scale(0.8)">
      <g transform="translate(-50 -50)">
        <polygon points="72.5 50 50 11 27.5 50 50 50" fill="#2ea44f">
          <animateTransform keyTimes="0;1" values="0 50 38.5;360 50 38.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </polygon>
        <polygon points="5 89 50 89 27.5 50" fill="#ff4742">
          <animateTransform keyTimes="0;1" values="0 27.5 77.5;360 27.5 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </polygon>
        <polygon points="72.5 50 50 89 95 89" fill="#fbbc05">
          <animateTransform keyTimes="0;1" values="0 72.5 77.5;360 72 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </polygon>
      </g>
    </g>
  </g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>  
      </div>
      </div>
      `;
        try {
          const res = await fetch("http://localhost:3000/translate", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              text: text,
              language: translateOptions.value,
            }),
          });
          const data = await res.json();
          if (data.error) {
            textArea.innerHTML = data.error.err_msg;
          } else {
            textArea.innerHTML = data.translation.replaceAll("*", "");
          }
        } catch (e) {
          console.log("error occured");
          textArea.innerHTML = "Something went wrong!";
        }
      });
    });
    defineBtn.addEventListener("click", async function () {
      textArea.innerHTML = `
      <div style="display:flex;justify-content:center;margin-top: 50px">
      <div style="width:fit-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="50" height="50" style="shape-rendering: auto; display: block; background: rgb(255, 255, 255);" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(50 42)">
    <g transform="scale(0.8)">
      <g transform="translate(-50 -50)">
        <polygon points="72.5 50 50 11 27.5 50 50 50" fill="#2ea44f">
          <animateTransform keyTimes="0;1" values="0 50 38.5;360 50 38.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </polygon>
        <polygon points="5 89 50 89 27.5 50" fill="#ff4742">
          <animateTransform keyTimes="0;1" values="0 27.5 77.5;360 27.5 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </polygon>
        <polygon points="72.5 50 50 89 95 89" fill="#fbbc05">
          <animateTransform keyTimes="0;1" values="0 72.5 77.5;360 72 77.5" dur="1.5873015873015872s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </polygon>
      </g>
    </g>
  </g><g></g></g><!-- [ldio] generated by https://loading.io --></svg>  
      </div>
      </div>
      `;
      try {
        const res = await fetch("http://localhost:3000/define", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            text: text,
          }),
        });
        const data = await res.json();
        if (data.error) {
          textArea.innerHTML = data.error.err_msg;
          console.log(data);
        } else {
          textArea.innerHTML = data.definition;
        }
      } catch (e) {
        textArea.innerHTML = "Something went wrong!";
      }
    });
    // } else if (e.target.cl) {
  }
  // else {
  // brain.setAttribute("style", "display : none");
  // textArea.innerHTML = `<p>Click on any button to proceed.</p>`;
  // }
});
