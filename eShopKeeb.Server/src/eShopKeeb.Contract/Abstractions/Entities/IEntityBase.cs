using System;
using System.Collections.Generic;
using System.Text;

namespace eShopKeeb.Contract.Abstractions.Entities
{
    public interface IEntityBase<TKey>
    {
        TKey Id { get; set; }
    }
}
