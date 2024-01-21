- Basic binary search template
	- ```cpp
	  // Lower bound
	  int lb(vector<int> &nums, int target)
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
- ##