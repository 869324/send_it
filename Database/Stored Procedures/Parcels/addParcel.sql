CREATE PROC addParcel @id varchar(100), @description varchar(max), @sender_id varchar(100), @receiver_number varchar(max), @start_location int,
@end_location int, @cost int, @date_created varchar(max)
AS
INSERT INTO parcels (id, description, sender_id, receiver_number, start_location, end_location, cost, date_created) 
VALUES (@id, @description, @sender_id, @receiver_number, @start_location, @end_location, @cost, CONVERT(datetime2, @date_created));