import { solve, test } from "../lib/runner.ts";

async function run() {
  const day = "twelve";
  await test(day, 1, partOne, 10);
  await solve(day, 1, partOne, 1);
  await test(day, 2, partTwo, 1);
  await solve(day, 2, partTwo, 1);
}

function partOne(input: Array<string>): number {
  const startNode = 'start'
  const map = new Map<string, Array<string>>()
  input.forEach(line => {
    const [start, dest] = line.split('-')
    const startNodes = map.get(start)
    if (startNodes) {
      startNodes.push(dest)
    } else {
      map.set(start, [dest])
    }
    if (start !== startNode) {
      const destNodes = map.get(dest)
      if (destNodes) {
        destNodes.push(start)
      } else {
        map.set(dest, [start])
      }
    }
  })
  console.log(map)
  const startNodes = map.get(startNode) || []
  map.delete(startNode)
  console.log(map)

  const paths: Array<string> = []
  startNodes.forEach((node) => {
    const visited: Array<string> = [startNode]
    console.log('starting to visit nodes', node, visited)
    visit(map, node, visited, paths)
    console.log('paths after', node, paths)
    //   // if (!visited.includes(c)){
    //   // }
    //   const path = visit(map, node, visited)
    //   console.log(path)
    //   // paths.push(path)
    // })
    // TODO: check the paths and remove any that do not end with 'end'
  })
  console.log('paths', paths)
  return paths.length;
}

// return a path
function visit(map: Map<string, Array<string>>, vistedNode: string, visited: Array<string>, paths: Array<string>) {
  console.log('visting', vistedNode, 'current visited', visited)
  // const visitedAcc = [...visited]
  visited.push(vistedNode)

  // const paths: Array<string> = []
  const nodes = map.get(vistedNode) ||[]
  console.log('going through nodes', nodes)
  for (let i=0;i<nodes.length;i++) {
    const node = nodes[i]
    console.log('checking node', node)
    // end (return visited) | visited (ignore) | !visited (repeat)
    const vistedNodes = map.get(vistedNode)
    if (vistedNodes?.length === 1 && vistedNodes[0].toUpperCase() !== node) {
      console.log('dead end', node)
      visited.pop() // remove last item from visited list
    } else {
      if (node === 'end' ) {
        visited.push('end')
        // paths.push( visited.join(',')) // DONE: returns a list of paths that are ended
        console.log('visited end node', visited.join(',')) // TODO: need to save this path - which should be getting done with the return statement below
        paths.push( visited.join(','))
        visited.splice(visited.length - 2) // pop off last 2 elements
        return
      } else if (!visited.includes(node) || node.toUpperCase() === node) { // not visited OR uppercase node i.e. can be visited multiple times
        console.log('not visited or uppercase node', node, visited)
        visit(map, node, visited, paths)
      } else {
        console.log('ELSE - lowercase multiple visit')
      }
    }
  }
  console.log('current paths', paths)
  //   return paths // empty?
}

function partTwo(input: Array<string>): number {
  return input.length;
}

await run();
