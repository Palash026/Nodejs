/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var FindElements = function(root) {
    this.root = root;
    this.recoveredValues = new Set();
    this.recoverTree(root, 0);
};

FindElements.prototype.recoverTree = function(node, value) {
    if(node === null) return;
    node.val = value;
    this.recoveredValues.add(value);
    this.recoverTree(node.left, 2 * value + 1);
    this.recoverTree(node.right, 2 * value + 2);
}

/** 
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function(target) {
    return this.recoveredValues.has(target);
};

/** 
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */