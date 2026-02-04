namespace TaskTracker.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        public string Naslov { get; set; } = string.Empty;

        public string? Opis { get; set; }

        public string Status { get; set; } = "U toku";

        public DateTime DatumKreiranja { get; set; } = DateTime.Now;
    }
}
