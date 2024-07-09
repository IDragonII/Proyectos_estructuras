class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    wordsWithPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return []; // No hay palabras con este prefijo
            }
            node = node.children[char];
        }
        return this._collectAllWords(node, prefix);
    }

    _collectAllWords(node, prefix) {
        let words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }
        for (let char in node.children) {
            words.push(...this._collectAllWords(node.children[char], prefix + char));
        }
        return words;
    }
}

// Inicializar CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    mode: "javascript",
    extraKeys: { "Ctrl-Space": "autocomplete" },
    hintOptions: {
        // Función de manejo de sugerencias
        hint: function (cm, options) {
            const cursor = cm.getCursor();
            const token = cm.getTokenAt(cursor);
            const start = token.start;
            const end = cursor.ch;
            const prefix = token.string.slice(0, cursor.ch - token.start);
            const suggestions = trie.wordsWithPrefix(prefix);
            return {
                list: suggestions,
                from: CodeMirror.Pos(cursor.line, start),
                to: CodeMirror.Pos(cursor.line, end),
                // Modificamos la función de selección para reemplazar solo el prefijo
                // en lugar de todo el texto
                select: function (completion) {
                    cm.replaceRange(completion.text.substring(prefix.length),
                        CodeMirror.Pos(cursor.line, start),
                        CodeMirror.Pos(cursor.line, end)
                    );
                }
            };
        }


    }
});

// Mostrar sugerencias al escribir
editor.on('inputRead', function (cm, event) {
    if (!cm.state.completionActive && /[a-zA-Z]/.test(event.text[0])) {
        cm.showHint();
    }
});

// Crear una instancia del Trie
let trie = new Trie();

// Función para cargar palabras desde un archivo JSON y agregarlas al Trie
async function loadWords() {
    try {
        const response = await fetch('words.json');
        const data = await response.json();
        const words = data.words;
        words.forEach(word => trie.insert(word));
    } catch (error) {
        console.error('Error al cargar las palabras:', error);
    }
}

// Cargar palabras y agregar al Trie
loadWords();