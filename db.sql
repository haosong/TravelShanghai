drop table if exists attraction;
create table attraction (
	id integer not null auto_increment,
	lng double,
	lat double,
	bounds string,
	name varchar(64),
	information varchar(256),
	introduction varchar(256),
	rating double,
	favor integer,
	footprint integer,
	wish integer,
	rating5 integer,
	rating4 integer,
	rating3 integer,
	rating2 integer,
	rating1 integer,
	type varchar(64),
    primary key(id)
)default charset utf8;

drop table if exists user;
create table user (
	id integer not null auto_increment,
	head varchar(64),
	name varchar(64),
	account varchar(64),
	password varchar(64),
    primary key(id)
)default charset utf8;

drop table if exists favor;
create table favor (
	id integer not null auto_increment,
	userId integer not null,
	attractionId integer not null,
	time datetime,
    primary key(id)
)default charset utf8;

drop table if exists footprint;
create table footprint (
	id integer not null auto_increment,
	userId integer not null,
	attractionId integer not null,
	time datetime,
    primary key(id)
)default charset utf8;

drop table if exists wish;
create table wish (
	id integer not null auto_increment,
	userId integer not null,
	attractionId integer not null,
	time datetime,
    primary key(id)
)default charset utf8;

drop table if exists rating;
create table rating (
	id integer not null auto_increment,
	userId integer not null,
	attractionId integer not null,
	rating integer,
	content varchar(256),
	image varchar(128),
	time datetime,
    primary key(id)
)default charset utf8;

ALTER TABLE adweb.footprint
ADD INDEX FK_FOOTPRINT_ATTRACTION_idx (attractionId ASC);
ALTER TABLE adweb.footprint
ADD CONSTRAINT FK_FOOTPRINT_USER
  FOREIGN KEY (userId)
  REFERENCES adweb.user (id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT FK_FOOTPRINT_ATTRACTION
  FOREIGN KEY (attractionId)
  REFERENCES adweb.attraction (id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE adweb.favor
ADD INDEX FK_FAVOR_ATTRACTION_idx (attractionId ASC);
ALTER TABLE adweb.favor
ADD CONSTRAINT FK_FAVOR_USER
	FOREIGN KEY (userId)
	REFERENCES adweb.user (id)
	ON DELETE NO ACTION
	ON UPDATE CASCADE,
ADD CONSTRAINT FK_FAVOR_ATTRACTION
	FOREIGN KEY (attractionId)
	REFERENCES adweb.attraction (id)
	ON DELETE NO ACTION
	ON UPDATE CASCADE;

ALTER TABLE adweb.rating
ADD INDEX FK_RATING_ATTRACTION_idx (attractionId ASC);
ALTER TABLE adweb.rating
ADD CONSTRAINT FK_RATING_USER
  FOREIGN KEY (userId)
  REFERENCES adweb.user (id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT FK_RATING_ATTRACTION
  FOREIGN KEY (attractionId)
  REFERENCES adweb.attraction (id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;

ALTER TABLE adweb.wish
ADD INDEX FK_WISH_ATTRACTION_idx (attractionId ASC);
ALTER TABLE adweb.wish
ADD CONSTRAINT FK_WISH_USER
  FOREIGN KEY (userId)
  REFERENCES adweb.user (id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE,
ADD CONSTRAINT FK_WISH_ATTRACTION
  FOREIGN KEY (attractionId)
  REFERENCES adweb.attraction (id)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;
