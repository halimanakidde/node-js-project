// //syncronous exanmple
// console.log(" I ");

// console.log(" eat ");

// console.log(" Ice Cream ");

//asyncronous example
// console.log("I");

// // This will be shown after 2 seconds

// setTimeout(()=>{
//   console.log("eat");
// },2000)

// console.log("Ice Cream")

//callback function example
let stocks = {
    Fruits : ["strawberry", "grapes", "banana", "apple"],
    liquid : ["water", "ice"],
    holder : ["cone", "cup", "stick"],
    toppings : ["chocolate", "peanuts"],
 };

// let order = (fruit_name,call_production) =>{
//     //console.log("Order placed. Please call production")
// // function 👇 is being called
//   call_production();
// };

// let production = () =>{
//     //console.log("Production has started")
// };

// order("", production);

// 1st Function

let order = (fruit_name, call_production) =>{

  setTimeout(function(){

    console.log(`${stocks.Fruits[fruit_name]} was selected`)

// Order placed. Call production to start
   call_production();
  },2000)
};

// 2nd Function

let production = () =>{
  // blank for now
};

// Trigger 👇
order(0, production);