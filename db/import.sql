load data local infile '/home/ktyl/projects/uni/app-dev/assessment/data/postcodes.csv'
into table appdev.postcodes
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 lines;

load data local infile '/home/ktyl/projects/uni/app-dev/assessment/data/trees.csv'
into table appdev.trees
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 lines;
