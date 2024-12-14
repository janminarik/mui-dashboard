USE [MUIDashboardDemo]
GO

DECLARE @i INT = 1;

WHILE @i <= 100
BEGIN
    INSERT INTO [dbo].[Customer]
           ([id], [firstName], [lastName], [email], [phoneNumber], [isVerified], [createdAt], [updatedAt])
    VALUES
           (
            CAST(@i AS NVARCHAR(1000)), 
            CASE 
                WHEN @i % 10 = 1 THEN 'John'
                WHEN @i % 10 = 2 THEN 'Jane'
                WHEN @i % 10 = 3 THEN 'Alice'
                WHEN @i % 10 = 4 THEN 'Bob'
                WHEN @i % 10 = 5 THEN 'Charlie'
                WHEN @i % 10 = 6 THEN 'Dana'
                WHEN @i % 10 = 7 THEN 'Emily'
                WHEN @i % 10 = 8 THEN 'Frank'
                WHEN @i % 10 = 9 THEN 'Grace'
                ELSE 'Henry'
            END, 
            CASE 
                WHEN @i % 10 = 1 THEN 'Doe'
                WHEN @i % 10 = 2 THEN 'Smith'
                WHEN @i % 10 = 3 THEN 'Johnson'
                WHEN @i % 10 = 4 THEN 'Brown'
                WHEN @i % 10 = 5 THEN 'Davis'
                WHEN @i % 10 = 6 THEN 'Evans'
                WHEN @i % 10 = 7 THEN 'White'
                WHEN @i % 10 = 8 THEN 'Taylor'
                WHEN @i % 10 = 9 THEN 'Harris'
                ELSE 'Clark'
            END, 
            CONCAT('user', @i, '@example.com'), 
            CASE 
                WHEN @i % 10 = 0 THEN NULL
                ELSE CONCAT('123-456-', RIGHT('000' + CAST(@i AS NVARCHAR), 3))
            END, 
            CASE 
                WHEN @i % 2 = 0 THEN 1
                ELSE 0
            END, 
            DATEADD(DAY, -@i, GETDATE()), 
            DATEADD(DAY, -(@i - 1), GETDATE())
           );

    SET @i = @i + 1;
END;
GO
