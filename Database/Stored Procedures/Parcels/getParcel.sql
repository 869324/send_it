create proc getParcel @id varchar(100)
as
select * from parcels where id = @id and isDeleted = 'false';