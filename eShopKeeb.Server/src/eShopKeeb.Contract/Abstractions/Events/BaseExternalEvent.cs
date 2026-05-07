namespace eShopKeeb.Contract.Abstractions.Events
{
    public abstract class BaseExternalEvent
    {
        public Guid Id { get; set; }

        public DateTime OccurredAt { get; set; }

        protected BaseExternalEvent()
        {
            Id = Guid.NewGuid();
            OccurredAt = DateTime.UtcNow;
        }
    }
}
