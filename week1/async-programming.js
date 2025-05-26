const test1 = () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const promise1 = async () => {
    await delay(1000);
    console.log("Promise 1 executed test 1");
  };

  const promise2 = async () => {
    await delay(3000);
    console.log("Promise 2 executed test 1");
  };

  // Consider this to be a controller
  (async () => {
    try {
      const start = new Date();
      await promise1();
      await promise2();
      const end = new Date() - start;
      console.info("Execution time test 1: %dms", end); // This will take 4s
    } catch (e) {
      console.log("Got an error here");
    }
  })();
};

const test2 = () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const promise1 = async () => {
    await delay(1000);
    console.log("Promise 1 executed test 2");
  };

  const promise2 = async () => {
    await delay(3000);
    console.log("Promise 2 executed test 2");
  };

  // Consider this to be a controller
  (async () => {
    try {
      const start = new Date();
      await Promise.all([promise1(), promise2()]);
      const end = new Date() - start;
      console.info("Execution time test 2: %dms", end); // This will take 3s only
    } catch (e) {
      console.log("Got an error here");
    }
  })();
};

test1();
test2();
// Result
// Promise 1 executed test 1
// Promise 1 executed test 2
// Promise 2 executed test 2
// Execution time test 2: 3015ms
// Promise 2 executed test 1
// Execution time test 1: 4026ms
