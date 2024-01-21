tags:: #Leetcode #[[Booking Leetcode]] #[[Group Loop]] #[[c++ std]]

- https://leetcode.cn/problems/merge-intervals/description/
- {{embed [[56.合并区间]]}}
- Sorting according to first, then group loop
- `sort(vec.begin(), vec.end(), [](auto& a, auto& b){return a[0] < b[0];})` remember to use reference for lambda and this gives an increasing sort.
- ```cpp
  vector<vector<int>> merge(vector<vector<int>> &intervals)
  {
    sort(intervals.begin(), intervals.end(), [](auto& l, auto& r) { return l[0] < r[0]; });
  
    int i = 0, n = intervals.size();
    vector<vector<int>> ans{};
    while (i < n)
    {
      int l = intervals[i][0], r = intervals[i][1];
      while (i < n - 1 && intervals[i + 1][0] <= r)
      {
        r = max(r, intervals[i + 1][1]);
        i++;
      }
      ans.push_back({l, r});
      i++;
    }
  
    return ans;
  }
  ```