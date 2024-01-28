## DFS
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