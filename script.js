let Graph=[
    [0, Infinity, Infinity, 5, 5, Infinity, Infinity],
    [Infinity, 0, Infinity, 6, 4, Infinity, Infinity],
    [Infinity, Infinity, 0, 4, 6, Infinity, Infinity],
    [5, 6, 4, 0, 7, 4, Infinity],
    [5, 4, 6, 7, 0, Infinity, 3],
    [Infinity, Infinity, Infinity, 4, Infinity, 0, Infinity],
    [Infinity, Infinity, Infinity, Infinity, 3, Infinity, 0]
];


 let MatrixDistantion=Graph.map(el => Object.assign([],el));
 for (let k=0;k<Graph.length;k++){
     for (let i=0;i<Graph.length;i++) {
        for (let j = 0; j < Graph.length; j++) {
            MatrixDistantion[i][j]=Math.min(MatrixDistantion[i][j],
                MatrixDistantion[i][k]+MatrixDistantion[k][j]);
        }
     }
 }
 console.log(MatrixDistantion);

 let arrX=[],arrY=[];
let arrAbsRadius=[];
 for (let x  = 0; x<Graph.length-1; x++){
     for (let y = x + 1 ; y < Graph.length; y++){
         let absRadius=Infinity;
         if (Graph[x][y]!=Infinity) {
             for (let k = 0; k < Graph.length; k++) {
                 if (k !== x && k !== y) {
                     arrX.push(k); 
                 }
             }
             arrX.sort((a, b) => {
                 return MatrixDistantion[x][a] - MatrixDistantion[x][b]
             });
             console.log(x+1, y+1, arrX);
             while (arrX.length>1){
                 arrY.push(arrX.pop());
                 arrY.sort((a, b) => {
                     return MatrixDistantion[y][a] - MatrixDistantion[y][b]
                 });
                 if ((MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]+MatrixDistantion[x][y])/2 <= absRadius

                     &&MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[x][y]>MatrixDistantion[y][arrY[arrY.length-1]]
                     &&MatrixDistantion[y][arrY[arrY.length-1]] +MatrixDistantion[x][y]>MatrixDistantion[x][arrX[arrX.length-1]]){
                        absRadius=(MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]+MatrixDistantion[x][y])/2;
                     arrAbsRadius.push({
                         absRadius:absRadius,
                         vertexA:x,
                         vertexB:y,
                         perefVertexA:arrX[arrX.length-1],
                         perefVertexB:arrY[arrY.length-1]
                     })
                 }
             }

             arrX.length=0;
             arrY.length = 0;

         }
     }
 }
console.log(arrAbsRadius);
  let min=Infinity;
  let answerArr=[];
 arrAbsRadius.forEach((element)=>{
         if (element.absRadius==min){
             answerArr.push(element);
         }
         if (element.absRadius<min){
             min=element.absRadius;
             answerArr.length=0;
             answerArr.push(element);
         }
 })
 console.log(arrAbsRadius);
 answerArr.forEach((element)=>{
     console.log(`Абсолютный центр находится между ${element.vertexA+1} и ${element.vertexB+1} вершинами на удалении от вершины
     ${element.vertexA+1} на ${element.absRadius-MatrixDistantion[element.vertexA][element.perefVertexA]} `);
 })
