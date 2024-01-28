tags:: #Leetcode #[[Algorithms for Interview]]

- [宫水三叶最短路模板](https://mp.weixin.qq.com/s?__biz=MzU4NDE3MTEyMA==&mid=2247488007&idx=1&sn=9d0dcfdf475168d26a5a4bd6fcd3505d&chksm=fd9cb918caeb300e1c8844583db5c5318a89e60d8d552747ff8c2256910d32acd9013c93058f&token=754098973&lang=zh_CN#rd)
- ## Data Storage
	- ### Adjacent Matrix
		- Dense Matrix where $E$ close to $V^2$
		- ```cpp
		  // Init Adjacency Matrix
		  vector<vector<int>> graph(n, vector<int>(n, INT_MAX));
		  for (int i = 0; i < n; i++)
		    graph[i][i] = 0;
		  
		  // Fill Adjacency Matrix
		  for (const auto &time : times)
		  {
		    int x = time[0] - 1;
		    int y = time[1] - 1;
		    int w = time[2];
		    graph[x][y] = w;
		  }
		  ```
	- ### Adjacent List
		- More Sparse when $E$ close to $V$
- ## Shortest Path Algorithms
	- ### Dijkstra
		- Find the shortest path from one node to all other nodes
			- #### With matrix
			- $O(n^2)$
			- ```cpp
			  // Dijkstra P743
			  // Dist from k to j is INF
			  vector<int> dist(n, INT_MAX);
			  // Dist from k to k is 0
			  dist[k - 1] = 0;
			  
			  // Visited
			  unordered_set<int> visited;
			  
			  // Iterate n times
			  for (int i = 0; i < n; i++)
			  {
			    // Find the min distance node that is not visited
			    int minDist = INT_MAX;
			    int nextNode = -1;
			    for (int j = 0; j < n; j++)
			    {
			      if (visited.count(j) == 0 && dist[j] < minDist)
			      {
			        minDist = dist[j];
			        nextNode = j;
			      }
			    }
			  
			    // No nextNode found
			    if (nextNode == -1)
			      break;
			  
			    visited.insert(nextNode);
			  
			    // Update the distance of neighbors of nextNode
			    for (int j = 0; j < n; j++)
			    {
			      // Avoid overflow
			      if (graph[nextNode][j] != INT_MAX)
			        dist[j] = min(dist[j], dist[nextNode] + graph[nextNode][j]);
			    }
			  }
			  ```
		-
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
	    visited.insert(s.top());
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