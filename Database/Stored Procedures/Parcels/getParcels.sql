CREATE PROC getParcels @user varchar(max) = null, @page int = 1, @size int = 10, @order varchar(max) = 'date desc', @search varchar(max) = null
AS

SELECT * FROM parcels

WHERE
    isDeleted = 'false' 
    AND (@user is null or sender_id = @user) 
    AND (@search is null or description like '%' +@search+ '%')

ORDER BY
	CASE WHEN @order = 'date desc' THEN date_created END DESC,
	CASE WHEN @order = 'date asc' THEN date_created END ASC,
	CASE WHEN @order = 'description desc' THEN description END DESC,
	CASE WHEN @order = 'description asc' THEN description END ASC
OFFSET (@page - 1) * @size ROWS 
FETCH NEXT @size ROWS ONLY;
