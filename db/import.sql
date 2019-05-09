load data local infile '/home/cat/timbr-app/data/postcodes.csv'
into table appdev.postcodes
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 lines;

load data local infile '/home/cat/timbr-app/data/trees.csv'
into table appdev.trees
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 lines;
