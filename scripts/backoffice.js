const yearInFooter = function () {
  const span = document.getElementById("year")
  span.innerText = new Date().getFullYear()
}

// ----------

const endPoint = `https://striveschool-api.herokuapp.com/api/product/`
const authorizationLink = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmIzMjc4Y2RkZjAwMTU1ZDY3OWYiLCJpYXQiOjE3NTIyMTg0MTgsImV4cCI6MTc1MzQyODAxOH0.lkfAgPfvfUDCpsrHOcn2YILZ-vu_ug21gI7fwA-pGcE`

const parameters = new URLSearchParams(location.search)
const productId = parameters.get(`productId`)

// ----------

if (productId) {
  fetch(endPoint + `/` + productId, {
    headers: {
      Authorization: authorizationLink,
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Error! Cannot load product`)
      }
    })
    .then(function (productInfos) {
      console.log(productInfos)
      document.getElementById(`name`).value = productInfos.name
      document.getElementById(`brand`).value = productInfos.brand
      document.getElementById(`description`).value = productInfos.description
      document.getElementById(`price`).value = productInfos.price
      document.getElementById(`imgUrl`).value = productInfos.imageUrl
    })
    .catch(function (err) {
      console.log(`An ERROR ha occured`, err)
    })
}

// ----------

class GamingConsole {
  constructor(_name, _brand, _description, _price, _image) {
    this.name = _name
    this.brand = _brand
    this.description = _description
    this.price = _price
    this.imageUrl = _image
  }
}

// ----------

const productForm = document.getElementById(`product-Form`)
productForm.addEventListener(`submit`, function (e) {
  e.preventDefault()

  const nameInput = document.getElementById(`name`)
  const brandInput = document.getElementById(`brand`)
  const descriptionInput = document.getElementById(`description`)
  const priceInput = document.getElementById(`price`)
  const imageInput = document.getElementById(`imgUrl`)

  const productToSave = new GamingConsole(
    nameInput.value,
    brandInput.value,
    descriptionInput.value,
    priceInput.value,
    imageInput.value
  )

  // ----------

  console.log(productToSave)

  // ----------

  let endpointToUse
  if (productId) {
    endpointToUse = endPoint + `/` + productId
  } else {
    endpointToUse = endPoint
  }

  let apiCallMethod
  if (productId) {
    apiCallMethod = `PUT`
  } else {
    apiCallMethod = `POST`
  }

  // ----------

  fetch(endpointToUse, {
    method: apiCallMethod,
    body: JSON.stringify(productToSave),
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationLink,
    },
  })
    .then(function (response) {
      if (response.ok) {
        alert(`New Product Inserted`)

        productForm.reset()
      } else {
        throw new Error(`Error with your request.`, response.status)
      }
    })
    .catch(function (err) {
      alert(`An ERROR ha occured`)
      console.log(`An ERROR has occured`, err)
    })
})

// ----------

yearInFooter()
