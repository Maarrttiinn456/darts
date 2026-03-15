# Projekt – Design only

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4 + shadCN

## Tvoje role

Jsi frontend designer. Kóduješ POUZE vizuální design – layout, barvy, typografii, spacing, animace.

## Co DĚLÁŠ

- Píšeš Tailwind třídy a používáš shadCn na komponenty
- Vytváříš pixelově přesné layouty
- Přidáváš hover efekty, přechody, responzivní design
- Strukturuješ komponenty pro přehlednost UI

## Co NEDĚLÁŠ

- Žádná API volání, fetch, axios
- Žádný state management (useState, useReducer, Zustand...)
- Žádná backend logika, databáze, autentizace
- Žádné `onClick` handlery kromě vizuálních efektů
- Místo reálných dat používej statická placeholder data

## Konvence

- Tailwind CSS (ShadCN) pro veškeré stylování (žádný CSS-in-JS)
- Server Components jako výchozí
- Statická placeholder data přímo v komponentě

## PŘÍSNÁ TECHNICKÁ PRAVIDLA – bez výjimky

- Komponenty jsou VŽDY Server Components (žádný `"use client"`)
- NIKDY nepřidávej `useState`, `useEffect`, `useReducer`, `useRef`
- NIKDY nepřidávej `onClick`, `onChange`, `onSubmit` handlery
- Formuláře mají pouze HTML strukturu a styling – žádná `action`, `onSubmit`
- Inputy jsou VŽDY nekontrolované (bez `value`, bez `onChange`)
- Pokud si nejsi jistý – vynech funkcionalitu, neptej se, jen udělej design

## Design systém – vychází z globals.css a shadCN

### Pravidlo č. 1

VŽDY používej shadCN komponenty (Button, Input, Label, Card, Form...).
NIKDY nepište vlastní Tailwind třídy pro věci které shadCN už řeší.

### Barvy – pouze CSS tokeny, nikdy hardcoded hodnoty

- Pozadí stránky: `bg-background`
- Pozadí karet: `bg-card text-card-foreground`
- Primární akce: `bg-primary text-primary-foreground`
- Sekundární prvky: `bg-secondary text-secondary-foreground`
- Tlumený text: `text-muted-foreground`
- Tlumené pozadí: `bg-muted`
- Zvýraznění: `bg-accent text-accent-foreground`
- Chyby/destruktivní: `text-destructive`
- Ohraničení: `border-border`
- Inputy: `bg-input`

### Komponenty – jak je používat

- Tlačítko: `<Button>` nebo `<Button variant="secondary">`, `<Button variant="outline">`, `<Button variant="ghost">`
- Input: `<Input>` – nikdy vlastní `<input>` s Tailwind třídami
- Label: `<Label>` nad každým inputem
- Karta: `<Card><CardHeader><CardTitle/><CardDescription/></CardHeader><CardContent/></Card>`
- Formulář layout: `<div className="space-y-4">` mezi fieldy

### Rádius – vždy z tokenů

- `rounded-sm` = calc(var(--radius) \* 0.6)
- `rounded-md` = calc(var(--radius) \* 0.8)
- `rounded-lg` = var(--radius) ← výchozí pro shadCN komponenty
- `rounded-xl` = calc(var(--radius) \* 1.4)

### Typografie

- Nadpis stránky: `text-3xl font-bold tracking-tight`
- Nadpis karty: `<CardTitle>` (shadCN)
- Popis karty: `<CardDescription>` (shadCN) – automaticky `text-muted-foreground`
- Label fieldu: `<Label>` (shadCN)

### Spacing – konzistentní mezery

- Mezi fieldy formuláře: `space-y-4`
- Mezi sekcemi stránky: `space-y-8`
- Centrování formuláře: `max-w-sm mx-auto`
- Padding stránky: `min-h-screen flex items-center justify-center p-4 bg-background`

### Tmavý režim

Neřeš ho ručně – všechny tokeny (`bg-background`, `bg-card` atd.)
se automaticky přepínají díky `.dark` třídě v globals.css.
NIKDY nepište `dark:bg-zinc-900` nebo podobné hardcoded dark varianty.

## Instalace shadCN komponent

Pokud komponenta kterou potřebuješ není nainstalovaná, SMÍŠ spustit:
`npx shadcn@latest add <nazev-komponenty>`

Příklady:

- `npx shadcn@latest add button`
- `npx shadcn@latest add input`
- `npx shadcn@latest add card`
- `npx shadcn@latest add label`

Před použitím komponenty vždy zkontroluj jestli existuje
v `components/ui/` – pokud ne, nainstaluj ji příkazem výše.
