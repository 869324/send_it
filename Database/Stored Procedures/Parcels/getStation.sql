create proc getStation @id varchar(max)
as
select name from stations where id = @id;