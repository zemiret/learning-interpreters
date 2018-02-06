import unittest
from .calc5_parentheses import Lexer, Interpreter


class InterpreterTestCase(unittest.TestCase):

    def create_interpreter(self, text):
        lexer = Lexer(text)
        return Interpreter(lexer)

    def test_addition(self):
        interpreter = self.create_interpreter("5 + 12")
        self.assertEqual(interpreter.expr(), 17)

    def test_subtraction(self):
        interpreter = self.create_interpreter("5 - 12")
        self.assertEqual(interpreter.expr(), -7)

    def test_multiplication(self):
        interpreter = self.create_interpreter("5 * 12")
        self.assertEqual(interpreter.expr(), 60)

    def test_division(self):
        interpreter = self.create_interpreter("121 / 11")
        self.assertEqual(interpreter.expr(), 11)

    def test_expressions(self):
        interpreter1 = self.create_interpreter("5 + 12 / 4 - 7 * 3")
        interpreter2 = self.create_interpreter("12 - 1 * 2 + 5 / 5")
        self.assertEqual(interpreter1.expr(), -13)
        self.assertEqual(interpreter2.expr(), 11)

    def test_parentheses(self):
        interpreter1 = self.create_interpreter("7 + 3 * (10 / (12 / (3 + 1) - 1))")
        interpreter2 = self.create_interpreter("(5 + (2 - 12)*5) / 9")
        self.assertEqual(interpreter1.expr(), 22)
        self.assertEqual(interpreter2.expr(), -5)


if __name__ == '__main__':
    unittest.main()
