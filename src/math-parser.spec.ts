import { parser, tokenizer } from './math-parser';
import type { Token } from './types';

describe('MathParser', () => {
  describe('tokenizer', () => {
    it('should turn `input` string into `tokens` array', () => {
      const input = '2 * ( 5 - 1 )';
      const tokensExpect: Token[] = [
        {
          type: 'number',
          value: 2,
        },
        {
          type: 'operator',
          value: '*',
        },
        {
          type: 'paren',
          value: '(',
        },
        {
          type: 'number',
          value: 5,
        },
        {
          type: 'operator',
          value: '-',
        },
        {
          type: 'number',
          value: 1,
        },
        {
          type: 'paren',
          value: ')',
        },
      ];

      expect(tokenizer(input)).toEqual(tokensExpect);
    });

    it('should throws an error when letter is provided', () => {
      const input = '1+2+a';
      expect(() => tokenizer(input)).toThrow('I dont know what this character is: "a"');
    });
  });

  describe('parser', () => {
    it('should return value sum', () => {
      const input = '2 * 5 - 1';
      expect(parser(tokenizer(input))).toBe(9);
    });

    it('should return value sum with params', () => {
      const input = '2 * (5 - 1)';
      expect(parser(tokenizer(input))).toBe(8);
    });

    it('should throws an error when param not is closed', () => {
      const input = '2 * (5 - 1';
      expect(() => parser(tokenizer(input))).toThrow('param should closed');
    });

    it('should throws an error when an operator does not have two numbers', () => {
      const input = '2 * (5 - )';
      expect(() => parser(tokenizer(input))).toThrow('Number not Found');

      const input2 = '2 * ';
      expect(() => parser(tokenizer(input2))).toThrow('Number not Found');
    });
  });
});
