const yearInFooter = function () {
  const span = document.getElementById("year")
  span.innerText = new Date().getFullYear()
}

// ----------

const endPoint = `https://striveschool-api.herokuapp.com/api/product/`
const authorizationLink = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmIzMjc4Y2RkZjAwMTU1ZDY3OWYiLCJpYXQiOjE3NTIyMTg0MTgsImV4cCI6MTc1MzQyODAxOH0.lkfAgPfvfUDCpsrHOcn2YILZ-vu_ug21gI7fwA-pGcE`

// ----------

const getInfos = function () {
  fetch(endPoint, {
    headers: {
      Authorization: authorizationLink,
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`Error! Response.ok it's not 'true'`)
      }
    })
    .then(function (arrayOfInfos) {
      console.log(`ArrayOfInfos`, arrayOfInfos)
      const mainRowCollection = document.getElementById(`collection-Row`)
      if (arrayOfInfos.length === 0) {
        mainRowCollection.innerHTML = `
      <div class="col-12 text-center fs-6 fst-italic text-warning border border-1 rounded-3 bg-dark py-3 mt-5 fw-bold ">
      <p class="fs-3">We're sorry :(</p>
      <p>There are no products availble yet</p>
      <p>If you need additional information, please contact at our info e-mail <a href="#" class="link-underline-warning text-warning fs-5 pe-auto">HERE</a></p>
      </div>`
      } else {
        arrayOfInfos.forEach((product) => {
          console.log(`Product`, product._id)
          mainRowCollection.innerHTML += `<div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 d-flex flex-column">
            <img src="${product.imageUrl}" class="card-img-top" alt="RetroArch console">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title m-0">Console ${product.name}</h5>
              <div class="flex-grow-1 my-2">
              <p class="card-text my-1 fst-italic"><span class="fw-bold fst-normal">Brand:</span> ${product.brand}</p>
              <p class="card-text my-1 fst-italic"><span class="fw-bold fst-normal">Description:</span> ${product.description}</p>
              <p class="card-text my-1 fst-italic"><span class="fw-bold fst-normal">Price:</span> ${product.price} €</p>
              </div>
              <a href="./detail.html?productId=${product._id}" class="btn btn-dark mt-2 fw-bold text-danger"><i class="fas fa-info-circle"></i> Check details HERE</a>
            </div>
          </div>
          `
        })
      }
    })
    .catch(function (err) {
      console.log(`An ERROR has occured`, err)
    })
}

// ----------

getInfos()
yearInFooter()
