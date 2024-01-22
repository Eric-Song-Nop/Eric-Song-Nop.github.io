## BFS
	- {{embed [[Binary Tree Right Side View]]}}
- ## Non Recursive
	- ```cpp
	  vector<int> preorderTravel(TreeNode* root)
	  {
	    if(root == nullptr)
	      return vector<int>{};
	    vector<int> ans{};
	    stack<TreeNode*> s{};
	    while(root != nullptr || !s.empty())
	    {
	    	while(root != nullptr)
	      {
	        ans.push_back(root->val);
	        s.append(root);
	        root = root->left;
	      }
	      
	      auto node = s.top();
	      s.pop();
	      root = node->right;
	    }
	    return ans;
	  }
	  ```
- ## Recursive DFS
	- {{embed [[Maximum Depth of Binary Tree]]}}
	- {{embed [[Leaf Similar Trees]]}}
-