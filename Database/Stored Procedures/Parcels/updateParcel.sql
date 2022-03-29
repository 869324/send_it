create proc updateParcel @id varchar(100), @description varchar(max) = null, @sender_id varchar(100) = null, @receiver_number varchar(max) = null, 
@start_location varchar(max) = null, @end_location varchar(max) = null, @current_location varchar(max) = null, @isUpdated  varchar(max) = null, 
@isDeleted varchar(max) = null, @isSent  varchar(max) = null, @isDelivered  varchar(max) = null 
as 
update parcels set description = isNull(@description, description), sender_id = isNull(@sender_id, sender_id), receiver_number = isNull(@receiver_number,  receiver_number),
start_location = isNull(@start_location, start_location), end_location = isNull(@end_location, end_location), current_location = isNull(@current_location, current_location),
isUpdated = isNull(@isUpdated, isUpdated), isDeleted = isNull(@isDeleted, isDeleted), isSent = isNull(@isSent, isSent), isDelivered = isNull(@isDelivered, isDelivered)
where id = @id;