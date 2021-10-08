export type TokenTypes = 'paren' | 'number' | 'operator';
export type OperatorTypes = '*' | '^' | '-' | '+' | '/';

type CommonToken = {
  type: Exclude<TokenTypes, 'operator'>;
  value: string;
};

export type OperatorToken = {
  type: 'operator';
  value: OperatorTypes;
};

export type Token = CommonToken | OperatorToken;
