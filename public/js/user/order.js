function cancelOrder(orderId){
  $.ajax({
    url : '/users/orders/' + orderId,
    method : "patch",
    success : (res) => {
      if(res.success.message === 'cancelled'){
        $("#orderDetails").load(location.href + " #orderDetails");
        Swal.fire({
          toast: true,
          icon: "success",
          position: "top-right",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          animation: true,
          title: "Order cancelled",
        });
      }
    },
  });
}

// Print invoice
function printInvoice(id){
  let printContents = document.getElementById(id).innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();

  document.body.innerHTML = originalContents
}


function handleClickEvent(event) {
  const checkbox = event.target;
  const starLabel = checkbox.parentElement;
  starLabel.classList.toggle('checked');
}



// return form validation  --- checking for 10 days difference
function checkValid(deliveredOn){

  const deliveredDate = new Date(deliveredOn);
  const currentDate = new Date();

  const differenceInTime = currentDate.getTime() - deliveredDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime/( 1000 * 3600 * 24))
  console.log(differenceInDays);
  if(differenceInDays <= 10){
    $("#exampleModal").modal('show');
  }else{
    swal.fire({
      icon: 'warning',
      title: 'Unable to Return',
      text: 'The return period of 10 days has already expired.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }

}

