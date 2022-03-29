create proc deleteParcel @id varchar(100)
as
update parcels set isDeleted = 'true' where id = @id;