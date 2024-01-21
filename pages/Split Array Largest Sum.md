tags:: #Leetcode #[[Dynamic Programming]] #[[Binary Search]]

- https://leetcode.cn/problems/split-array-largest-sum/
- ## Dynamic Programming
	- Let $f[i][j]$ be the target value but for split first $i$ numbers in to $j$ splits.
	- {{embed [[split array max sum]]}}
- ## Binary Search
	- We know the answer must lie in `(0, sum of the whole array)`
	- Can check if we can get answer smaller than $x$ with:
		- Accumulate from first, when sum larger than $x$, create new split, when splits more than $m$, fail.
	- Then binary search gives the answer.