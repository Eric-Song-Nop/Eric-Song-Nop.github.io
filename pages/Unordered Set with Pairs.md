tags:: #[[c++ std]]

- There is no standard hash for `pair`, so we need to write one
- ```cpp
  auto pair_hash = [](const pair<int, int> &p) { return p.first ^ p.second; };
  unordered_set<pair<int, int>, decltype(pair_hash)> visited(0, pair_hash);        
  ```