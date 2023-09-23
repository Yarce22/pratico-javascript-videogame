/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '💀',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'LIVES':  '❤'
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
  O-------XX
  XXXXX-X--X
  ---XX-XX-X
  -X----XX-X
  --XXXXXX-X
  X---XXXX-X
  XXX-XXXX-X
  XXX----IXX
  XXXXXXXXXX
  `);
  maps.push(`
  XX-----IXX
  XX-XXXXX-X
  XX-----X-X
  XXXXXX---X
  X----XX-XX
  X-XX-XX-XX
  X-XX----XX
  X--XXXXXXX
  XX-----OXX
  XXXXXXXXXX
  `)