// let dragdiv = document.getElementById('drag');
var del = document.getElementById('delete');
let divs = [];
let offX = 0;
let offY = 0;
let mouX = 0;
let mouY = 0;
let co = 1;
let current = 0;
let toDelete = 0;
let isMouseDown = [];
let isDelete = [];
let actualheight = window.innerHeight
let height = window.innerHeight - (window.innerHeight*0.15);
let informCount = 0;
let typeCount = 0;
// function getCursorCoordinates(event) {
//     return {
//       x: event.clientX,
//       y: event.clientY
//     };
//   }

//   document.addEventListener('mousemove', (e) => {
//     var xy = getCursorCoordinates(e);
    // document.getElementById('check').innerHTML = xy.x + "," + xy.y;
// });
function createElement(){
    const div = document.createElement("textarea");
    div.placeholder = "Type here..."
     const scrollX = window.scrollX;
     const scrollY = window.scrollY;
     document.getElementById('guide').innerHTML = "";
    //  function set(e){
    //     var xy = getCursorCoordinates(e);
    //     div.style.left = xy.x + scrollX + 'px';
    //     div.style.top = (xy.y) + scrollY + 'px';
    //     div.className = "dragable1";
    //  }
    //  function remove(){
    //      document.removeEventListener('mousemove', set);
    //      div.className = "dragable";
    //  }
    // document.addEventListener('mousemove', set);
    // document.addEventListener('mouseup', remove)
    div.className = "dragable1";
    document.body.appendChild(div);
    divs.push(div);
    isMouseDown[co] = false;
    isDelete[co] = false;
    div.setAttribute('id','div'+co);
    dragNdDrop(document.getElementById('div'+co),'div'+co, co);
    // document.getElementById('divo').innerHTML = co;
    co++;
}
// document.getElementById('divo').innerHTML = current;

function dragNdDrop(element, id, co){
    const events = {
        mouse: {
            click: "mousedown",
            drag: "mousemove",
            end: "mouseup"
        },
        touch: {
            click: "touchstart",
            drag: "touchmove",
            end: "touchend"
        },
    }
    const isTouch = () => {
        try {
          document.createEvent("TouchEvent")
          return "touch";
        } catch (error) {
          return "mouse";
        }
    };
    
     
    element.addEventListener( events[isTouch()].click, (e) => {
        isMouseDown[co] = true;
        let X = isTouch() == "touch" ? e.touches[0].clientX : e.clientX;
        let Y = isTouch() == "touch" ? e.touches[0].clientY : e.clientY;
        offX = element.offsetLeft - X;
        offY = element.offsetTop - Y;
        element.className = "dragable1";
        console.log(offX);
        // document.getElementById('guide').innerHTML = isDelete[co];
    });
    
    element.addEventListener( events[isTouch()].drag, (e) => {
        if(!isMouseDown[co]){
            return;
        }
        e.preventDefault();
        let X = isTouch() == "touch" ? e.touches[0].clientX : e.clientX;
        let Y = isTouch() == "touch" ? e.touches[0].clientY : e.clientY;
        mouX = X + offX;
        mouY = Y + offY;
        current = co;
        // document.getElementById('divo').innerHTML = current;
        element.style.left = mouX +'px';
        element.style.top = mouY +'px';
        element.className = "dragable1";
        if(informCount<1){
            document.getElementById('guide').innerHTML = "Drag and drop at bottom of the screen to delete";
        }
        if(Y>height){
            // document.getElementById('guide').innerHTML = isDelete[co] + "," +Y+",,"+height+"and"+actualheight;
            document.getElementById('delete').className = "delete1";
            isDelete[co] = true;
            element.className = "shake";
            // document.getElementById('divo1').innerHTML = isDelete;
        }else{
            // document.getElementById('guide').innerHTML = isDelete[co] + "," +Y+",,"+height+"and"+actualheight;
            // element.style.backgroundColor = "rgba(255, 255, 255, 0)";
            document.getElementById('delete').className = "delete2";
            isDelete[co] = false;
            // document.getElementById('divo1').innerHTML = isDelete;

        }
    });
    
    element.addEventListener(events[isTouch()].end, (e) => {
        // document.getElementById('guide').innerHTML = isDelete[co];
        isMouseDown[co] = false;
        element.className = "dragable";
        document.getElementById('guide').innerHTML = "";
        if (isDelete[co]) {
            informCount++;
            element.remove();
            current =  -1;
            document.getElementById('delete').className = "delete2";
            // document.getElementById('divo').innerHTML = current;
        }
        
    });   
    
}

// function dragNdDrop(element, id, co){
//     const dragstart = (e) => {
//         e.preventDefault();
//         isMouseDown[co] = true;
//         let X = isTouch() == true ? e.touches[0].clientX : e.clientX;
//         let Y = isTouch() == true ? e.touches[0].clientY : e.clientY;
//         offX = element.offsetLeft - X;
//         offY = element.offsetTop - Y;
//         element.className = "dragable1";
//         console.log(offX);
//     };
//     const drag = (e) => {
//         e.preventDefault();
//         if(!isMouseDown[co]){
//             return;
//         }
//         e.preventDefault();
//         let X = isTouch() == true ? e.touches[0].clientX : e.clientX;
//         let Y = isTouch() == true ? e.touches[0].clientY : e.clientY;
//         mouX = X + offX;
//         mouY = Y + offY;
//         current = co;
//         // document.getElementById('divo').innerHTML = current;
//         element.style.left = mouX +'px';
//         element.style.top = mouY +'px';
//         element.className = "dragable1";
//         document.getElementById('guide').innerHTML = "Drag down to delete.";

//         if(e.clientY>height){
//             isDelete = true;
//             element.className = "shake";
//             // document.getElementById('divo1').innerHTML = isDelete;
//         }else{
//             // element.style.backgroundColor = "rgba(255, 255, 255, 0)";
//             isDelete = false;
//             // document.getElementById('divo1').innerHTML = isDelete;

//         }
//     };
//     const dragend = (e) => {
//         e.preventDefault();
//         isMouseDown[co] = false;
//         element.className = "dragable";
//         document.getElementById('deleteMessage').innerHTML = "";
//         document.getElementById('guide').innerHTML = "";

//         if (isDelete) {
//             element.remove();
//             current =  -1;
//             // document.getElementById('divo').innerHTML = current;
//         }
        
//     };   
//     element.addEventListener('mousedown',dragstart)
//     element.addEventListener('touchstart',dragstart)
//     element.addEventListener('mousemove',drag)
//     element.addEventListener('touchmove',drag)
//     element.addEventListener('mouseup',dragend)
//     element.addEventListener('touchend',dragend)
// }
document.getElementById('btn').addEventListener('click', createElement);

function changeSheet(sheet) {
    var style = document.getElementById('style');
    style.setAttribute('href', sheet);
 }
let mode = 1;
 document.getElementById("mode").addEventListener('click', (e) => {
    if(mode == 0){
        changeSheet('page.css');
        document.getElementById('mode').className = "dark";
        mode = 1;
    }else if(mode == 1){
        changeSheet('paged.css');
        document.getElementById('mode').className = "real";
        mode = 2;
    }else{
        changeSheet('real.css');
        document.getElementById('mode').className = "light";
        mode = 0;
    }
 });