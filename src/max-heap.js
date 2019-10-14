const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		    if (this.parentNodes.length !== 0) {

            }
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		if (!this.root) {
			return true;
		}
	}

	clear() {
		this.parentNodes = [];
		this.root = null;
	}

	insertNode(node) {
		 if (this.parentNodes.length === 0) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes.push(node);
			if (!this.parentNodes[0].left) {
				this.parentNodes[0].appendChild(this.parentNodes[this.parentNodes.length - 1]);
			} else if (!this.parentNodes[0].right) {
				this.parentNodes[0].appendChild(this.parentNodes[this.parentNodes.length - 1]);
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
        if (!node.parent) {
            this.root = node;
            return this.root;
        } else {
            if (node.priority > node.parent.priority) {

                let parentIndex = this.parentNodes.indexOf(node.parent);
                let nodeIndex = this.parentNodes.indexOf(node);
                this.parentNodes[parentIndex] = node;
                this.parentNodes[nodeIndex] = node.parent;
                node.swapWithParent();
                return this.shiftNodeUp(node);
            }
        }
	}

	shiftNodeDown(node) {

		if (node.right && node.right.priority > node.priority && node.right.priority > node.left.priority) {

			if (!node.parent) {
				this.root = node.right;
			}

			let nodeLeftIndex = this.parentNodes.indexOf(node.right);
			let nodeIndex = this.parentNodes.indexOf(node);

			if (node.left.left && node.left.right) {
				this.parentNodes[nodeLeftIndex] = node;

			} else {
				this.parentNodes[nodeLeftIndex] = node;
				this.parentNodes[nodeIndex] = node.right;
			}

			node.right.swapWithParent();

			if (node.left) {
				node.left.parent = node;
			}

			if (node.right) {
				node.right.parent = node;
			}

			return this.shiftNodeDown(node);

		} else if (node.left && node.left.priority > node.priority) {

			if (!node.parent) {
				this.root = node.left;
			}

			let nodeLeftIndex = this.parentNodes.indexOf(node.left);
			let nodeIndex = this.parentNodes.indexOf(node);

			if (node.left.left && node.left.right) {
				this.parentNodes[nodeLeftIndex] = node;

			} else {
				this.parentNodes[nodeLeftIndex] = node;
				this.parentNodes[nodeIndex] = node.left;
			}

			node.left.swapWithParent();

			if (node.right) {
				node.right.parent = node;
			}

			if (node.left) {
				node.left.parent = node;
			}

			return this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;



