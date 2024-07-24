        class BallTreeNode {
            constructor(point, id, parentId) {
                this.point = point;
                this.id = id;
                this.parentId = parentId;
                this.left = null;
                this.right = null;
                this.radius = 0;
            }
        }

        class BallTree {
            constructor() {
                this.root = null;
                this.idCounter = 0;
            }

            insert(point) {
                this.root = this._insert(this.root, point, null);
                this.generateTree();
                this.generateDecomposition();
            }

            _insert(node, point, parentId) {
                if (node === null) {
                    return new BallTreeNode(point, this.idCounter++, parentId);
                }

                if (point < node.point) {
                    node.left = this._insert(node.left, point, node.id);
                } else {
                    node.right = this._insert(node.right, point, node.id);
                }

                this._updateRadius(node);
                return node;
            }

            _updateRadius(node) {
                if (node === null) return 0;
                const leftRadius = node.left ? this._distance(node.point, node.left.point) : 0;
                const rightRadius = node.right ? this._distance(node.point, node.right.point) : 0;
                node.radius = Math.max(leftRadius, rightRadius);
                return node.radius;
            }

            _distance(a, b) {
                return Math.abs(a - b);
            }

            search(point) {
                const result = this._search(this.root, point, []);
                if (result !== null) {
                    this.generateTree(result.path);
                }
                return result;
            }

            _search(node, point, path) {
                if (node === null) {
                    return null;
                }

                path.push(node.id);
                if (node.point === point) {
                    return { node, path };
                }

                if (point < node.point) {
                    return this._search(node.left, point, path);
                } else {
                    return this._search(node.right, point, path);
                }
            }

            delete(point) {
                const result = this._delete(this.root, point);
                if (result !== null) {
                    this.root = result;
                    this.generateTree();
                    this.generateDecomposition();
                }
            }

            _delete(node, point) {
                if (node === null) {
                    return null;
                }

                if (point < node.point) {
                    node.left = this._delete(node.left, point);
                } else if (point > node.point) {
                    node.right = this._delete(node.right, point);
                } else {
                    if (node.left === null && node.right === null) {
                        return null;
                    }
                    if (node.left === null) {
                        return node.right;
                    }
                    if (node.right === null) {
                        return node.left;
                    }
                    let minLargerNode = this._findMin(node.right);
                    node.point = minLargerNode.point;
                    node.right = this._delete(node.right, minLargerNode.point);
                }
                this._updateRadius(node);
                return node;
            }

            _findMin(node) {
                while (node.left !== null) {
                    node = node.left;
                }
                return node;
            }

            preOrderTraversal(callback) {
                this._preOrderTraversal(this.root, callback);
            }

            _preOrderTraversal(node, callback, parent = null) {
                if (node === null) return;

                callback(node, parent);
                this._preOrderTraversal(node.left, callback, node);
                this._preOrderTraversal(node.right, callback, node);
            }

            generateTree(highlightPath = []) {
                const nodes = new vis.DataSet([]);
                const edges = new vis.DataSet([]);
                const container = document.getElementById('network');

                this.preOrderTraversal((node, parent) => {
                    const color = highlightPath.includes(node.id) ? '#ffcc00' : undefined;
                    nodes.add({ id: node.id, label: String(node.point), color });
                    if (parent !== null) {
                        edges.add({ from: parent.id, to: node.id });
                    }
                });

                const data = { nodes: nodes, edges: edges };
                const options = {
                    layout: {
                        hierarchical: {
                            direction: 'UD',
                            sortMethod: 'directed'
                        }
                    },
                    edges: {
                        smooth: true
                    },
                    physics: {
                        enabled: false
                    }
                };

                const network = new vis.Network(container, data, options);
            }

            generateDecomposition() {
                const container = document.getElementById('decomposition');
                container.innerHTML = '';

                const drawBall = (node, centerX, centerY, scale) => {
                    if (!node) return;

                    const ball = document.createElement('div');
                    ball.className = 'ball';
                    ball.style.width = `${node.radius * 5 * scale}px`;
                    ball.style.height = `${node.radius * 5 * scale}px`;
                    ball.style.left = `${(centerX - node.radius * scale) - 200}px`;
                    ball.style.top = `${(centerY - node.radius * scale) - 160}px`;
                    ball.innerText = node.point;

                    container.appendChild(ball);

                    const childScale = scale * 0.75;
                    const offsetY = centerY + node.radius * scale * 1.5;

                    if (node.left) {
                        const leftOffsetX = centerX - node.radius * scale * 0.75;
                        drawBall(node.left, leftOffsetX, offsetY, childScale);
                    }

                    if (node.right) {
                        const rightOffsetX = centerX + node.radius * scale * 0.75;
                        drawBall(node.right, rightOffsetX, offsetY, childScale);
                    }
                };

                drawBall(this.root, container.offsetWidth / 2, container.offsetHeight / 2, 10);
            }
        }

        const form = document.getElementById('dataForm');
        const deleteForm = document.getElementById('deleteForm');
        const searchForm = document.getElementById('searchForm');
        const dataInput = document.getElementById('dataInput');
        const deleteInput = document.getElementById('deleteInput');
        const searchInput = document.getElementById('searchInput');
        const tree = new BallTree();

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const value = Number(dataInput.value);
            if (!isNaN(value)) {
                tree.insert(value);
            }
            dataInput.value = '';
        });

        deleteForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const value = Number(deleteInput.value);
            if (!isNaN(value)) {
                tree.delete(value);
            }
            deleteInput.value = '';
        });

        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const value = Number(searchInput.value);
            if (!isNaN(value)) {
                tree.search(value);
            }
            searchInput.value = '';
        });