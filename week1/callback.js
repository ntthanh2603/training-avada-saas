
function getData(callback) {
    setTimeout(() => {
      const data = [
        {id: 1, name: "Developer A"},
        {id: 2, name: "Developer B"}
      ]; 
  
      callback(data);
    }, 1000)
  }
  
  getData((data) => {
    const names = data.map(data => data.name);
    console.log(names);
  });
  