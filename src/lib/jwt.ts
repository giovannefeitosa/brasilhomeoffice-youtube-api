const JWT_SECRET = process.env.JWT_SECRET || 'a98@sdh=a393-u3uh80';
import jsonwebtoken from 'jsonwebtoken';

function encode(data) {
  return jsonwebtoken.sign(data, JWT_SECRET);
}

function decode(token) {
  return jsonwebtoken.verify(token, JWT_SECRET);
}

export default {
  encode,
  decode,
};
