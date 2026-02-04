# Task Tracker

Jednostavna aplikacija za upravljanje taskovima kreirana sa .NET 8 Web API backend-om i Angular 19+ frontend-om.

## Funkcionalnosti

- ✅ Dodavanje novog taska
- ✅ Uređivanje postojećeg taska (naslov, opis, status)
- ✅ Brisanje taska
- ✅ Prikaz liste svih taskova
- ✅ Promena statusa taska (U toku, Završen, Otkazan)
- ✅ Responsive dizajn

## Tehnologije

### Backend
- .NET 8 Web API
- Entity Framework Core
- SQL Server
- CORS podrška

### Frontend
- Angular 19+
- TypeScript
- RxJS
- CSS3 sa gradijent pozadinom

## Struktura podataka

Svaki task sadrži:
- **Id** (int, primarni ključ)
- **Naslov** (string, obavezno)
- **Opis** (string, opciono)
- **Status** (string: "U toku", "Završen", "Otkazan")
- **DatumKreiranja** (DateTime, automatski se postavlja)

## Pokretanje aplikacije

### Preduslovi
- .NET 8 SDK
- Node.js (18+)
- SQL Server (Express ili noviji)
- Angular CLI (`npm install -g @angular/cli`)

### Backend (.NET API)
```bash
cd TaskTracker.Api
dotnet restore
dotnet run
```
API će biti dostupan na: http://localhost:5231

### Frontend (Angular)
```bash
cd TestTracker.UI
npm install
npm start
```
Aplikacija će biti dostupna na: http://localhost:4200

### Baza podataka
Kreirati bazu `TaskTrackerDb` u SQL Server-u sa tabelom `Tasks`:
```sql
CREATE TABLE Tasks (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Naslov nvarchar(255) NOT NULL,
    Opis nvarchar(max),
    Status nvarchar(50) NOT NULL,
    DatumKreiranja datetime2 NOT NULL
);
```

## API Endpoints

- `GET /api/tasks` - Dobija sve taskove
- `POST /api/tasks` - Kreira novi task
- `PUT /api/tasks/{id}` - Ažurira postojeći task
- `DELETE /api/tasks/{id}` - Briše task

## Struktura projekta

```
├── TaskTracker.Api/          # .NET Web API
│   ├── Controllers/          # API kontroleri
│   ├── Data/                # DbContext
│   ├── Models/              # Entity modeli
│   └── Repositories/        # Repository pattern
├── task-tracker-ui/         # Angular frontend
│   └── src/app/
│       ├── models/          # TypeScript modeli
│       ├── services/        # HTTP servisi
│       └── task-list/       # Glavna komponenta
└── README.md
```

## Autor

Kreiran kao demo projekat za Task Tracker aplikaciju.