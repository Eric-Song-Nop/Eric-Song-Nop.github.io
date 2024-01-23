tags:: #[[Algorithms for Interview]]

- [灵神题单](https://leetcode.cn/circle/discuss/SqopEo/)
- Basic binary search template
	- ```cpp
	  // Lower bound
	  int lowerBound(vector<int> &nums, int target)
	  {
	    // we want forall i
	    // i <= l - 1: nums[i] < target
	    // i >= r + 1: nums[i] >= target
	    int l = 0, r = nums.size() - 1;
	    while (l <= r)
	    {
	      int mid = (l + r) / 2;
	      if (nums[mid] < target)
	        l = mid + 1;
	      else // nums[mid] >= target
	        r = mid - 1;
	    }
	  
	    return l;
	  }
	  ```
	- What important is what out of the range. The condition for the while loop controls which element we want finally.