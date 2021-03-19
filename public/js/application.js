let inputProduct = document.getElementById("dropDownMenu");

if (inputProduct) {
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
    let currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      let a,
        b,
        i,
        val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      let x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });

    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  inputProduct.addEventListener("click", async (event) => {
    const response = await fetch(`/productSelector`, {
      method: "GET",
    });
    const products = await response.json();
    console.log("------> ", products[0].name);
    autocomplete(
      inputProduct,
      products.map((el) => el.name)
    );
  });
}

// variables for forms and links here
const editButton = document.querySelectorAll(".editButton");
// const deleteButton = document.querySelector("#deleteButton")
const addedProductList = document.querySelector(".addedProductList");

// Alive test
console.log("FrontEnd Script HERE!!!");

// Ставим прослушку на весь контейнер
if (addedProductList) {
  addedProductList.addEventListener("click", async (eve) => {
    // Если нажимают на ссылку delete переправляем на pageRouter
    // в раздел метода delete
    // if (eve.target.dataset.id) {
    if (eve.target.id == "deleteButton") {
      eve.preventDefault();
      console.log(eve.target.dataset.id);

      const tempID = eve.target.dataset.id;
      const response = await fetch(`/productDelete/${tempID}`, {
        method: "DELETE",
      });
      let resStat = await response.status;
      if (resStat == 200) {
        // если нам пришел ответ 200 - удаляем элемент со страницы
        eve.target.parentElement.parentElement.remove();
      }
    }

    // если нажали ссылку edit переправляем на
    // pageRouter в раздел метода edit
    // если не указывать тип fetch он по умолчанию становится GET

    if ((eve.target.id = "editButton")) {
      const tempID = eve.target.dataset.id;
      const response = await fetch(`/productEdit/${tempID}`);
      await response;
    }
  });
}
// Если нажали "Сохранить Изменения" в продукте
// const sendChangedProduct = document.getElementById("send_edited")
// if (sendChangedProduct) {
//   sendChangedProduct.addEventListener("click", (eve) => {
//     if ((eve.target.id = "send_edited")) {
//       const tempID = eve.target.dataset
//       console.log("NEW BUTTON RECOGNIZED=======>>>>>", tempID)
//     }
//   })
// }

// if ((eve.target.class = "editButton")) {
//   console.log("Edint Button recognized", eve.target.dataset.id)
//   const tempID = eve.target.dataset.id
//   const response = await fetch(`/productEdit/${tempID}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       body: tempID,
//     }),
//   })
// }

// edit click reaction
