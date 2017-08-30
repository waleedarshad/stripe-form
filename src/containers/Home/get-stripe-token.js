export const getStripeToken = (card) =>
new Promise((resolve, reject) => {
  Stripe.card.createToken(card, (status, { error, id }) => {
    if (error) {
      reject(error.message);
    } else {
      resolve(id);
    }
  });
});



export const CreateStripeCustomer = (token) =>

new Promise((resolve, reject) => {
	stripe.customers.create({
    email: "email@test.com",
    source: token
  }).then( (customer) => {
    console.log("customer",customer);


    Charge(customer)

    return customer;
  });

});




// function Charge(customer) {
// 	let options = {
// 	  amount: 1000,
// 	  currency: 'usd',
// 	  customer: customer.stripeCustomerID
// 	};

// 	stripe.charges.create(options, function (err, charge) {
// 	  if ( err ) {
// 	    console.log("got error", error );
// 	  } else {
// 	    stripe.invoiceItems.create({
// 	      customer: "stripeCustomerID",
// 	      amount: totalAmount,
// 	      currency: 'usd',
// 	      description: invoiceMessage
// 	    }, function(err,  invoiceItem){});
// 	    if (recuringInterval) {
// 	      stripe.subscriptions.create({
// 	        customer: user.stripeCustomerID,
// 	        plan: recuringInterval,
// 	      }, function(err, subscription) {
// 	      })
// 	    }
	   
	    
// 	  }
// 	});
// }