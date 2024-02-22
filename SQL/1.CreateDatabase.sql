USE [master]

IF db_id('Barkeep') IS NULL
CREATE DATABASE [Barkeep]
GO

USE [Barkeep]
GO

DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Day];
DROP TABLE IF EXISTS [PayRateType];
DROP TABLE IF EXISTS [UnitType];
DROP TABLE IF EXISTS [Region];
DROP TABLE IF EXISTS [VarietalType];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [ComponentType];
DROP TABLE IF EXISTS [Unit];
DROP TABLE IF EXISTS [InventoryAdjustmentType];
DROP TABLE IF EXISTS [Discount];
DROP TABLE IF EXISTS [PaymentType];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Bar];
DROP TABLE IF EXISTS [Season];
DROP TABLE IF EXISTS [Tax];
DROP TABLE IF EXISTS [BarUser];
DROP TABLE IF EXISTS [Distributor];
DROP TABLE IF EXISTS [Component];
DROP TABLE IF EXISTS [Varietal];
DROP TABLE IF EXISTS [ComponentVarietal];
DROP TABLE IF EXISTS [ComponentCategory];
DROP TABLE IF EXISTS [Ingredient];
DROP TABLE IF EXISTS [Inventory];
DROP TABLE IF EXISTS [InventoryPar];
DROP TABLE IF EXISTS [InvetoryLink];
DROP TABLE IF EXISTS [InventoryAdjustment];
DROP TABLE IF EXISTS [Menu];
DROP TABLE IF EXISTS [MenuCateogry];
DROP TABLE IF EXISTS [ModifierGroup];
DROP TABLE IF EXISTS [MenuCategoryModifierGroup];
DROP TABLE IF EXISTS [Modifier];
DROP TABLE IF EXISTS [MenuItem];
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS [SubOrder];
DROP TABLE IF EXISTS [OrderItem];
DROP TABLE IF EXISTS [OrderItemModifier];
DROP TABLE IF EXISTS [SubOrderDiscount];
DROP TABLE IF EXISTS [OrderItemDiscount];
DROP TABLE IF EXISTS [Recipe];
DROP TABLE IF EXISTS [RecipeStep];
DROP TABLE IF EXISTS [Build];
DROP TABLE IF EXISTS [BuildPart];
DROP TABLE IF EXISTS [TimeSheet];
DROP TABLE IF EXISTS [TimePunch];


CREATE TABLE [UserType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Day] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL
)

CREATE TABLE [PayRateType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL
)

CREATE TABLE [UnitType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
	[IsCase] bit NOT NULL,
	[IsEach] bit NOT NULL,
	[IsByWeight] bit NOT NULL,
)

CREATE TABLE [Region] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
	[Country] nvarchar(50) NOT NULL
)

CREATE TABLE [VarietalType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
	[Description] text
)

CREATE TABLE [Category] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL
)

CREATE TABLE [ComponentType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Unit] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
	[Size] decimal(11,6) NOT NULL,
	[Measurement] nvarchar(5) NOT NULL
)

CREATE TABLE [InventoryAdjustmentType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Discount] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
	[Amount] decimal (9,2) NOT NULL,
	[IsPercentOff] bit NOT NULL,
	[IsDollarOff] bit NOT NULL

)

CREATE TABLE [PaymentType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50)
)

CREATE TABLE [User] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserTypeId] integer Not Null,
	[DisplayName] nvarchar(50) NOT NULL,
	[FirstName] nvarchar(50) NOT NULL,
	[LastName] nvarchar(50) NOT NULL,
	[Phone] nvarchar (50) NOT NULL,
	[Email] nvarchar(50) NOT NULL,
	[Pin] nvarchar(8) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[EndDateTime] datetime,
	[IsActive] bit DEFAULT 1,

	CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
)

CREATE TABLE [Bar] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Phone] nvarchar(10) NOT NULL,
	[Street] nvarchar(50) NOT NULL,
	[City] nvarchar (50) NOT NULL,
	[State] nvarchar(5) NOT NULL,
	[Country] nvarchar (25) NOT NULL,
	[Email] nvarchar(50) NOT NULL,
	[Wesbite] nvarchar(50)

	CONSTRAINT [FK_Bar_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
)

CREATE TABLE [Season] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,

	CONSTRAINT [FK_Season_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id])
)

CREATE TABLE [Tax] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Amount] decimal(5,2) NOT NULL,

	CONSTRAINT [FK_Tax_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id])
)

CREATE TABLE [BarUser] (
	[Id] integer PRIMARY KEY IDENTITY,
	[UserId] integer NOT NULL,
	[BarId] integer NOT NULL,
	[UserTypeId] integer NOT NULL,
	[PayRate] decimal(9,2) NOT NULL,
	[PayRateTypeId] integer NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[EndDateTime] datetime,
	[IsActive] bit DEFAULT 1,

	CONSTRAINT [FK_BarUser_User] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]),
	CONSTRAINT [FK_BarUser_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id]),
	CONSTRAINT [FK_BarUser_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
	CONSTRAINT [FK_BarUser_PayRateType] FOREIGN KEY ([PayRateTypeId]) REFERENCES [PayRateType] ([Id])
)

CREATE TABLE [Distributor] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Rep] nvarchar(50) NOT NULL,
	[AccountNumber] nvarchar(50) NOT NULL,
	[Phone] nvarchar (50) NOT NULL,
	[Email] nvarchar(50) NOT NULL,
	[Wesbite] nvarchar(50),
	[Delivery] bit NOT NULL,
	[DeliveryTime] nvarchar(100) NOT NULL,

	CONSTRAINT [FK_Distributor_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id])
)

CREATE TABLE [Component] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[ComponentTypeId] integer NOT NULL,
	[RegionId] integer,
	[Name] nvarchar(50) NOT NULL,
	[Abv] decimal (4,2) NOT NULL,
	[Ibu] decimal (5,2),
	[Year] datetime,
	[Description] text,
	
	CONSTRAINT [FK_Component_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id]),
	CONSTRAINT [FK_Component_ComponentType] FOREIGN KEY ([ComponentTypeId]) REFERENCES [ComponentType] ([Id]),
	CONSTRAINT [FK_Component_Region] FOREIGN KEY ([RegionId]) REFERENCES [Region] ([Id])
)

CREATE TABLE [Varietal] (
	[Id] integer PRIMARY KEY IDENTITY,
	[VarietalTypeId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Description] text,

	CONSTRAINT [FK_Varietal_VarietalType] FOREIGN KEY ([VarietalTypeId]) REFERENCES [VarietalType] ([Id])
)

CREATE TABLE [ComponentVarietal] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ComponentId] integer NOT NULL,
	[VarietalId] integer NOT NULL,

	CONSTRAINT [FK_ComponentVarietal_Component] FOREIGN KEY ([ComponentId]) REFERENCES [Component] ([Id]),
	CONSTRAINT [FK_ComponentVarietal_Varietal] FOREIGN KEY ([VarietalId]) REFERENCES [Varietal] ([Id])
)

CREATE TABLE [ComponentCategory] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ComponentId] integer NOT NULL,
	[CategoryId] integer NOT NULL,

	CONSTRAINT [FK_ComponentCategory_Component] FOREIGN KEY ([ComponentId]) REFERENCES [Component] ([Id]),
	CONSTRAINT [FK_ComponentCategory_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
)

CREATE TABLE [Ingredient] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Description] text,

	CONSTRAINT [FK_Ingredient_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id])
)



CREATE TABLE [Inventory] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[ComponentId] integer,
	[IngredientId] integer,
	[Quantity] decimal (6,2) NOT NULL,
	[UnitId] integer,
	[UnitTypeId] integer,
	[CostPerOunce] decimal (9,2) NOT NULL,
	[CostPerUnit] decimal (9,2) NOT NULL,
	[Markup] decimal (6,2) NOT NULL,

	CONSTRAINT [FK_Inventory_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id]),
	CONSTRAINT [FK_Inventory_Component] FOREIGN KEY ([ComponentId]) REFERENCES [Component] ([Id]),
	CONSTRAINT [FK_Inventory_Ingredient] FOREIGN KEY ([IngredientId]) REFERENCES [Ingredient] ([Id]),
	CONSTRAINT [FK_Inventory_Unit] FOREIGN KEY ([UnitId]) REFERENCES [Unit] ([Id]),
	CONSTRAINT [FK_Inventory_UnitType] FOREIGN KEY ([UnitTypeId]) REFERENCES [UnitType] ([Id])
)

CREATE TABLE [InventoryPar] (
	[Id] integer PRIMARY KEY IDENTITY,
	[InventoryId] integer NOT NULL,
	[SeasonId] integer NOT NULL,
	[DayId] integer NOT NUll,
	[Par] Integer NOT NULL,
	[UnitId] integer NOT NULL,
	[UnitTypeId] integer NOT NULL,

	CONSTRAINT [FK_InventoryPar_Inventory] FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id]),
	CONSTRAINT [FK_InventoryPar_Season] FOREIGN KEY ([SeasonId]) REFERENCES [Season] ([Id]),
	CONSTRAINT [FK_InventoryPar_Day] FOREIGN KEY ([DayId]) REFERENCES [Day] ([Id]),
	CONSTRAINT [FK_InventoryPar_Unit] FOREIGN KEY ([UnitId]) REFERENCES [Unit] ([Id]),
	CONSTRAINT [FK_InventoryPar_UnitType] FOREIGN KEY ([UnitTypeId]) REFERENCES [UnitType] ([Id])
)

CREATE TABLE [InventoryLink] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ResultInventoryId] integer NOT NULL,
	[PartInventoryId] integer NOT NULL,
	[InAmount] decimal (5,2) NOT NULL,
	[InUnitId] integer,
	[InUnitTypeId] integer,
	[Yield] decimal (5,2) NOT NULL,
	[OutUnitId] integer,
	[OutUnitTypeId] integer,

	CONSTRAINT [FK_InventoryLink_Inventory_Result] FOREIGN KEY ([ResultInventoryId]) REFERENCES [Inventory] ([Id]),
	CONSTRAINT [FK_InventoryLink_Inventory_Part] FOREIGN KEY ([PartInventoryId]) REFERENCES [Inventory] ([Id]),
	CONSTRAINT [FK_ComponentIngredient_Unit_In] FOREIGN KEY ([InUnitId]) REFERENCES [Unit] ([Id]),
	CONSTRAINT [FK_ComponentIngredient_UnitType_In] FOREIGN KEY ([InUnitTypeId]) REFERENCES [UnitType] ([Id]),
	CONSTRAINT [FK_ComponentIngredient_Unit_Out] FOREIGN KEY ([OutUnitId]) REFERENCES [Unit] ([Id]),
	CONSTRAINT [FK_ComponentIngredient_UnitType_Out] FOREIGN KEY ([OutUnitTypeId]) REFERENCES [UnitType] ([Id])
)

CREATE TABLE [InventoryAdjustment] (
	[Id] integer PRIMARY KEY IDENTITY,
	[InventoryId] integer NOT NULL,
	[DistributorId] integer NOT NULL,
	[InventoryAdjustmentTypeId] integer NOT NULL,
	[Quantity] decimal (9,2) NOT NULL,
	[ItemsPerUnit] integer NOT NULL,
	[Cost] decimal (9,2) NOT NULL,
	[UnitId] integer NOT NULL,
	[UnitTypeId] integer NOT NULL,
	[IncludeInInvetoryCostPerOunce] bit NOT NULL,
	
	CONSTRAINT [FK_InventoryAdjustment_Inventory] FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id]),
	CONSTRAINT [FK_InventoryAdjustment_Distributor] FOREIGN KEY ([DistributorId]) REFERENCES [Distributor] ([Id]),
	CONSTRAINT [FK_InventoryAdjustment_Type] FOREIGN KEY ([InventoryAdjustmentTypeId]) REFERENCES [InventoryAdjustmentType] ([Id]),
	CONSTRAINT [FK_InventoryAdjustment_Unit] FOREIGN KEY ([UnitId]) REFERENCES [Unit] ([Id]),
	CONSTRAINT [FK_InventoryAdjustment_UnitType] FOREIGN KEY ([UnitTypeId]) REFERENCES [UnitType] ([Id])
)

CREATE TABLE [Menu] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[Enabled] bit NOT NULL,

	CONSTRAINT [FK_Menu_Bar] FOREIGN KEY ([BarId]) REFERENCES [Bar] ([Id])
)

CREATE TABLE [MenuCategory] (
	[Id] integer PRIMARY KEY IDENTITY,
	[MenuId] integer NOT NULL,
	[CategoryId] integer,
	[MenuCategoryId] integer,
	[CreateDateTime] datetime NOT NULL,
	[TaxId] integer NOT NUll,
	[Enabled] bit NOT NULL,

	CONSTRAINT [FK_MenuCategory_Menu] FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id]),
	CONSTRAINT [FK_MenuCategory_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
	CONSTRAINT [FK_MenuCategory_MenuCategory] FOREIGN KEY ([MenuCategoryId]) REFERENCES [MenuCategory] ([Id]),
	CONSTRAINT [FK_MenuCategory_Tax] FOREIGN KEY ([TaxId]) REFERENCES [Tax] ([Id])
)

CREATE TABLE [ModifierGroup] (
	[Id] integer PRIMARY KEY IDENTITY,
	[MenuId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[TaxId] integer NOT NULL,
	[Enabled] bit NOT NULL

	CONSTRAINT [FK_ModifierGroup_Menu] FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id]),
	CONSTRAINT [FK_ModifierGroup_Tax] FOREIGN KEY ([TaxId]) REFERENCES [Tax] ([Id])
)

CREATE TABLE [MenuCategoryModifierGroup] (
	[Id] integer PRIMARY KEY IDENTITY,
	[MenuCategoryId] integer NOT NULL,
	[ModifierGroupId] integer NOT NULL,

	CONSTRAINT [FK_MenuCategoryModifierGroup_MenuCategory] FOREIGN KEY ([MenuCategoryId]) REFERENCES [MenuCategory] ([Id]),
	CONSTRAINT [FK_MenuCategoryModifierGroup_ModifierGroup] FOREIGN KEY ([ModifierGroupId]) REFERENCES [ModifierGroup] ([Id])
)

CREATE TABLE [Modifier] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ModifierGroupId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[InventoryId] integer,
	[Price] decimal (5,2),
	[IsPercentage] bit NOT NULL,
	[IsDollarAmount] bit NOT NULL,
	[TaxId] integer NOT NULL,
	[Enabled] bit NOT NULL,

	CONSTRAINT [FK_Modifier_ModifierGroup] FOREIGN KEY ([ModifierGroupId]) REFERENCES [ModifierGroup] ([Id]),
	CONSTRAINT [FK_Modifier_Inventory] FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id]),
	CONSTRAINT [FK_Modifier_Tax] FOREIGN KEY ([TaxId]) REFERENCES [Tax] ([Id])
)

CREATE TABLE [MenuItem] (
	[Id] integer PRIMARY KEY IDENTITY,
	[MenuId] integer NOT NULL,
	[MenuCategoryId] integer NOT NULL,
	[Price] decimal (9,2) NOT NULL,
	[TaxId] integer NOT NULL,
	[Enabled] bit NOT NULL,
	[Notes] text,

	CONSTRAINT [FK_MenuItem_Menu] FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id]),
	CONSTRAINT [FK_MenuItem_MenuCategory] FOREIGN KEY ([MenuCategoryId]) REFERENCES [MenuCategory] ([Id]),
	CONSTRAINT [FK_MenuItem_Tax] FOREIGN KEY ([TaxId]) REFERENCES [Tax] ([Id]),
)

CREATE TABLE [Order] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarUserId] integer NOT NULL,
	[Name] nvarchar(50) NOT NULL,
	[Covers] integer NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[PaidDateTime] datetime,

	CONSTRAINT [FK_Order_BarUser] FOREIGN KEY ([BarUserId]) REFERENCES [BarUser] ([Id])
)

CREATE TABLE [SubOrder] (
	[Id] integer PRIMARY KEY IDENTITY,
	[OrderId] integer NOT NULL,
	[SubTotal] decimal (9,2) NOT NULL,
	[Tax] decimal (9,2) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[PaidDateTime] datetime,
	[PaymentTypeId] integer,

	CONSTRAINT [FK_SubOrder_Order] FOREIGN KEY ([OrderId]) REFERENCES [Order] ([Id]),
	CONSTRAINT [FK_SubOrder_PaymentType] FOREIGN KEY ([PaymentTypeId]) REFERENCES [PaymentType] ([Id])	
)

CREATE TABLE [OrderItem] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarUserId] integer NOT NULL,
	[SubOrderId] integer NOT NULL,
	[Seat] integer NOT NULL,
	[MenuItemId] integer NOT NULL,
	[SubTotal] decimal (9,2) NOT NULL,
	[Tax] decimal (9,2) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[SentDateTime] datetime,
	[Sent] bit NOT NULL,

	CONSTRAINT [FK_OrderItem_BarUser] FOREIGN KEY ([BarUserId]) REFERENCES [BarUser] ([Id]),
	CONSTRAINT [FK_OrderItem_SubOrder] FOREIGN KEY ([SubOrderId]) REFERENCES [SubOrder] ([Id]),
)

CREATE TABLE [OrderItemModifier] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ModifierId] integer NOT NUll,
	[OrderItemId] integer NOT NULL,

	CONSTRAINT [FK_OrderItemModifier_Modifier] FOREIGN KEY ([ModifierId]) REFERENCES [Modifier] ([Id]),
	CONSTRAINT [FK_OrderItemModifier_OrderItem] FOREIGN KEY ([OrderItemId]) REFERENCES [OrderItem] ([Id])
)

CREATE TABLE [SubOrderDiscount] (
	[Id] integer PRIMARY KEY IDENTITY,
	[DiscountId] integer NOT NULL,
	[BarUserId] integer NOT NULL,
	[SubOrderId] integer NOT NULL,
	[CustomAmount] decimal (9,2),
	[IsPercentOff] bit NOT NULL,
	[IsDollarOff] bit NOT NULL,
	[CreateDateTime] datetime NOT NULL,

	CONSTRAINT [FK_SubOrderDiscount_Discount] FOREIGN KEY ([DiscountId]) REFERENCES [Discount] ([Id]), 
	CONSTRAINT [FK_SubOrderDiscount_BarUser] FOREIGN KEY ([BarUserId]) REFERENCES [BarUser] ([Id]),
	CONSTRAINT [FK_SubOrderDiscount_SubOrder] FOREIGN KEY ([SubOrderId]) REFERENCES [SubOrder] ([Id])
)

CREATE TABLE [OrderItemDiscount] (
	[Id] integer PRIMARY KEY IDENTITY,
	[DiscountId] integer NOT NULL,
	[BarUserId] integer NOT NULL,
	[OrderItemId] integer NOT NULL,
	[CustomAmount] decimal (9,2),
	[IsPercentOff] bit NOT NULL,
	[IsDollarOff] bit NOT NULL,
	[CreateDateTime] datetime NOT NULL,

	CONSTRAINT [FK_OrderItmeDiscount_Discount] FOREIGN KEY ([DiscountId]) REFERENCES [Discount] ([Id]), 
	CONSTRAINT [FK_OrderItemDiscount_BarUser] FOREIGN KEY ([BarUserId]) REFERENCES [BarUser] ([Id]),
	CONSTRAINT [FK_OrderItemDiscount_OrderItem] FOREIGN KEY ([OrderItemId]) REFERENCES [OrderItem] ([Id])
)

CREATE TABLE [Recipe] (
	[Id] integer PRIMARY KEY IDENTITY,
	[MenuItemId] integer NOT NULL,

	CONSTRAINT [FK_MenuItemRecipe_MenuItem] FOREIGN KEY ([MenuItemId]) REFERENCES [MenuItem] ([Id])
)

CREATE TABLE [RecipeStep] (
	[Id] integer PRIMARY KEY IDENTITY,
	[RecipeId] integer NOT NULL,
	[Step] text NOT NULL,
	[Order] integer NOT NULL,

	CONSTRAINT [FK_RecipeStep_Recipe] FOREIGN KEY ([RecipeId]) REFERENCES [Recipe] ([Id])
)

CREATE TABLE [Build] (
	[Id] integer PRIMARY KEY IDENTITY,
	[MenuItemId] integer NOT NULL,

	CONSTRAINT [FK_Build_MenuItem] FOREIGN KEY ([MenuItemId]) REFERENCES [MenuItem] ([Id])
)

CREATE TABLE [BuildPart] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BuildId] integer NOT NULL,
	[InventoryId] integer NOT NULL,
	[Amount] decimal (5,2) NOT NULL,
	[UnitId] integer NOT NULL,
	[UnitTypeId] integer NOT NULL,
	[Order] integer NOT NULL,

	CONSTRAINT [FK_BuildPart_Build] FOREIGN KEY ([BuildId]) REFERENCES [Build] ([Id]),
	CONSTRAINT [FK_BuildPart_Inventory] FOREIGN KEY ([InventoryId]) REFERENCES [Inventory] ([Id]),
	CONSTRAINT [FK_BuildPart_Unit] FOREIGN KEY ([UnitId]) REFERENCES [Unit] ([Id]),
	CONSTRAINT [FK_BuildPart_UnitType] FOREIGN KEY ([UnitTypeId]) REFERENCES [Unit] ([Id])
)

CREATE TABLE [TimeSheet] (
	[Id] integer PRIMARY KEY IDENTITY,
	[BarUserId] integer NOT NULL,
	[StartDateTime] datetime NOT NULL,
	[EndDateTime] datetime

	CONSTRAINT [FK_TimeSheet_BarUser] FOREIGN KEY ([BarUserId]) REFERENCES [BarUser] ([Id]),
)

CREATE TABLE [TimePunch] (
	[Id] integer PRIMARY KEY IDENTITY,
	[TimeSheetId] integer NOT NULL,
	[InDateTime] datetime NOT NULL,
	[OutDateTime] datetime,
	[BreakStart] datetime,
	[BreakEnd] datetime,

	CONSTRAINT [FK_TimePunch_TimeSheet] FOREIGN KEY ([TimeSheetId]) REFERENCES [TimeSheet] ([Id])
)
GO