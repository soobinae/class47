var gameState = "start";
var obstaclesGroup, glassTrashImg, metalTrashImg, plasticTrashImg, organicWasteImg, exitButton;

function preload() {
  loganImg = loadImage("images/loganPc.png");
  emilyImg = loadImage("images/emily.png");
  carsonImg = loadImage("images/carson.png");
  trashImg = loadImage("images/trash.png");
  gameLogoImg = loadImage("images/gameLogo.png");
  backgroundImg = loadImage("images/backgroundImg.jpg");
  startbuttonImg = loadImage("images/startButton.png");
  background1 = loadImage("images/background1.jpg");
  storyImg = loadImage("images/story.png");
  informationImg = loadImage("images/informationButton.png");
  glassTrashImg = loadImage("images/glassTrash.png");
  metalTrashImg = loadImage("images/metalTrash.png");
  plasticTrashImg = loadImage("images/plasticTrash.png");
  exitButtonImg = loadImage("images/exitButton.png");
  level1Img = loadImage("images/level1.png");
  level2Img = loadImage("images/level2.png");
  startButtonImg1 = loadImage("images/startButton1.png");
  level1InformationImg = loadImage("images/level1Information.png");
  level2InformationImg = loadImage("images/level2Information.png");
  organicWasteImg = loadImage("images/organicWaste.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Create the Bodies Here.
  bg = createSprite(400, 350);
  bg.addImage(backgroundImg);
  bg.scale = 2.8;

  bg1 = createSprite(400, 350);
  bg1.addImage(background1);
  bg1.scale = 1.2;
  bg1.visible = false;

  gamelogo = createSprite(windowWidth / 2, windowHeight / 2);
  gamelogo.addImage(gameLogoImg);
  gamelogo.scale = 1.4;

  logan = createSprite(windowWidth / 2 - 50, windowHeight - 150);
  logan.addImage(loganImg);
  logan.scale = 1;

  emily = createSprite(windowWidth / 2 - 150, windowHeight - 150);
  emily.addImage(emilyImg);
  emily.scale = 0.4;

  carson = createSprite(windowWidth / 1.9 - 1, windowHeight - 180);
  carson.addImage(carsonImg);
  carson.scale = 0.5;

  ground = createSprite(windowWidth / 2, windowHeight - 50, windowWidth, 10);

  start = createSprite(windowWidth / 2, windowHeight / 2 + 100);
  start.addImage(startbuttonImg);
  start.scale = 1;
  start.visible = true;

  start1 = createSprite(windowWidth / 2, windowHeight / 2 - 200);
  start1.addImage(startButtonImg1);
  start1.scale = 1;
  start1.visible = false;

  information = createSprite(700, windowHeight / 2 + 50);
  information.addImage(storyImg);
  information.scale = 2;
  information.visible = false;

  level1Information = createSprite(700, windowHeight / 2 + 50);
  level1Information.addImage(level1InformationImg);
  level1Information.scale = 2;
  level1Information.visible = false;

  level2Information = createSprite(1010, windowHeight / 2 + 50);
  level2Information.addImage(level2InformationImg);
  level2Information.scale = 2;
  level2Information.visible = false;

  informationButton = createSprite(windowWidth / 2, windowHeight / 2 + 160);
  informationButton.addImage(informationImg);
  informationButton.scale = 0.1;

  exitFromInfo = createSprite(windowWidth / 2 + 350, 190)
  exitFromInfo.scale = 0.3;
  exitFromInfo.visible = false;
  exitFromInfo.addImage(exitButtonImg);

  level1 = createSprite(windowWidth / 2 - 350, windowHeight / 2 - 50)
  level1.scale = 1;
  level1.visible = false;
  level1.addImage("level", level1Img);

  level2 = createSprite(windowWidth / 2 + 450, windowHeight / 2 - 50)
  level2.scale = 1;
  level2.visible = false;
  level2.addImage("level0", level2Img);

  glassTrashGroup = new Group();
  metalTrashGroup = new Group();
  plasticTrashGroup = new Group();
  organicTrashGroup = new Group();


  exitfromLevel1 = createSprite(windowWidth / 2 + 350, 100);
  exitfromLevel1.addImage(exitButtonImg);
  exitfromLevel1.visible = false;
  exitfromLevel1.scale = 0.3;

  exitfromLevel2 = createSprite(windowWidth / 2 + 350, 100);
  exitfromLevel2.addImage(exitButtonImg);
  exitfromLevel2.visible = false;
  exitfromLevel2.scale = 0.3;
}

function draw() {
  background(0);

  //console.log(exitButton.x)

  drawSprites();
  fill("white")
  textSize(15);
  text(mouseX + ',' + mouseY, mouseX, mouseY);


  if (gameState === "start") {
    if (mousePressedOver(start)) {
      gameState = "play";
    }
    if (mousePressedOver(informationButton)) {
      gameState = "info"
    }
  }

  if (gameState === "play") {
    bg1.visible = true;
    gamelogo.visible = false;
    bg.visible = false;
    start.visible = false;
    informationButton.visible = false;
    level1.visible = true;
    level2.visible = true;

    bg1.velocityX = -3;
    if (bg1.x < windowWidth / 2 - 100) {
      bg1.x = windowWidth / 2;
    }

    if (mousePressedOver(level1)) {
      level1Information.visible = true;
      start1.visible = true;
      level1.destroy();
      exitfromLevel1.visible = true;

      if (mousePressedOver(exitfromLevel1)) {
        gameState = "level1Exit";
        start1.visible = true;
        information.visible = false;
        exitfromLevel1.visible = false;
        informationButton.visible = false;
        level1.visible = true;
        level2.visible = true;
        level1Information.visible = false;
        level2Information.visible = false;
      }
    }

    if (mousePressedOver(level2)) {
      level2.destroy();
      level1Information.visible = false;
      level2Information.visible = true;
      start1.visible = true;
      exitfromLevel2.visible = true;
      level2Information.x = 700;

      if (mousePressedOver(exitfromLevel2)) {
        gameState = "play";
        information.visible = false;
        exitfromLevel2.visible = false;
        informationButton.visible = false;
        level1.visible = true;
        level2.visible = true;
        level1Information.visible = false;
        level2Information.visible = false;
      }
    }
  }
  if (gameState === "level1") {
    spawnObstacles();
    spawnObstacles1();
    spawnObstacles2();
  }

  if (gameState === "info") {
    information.visible = true;
    informationButton.visible = false;
    information.scale = 0.7;

    exitFromInfo.visible = true;


    if (mousePressedOver(exitFromInfo)) {
      gameState = "start";
      information.visible = false;
      exitFromInfo.visible = false;
      informationButton.visible = true;
      level1.visible = true;
      level2.visible = true;
    }

  }

  if (gameState === "level1Exit") {
    start1.visible = true;
    information.visible = false;
    exitfromLevel1.visible = false;
    informationButton.visible = false;
    level1.visible = true;
    level2.visible = true;
    level1Information.visible = false;
    level2Information.visible = false;

  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    glassTrash = createSprite(100, -2, 10, 10)
    glassTrash.x = Math.round(random(100, windowWidth - 200))
    glassTrash.addImage(glassTrashImg);
    glassTrash.scale = 0.6;
    glassTrash.lifetime = windowHeight / 4;
    glassTrash.velocityY = 4;
    glassTrashGroup.add(glassTrash);
  }
}

function spawnObstacles1() {
  if (frameCount % 60 === 0) {
    metalTrash = createSprite(100, -2, 10, 10)
    matelTrash.x = Math.round(random(100, windowWidth - 200))
    metalTrash.addImage(metalTrashImg);
    metalTrash.scale = 0.6;
    metalTrash.lifetime = windowHeight / 4;
    metalTrash.velocityY = 2;
    metalTrashGroup.add(metaltrash);
  }
}

function spawnObstacles2() {
  if (frameCount % 60 === 0) {
    plasticTrash = createSprite(100, -2, 10, 10)
    plasticTrash.x = Math.round(random(100, windowWidth - 200))
    plasticTrash.addImage(plasticTrashImg);
    plasticTrash.scale = 0.6;
    plasticTrash.lifetime = windowHeight / 4;
    plasticTrash.velocityY = 5;
    plasticTrashGroup.add(plasticTrash);
  }
}

function spawnObstacles3() {
  if (frameCount % 60 === 0) {
    organicTrash = createSprite(100, -2, 10, 10)
    organicTrash.x = Math.round(random(100, windowWidth - 200))
    organicTrash.addImage(organicWasteImg);
    organicTrash.scale = 0.6;
    organicTrash.lifetime = windowHeight / 4;
    organicTrash.velocityY = 1;
    organicTrashGroup.add(organicTrash);
  }
}

function showLife() {
  push();
  image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
  fill("white");
  rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
  fill("#f50057");
  rect(width / 2 - 100, height - player.positionY - 400, player.life, 20);
  noStroke();
  pop();
}