# ASSUMPTIONS

I first install ramdajs because its a good functional library.
Then i read a simplified version of the data.txt file.
I assume that, if it works for small triangles, it will work for biggers too.

I need to construct a graph from the lines, then i read the lines put it on an array and transform it to append a heuristic field. This will serve to optimaly find a path.

The triangle can be seen as a connected graph. And we can asume
that it will be symmetric. To make the node connection, we can read the elements of the sub array of each line and asign as a child the line[n] and line[n + 1] element.

I make a graph data structure with the edges of the indexes describing the directed conections of the graph and the vertices being the nodes.


given the structure:
```
[
  [ 7 ],
  [ 6, 3 ],
  [ 3, 8, 5 ],
  [ 11, 2, 10, 9 ]
]
```
We generate the graph:
```
{
  edges: {
    '0-0': [ '1-0', '1-1' ],
    '1-0': [ '2-0', '2-1' ],
    '1-1': [ '2-1', '2-2' ],
    '2-0': [ '3-0', '3-1' ],
    '2-1': [ '3-1', '3-2' ],
    '2-2': [ '3-2', '3-3' ]
  },
  vertices: [ '0-0', '1-0', '1-1', '2-0', '2-1', '2-2', '3-0', '3-1', '3-2', '3-3' ],
  lastLine: [ '3-0', '3-1', '3-2', '3-3' ]
}
```

With the generated graph, i apply a depth first all paths generator algorithm
from the top node 0-0 to all the elements in the last row:
```
[ [ '0-0', '1-0', '2-0', '3-0' ],
  [ '0-0', '1-0', '2-0', '3-1' ],
  [ '0-0', '1-0', '2-1', '3-1' ],
  [ '0-0', '1-1', '2-1', '3-1' ],
  [ '0-0', '1-0', '2-1', '3-2' ],
  [ '0-0', '1-1', '2-1', '3-2' ],
  [ '0-0', '1-1', '2-2', '3-2' ],
  [ '0-0', '1-1', '2-2', '3-3' ] ]
```
Then i translate this indexes to the corresponding elements on the original data
```
[ [ 7, 6, 3, 11 ],
  [ 7, 6, 3, 2 ],
  [ 7, 6, 8, 2 ],
  [ 7, 3, 8, 2 ],
  [ 7, 6, 8, 10 ],
  [ 7, 3, 8, 10 ],
  [ 7, 3, 5, 10 ],
  [ 7, 3, 5, 9 ] ]
```
I zip it with the sums of each list:
```
[ [ 27, [ 7, 6, 3, 11 ] ],
  [ 18, [ 7, 6, 3, 2 ] ],
  [ 23, [ 7, 6, 8, 2 ] ],
  [ 20, [ 7, 3, 8, 2 ] ],
  [ 31, [ 7, 6, 8, 10 ] ],
  [ 28, [ 7, 3, 8, 10 ] ],
  [ 25, [ 7, 3, 5, 10 ] ],
  [ 24, [ 7, 3, 5, 9 ] ] ]
```
Then i search for the minimal path taking the first element on mind
[ 18, [ 7, 6, 3, 2 ] ]