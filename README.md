# DCA Economy Balancer – Dokumentacja Balansu Gamyfikacji

Niniejsze narzędzie służy do symulacji i optymalizacji systemu gamyfikacji dla projektu **DepressionControlApp (DCA)**, realizowanego w ramach konkursu "Mistrzowie Współpracy Fahrenheita".

## 1. Kontekst Projektu
*   **Zespół:** Międzyuczelniany zespół kół naukowych (UG, PG, GUMed).
*   **Cel:** Wsparcie zdrowia psychicznego studentów i pracowników FarU (monitoring nastroju, psychoedukacja).
*   **Budżet Nagród:** 7 000 PLN (obejmuje gadżety: koszulki, misie, gniotki oraz koszty operacyjne).
*   **Status:** MVP (iOS/Android), termin oddania: 15 stycznia 2026 r.

## 2. Architektura Waluty: "MindCoins"
System został zaprojektowany tak, aby budować zdrowy nawyk (retencję) bez ryzyka uzależnienia behawioralnego lub nadużywania farmakoterapii.

### Mechanika Zarabiania (Inflacja)
Wartości domyślne wynikają z potrzeby zbalansowania czasu potrzebnego na uzyskanie pierwszej nagrody (tzw. "Time to First Reward"):

| Aktywność | Nagroda | Uzasadnienie |
| :--- | :--- | :--- |
| **Mood Check-in** | +10 pkt | Podstawa monitoringu. Limit 3x dziennie (30 pkt/doba) zapobiega spamowaniu danych. |
| **Daily Streak** | 5-50 pkt | Motywacja do codziennego logowania. Progresja (5, 10, 15...) premiuje lojalność. |
| **Bonus 7-dniowy** | +100 pkt | Kamień milowy. Silny bodziec do domknięcia pełnego tygodnia aktywności. |
| **Ćwiczenia Oddechowe** | +20 pkt | Promowanie doraźnych technik radzenia sobie ze stresem. Limit 1x dziennie. |
| **Generowanie Raportu** | +150 pkt | Kluczowa funkcja terapeutyczna. Wysoka nagroda, bo czynność wykonuje się rzadko (co 2 tyg.). |
| **Moduł Leków** | **0 pkt** | **Zasada bezpieczeństwa.** Nagradzanie za leki mogłoby prowadzić do przedawkowania dla punktów. |

### Mechanika Wydawania (Deflacja)
Ceny zostały skorelowane z realnym kosztem i dostępnością gadżetów w budżecie 7000 PLN:

| Nagroda | Koszt | Cel Projektowy |
| :--- | :--- | :--- |
| **Skin Podstawowy** | 200 pkt | Szybka gratyfikacja (ok. 4-5 dni dla aktywnego użytkownika). |
| **Kawa na Kampusie** | 500 pkt | Pierwsza nagroda realna. Wymaga ok. 10-14 dni systematyczności. |
| **Gadżet DCA** | 800 pkt | Gniotki/Długopisy. Cel średnioterminowy (ok. 3-4 tygodnie). |
| **Skin Zen Master** | 2000 pkt | Prestiż wirtualny. Cel długoterminowy, nie obciąża budżetu finansowego. |
| **Premium Drop** | 2500 pkt | Koszulki/Misie. Bardzo limitowane (tylko 15 sztuk). Wymaga ok. 2-3 miesięcy starań. |

## 3. Scenariusze Symulacji
Aplikacja testuje balans na trzech profilach użytkowników:
1.  **Perfekcjonista:** Maksymalna aktywność, 100% konsekwencji. Pozwala sprawdzić "hard cap" zarobków i ryzyko zbyt szybkiego wyczyszczenia magazynu nagród.
2.  **Przeciętny Student:** Loguje się co drugi/trzeci dzień, zapomina o raportach. Kluczowy profil dla sprawdzenia, czy system nie jest zbyt frustrujący.
3.  **Osoba w kryzysie:** Niska aktywność. System musi oferować jej wystarczająco dużo punktów, by poczuła wsparcie, a nie presję wyniku.

## 4. Wytyczne dla Administratora (Jak balansować?)
*   **Jeśli nagrody znikają zbyt szybko:** Zwiększ koszt `Premium Drop` lub zmniejsz `Bonus 7-dniowy`.
*   **Jeśli użytkownicy tracą zainteresowanie:** Zmniejsz koszt `Kawa na Kampusie` do 400 pkt lub zwiększ punkty za `Mood Check-in`.
*   **Bezpieczeństwo:** Nigdy nie dodawaj punktów za odznaczenie leków. To czerwona linia etyczna projektu.

---
*Dokument wygenerowany na potrzeby optymalizacji systemu gamyfikacji DCA.*
