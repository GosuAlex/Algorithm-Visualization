function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

// symmetric adjacency matrix 
export function genAdjSymMatrix(cities, maxPossibleDistance) {

  let arr = [[0]];
  for (let i = 1; i < cities; i++) {
    arr[0].push(randomNumber(maxPossibleDistance));
  }

  for (let i = 1; i < cities; i++) {
    
    arr[i] = [];
    let j = 0;
    
    while(i !== j) {
      arr[i].push(arr[j][i]);
      j++
    }
    
    arr[i].push(0);
    j++;
    
    while(j < cities) {
      arr[i].push(randomNumber(maxPossibleDistance));
      j++;
    }
    
  }

  return arr;
}


/*
Random Method (A totally random tour can be generated as follows):

Choose  a random starting city. Mark this city as visited
While ( all cities not visisted ) {
  start: Choose a random city;
  Mark it visited;
  Connect it to the previous chosen city;
}
*/

export function algoInitRandom(arr) {
  let visitedCities = [(Math.floor(Math.random() * arr.length))];
  let newCity = null;
  let distance = 0;

  while (visitedCities.length <= arr.length - 1) {
    newCity = Math.floor(Math.random() * arr.length);
    if (!visitedCities.includes(newCity)) {
      distance += arr[visitedCities[(visitedCities.length - 1)]][newCity];
      visitedCities.push(newCity);
    }
  }
  // Go back to startpoint at the end.
  distance += arr[visitedCities[(visitedCities.length - 1)]][visitedCities[0]];
  visitedCities.push(0);

  const route = {
    visitedCities: visitedCities,
    distance: distance
  }
  
  return route;
}

export function algoInitGreedy(arr) {
  let visitedCities = [(Math.floor(Math.random() * arr.length))];
  let distance = 0;
  
  let newCity = null;
  let cityFilter = new Set([]);

  while (visitedCities.length <= arr.length - 1) {
    let possibleCities = [...arr[visitedCities[(visitedCities.length - 1)]]];
    
    newCity = possibleCities.indexOf(Math.min(...possibleCities));
    
    while (cityFilter.has(newCity) || !Boolean(possibleCities[newCity])) {
      cityFilter.add(newCity);
      possibleCities[newCity] = Infinity;
      newCity = possibleCities.indexOf(Math.min(...possibleCities));
    }

    if (!cityFilter.has(newCity) && Boolean(possibleCities[newCity])) {
      distance += arr[visitedCities[(visitedCities.length - 1)]][newCity];
      visitedCities.push(newCity);
    } 
  }
  
  distance += arr[visitedCities[(visitedCities.length - 1)]][visitedCities[0]];
  visitedCities.push(visitedCities[0]);

  const route = {
    visitedCities: visitedCities,
    distance: distance
  }

  return route;
}

export function greedyImprovement(arr, visitedCitiesInit, distanceInit, iterations) {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: [],
    distance: []
  };

  let visitedCities = [...visitedCitiesInit];
  let visitedCitiesNew = null;
  let distance = distanceInit;
  let distanceNew = null;
  let times = iterations;
  
  while (times > 0) {
    let cityOne = (Math.floor(Math.random() * arr.length));
    let cityTwo = (Math.floor(Math.random() * arr.length));
    while (cityOne === cityTwo) {
      cityTwo = (Math.floor(Math.random() * arr.length));
    }
    
    distanceNew = null;
    visitedCitiesNew = [...visitedCities];
    visitedCitiesNew.pop();
    visitedCitiesNew[cityOne] = visitedCities[cityTwo];
    visitedCitiesNew[cityTwo] = visitedCities[cityOne];
    
    for (let i = visitedCitiesNew.length; i >= 2; i--) {
      distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - i)]][visitedCitiesNew[(visitedCitiesNew.length - (i-1))]];
    }
    distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - 1)]][visitedCitiesNew[0]];
    visitedCitiesNew.push(visitedCitiesNew[0]);
    
    if (distanceNew <= distance) {
      distance = distanceNew;
      visitedCities = visitedCitiesNew;

      sortingReplay.arrMutation.push([...visitedCities]);
      sortingReplay.swapMovement.push(cityOne);
      sortingReplay.indexMovement.push(cityTwo);
      sortingReplay.frontIndex.push([]);
      sortingReplay.distance.push(distance);
    } else {
      sortingReplay.arrMutation.push([...visitedCities]);
      sortingReplay.swapMovement.push(null);
      sortingReplay.indexMovement.push(null);
      sortingReplay.frontIndex.push([cityOne, cityTwo]);
      sortingReplay.distance.push(distance);
    }
  
    times--;
  }

  sortingReplay.arrMutation.push([...visitedCities]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push([]);
  sortingReplay.distance.push(distance);

  return sortingReplay;
}

export function greedyRandom(arr, visitedCitiesInit, distanceInit, iterations) {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: [],
    distance: []
  };

  let visitedCities = [...visitedCitiesInit];
  let visitedCitiesNew = null;
  let visitedCitiesBest = null;
  let distance = distanceInit;
  let distanceBest = distanceInit;
  let times = 300;
  let acceptanceProbability = 0.9;

  do {
    for (let i = times; i > 0; i--) {
      iterations--;
      if(iterations <= 0) {
        sortingReplay.arrMutation.push([...visitedCities]);
        sortingReplay.swapMovement.push(null);
        sortingReplay.indexMovement.push(null);
        sortingReplay.frontIndex.push([]);
        sortingReplay.distance.push(distance);
  
        return sortingReplay;
      }

      let distanceNew = null;
      visitedCitiesNew = [...visitedCities];
      visitedCitiesNew.pop();

      let cityOne = (Math.floor(Math.random() * arr.length));
      let cityTwo = (Math.floor(Math.random() * arr.length));
      while (cityOne === cityTwo) {
        cityTwo = (Math.floor(Math.random() * arr.length));
      }
    
      visitedCitiesNew[cityOne] = visitedCities[cityTwo];
      visitedCitiesNew[cityTwo] = visitedCities[cityOne];
    
      for (let i = visitedCitiesNew.length; i >= 2; i--) {
        distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - i)]][visitedCitiesNew[(visitedCitiesNew.length - (i-1))]];
      }
      // Go back to startpoint at the end.
      distanceNew += arr[visitedCitiesNew[(visitedCitiesNew.length - 1)]][visitedCitiesNew[0]];
      visitedCitiesNew.push(visitedCitiesNew[0]);
      
      if (distanceNew <= distance) {
        distance = distanceNew;
        visitedCities = visitedCitiesNew;

        sortingReplay.arrMutation.push([...visitedCities]);
        sortingReplay.swapMovement.push(cityOne);
        sortingReplay.indexMovement.push(cityTwo);
        sortingReplay.frontIndex.push([]);
        sortingReplay.distance.push(distance);

        if (distanceNew <= distanceBest) {
          distanceBest = distanceNew;
          visitedCitiesBest = visitedCitiesNew;
        }
      } else {
        if (Math.random() > acceptanceProbability) {
          distance = distanceNew;
          visitedCities = visitedCitiesNew;

          sortingReplay.arrMutation.push([...visitedCities]);
          sortingReplay.swapMovement.push(cityOne);
          sortingReplay.indexMovement.push(cityTwo);
          sortingReplay.frontIndex.push([]);
          sortingReplay.distance.push(distance);
        } else {
          sortingReplay.arrMutation.push([...visitedCities]);
          sortingReplay.swapMovement.push(null);
          sortingReplay.indexMovement.push(null);
          sortingReplay.frontIndex.push([cityOne, cityTwo]);
          sortingReplay.distance.push(distance);
        }
      }
    }
    acceptanceProbability = acceptanceProbability * 0.9;

    } while (acceptanceProbability > 0.1); 

    sortingReplay.arrMutation.push([...visitedCitiesBest]);
    sortingReplay.swapMovement.push(null);
    sortingReplay.indexMovement.push(null);
    sortingReplay.frontIndex.push([]);
    sortingReplay.distance.push(distance);

    return sortingReplay;
}