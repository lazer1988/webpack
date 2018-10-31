class Test {
  state = {};

  go = () => {
    return 'go';
  }
}


let o = {name: 'laz'};
let o2 = {lastname: 'last'};

let merge = {...o, ...o2};

console.log(merge);
