CREATE PROC addMessage @name varchar(max), @email varchar(max), @message varchar(max), @date datetime2
AS
INSERT INTO messages (name, email, message, date) VALUES (@name, @email, @message, @date);