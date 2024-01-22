tags:: #Leetcode #[[Binary Tree]]

- https://leetcode.cn/problems/maximum-depth-of-binary-tree/
- ```cpp
  int maxD = 0;
  void DFS(TreeNode *root, int depth)
  {
    if (root == nullptr)
    {
      maxD = max(maxD, depth);
      return;
    }
    DFS(root->left, depth + 1);
    DFS(root->right, depth + 1);
  }
  int maxDepth(TreeNode *root)
  {
    DFS(root, 0);
    return maxD;
  }
  ```