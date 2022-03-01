// get input search input value and dynamic url function 
const getProducts = () => {
    // show all part then remove then new result
    document.getElementById('show-details').textContent = '';
    document.getElementById('phones').textContent = '';
    document.getElementById('empty-input-error').style.display = 'none';
    document.getElementById('input-error').style.display = "none";
    // show spinner
    document.getElementById('spinner').style.display = 'block';
    const inputField = document.getElementById('search-input').value;
    if (inputField == '') {
        // show empty error
        document.getElementById('empty-input-error').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayProducts(data.data))

        //clear input
        document.getElementById('search-input').value = '';
        // hide empty input error
        document.getElementById('empty-input-error').style.display = 'none';
    }
}
// display phone function 
const displayProducts = (productAll) => {
    document.getElementById('input-error').style.display = "none"
    const products = productAll.slice(0, 20)
    if (products.length == 0) {
        // show search input error handle 
        document.getElementById('input-error').style.display = "block"
        // hide spinner
        document.getElementById('spinner').style.display = 'none'
    }
    else {
        // hide search input error handle
        document.getElementById('input-error').style.display = "none"
        // get phone section div
        const phonesDiv = document.getElementById('phones');
        // remove old search result
        phonesDiv.textContent = ''
        // get every phone by forEach 
        products?.forEach(product => {
            // console.log(phone)
            const div = document.createElement('div')
            // add class div 
            div.classList.add("col-12", "col-lg-4")
            div.innerHTML = `
            <div class="card border-2 shadow p-3 rounded mx-auto" style="width:20rem">
            <img src="${product.image}" class="card-img-top" alt="..." />
                 <div class="card-body">
                    <h5 class="card-title">${product.phone_name}</h5>
                    <p class="card-text">${product.brand} </p>
                    <button onclick="getId('${product.slug}')" class="btn btn-primary">see more</button>
                </div>
            </div>
            `;
            phonesDiv.appendChild(div)
            // hide spinner
            document.getElementById('spinner').style.display = 'none'
        })
    }
};