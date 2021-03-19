// variables for forms and links here
const editButton = document.querySelectorAll(".editButton")
// const deleteButton = document.querySelector("#deleteButton")
const addedProductList = document.querySelector(".addedProductList")

// Alive test
console.log("FrontEnd Script HERE!!!")

// Ставим прослушку на весь контейнер
if (addedProductList) {
  addedProductList.addEventListener("click", async (eve) => {
    // Если нажимают на ссылку delete переправляем на pageRouter
    // в раздел метода delete
    // if (eve.target.dataset.id) {
    if (eve.target.id == "deleteButton") {
      eve.preventDefault()
      console.log(eve.target.dataset.id)

      const tempID = eve.target.dataset.id
      const response = await fetch(`/productDelete/${tempID}`, {
        method: "DELETE",
      })
      let resStat = await response.status
      if (resStat == 200) {
        // если нам пришел ответ 200 - удаляем элемент со страницы
        eve.target.parentElement.parentElement.remove()
      }
    }

    // если нажали ссылку edit переправляем на
    // pageRouter в раздел метода edit
    // если не указывать тип fetch он по умолчанию становится GET

    if ((eve.target.id = "editButton")) {
      const tempID = eve.target.dataset.id
      const response = await fetch(`/productEdit/${tempID}`)
      await response
    }
  })
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
