tags:: #[[c++ std]]

- Remember to use reference for lambda and this gives an increasing sort.
- ```cpp
  sort(vec.begin(), vec.end(), [](auto& a, auto& b){return a[0] < b[0];})`
  ```