/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function(preorder, postorder) {
    let preIndex = 0;
    let postIndex = 0;

    const buildTree = () => {
        const root = new TreeNode(preorder[preIndex++]);
        if (root.val !== postorder[postIndex]) {
            root.left = buildTree();
        }
        if (root.val !== postorder[postIndex]) {
            root.right = buildTree();
        }
        postIndex++;
        return root;
    };

    return buildTree();
};