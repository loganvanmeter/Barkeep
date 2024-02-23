USE [Barkeep];
GO

DELETE FROM UserType;
DELETE FROM PayRateType;
DELETE FROM UnitType;
DELETE FROM ComponentType;
DELETE FROM Unit;
DELETE FROM InventoryAdjustmentType;
DELETE FROM PaymentType;
DELETE FROM [User];

SET identity_insert [UserType] ON
INSERT INTO [UserType] ([Id], [Name]) VALUES(1, 'Site Admin'), 
(2, 'Account Admin'), 
(3, 'Bar Admin'), 
(4, 'Employee');
SET identity_insert [UserType] OFF

SET identity_insert [Day] ON
INSERT INTO [Day] ([Id], [Name]) VALUES(1, 'Sunday'), 
(2, 'Monday'), 
(3, 'Tuesday'), 
(4, 'Wednesday'),
(5, 'Thursday'),
(6, 'Friday'),
(7, 'Saturday');
SET identity_insert [Day] OFF

SET identity_insert [PayRateType] ON
INSERT INTO [PayRateType] ([Id], [Name]) VALUES(1, 'Salary'), 
(2, 'Hourly');
SET identity_insert [PayRateType] OFF

SET identity_insert [UnitType] ON
INSERT INTO [UnitType] ([Id], [Name], [IsCase], [IsEach], [IsByWeight]) VALUES(1, 'Bottle', 0, 1, 0), 
(2, 'Can', 0, 1, 0), 
(3, 'Weight', 0, 0, 1), 
(4, 'Case', 1, 0, 0),
(5, 'Each', 0, 1, 0);
SET identity_insert [UnitType] OFF

SET identity_insert [ComponentType] ON
INSERT INTO [ComponentType] ([Id], [Name]) VALUES(1, 'Liquor'), 
(2, 'Beer'), 
(3, 'Wine'), 
(4, 'Mixer'), 
(5, 'Garnish');
SET identity_insert [ComponentType] OFF

SET identity_insert [Unit] ON
INSERT INTO [Unit] ([Id], [Name], [Size], [Measurement]) VALUES(1, 'Dash(es)', 0.03125, 'oz'),
(2, 'Bar Spoon(s)', 0.166667, 'oz'),
(3, 'Ounce(s)', 1, 'oz'), 
(4, 'Cup(s)', 8, 'oz'),
(5, 'Pint(s)', 16, 'oz'),
(6, 'Quart(s)', 32, 'oz'),
(7, 'Gallon(s)', 128, 'oz'),
(8, 'Milliliter(s)', 1, 'mL'),
(9, 'Liter(s)', 1000, 'mL');
SET identity_insert [Unit] OFF

SET identity_insert [InventoryAdjustmentType] ON
INSERT INTO [InventoryAdjustmentType] ([Id], [Name]) VALUES(1, 'Sale'), 
(2, 'Void'), 
(3, 'Add'), 
(4, 'Waste'),
(5, 'Comp'),
(6, 'Remove');
SET identity_insert [InventoryAdjustmentType] OFF

SET identity_insert [PaymentType] ON
INSERT INTO [PaymentType] ([Id], [Name]) VALUES(1, 'Cash'), 
(2, 'Credit/Debit'), 
(3, 'Check'), 
(4, 'Gift Card'),
(5, 'House Account');
SET identity_insert [PaymentType] OFF

SET identity_insert [User] ON
INSERT INTO [User] ([Id], 
[UserTypeId], 
[DisplayName], 
[FirstName], 
[LastName], 
[Phone], 
[Email], 
[Pin], 
[CreateDateTime],
[IsActive],
[Password]) 
VALUES (1, 
1, 
'Adminastrator', 
'Admina', 
'Strator', 
'0000000000', 
'admin@example.com', 
'0000', 
'2024-02-22',
1,
'password');
SET identity_insert [User] OFF