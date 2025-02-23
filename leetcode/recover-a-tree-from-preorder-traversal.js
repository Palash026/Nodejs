/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function(traversal) {
    let index = 0;

    const parseNode = (depth) => {
        let currentDepth = 0;
        while (index < traversal.length && traversal[index] === '-') {
            currentDepth++;
            index++;
        }

        if (currentDepth !== depth) {
            index -= currentDepth;
            return null;
        }

        let value = 0;
        while (index < traversal.length && traversal[index] !== '-') {
            value = value * 10 + (traversal[index] - '0');
            index++;
        }

        const node = new TreeNode(value);
        node.left = parseNode(depth + 1);
        node.right = parseNode(depth + 1);
        return node;
    };

    return parseNode(0);
};