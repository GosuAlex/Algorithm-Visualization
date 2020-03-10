function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

export function createRandomObjects(numberOfObjects, maxValue, maxWeight) {
  const object = {
    value: Array.from({length: numberOfObjects}, () => randomNumber(maxValue)),
    weight: Array.from({length: numberOfObjects}, () => randomNumber(maxWeight))
  }
  
  return object;
}

export function createRandomKnapsack(maxWeight, objects) {
  const arr = Array.from({length: objects.weight.length}, (v, i) => 0);;
  let i = 0;
  let knapsackWeight = 0;
  
  while (knapsackWeight < maxWeight && i <= maxWeight) {
    const randomPick = randomNumber(arr.length - 2);
    arr[randomPick] = 1;
    knapsackWeight += objects.weight[randomPick];
    i++;
  }
  enforceWeightLimit(arr, maxWeight, objects);
  
  return arr;
} 

function checkFitness(knapsack, objects) {
  let fitness = 0;
  
  knapsack.forEach((item, index) => {
    if (item === 1) {
      fitness += objects.value[index];
    }
  });
  
  return fitness;
}

function checkWeight(knapsack, objects) {
  let weight = 0;
  
  knapsack.forEach((item, index) => {
    if (item === 1) {
      weight += objects.weight[index];
    }
  });

  return weight;
}

function enforceWeightLimit(knapsack, maxWeight, objects) {
  let weight = checkWeight(knapsack, objects);
  const containsIndex = [];
  
  knapsack.forEach((item, index) => {
    if (item === 1) {
      containsIndex.push(index);
    }
  });

  while(weight > maxWeight) {
    const randomRemove = randomNumber(containsIndex.length - 2);
    weight -= objects.weight[containsIndex[randomRemove]];
    knapsack[containsIndex[randomRemove]] = 0;
  }
}

function mutateRandom(knapsack, objects) {
  const randomPick = randomNumber(knapsack.length - 2);

  if (knapsack[randomPick] === 1) {
    knapsack[randomPick] = 0; 
  }
  else {
    knapsack[randomPick] = 1;
  }
}

function pairParents([...arr]) {
  const arrPaired = [];

  arr.forEach(sack => {
    const randomSack = randomNumber(arr.length - 1);
    arrPaired.push([arr[0], arr[randomSack]]);
    arr.splice(randomSack, 1);
    arr.shift();
  })
  
  return arrPaired;
}

export function geneticRangeCrossover(knapsacks, maxWeight, generations, objects) {
  const sortingReplay = {
    arrMutation: [],
    swapMovement: [],
    fitness: []
  };

  let reproductionArray = [];
  const survivalArray = [];
  let gens = generations;
  let maxNoChangesBeforeQuit = 20;
  survivalArray[0] = Array.from({length: knapsacks.length}, (v, i) => 0);
  survivalArray[1] = Array.from({length: knapsacks.length}, (v, i) => knapsacks[i]);
  
  //Pair parents sacks
  knapsacks.forEach(sack => {
    const randomSack = randomNumber(knapsacks.length - 1);
    reproductionArray.push([knapsacks[0], knapsacks[randomSack]]);
    knapsacks.splice(randomSack, 1);
    knapsacks.shift();
  })
  
  while (gens > 0 && maxNoChangesBeforeQuit >= 0) {
    //loop
    
    if (gens !== generations) {
      reproductionArray = pairParents(survivalArray[1]);
      
      //Accept the current best ones everytime.
      //Unlike without, it has memory and only accept better ones.
      //maxNoChangesBeforeQuit won't work with this on.
      //results better with few chromosomes (4), but worse with more (16)
      //because lack of movement/variance with fewer ones. So they need more pressure to change
      survivalArray[0] = Array.from({length: survivalArray[0].length}, (v, i) => 0);
    }
    
    let rangeStartIndex = randomNumber(reproductionArray[0][0].length -2);
    let rangeEndIndex = randomNumber(reproductionArray[0][0].length -2);
    if (rangeStartIndex > rangeEndIndex) {
      [rangeStartIndex, rangeEndIndex] = [rangeEndIndex, rangeStartIndex];
    }
    
    let change = false;
    
    for(let arr in reproductionArray) {
      
      reproductionArray[arr][2] = Array.from(reproductionArray[arr][0], x => x);   
      reproductionArray[arr][3] = Array.from(reproductionArray[arr][1], x => x); 

      const crossFrom0 = reproductionArray[arr][0].slice(rangeStartIndex, rangeEndIndex + 1);
      const crossFrom1 = reproductionArray[arr][1].slice(rangeStartIndex, rangeEndIndex + 1);

      reproductionArray[arr][2].splice(rangeStartIndex, crossFrom1.length, ...crossFrom1);
      reproductionArray[arr][3].splice(rangeStartIndex, crossFrom0.length, ...crossFrom0);

      //chance: random mutation
      reproductionArray[arr].forEach(sack => {
        if (Math.random() > 0.5) {
          for (let i = 1; i > 0; i--) {
            mutateRandom(sack, objects);
          }
        }
      });

      //remove excessive weight
      reproductionArray[arr].forEach(sack => enforceWeightLimit(sack, maxWeight, objects));

      //check wheight limit
      // let weight = [];
      // reproductionArray[arr].forEach(sack => weight.push(checkWeight(sack, objects)));
      // console.log("wgt "+ weight);
      
      
      //check fitness
      // let fitness = [];
      // reproductionArray[arr].forEach(sack => fitness.push(checkFitness(sack, objects)));
      // console.log("fit " + fitness);    
      
      //put best knapsacks into same length array as original
      // eslint-disable-next-line 
      reproductionArray[arr].forEach(sack => {
        const sackFitness = checkFitness(sack, objects);
        const leastFitIndex = survivalArray[0].findIndex(item => item === Math.min(...survivalArray[0]));
        if (survivalArray[0][leastFitIndex] < sackFitness) {
          survivalArray[0][leastFitIndex] = sackFitness;
          survivalArray[1][leastFitIndex] = [...sack];
          change = true;
        }
      });
      
      //kick duplicates | might not need this if there is the no change after x tries kick
      survivalArray[0].forEach((item, index) => {
        if(survivalArray[0].indexOf(item) !== index) {
          //survivalArray[0][index] = 0;
          for (let i = 10; i > 0; i--) {
            mutateRandom(survivalArray[1][index], objects);
          }
          enforceWeightLimit(survivalArray[1][index], maxWeight, objects);
          survivalArray[0][index] = checkFitness(survivalArray[1][index], objects);
        }
      });
      
    }
    
  if (!change) {
    maxNoChangesBeforeQuit--;
  } else {
    maxNoChangesBeforeQuit = 20; //magic string number. Should be put back to default, but here it's hard coded back to default.
  }  

  gens--;
  
  sortingReplay.arrMutation.push([...survivalArray[1]]);
  sortingReplay.swapMovement.push([rangeStartIndex, rangeEndIndex]);
  sortingReplay.fitness.push([...survivalArray[0]]);
  }

  return sortingReplay;
  //return survivalArray[1]; 
}



// function genetic (point crossover)
// check randomNumber -2 stuff is working
// random range pick isn't good. it picks from [0][0]. It should pick from the longeste maybe? dunno
// make knapsacks objects. with fitness, object array, knapsack contains array, weight on them.
// return only the very best knapsack.
// use reduce on check weight and fitness
// remove sumRangeInArray
// put testing into it. JS testing.

// put best knapsacks in array, so there is memory and return those instead of the current iteration
// fix pariring so there is a function call instead of doing it two ways. knapsack, past reproduction
// make maxNoChangesBeforeQuit work with accept current iteration and not only best ones.
