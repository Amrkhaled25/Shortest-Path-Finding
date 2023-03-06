// deltas
dx = [1, 0, -1, 0];
dy = [0, 1, 0, -1];
// check for borders of grid
function valid(x, y) {
  if (x < 0 || y < 0 || x > 30 || y > 50) return false;
  return true;
}

// Queue
var queue = [];

var used = [];
var par = [];
for (let j = 0; j < 35; j++) {
  used[j] = new Array(55);
  par[j] = new Array(55);
}

for (let i = 0; i <= 33; i++) {
  for (let j = 0; j < 55; j++) {
    used[i][j] = 0;
    par[i][j] = [-1, -1];
  }
}

const bfs = function (ssx, ssy, eex, eey) {
  queue.push(ssx);
  queue.push(ssy);
  used[ssx][ssy] = 1;
  while (queue.length > 0) {
    let r = 0;
    let vs = queue.shift();
    let vy = queue.shift();
    for (let k = 0; k < 4; k++) {
      let xx = vs + dx[k];
      let yy = vy + dy[k];

      if (valid(xx, yy)) {
        if (used[xx][yy] === 0) {
          let F = 1;
          for (let b = 0; b < arr.length; b += 2) {
            if (arr[b] === xx && arr[b + 1] === yy) {
              F = 0;
              break;
            }
          }
          if (F === 1) {
            used[xx][yy] = 1;
            let str = xx + "-" + yy;
            if (!((xx === ssx && yy === ssy) || (xx === eex && yy === eey))) {
              document.getElementById(str).style.backgroundColor = "#FFFF00";
            }
            queue.push(xx);
            queue.push(yy);
            par[xx][yy] = [vs, vy];
          }
          if (xx === eex && yy === eey) {
            r = 1;
            break;
          }
        }
      }
    }

    if (r === 1) break;
  }

  if (!used[eex][eey]) {
    return -1;
  } else {
    var path = [];
    for (let v = [eex, eey]; v[0] !== -1 && v[1] !== -1; v = par[v[0]][v[1]]) {
      path.push(v);
    }
    return path;
  }
};

let fs = 0,
  fe = 0;
let sx = -1,
  sy = -1;
let ex = -1,
  ey = -1;
var arr = new Array();
let stp = 0;

// select  start and end point
document.querySelector("#arr").addEventListener("click", function (e) {
  const cell = e.target.closest("td");
  if (!cell) return;
  const row = cell.parentElement;
  let str = row.rowIndex + "-" + cell.cellIndex;
  if (!fs) {
    document.getElementById(str).style.backgroundColor = "#00FF00";
    sx = row.rowIndex;
    sy = cell.cellIndex;

    fs = 1;
    document.querySelector(".msg").textContent =
      "Please press on the end cell...";
  } else if (fs === 1 && !fe) {
    document.getElementById(str).style.backgroundColor = "#FF0000";
    ex = row.rowIndex;
    ey = cell.cellIndex;
    fe = 1;
    document.querySelector(".msg").textContent = "Please choose monsters...";
  } else if (fs === 1 && fe === 1 && !stp) {
    if (row.rowIndex === sx && cell.cellIndex === sy) {
      // Nothing
    } else if (row.rowIndex === ex && cell.cellIndex === ey) {
      // Nothing
    } else {
      arr.push(row.rowIndex);
      arr.push(cell.cellIndex);
      document.getElementById(str).style.backgroundColor = "#808080";
      document.getElementById(str).textContent = "🎃";
    }
  }

  // submit
  document.querySelector(".button").addEventListener("click", function () {
    document.querySelector(".msg").textContent = "This is Your Path...";
    stp = 1;
    var ret = bfs(sx, sy, ex, ey);
    if (ret === -1) {
      document.querySelector(".msg").textContent = "No Path exist...";
    } else {
      for (var i = ret.length - 1; i >= 0; i--) {
        var str = ret[i][0] + "-" + ret[i][1];
        if (
          !(
            (ret[i][0] === sx && ret[i][1] === sy) ||
            (ret[i][0] === ex && ret[i][1] === ey)
          )
        )
          document.getElementById(str).style.backgroundColor = "#0000FF";
      }
    }
  });
});
