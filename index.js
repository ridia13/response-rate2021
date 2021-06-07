"use strict";

const $screen = document.querySelector('.js-screen'),
  $msg = $screen.querySelector(".js-msg"),
  $average = $screen.querySelector(".js-average");
  
let startTime;
let endTime;
let timeoutId;
let speed = [];
let $ul;

const sortSpeed = () => { //top5 구하기
  const sort = speed.slice().sort();
  const topFive = sort.slice(0, 5);
  $ul = document.createElement("ul");
  $screen.append($ul);
  topFive.forEach((topValue, i, arr) => {
    const $li = document.createElement("li");
    $ul.append($li);
    $li.textContent = `${i+1}위 : ${topValue.toFixed(2)}s`;
  });
}

const calcSpeed = (timeDifference) => { //반응속도 구하기
  const addSpeed = speed.reduce((pre, current) => pre + current);
  const average = addSpeed / speed.length;
  $average.textContent = `Current: ${timeDifference.toFixed(2)}s, Average: ${average.toFixed(2)}s`;
}

const timeout = () => { //startTime 재기
  let random = Math.floor(Math.random() * 1000) + 2000; //2~3s
  timeoutId = setTimeout(() => {
    $screen.id = 'go';
    $msg.textContent = "Click here.";
    startTime = Date.now();
  }, random);
};

const clickScreen = () => { //read : red/ set : yellow / go : green
  const $class = $screen.id;

  if ($class === 'ready') { //ready(red screen)
    $screen.id = 'set';
    $msg.textContent = "Click when the screen turns green.";
    $average.textContent = "";
    $ul ? $ul.remove() : null; //ul유무에 따른 삭제
    timeout(); //startTime 재기
  } else if ($class === 'set') { //set(gold screen)
    clearTimeout(timeoutId);
    $screen.id = 'ready';
    $msg.textContent = "You were in such a hurry.";
  } else if ($class === 'go') { //go(green screen)
    endTime = new Date(); //endTime 재기
    const timeDifference = (endTime - startTime) / 1000;
    speed.push(timeDifference);
    $screen.id = 'ready';
    $msg.textContent = `Please click on the screen.`;
    calcSpeed(timeDifference);
    sortSpeed();
  }
}

function init() {
  $screen.addEventListener('click', clickScreen);
}

init();