navCurrent("navProducts");

const productTable = document.getElementById("productTable");
productTable.onclick = function(event){
  var target = event.target;

  if (target.name == 'delete'){
    requestDelete(event, target.value);
  };

  if (target.name == 'update'){
    var inputElements = document.getElementsByClassName("input" + target.value);
    var nameInput = inputElements[0];
    var priceInput = inputElements[1];
    var updateButton = inputElements[2];
    nameInput.disabled = false;
    priceInput.disabled = false;
    event.preventDefault();

    updateButton.textContent = 'Submit';
    updateButton.setAttribute('class', "btn btn-info input" + target.value);
    updateButton.addEventListener('click', async (event) => {
      var inputs = {};
      inputs['product_id'] = target.value;
      inputs['product_name'] = target.form.name.value;
      inputs['product_price'] = target.form.price.value;
      // console.log(inputs);
      await requestPut(event, inputs);
      await window.location.reload();
    });
  };
}

function requestDelete(event, id){
  var req = new XMLHttpRequest();
  req.open('DELETE', '/products')
  req.setRequestHeader('Content-Type', 'application/json')
  req.send(JSON.stringify({id: id}));
}

function requestPut(event, inputs){
  var req = new XMLHttpRequest();
  req.open('PUT', '/products')
  req.setRequestHeader('Content-Type', 'application/json')
  req.send(JSON.stringify(inputs));
}
