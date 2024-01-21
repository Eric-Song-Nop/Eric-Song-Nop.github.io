- Outer loop iterate the left bound, inner loop iterate the right bound
- ```cpp
  int group(vector<int> &nums)
  {
    int ans = -1;
    int i = 0, n = nums.size();
    while (i < n - 1)
    {
      if (nums[i + 1] - nums[i] != 1)
      {
        i++;
        continue;
      }
  
      int r = i + 1;
      while (r < n && nums[r] == nums[i + (r - i) % 2])
        r++;
      ans = max(ans, r - i);
      i = r;
    }
    return ans;
  }
  ```