rightEyeX = 0;
rightEyeY = 0;

leftEyeX = 0;
leftEyeY = 0;

function preload() {
    sun_glasses = loadImage('https://i.postimg.cc/52LbxZYn/sunglasses-PNG155.png');
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
    posenet = poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("model is loaded");
}


function draw() {
    image(video, 0, 0, 350, 350);
    image(sun_glasses, leftEyeX, leftEyeY, eye_width, 30);
}

function takeSnapshot() {
    save('Filter_image.png');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightEyeX = results[0].pose.rightEye.x - 15;
        rightEyeY = results[0].pose.rightEye.y;

        leftEyeX = results[0].pose.leftEye.x + 15;
        leftEyeY = results[0].pose.leftEye.y;

        eye_width = rightEyeX - leftEyeX;
        console.log("X of left eye =" + results[0].pose.leftEye.x);
        console.log("Y of left eye =" + results[0].pose.leftEye.y);
        console.log("X of right eye =" + results[0].pose.rightEye.x);
        console.log("Y of right eye =" + results[0].pose.rightEye.y);

    }
}