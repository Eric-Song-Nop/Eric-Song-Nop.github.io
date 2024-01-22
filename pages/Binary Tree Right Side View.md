tags:: #Leetcode #[[Binary Tree]]

- https://leetcode.cn/problems/binary-tree-right-side-view/
- Care the `q.size()` part for how level based traversal works
- ```cpp
  vector<int> rightSideView(TreeNode *root)
  {
    if (root == nullptr)
      return vector<int>{};
    vector<int> ans{};
    queue<TreeNode *> q{};
    q.push(root);
    while (!q.empty())
    {
      int l = q.size();
      vector<int> level{};
      for (int i = 0; i < l; i++)
      {
        auto node = q.front();
        q.pop();
        level.push_back(node->val);
        if (node->left != nullptr)
          q.push(node->left);
        if (node->right != nullptr)
          q.push(node->right);
      }
      ans.push_back(level.back());
    }
    return ans;
  }
  ```