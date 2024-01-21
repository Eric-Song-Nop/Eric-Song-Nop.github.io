- Basic binary search template
	- ```cpp
	  int binarySearch(vector<int>& nums, int target)
	  {
	    int l = 0 , r = nums.size() - 1;
	    while(l + 1< r)
	    {
	      int mid = (l + r) / 2;
	      if(nums[mid] < target)
	        l = mid;
	  	else
	        r = mid;
	    }
	    // You will have two element left, check them one more time
	    if(nums[l] == target)
	      return l;
	    if(nums[r] == target)
	      return r;
	    return -1;
	  }
	  ```