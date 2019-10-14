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
			let tempNode = this.root;
			while (tempNode.left && tempNode.right) {
				if (this.parentNodes.length === 0) {
					this.parentNodes.push(tempNode);
				}

				if (this.parentNodes.indexOf(tempNode.right) === -1) {
					this.parentNodes.push(tempNode.right);
				}

				if (this.parentNodes.indexOf(tempNode.left) === -1) {
					this.parentNodes.push(tempNode.left);
				}

				tempNode = tempNode.left;
			}
			return this.root;
		} else {
			node.swapWithParent();
			return this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;

h = new MaxHeap();

// h.root = new Node(0, 10);
// h.root.appendChild(new Node(1, 5));
// h.root.appendChild(new Node(2, 7));
// h.root.left.appendChild(new Node(3, 20));

// h.shiftNodeUp(h.root.left.left);

// console.log(h.root);
// console.log(h.root.right);
// console.log(h.root.left);
// console.log(h.parentNodes[2]);



