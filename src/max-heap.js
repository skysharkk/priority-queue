const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.counterNodes = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.counterNodes++;
	}

	pop() {
		if (!this.isEmpty()) {
			let detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			this.counterNodes--;
			return detachedRoot.data;
		}
	}

	detachRoot() {
		let tempRoot = this.root;
		let rootIndex = this.parentNodes.indexOf(tempRoot);
		if (rootIndex !== -1) {
			this.parentNodes.splice(rootIndex, 1);
		}
		this.root = null;
		return tempRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!this.root) {
			this.root = this.parentNodes.pop();
		}
		if (this.root !== undefined) {
			if (this.root.parent) {
				if (this.root.parent.right === this.root) {

					this.root.parent.right = null;

					if (this.root.parent !== detached) {

						this.parentNodes.unshift(this.root.parent);
					}

				} else if (this.root.parent.left === this.root) {
					this.root.parent.left = null;
				}
			}

			this.root.parent = null;

			this.root.right = detached.right;
			this.root.left = detached.left;

			if (detached.right) {
				detached.right.parent = this.root;
			}

			if (detached.left) {
				detached.left.parent = this.root;
			}

			if (!this.root.left || !this.root.right) {
				this.parentNodes.unshift(this.root);
			}
		}
	}

	size() {
		return this.counterNodes;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.parentNodes = [];
		this.root = null;
		this.counterNodes = 0;
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
		if (!node) {
			return;
		}
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
