import type { Token, OperatorTypes, OperatorToken } from './types';

const operators: OperatorTypes[] = ['*', '+', '-', '/', '^'];

const WHITESPACE = /\s/;
const NUMBERS = /[0-9]/;

const isNumber = (v: string): boolean => NUMBERS.test(v);
const isOperator = (v: string): v is OperatorTypes => operators.includes(v as OperatorTypes);
const isWhitespace = (v: string) => WHITESPACE.test(v);
const isTokenOperator = (token: Token, operator: OperatorTypes): token is OperatorToken =>
  token.type === 'operator' && token.value === operator;

export const tokenizer = (input: string) => {
  const tokens: Token[] = [];

  for (let i = 0; input.length > i; ++i) {
    const char = input[i];

    if (char === '(' || char === ')') {
      tokens.push({
        type: 'paren',
        value: char,
      });
    } else if (isNumber(char)) {
      tokens.push({
        type: 'number',
        value: char,
      });
    } else if (isOperator(char)) {
      tokens.push({
        type: 'operator',
        value: char,
      });
    } else if (isWhitespace(char)) {
      continue;
    } else {
      throw new TypeError('I dont know what this character is: "' + char + '"');
    }
  }

  return tokens;
};

export const parser = (tokens: Token[]): number => {
  let current = 0;

  const eat = () => {
    const token = tokens[current];

    current++;

    return token;
  };

  const parseNumber = (): number => {
    const matchNum = () => {
      const startPos = current;

      while (current < tokens.length && tokens[current].type === 'number') {
        current++;
      }

      return tokens
        .slice(startPos, current)
        .map((token) => token.value)
        .join('');
    };

    const number = matchNum();

    if (number === '') {
      throw new Error('Number not Found');
    }

    return Number(number);
  };

  const parseMulti = (): number => {
    const left = parseNumber();
    const token = tokens[current];

    if (token && (isTokenOperator(token, '*') || isTokenOperator(token, '/'))) {
      const operator = eat() as OperatorToken;

      if (operator.value === '/') {
        return left / parseNumber();
      }

      if (operator.value === '*') {
        return left * parseNumber();
      }
    }
    return left;
  };

  const parseAdd = (): number => {
    const left = parseMulti();
    const token = tokens[current];

    if (token && (isTokenOperator(token, '+') || isTokenOperator(token, '-'))) {
      const operator = eat() as OperatorToken;

      if (operator.value === '+') {
        return left + parseMulti();
      }

      if (operator.value === '-') {
        return left - parseMulti();
      }
    }
    return left;
  };

  return parseAdd();
};
