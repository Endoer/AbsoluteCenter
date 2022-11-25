let Graph=[
    [0, 2, Infinity, Infinity, Infinity, Infinity, Infinity],
    [2, 0, 2,Infinity, Infinity, 3, Infinity],
    [Infinity, 2, 0, Infinity, Infinity, Infinity, 1],
    [Infinity, Infinity, Infinity, 0, 5, 3, 2],
    [Infinity, Infinity, Infinity, 5, 0, Infinity, Infinity],
    [Infinity, 3, Infinity, 3, Infinity, 0, Infinity],
    [Infinity,Infinity, 1, 2, Infinity, Infinity, 0]
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
 let compareFunction=(a,b,i)=>{
     return MatrixDistantion[i][a]-MatrixDistantion[i][b]
 };
 let absRadius=Infinity;
 let vertexA,vertexB, perefVertexA, perefVertexB;
 for (let x  = 0; x<Graph.length-1; x++){
     for (let y = x + 1 ; y < Graph.length; y++){
         if (Graph[x][y]!=Infinity) {
             for (let k = 0; k < Graph.length; k++) {
                 if (k !== x && k !== y) {
                     arrX.push(k); //MatrixDistantion[x][k] кидать вершину или значение?
                 }
             }
             arrX.sort((a, b) => {
                 return MatrixDistantion[x][a] - MatrixDistantion[x][b]
             });
             console.log(x+1, y+1, arrX);
             while (arrX.length>1){
                 //arrY=arrY.concat(arrX.slice(-1))
                 arrY.push(arrX.pop());
                 //arrX.length=arrX.length-1;
                 arrY.sort((a, b) => {
                     return MatrixDistantion[y][a] - MatrixDistantion[y][b]
                 });
                 console.log("arrX",arrX);
                 console.log("arrY",arrY);
                 //console.log(MatrixDistantion[arrX[arrX.length-1]][arrY[arrY.length-1]]);
                 // if (MatrixDistantion[arrX[arrX.length-1]][arrY[arrY.length-1]]/2 < absRadius){
                 if ((MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]+MatrixDistantion[x][y])/2 < absRadius){
                     if(x==2 && y==6) console.log("Здесь",arrX[arrX.length-1],arrY[arrY.length-1],(MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]+MatrixDistantion[x][y])/2,absRadius);
                     absRadius=(MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]+MatrixDistantion[x][y])/2;
                     vertexA=x;
                     vertexB=y;
                     perefVertexA=arrX[arrX.length-1];
                     perefVertexB=arrY[arrY.length-1];
                 }
             }

             arrX.length=0;
             arrY.length = 0;
         }
     }
 }
 console.log(absRadius,vertexA,vertexB,perefVertexA,perefVertexB);