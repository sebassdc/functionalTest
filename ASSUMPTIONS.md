# ASSUMPTIONS

I first install ramdajs because its a good functional library.
Then i read a simplified version of the data.txt file.
I assume that, if it works for small triangles, it will work for biggers too.

I need to construct a graph from the lines, then i read the lines put it on an array and transform it to append a heuristic field. This will serve to optimaly find a path.

The triangle can be seen as a connected graph. And we can asume
that it will be symmetric. To make the node connection, we can read the elements of the sub array of each line and asign as a child the line[n] and line[n + 1] element.
