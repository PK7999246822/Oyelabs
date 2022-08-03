const request = require('request');
const helperPromise = function () {
    const promise = new Promise(function (resolve, reject) {
     
      if ('http://www.google.com') {
        resolve("successful");
      } else {
        reject("error");g
      }
    });
 
    return promise;
  };
 
  async function demoPromise() {
    try {
      let message = await helperPromise();
      window.location ='http://www.google.com';
      console.log(message)
    } catch (error) {
      console.log(error);
    }
  }
 demoPromise();
