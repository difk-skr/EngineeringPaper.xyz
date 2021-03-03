lexer grammar LatexLexer;

L_BRACKET: '[' -> mode(UNITS) ; 

SEMICOLON: ';' ;

L_BRACE: '{' ;
R_BRACE: '}' ;

L_PAREN: '(' ;
R_PAREN: ')' ;

PI: '\\pi' ;

CMD_FRAC: '\\frac' ;
CMD_CDOT: '\\cdot' ;
CMD_SQRT: '\\sqrt' ;

CMD_SIN: '\\sin' ;
CMD_COS: '\\cos' ;
CMD_TAN: '\\tan' ;
CMD_COT: '\\cot' ;
CMD_SEC: '\\sec' ;
CMD_CSC: '\\csc' ;
CMD_ARCSIN: '\\arcsin' ;
CMD_ARCCOS: '\\arccos' ;
CMD_ARCTAN: '\\arctan' ;
CMD_SINH: '\\sinh' ;
CMD_COSH: '\\cosh' ;
CMD_TANH: '\\tanh' ;
CMD_COTH: '\\coth' ;

CMD_LEFT: '\\left' -> skip ;
CMD_RIGHT: '\\right' -> skip ;

ADD: '+' ;
SUB: '-' ;
CARET: '^' ;
EQ: '=' ;

NUMBER: DIGIT+ '.' DIGIT*
      |        '.' DIGIT+
      | DIGIT+
      ;

fragment
DIGIT : [0-9];

ID: [a-zA-Z]+ ;

WS: [ \t\r\n]+ -> skip ;

SLASH_SPACE: '\\ ' -> skip ;

ERROR_CHAR : . ;

mode UNITS;
R_BRACKET: ']' -> mode(DEFAULT_MODE);
U_CMD_FRAC: '\\frac' ;
U_CMD_CDOT: '\\cdot' ;
U_CMD_SQRT: '\\sqrt' ;
U_CARET: '^' ;
U_NAME: [a-zA-Z]+ ;
U_L_PAREN: '(' ;
U_R_PAREN: ')' ;
U_L_BRACE: '{' ;
U_R_BRACE: '}' ;

U_NUMBER: U_DIGIT+ '.' U_DIGIT*
      |        '.' U_DIGIT+
      | U_DIGIT+
      ;

fragment
U_DIGIT : [0-9];

U_CMD_LEFT: '\\left' -> skip ;
U_CMD_RIGHT: '\\right' -> skip ;

U_WS: [ \t\r\n]+ -> skip ;
U_SLASH_SPACE: '\\ ' -> skip ;

U_ERROR_CHAR : . ;