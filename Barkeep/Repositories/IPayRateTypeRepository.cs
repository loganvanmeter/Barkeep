using Barkeep.Models;

namespace Barkeep.Repositories
{
    public interface IPayRateTypeRepository
    {
        void Add(PayRateType payRateType);
        void Delete(int id);
        List<PayRateType> GetAll();
        PayRateType GetById(int id);
        void Update(PayRateType payRateType);
    }
}