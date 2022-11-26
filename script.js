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
 let arrX=[],arrY=[];
 let absRadius=Infinity;
 let vertexA,vertexB, perefVertexA, perefVertexB;
 for (let x  = 0; x<Graph.length-1; x++){
     for (let y = x + 1 ; y < Graph.length; y++){
         if (Graph[x][y]!=Infinity) {
             for (let k = 0; k < Graph.length; k++) {
                 if (k !== x && k !== y) {
                     arrX.push(k);
                 }
             }
             arrX.sort((a, b) => {
                 return MatrixDistantion[x][a] - MatrixDistantion[x][b]
             });

             while (arrX.length>1){
                 arrY.push(arrX.pop());
                 arrY.sort((a, b) => {
                     return MatrixDistantion[y][a] - MatrixDistantion[y][b]
                 });
                 if ((MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]+MatrixDistantion[x][y])/2 < absRadius
                     &&MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[y][arrY[arrY.length-1]]>MatrixDistantion[x][y]
                     &&MatrixDistantion[x][arrX[arrX.length-1]]+MatrixDistantion[x][y]>MatrixDistantion[y][arrY[arrY.length-1]]
                     &&MatrixDistantion[y][arrY[arrY.length-1]] +MatrixDistantion[x][y]>MatrixDistantion[x][arrX[arrX.length-1]]){
                    
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
console.log(`Абсолютный центр находится между ${vertexA+1} и ${vertexB+1} вершинами на удалении от вершины ${vertexA+1} на ${absRadius-MatrixDistantion[vertexA][perefVertexA]} `);
