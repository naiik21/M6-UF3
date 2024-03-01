-- create
CREATE TABLE Categorias (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE Subcategorias (
  subId INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  catId INTEGER NOT NULL,
  FOREIGN KEY (catId) REFERENCES Categorias(id)
);

-- insert
INSERT INTO Categorias VALUES (1, 'cat1');
INSERT INTO Categorias VALUES (2, 'cat2');
INSERT INTO Categorias VALUES (3, 'cat3');


INSERT INTO Subcategorias VALUES (1, 'subcat11', 1);
INSERT INTO Subcategorias VALUES (2, 'subcat12', 1);
INSERT INTO Subcategorias VALUES (3, 'subcat13', 1);

INSERT INTO Subcategorias VALUES (4, 'subcat21', 2);
INSERT INTO Subcategorias VALUES (5, 'subcat22', 2);
INSERT INTO Subcategorias VALUES (6, 'subcat23', 2);

INSERT INTO Subcategorias VALUES (7, 'subcat31', 3);
INSERT INTO Subcategorias VALUES (8, 'subcat32', 3);
INSERT INTO Subcategorias VALUES (9, 'subcat33', 3);

-- fetch 
SELECT * FROM Categorias;
SELECT * FROM Subcategorias WHERE catId = 2;