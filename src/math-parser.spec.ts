import { mathParser, tokenizer } from './math-parser';
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
      expect(mathParser('2 * 5 - 1')).toEqual(9);

      // README examples
      expect(mathParser('12 + 3 * 5')).toEqual(27);
      expect(mathParser('2 * ( 5 - 1 )')).toEqual(8);
      expect(mathParser('2^2 + 8 / 2')).toEqual(8);
      expect(mathParser('2^( 3 - 1)')).toEqual(4);

      // File examples
      expect(mathParser('1 + 0 + 25 - 3')).toEqual(23);
      expect(mathParser('1+1*5-1')).toEqual(5);
      expect(mathParser('1 + 4 / 2 ^2 - 1')).toEqual(1);
      expect(mathParser('1 + 3 * 6 / 2 + 0')).toEqual(19);
      expect(mathParser('0 / 1 + 1 / 0')).toEqual(Infinity);
      expect(mathParser('1 * (5 + 10) / 3')).toEqual(15);
      expect(mathParser('((5-1) * 2)^2')).toEqual(64);
      expect(mathParser('(2 - 1) * 2^3')).toEqual(8);
      expect(mathParser('4 / (54 - (9 * 6))')).toEqual(Infinity);
      expect(
        mathParser(
          '266 + 54 * 4 - ( 41 + 2 ) * 10 / 5 - 7 ^ 3 - 1 + 1 * 0 - (( 45 / 5 * 3 - 1) * 2)      ',
        ),
      ).toEqual(52);
    });

    it('should return value sum with params', () => {
      const input = '2 * (5 - 1)';
      expect(mathParser(input)).toEqual(8);
    });

    it('should throws an error when param not is closed', () => {
      const input = '2 * (5 - 1';
      expect(() => mathParser(input)).toThrow('param should closed');
      expect(() => mathParser('((79 - 12) * (5 + (2 - 1))')).toThrow('param should closed');
    });

    it('should throws an error when an operator does not have two numbers', () => {
      expect(() => mathParser('2 * (5 - )')).toThrow('Number not Found');

      expect(() => mathParser('2 * ')).toThrow('Number not Found');
      expect(() => mathParser('54 * * 54 - 1')).toThrow('Number not Found');
    });
  });
});
