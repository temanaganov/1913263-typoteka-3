DROP DATABASE IF EXISTS typoteka;

CREATE DATABASE typoteka
  WITH
  OWNER = artemnaganov
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE typoteka TO artemnaganov;
