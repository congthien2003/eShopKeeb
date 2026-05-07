namespace eShopKeeb.Contract.Abstractions.Events
{
    public abstract class BaseEvent
    {
        public Guid Id { get; set; }

        public DateTime OccurredAt { get; set; }

        protected BaseEvent()
        {
            Id = Guid.NewGuid();
            OccurredAt = DateTime.UtcNow;
        }
    }
}
