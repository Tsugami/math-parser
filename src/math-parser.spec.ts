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
  });
});
