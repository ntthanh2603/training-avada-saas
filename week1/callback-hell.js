/**
 * @description This is a example with 3 layer callback hell
 */

/**
 * Fake like we getting data from API which takes 1s
 *
 * @param callback
 */
function getData(callback) {
    setTimeout(() => {
      const data = [
        {id: 1, name: "Developer A"},
        {id: 2, name: "Devloper B"}
      ]; // Assume the data from API
  
      callback(data);
    }, 1000)
  };
  
  /**
   * Fake like we are submitting the data to an API elsewhere
   *
   * @param inputData
   * @param callback
   */
  function submitData (inputData, callback) {
    console.log('starting to submit');
    setTimeout(() => {
      // Act like we submit the inputData to the server and takes 1s
      const status = randomStatus();
      callback({
        success: status
      });
    }, 1000)
  }
  
  /**
   * Just a helper random the result of the submit: success or failed
   *
   * @returns {boolean}
   */
  const randomStatus = () => [true, false][Math.floor(Math.random() * 2)];
  
  // Main body of the example
getData((data) => {
    const names = data.map(data => data.name);
    console.log(names)
    submitData(names, (response) => {
        const {success} =  response;
        if (success === true) {
        console.log("This is a successful form")
        } else {
        console.log("This is a failed form")
        }
    })
});
  
  /**
   * @conclusion
   *
   * Just imagine that after submit the form,
   * we continue to do more async processes
   * and the code keeps on being nested
   *
   * @see See this link for closer look at callback hell
   * @link http://callbackhell.com/
   *
   */

  
// With 2 layer callback hell
// PS D:\training-avada-saas> node week1/callback-hell.js      
// [ 'Developer A', 'Devloper B' ]
// starting to submit
// This is a failed form
// PS D:\training-avada-saas> node week1/callback-hell.js
// [ 'Developer A', 'Devloper B' ]
// starting to submit
// This is a successful form