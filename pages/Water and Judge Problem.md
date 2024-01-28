tags:: #Leetcode #Graph #[[Math Theorems for Leetcode]]

- ## Traversal Graph
	- Take the remained water in each bottle as a node in the graph
- ## Math
	- ```py
	  def canMeasureWater(self, x: int, y: int, z: int) -> bool:
	  	if x + y < z:
	  		return False
	  	if x == 0 or y == 0:
	  		return z == 0 or x + y == z
	  	return z % math.gcd(x, y) == 0
	  ```