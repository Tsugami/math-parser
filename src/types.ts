export type OperatorTypes = '*' | '^' | '-' | '+' | '/';

type NumberToken = {
  type: 'number';
  value: number;
};

export type ParamToken = {
  type: 'paren';
  value: '(' | ')';
};

export type OperatorToken = {
  type: 'operator';
  value: OperatorTypes;
};

export type Token = NumberToken | ParamToken | OperatorToken;
export type TokenTypes = Token['type'];
