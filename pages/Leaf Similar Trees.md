tags:: #Leetcode #[[Binary Tree]]

- https://leetcode.cn/problems/leaf-similar-trees/
- ```cpp
  void DFS(TreeNode *root, vector<int> &seq)
  {
    if (root->left == nullptr && root->right == nullptr)
      seq.push_back(root->val);
  
    if (root->left != nullptr)
      DFS(root->left, seq);
    if (root->right != nullptr)
      DFS(root->right, seq);
  }
  bool leafSimilar(TreeNode *root1, TreeNode *root2)
  {
    vector<int> seq1{};
    vector<int> seq2{};
    DFS(root1, seq1);
    DFS(root2, seq2);
  
    return seq1 == seq2;
  }
  ```