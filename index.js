const fs = require('fs');

function getFile(path) {
  if (['/', '.', '~'].includes(path[0])) {
    // path is possibly outside of project
  } else {
    path = __dirname + '/' + path;
  }
  try {
    return fs.readFileSync(path, 'utf8').trim();
  } catch (e) {
    return null;
  }
}
function outputChoice(pathName) {
  if (!pathName) {
    return 'Please include the name of a path: node index.js PATHNAME';
  }
  const paths = getFile('paths.txt');
  if (!paths) {
    return 'Please cp paths.txt.example paths.txt';
  }
  const targetPath = paths
    .split('\n')
    .map((el) => {
      return { name: el.split(':')[0], path: el.split(':')[1] };
    })
    .find(({ name }) => name === pathName);

  let totalWeight = 0;
  let tasks = getFile(targetPath.path);
  if (!tasks) {
    return { 'error reading file': targetPath };
  }
  tasks = ('- [x] dummy to ignore\n' + tasks)
    .split(/\n[-\*]\ \[/)
    .slice(1)
    .map((el, index) => {
      let weight;
      try {
        weight = el.split(']', 1)[0].trim();
      } catch (e) {
        console.log({ e, el });
      }
      if (weight === undefined) {
        return '';
      }
      if (weight === 'x' || weight === '-') {
        weight = 0; //skipped element
      } else if (weight === ' ' || weight === '') {
        weight = 1;
      } else {
        weight = Number(weight) ? Number(weight) : 0;
      }
      let task = '- [' + el;
      //task = el;
      totalWeight += weight;
      return { weight, task };
    })
    .filter(({ weight }) => weight > 0);
  const target = Math.ceil(Math.random() * totalWeight);
  let cur = 0;
  for (i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (!task.weight) {
      continue; // x'ed out task
    }
    cur += task.weight;
    if (cur >= target) {
      return task.task;
    }
  }
  return 'Unknown error... target went beyond tasks length';
}

console.log(outputChoice(process.argv[2]));
