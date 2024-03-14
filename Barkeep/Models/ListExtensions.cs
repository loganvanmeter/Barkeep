using Microsoft.JSInterop;
using System.Diagnostics.Eventing.Reader;

namespace Barkeep.Models
{
    public static class ListExtensions
    {
        public static decimal GetQuantity(this List<InventoryAdjustment> inventoryAdjustments, Unit unit, decimal unitSize, decimal quantity)
        {
            decimal totalQuantity = quantity;
            if (unit != null)
            {
                foreach (var adjustment in inventoryAdjustments)
                {
                    decimal subQuantity = 0;
                    bool DoesAdd()
                    {
                        if (adjustment.InventoryAdjustmentTypeId == 2 | adjustment.InventoryAdjustmentTypeId == 3)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    if (adjustment.Unit != null)
                    {

                        decimal adjustmentQuantity = adjustment.Quantity * adjustment.ItemsPerUnit;
                        decimal adjustmentSize = adjustment.UnitSize * adjustment.Unit.Size;
                        decimal inventorySize = unit.Size * unitSize;
                        decimal totalUnits = (adjustmentQuantity * adjustmentSize) / inventorySize;
                        if (unit.Measurement == "unit" & adjustment.Unit.Measurement == "unit")
                        {
                            subQuantity = totalUnits;
                            if (DoesAdd())
                            {
                                totalQuantity += subQuantity;
                            }
                            else
                            {
                                totalQuantity -= subQuantity;
                            }
                        }
                        else if (unit.Measurement != "unit" | adjustment.Unit.Measurement != "unit")
                        {
                            if (unit.Measurement == adjustment.Unit.Measurement)
                            {
                                subQuantity = totalUnits;
                                if (DoesAdd())
                                {
                                    totalQuantity += subQuantity;
                                } else
                                {
                                    totalQuantity -= subQuantity;
                                }
                            } else if (unit.Measurement != adjustment.Unit.Measurement)
                            {
                                if (unit.Measurement == "mL" | unit.Measurement == "g")
                                {
                                    subQuantity = totalUnits * adjustment.Unit.MetricConversion;
                                    if (DoesAdd())
                                    {
                                        totalQuantity += subQuantity;
                                    } else
                                    {
                                        totalQuantity -= subQuantity;
                                    }
                                } else if (unit.Measurement == "fl oz" | unit.Measurement == "oz")
                                {
                                    subQuantity = totalUnits * adjustment.Unit.ImperialConversion;
                                    if (DoesAdd())
                                    {
                                        totalQuantity += subQuantity;
                                    } else
                                    {
                                        totalQuantity -= subQuantity;
                                    }
                                } else if (unit.Measurement != "unit" & adjustment.Unit.Measurement == "unit")
                                {
                                    subQuantity = adjustmentQuantity * adjustmentSize;
                                    if (DoesAdd())
                                    {
                                        totalQuantity += subQuantity;
                                    }
                                    else
                                    {
                                        totalQuantity -= subQuantity;
                                    }
                                } else
                                {
                                    continue;
                                }
                            }
                        }

                    } else
                    {
                        continue;
                    }
                }
                return totalQuantity;
            }
            else
            {
                return 6.90M;
            }
        }
    }
}
