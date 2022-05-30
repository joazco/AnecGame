#! node
"use strict";

const { exec } = require("child_process");
const { rename } = require("fs");

const pathBuildFront = "./Front";
const pathHomePage = "./Home/";
const pathCreateGame = "./POC/Front/";

const processPageGame = () => {
  rename(
    `${pathCreateGame}build/index.html`,
    `${pathCreateGame}build/anec-game.html`,
    () => {
      exec(
        `mv -v ${pathCreateGame}build/* ${pathBuildFront}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`processPageGame::error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`processPageGame::stderr: ${stderr}`);
            return;
          }
        }
      );
    }
  );
};

const processBuildCreateGame = () => {
  exec(`npm run buildReact`, (error, stdout, stderr) => {
    if (error) {
      console.error(`processBuildCreateGame::error: ${error.message}`);
      return;
    }
    console.log(`processBuildCreateGame:: ${stdout}`);
    processPageGame();
  });
};

const processInitHome = () => {
  exec(`cp -vr ${pathHomePage}. ${pathBuildFront}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`processInitHome::error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`processInitHome::stderr: ${stderr}`);
      return;
    }
    console.log(`processInitHome:: ${stdout}`);
    processBuildCreateGame();
  });
};

const start = () => {
  exec("rm -rfv Front && mkdir -v Front", (error, stdout, stderr) => {
    if (error) {
      console.error(`start::error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`start::stderr: ${stderr}`);
      return;
    }
    console.log(`start:: ${stdout}`);
    processInitHome();
  });
};

start();
