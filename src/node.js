class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;

		} else if (this.right === node) {
			this.right = null;
			node.parent = null;

		} else {
			throw new Error('node is not a child of this node');
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {

			if (this.parent.left === this) {
				if (this.parent.right) {
					this.parent.right.parent = this;
				}
			} else if (this.parent.right === this) {
				if (this.parent.left) {
					this.parent.left.parent = this;
				}
			}

			if (this.parent.parent) {
				if (this.parent.parent.left === this.parent) {
					this.parent.parent.left = this;
				} else if (this.parent.parent.right === this.parent) {
					if (this.parent.parent) {
						this.parent.parent.right = this;
					}
				}
			}

			let tempRight = this.right;
			let tempLeft = this.left;

			if (this.parent.left === this) {
				this.left = this.parent;
				this.right = this.parent.right;
			} else if (this.parent.right === this) {
				this.right = this.parent;
				this.left = this.parent.left;
			}

			this.parent.right = tempRight;
			this.parent.left = tempLeft;

			let tempParentParent = this.parent.parent;

			this.parent.parent = this;
			this.parent = tempParentParent;
		}
	}
}

module.exports = Node;


const root = new Node(42, 15);
const left = new Node(13, 42);
const right = new Node(0, 1);
const childOfLeft = new Node(0, 15);

root.appendChild(left);
root.appendChild(right);
left.appendChild(childOfLeft);

left.swapWithParent();