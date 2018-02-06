const readline = require('readline');



const TYPES = {
    NUMBER: 'NUMBER',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    EOF: 'EOF',
    NULL: 'NULL'
};


class Token {

    constructor(value, type) {
        this.type = type;
        this.value = value;
    }
}

class Interpreter {

    constructor(expression) {
        this.expression = expression;
        this.curPos = -1;
        this.curChar = null;

        this.currentToken = new Token(null, TYPES.NULL);
    }

    advance() {
        ++this.curPos;
        if (this.curPos >= this.expression.length)
            this.curChar = null;
        else
            this.curChar = this.expression[this.curPos];
    }


    getNextToken() {
        this.advance();

        while (this.curChar === ' ')  // skip whitespaces
            this.advance();

        if (this.curChar === '+') {
            return new Token(null, TYPES.PLUS);
        }
        else if (this.curChar === '-') {
            return new Token(null, TYPES.MINUS);
        }
        else if (!isNaN(this.curChar)) {
            return new Token(Number(this.curChar), TYPES.NUMBER);
        }
        else if (this.curChar === null) {
            return new Token(null, TYPES.EOF);
        }

        this.error();
    }

    digest(token, type) {
        if (token.type !== type)
            this.error('Types mismatch');
        this.currentToken = this.getNextToken();
    }

    error(errorStr) {
        if (errorStr)
            throw errorStr;
        else
            throw 'Error interpreting expression';
    }

    term() {
        let curToken = this.currentToken;
        this.digest(curToken, TYPES.NUMBER);
        return curToken.value;
    }

    expr() {
        this.currentToken = this.getNextToken();

        let result = this.term();

        while (this.currentToken.type === TYPES.PLUS || this.currentToken.type === TYPES.MINUS) {
            if (this.currentToken.type === TYPES.PLUS) {
                this.digest(TYPES.PLUS);
                result += this.term();
            }
            else if (this.currentToken.type === TYPES.MINUS) {
                this.digest(TYPES.MINUS);
                result -= this.term();
            }
        }

        return result;
    }
}

let rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('calc> ');
rl.prompt();
rl.on('line', function (line) {

    let interpreter = new Interpreter(line);
    console.log(interpreter.expr());

    rl.prompt();
}).on('close', function () {
    process.exit(0);
});
