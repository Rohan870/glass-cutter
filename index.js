const mainHeight = document.getElementById("mainHeight");
const mainWidth = document.getElementById("mainWidth");
const submit = document.getElementById("submit");
const canvas = document.getElementById("canvas");
const item = document.getElementById("item");
let count = 1;

let array = [];
// On click auto rows append of height and width
item.addEventListener("click", (e) => {
    let template = document.createElement("div");
    count++;
    template.innerHTML = `
      <input
        class="ab border-2 border-gray-300 p-2 m-2 focus:border-blue-300 outline-none rounded-lg tracking-wider"
        type="text"
        placeholder="Height ${count}"
        id="height${count}"
      />
      <input
        class="ab border-2 border-gray-300 p-2 m-2 focus:border-blue-300 outline-none rounded-lg tracking-wider"
        type="text"
        placeholder="Width ${count}"
        id="width${count}"
      />
`;
    document.getElementById("input").appendChild(template);

});
submit.addEventListener("click", draw)



function draw() {
    //append height width in array 
    array = [];
    for (let i = 1; i <= count; i++) {
        array.push(getDimensions(i));
    }

    array.sort(function (a, b) {
        return a.height - b.height;
    });
    console.log(array)

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.shadowColor = "white";
    canvas.height = mainHeight.value;
    canvas.width = mainWidth.value;
    console.log(valueoverflow())
    if (valueoverflow()) {
        alert("please enter appropriate width or hight");
    }

    else {
        let x = 0;
        let y = 0;
        let tempx = 0;
        let tempwidth = 0;
        let overheight=0;
        array.map(
            (i, index) => {
                tempwidth += parseInt(i.width);
                
                if (tempwidth > mainWidth.value) {
                    x = 0;
                    y += parseInt(array[index - 1].height);
                    overheight=y;
                    tempwidth = parseInt(i.width);
                    tempx = 0;
                    console.log(overheight);
                }
                if(overheight+parseInt(i.height)>mainHeight.value){
                        alert("please enter appropriate height")
                        return;
                    }
                else {
                    x = tempx;
                    
                }
                tempx += parseInt(i.width);
                ctx.strokeStyle = "#FF0000";
                ctx.rect(x, y, i.width, i.height);
                ctx.stroke();
            }
        )
    }

}

function getDimensions(i) {
    let height = document.getElementById(`height${i}`).value;
    let width = document.getElementById(`width${i}`).value;

    /* let height = flip(mainHeight.value, mainWidth.value, tempheight, tempwidth).height;
     let width = flip(mainHeight.value, mainWidth.value, tempheight, tempwidth).width;*/

    return { height: height, width: width };
}


/*function flip(mainheight, mainwidth, tempheight, tempwidth) {
    let height = 0;
    let width = 0;
    if ((mainheight > mainwidth && tempheight < tempwidth) || (mainwidth > mainheight && tempwidth < tempheight)) {
        height = tempwidth
        width = tempheight
    }
    else {
        width = tempwidth;
        height = tempheight
    }
    return { height: height, width: width }
}*/

function valueoverflow() {
    let x = 0;

    for (let i = 1; i <= count; i++) {
        x += parseInt(getDimensions(i).height) * parseInt(getDimensions(i).width);

    }

    if (x > mainHeight.value * mainWidth.value) {
        return true;
    }
    else {
        return false;
    }

}



function greatestHeight() {
    let height = 0;
    for (let i = 1; i <= count; i++) {
        if (height < getDimensions(i).height) {
            height = getDimensions(i).height;
        }
    }
    return height;
}