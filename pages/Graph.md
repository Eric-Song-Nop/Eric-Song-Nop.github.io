tags:: #Leetcode

- [宫水三叶最短路模板](https://mp.weixin.qq.com/s?__biz=MzU4NDE3MTEyMA==&mid=2247488007&idx=1&sn=9d0dcfdf475168d26a5a4bd6fcd3505d&chksm=fd9cb918caeb300e1c8844583db5c5318a89e60d8d552747ff8c2256910d32acd9013c93058f&token=754098973&lang=zh_CN#rd)
- ## DFS
	- ```cpp
	  unordered_set<T> visited;
	  stack<T> s;
	  s.emplace(start);
	  while(!s.empty())
	  {
	    if(visited.count(s.top()))
	    {
	      s.pop();
	      countinue;
	    }
	    visited.add(s.top());
	    auto cur = s.top();
	    s.pop();
	    
	    auto nexts = getNexts(cur);
	    for(auto next: nexts)
	    {
	      s.push(next);
	    }
	  }
	  ```
- ## BFS
	- Use queue instead of stack