create database if not exists appdev;

use appdev;

drop table if exists postcodes;
drop table if exists trees;

--###############################################################################
--# create tables                                                               #
--###############################################################################
create table postcodes (
    id          int             not null    auto_increment,
    postcode    varchar(8)      not null,
    longitude   decimal(8,6)    not null,
    latitude    decimal(8,6)    not null,
    primary key(id)
);

create table trees (
    id                  int             not null    auto_increment,
    scientificname      varchar(255)    not null,
    commonname          varchar(255)    not null,
    maturity            varchar(255)    not null,
    pollutionremoval    decimal(6,1)    null,
    longitude           decimal(8,6)    not null,
    latitude            decimal(8,6)    not null,
    primary key(id)
);

--###############################################################################
--# functions                                                                   #
--###############################################################################
drop function if exists measure;
delimiter //
-- https://en.wikipedia.org/wiki/Haversine_formula
create function measure(lat_a decimal(8,6), lon_a decimal(8,6), lat_b decimal(8,6), lon_b decimal(8,6))
returns float
deterministic
begin
	declare R 		decimal(7,3);
    declare d_lat	float;
    declare d_lon	float;
	
	declare a float;
	declare c float;
	declare d float;

	set R = 6378.137; -- radius of earth in km

	set d_lat = lat_b * pi() / 180 - lat_a * pi() / 180;
	set d_lon = lon_b * pi() / 180 - lon_a * pi() / 180;

    -- :grimacing:
	set a = sin(d_lat / 2) * sin(d_lat / 2) + cos(lat_a * pi() / 180) * cos(lat_b * pi() / 180) * sin(d_lon / 2) * sin(d_lon / 2);
	set c = 2 * atan(sqrt(a), sqrt(1-a));
	set d = R * c;
		
	return d * 1000; -- metres, hopefully
end //
delimiter ;

--###############################################################################
--# stored procedures                                                           #
--###############################################################################
drop procedure if exists get_trees;
delimiter //
create procedure get_trees(in pc varchar(8), in radius float)
begin
    declare lat decimal(8,6);
    declare lon decimal(8,6);

    select 
        p.latitude,
        p.longitude
    from postcodes p
    where lower(replace(p.postcode, ' ', '')) = lower(replace(pc, ' ', ''))
    limit 1
    into
        lat,
        lon;

    create temporary table tmp_trees
    select
        id,
        commonname,
        longitude,
        latitude,
        measure(latitude, longitude, lat, lon) as 'distance'
    from trees;

    select *
    from tmp_trees 
    where distance < radius
    order by distance;

    drop temporary table if exists tmp_trees;
end //
delimiter ;

