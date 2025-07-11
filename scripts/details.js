const yearInFooter = function () {
  const span = document.getElementById("year")
  span.innerText = new Date().getFullYear()
}

// ----------

const endPoint = `https://striveschool-api.herokuapp.com/api/product/`
const authorizationLink = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmIzMjc4Y2RkZjAwMTU1ZDY3OWYiLCJpYXQiOjE3NTIyMTg0MTgsImV4cCI6MTc1MzQyODAxOH0.lkfAgPfvfUDCpsrHOcn2YILZ-vu_ug21gI7fwA-pGcE`

// ----------

const parameters = new URLSearchParams(location.search)

const productId = parameters.get(`productId`)

console.log(location.search) // mi ritorna null

fetch(endPoint + `/` + productId, {
  headers: {
    Authorization: authorizationLink,
  },
})
  .then(function (response) {
    if (response.ok) {
      console.log

      return response.json()
    } else {
      throw new Error(`Error to retrieve Event`)
    }
  })
  .then(function (productInfos) {
    console.log(`Details of the product`, productInfos)

    document.querySelector(`.card .card-title`).innerText = productInfos.brand
    document.querySelector(`.card .card-title:nth-of-type(1)`).innerText =
      productInfos.name
    document.querySelector(`.card .card-title:nth-of-type(2)`).innerText =
      productInfos.description
    document.querySelector(`.card .card-title:nth-of-type(3)`).innerText =
      productInfos.price + `€`
    document.querySelector(`.card .card-img-top`).src = productInfos.imageUrl
  })
  .catch(function (err) {
    console.log(`An ERROR ha occured`, err)
  })

const deleteProduct = function () {
  fetch(endPoint + `/` + productId, {
    method: `DELETE`,
    headers: {
      Authorization: authorizationLink,
    },
  })
    .then(function (response) {
      if (response.ok) {
        alert(`DELETE successfully done!`)
        location.assign(`/homepage.html`)
      } else {
        throw new Error(`Error during DELETE phase`)
      }
    })
    .catch(function (err) {
      console.log(`An ERROR ha occured`, err)
    })
}

// ----------

const editProduct = function () {
  location.assign(`/backoffice.html?productID=` + productId)
}

yearInFooter()
