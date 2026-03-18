Fungování aplikace

0. Prichod na stranku
   Hrác se nejpreve musí registrovat nebo prihlasit

1. Reegistrace
   hrac vyplni nasledujici udaje

- email
- username
- password
- color

2. Prihlaseni
   hrac se hlasi pomoci

- email
- password

3. Po prihlaseni
   objevi se dashboard kde bude vypis lig a moznost vytvorit ligu

4. Vytvoreni ligy
   objevi formular kde napisu nazev ligy a priradim tam hrace z registrovanych uzivatelu

5. Liga
   Objevi se zde vypis turnaj ktere uz se v lize odehrali a zaroven moznost vytvorit turnaj
   Budou zde statistiky hracu kteri v lize jsou

6. Turnaj
   turnaj se bude skladat z nekolika her (neni poredem urceno jake hry akolik jich bude)
   budu zde mit statistiky hracu za tento konkretni turnaj
   v turnaji budu moct vytvorit hru (501,501 dlouble out, 301 ....)

7. Hra
   Objevi se mi rozhrani kde budou vypsani hraci kteri hraji hru (tedy vsichni hraci z ligy) a ja jim budu moct pripsat body za hru
   po tom co budou pripsany body za hru tak tam ukoncit hru a body se pripisou do statistik hrace v turnaji
   Pocet bodu budu urcovat sountrama (kazda liga muze mit jinak)
   Budu zde rozlisovat typ hry a potom vyhodnocovat poradi hracu

Obecne
hrac muze hrat vice lig a v kazde bude mit svou vlastni statistiku
pokud jsou hraci v lize tak vzdy hraji turnaj vsichni
kazdy vzdy hraje stejne pocet zapasu a typn zapasu jako ostatni

Stranka: league/[id]/page.tsx
URL: league/leagueId
Co na ni uvidim

- vypis vsech trounamentu
  Akce
- moznost pirdat turnaj
  Button presmerovani
- league/leagueId/tournament/tournamentId

Stranka: league[id]/tournament/[id]/page.tsx
URL: league/leagueId/tournament/tournamentId
Co na ni uvdim

- vypis vsech her
  Akcce
- moznost pridat hru
  Button presmerovani
- league/leagueId/tournament/tournamentId/game/gameId

Stranka: league[id]/tournament/[id]/game/[id]
URL: league/leagueId/tournament/tournamentId/game/gameId
Co na ni uvdim

- rozhrani pro ovladani hry jednotlive
  Akcce
- moznost pridat hracum body
- urcit o jakoy typ hry se jedna
- moznost ukonit hru a pripsat kazdemu hraci do game_results tabulky:
  id
  game_id
  player_id
  rank
  points
