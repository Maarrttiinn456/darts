# 🎯 Dokumentace Projektu: Šipkařská Liga (Darts Manager)

## 📌 Přehled projektu

Aplikace pro správu amatérských šipkařských lig. Umožňuje evidovat více lig, v rámci nich pořádat turnaje a zaznamenávat výsledky jednotlivých her s plnou kontrolou nad přidělováním bodů.

---

## 🏗️ Technický Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS.
- **Backend/DB:** Supabase (PostgreSQL, Auth).
- **Styling:** Tailwind CSS + ShadcnUI.

---

## 👥 Uživatelský Flow

### 0. Přístup

- Vyžadována registrace/přihlášení (Supabase Auth).

### 1. Registrace & Profil

- **Pole:** Email, Username, Heslo, Color (identifikační barva hráče).

### 2. Dashboard (Po přihlášení)

- Výpis lig, ve kterých je uživatel členem.
- Možnost **Vytvořit novou ligu**.

### 3. Správa Ligy

- **Vytvoření:** Název + výběr členů z registrovaných uživatelů.
- **Detail:** Historie odehraných turnajů + **Celková tabulka ligy** (suma bodů ze všech turnajů).
- Možnost **Založit nový turnaj**.

### 4. Turnaj (Hrací den)

- Dynamický počet her (není předem určeno).
- **Statistiky turnaje:** Tabulka výkonů za daný den.
- Možnost **Přidat hru** (výběr typu: 501, 301, Cricket atd.).

### 5. Hra (Detail & Zápis)

- Zobrazení všech hráčů ligy.
- **Manuální bodování:** Counter UI pro zadání bodů (`points_earned`) a pořadí (`rank`).
- **Uložení:** Potvrzením se body propíší do statistik turnaje i celé ligy.

---

## 🛠️ Datový Model (PostgreSQL)

- **`profiles`**: id, username, color, created_at.
- **`leagues`**: id, name, created_at.
- **`league_members`**: league_id, player_id (M:N vazba).
- **`tournaments`**: id, league_id, name, status.
- **`games`**: id, tournament_id, game_type, created_at.
- **`game_results`**: id, game_id, player_id, rank, points_earned.

---

## 🧠 Business Logika & Pravidla

1. **Nezávislost statistik:** Body jsou vázány na kombinaci `Hráč + Liga`.
2. **Fixní účast:** Turnaj hrají vždy všichni členové ligy. Pokud někdo nehraje, má 0 bodů.
3. **Plná kontrola:** Uživatel manuálně určí bodový zisk pro každého účastníka (není fixní bodování).
4. **Kaskádové mazání:** Smazání ligy/turnaje automaticky odstraní všechna podřízená data (CASCADE).
