# DeckForge - Testplan

## KR1 Användare ska kunna lägga till kort med namn, mana cost, typ, färg och power/toughness

### TC1.1 Lägg till ett kort
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "lightning bolt"
2. Fyll i "Mana Cost" med "R"
3. Välj "Instant" som "Type"
4. Kryssa i "Red" som "Color"
5. Lämna "Power/Toughness" tom
6. Välj "1" som "Quantity" 
7. Klicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs till i deck listan
* Ett meddelande visas "Added 1x lightning bolt"
* Formuläret rensas
* Card Count uppdateras till 1
* Kortet visas i deck listan

### TC1.2 Lägg till ett creature kort med power/toughness
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "ghalta, primal hunger"
2. Fyll i "Mana cost" med "10GG"
3. Välj "Creature" som Type
4. Kryssa i ""Green" som Color
5. Fyll i Power/Toughness med "12/12"
6. Välj "1" som "Quantity"
7. Kicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs till i deck listan med power/toughness "12/12"
* Ett meddelande visas "Added 1x ghalta, primal hunger"
* Formuläret rensas
* Card Count uppdateras till 1
* Kortet visas i deck listan

### TC1.3 Lägg till ett kort med flera färger
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "knight of autumn"
2. Fyll i "Mana cost" med "1GW"
3. Välj "Creature" som Type
4. Kryssa i ""Green" och "White" som Color
5. Fyll i Power/Toughness med "2/1"
6. Välj "1" som "Quantity"
7. Klicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs till i deck listan med "White Green"
* Ett meddelande visas "Added 1x knight of autumn"
* Formuläret rensas
* Card Count uppdateras till 1
* Kortet cisas i deck listan

### TC1.4 Lägg till flera exemplar av samma kort
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "island"
2. Lämna "Mana Cost" tom
3. Välj "land" som Type
4. Kryssa i ""Green" som Color
5. Lämna Power/Toughness tom
6. Välj "24" som "Quantity"
7. Kicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs till i deck listan
* Ett meddelande visas "Added 24x forest"
* Formuläret rensas
* Card Count uppdateras till 24
* Korten visas i deck listan

## KR2 Systemet ska kunna validera kortdata enligt Magic the Gathering regler
### TC2.1 Validering av kortnamn
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Lämna "Card Name" tom
2. Fyll i "Mana Cost" med "R"
3. Välj "Instant" som "Type"
4. Kryssa i "Red" som "Color"
5. Lämna "Power/Toughness" tom
6. Välj "1" som "Quantity" 
7. Klicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs inte till i deck
* HTML-validering förhindrar submit
* Card count förändras inte

### TC2.2 Validering av mana cost
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "forest"
2. Lämna "Mana Cost" tom
3. Välj "Land" som "Type"
4. Kryssa i "Green" som "Color"
5. Lämna "Power/Toughness" tom
6. Välj "1" som "Quantity" 
7. Klicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs till i deck listan
* Ett meddelande visas "Added 1x forest"
* Formuläret rensas
* Card Count uppdateras till 1
* Kortet visas i deck listan

### TC2.3 Validering av type
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "lightning bolt"
2. Fyll i "Mana Cost" med "R"
3. Välj "Selecte Type" / default som "Type"
4. Kryssa i "Red" som "Color"
5. Lämna "Power/Toughness" tom
6. Välj "1" som "Quantity" 
7. Klicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs inte till i listan
* HTML-validering förhindrar submit
* Card count förändras inte

### TC2.4 Validering av färg
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "lightning bolt"
2. Fyll i "Mana Cost" med "R"
3. Välj "Instant" som "Type"
4. Kryssa inte i någon "Color"
5. Lämna "Power/Toughness" tom
6. Välj "1" som "Quantity" 
7. Klicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs inte till i listan
* HTML-validering förhindrar submit
* Card count förändras inte

### TC2.5 Validering av power/toughness
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Fyll i "Card Name" med "ghalta, primal hunger"
2. Fyll i "Mana cost" med "10GG"
3. Välj "Creature" som Type
4. Kryssa i ""Green" som Color
5. Fyll i Power/Toughness med "MTG"
6. Välj "1" som "Quantity"
7. Kicka på "Add Card"

**Förväntat resultat:**
* Kortet läggs inte till i listan
* Ett felmeddelande visas "Failed to add card"
* Card count förändras inte

## KR3: Användare ska kunna se sin deck och vilka kort som ingår i decken
### TC3.1 Visa deck tom
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Kontrollera deck-list sektionen

**Förväntat resultat:**
* Meddelandet "No cards in deck" visas
* Card count visar "0"

### TC3.2 Visa deck med kort
**Förberedelse:**
* Lägg till 3 olika kort i deck

**Steg**

1. Kontrollera deck-list sektionen

**Förväntat resultat:**
* De 3 korten visas i listan
* Varje kort visar namn, mana cost, type, color och kvantitet
* Card count visar 3

### TC3.3 Visa deck med fler exemplar av samma kort
**Förberedelse:**
* Lägg till samma kort i deck 3 gånger

**Steg**

1. Kontrollera deck-list sektionen

**Förväntat resultat:**
* Korten visas en gång i listan och kvantiteten visar 3
* Card count visar 3

### TC3.4 Visa deck med creatures med power/toughness
**Förberedelse:**
* Lägg till en creature med power/toughness

**Steg**

1. Kontrollera deck-list sektionen

**Förväntat resultat:**
* Samma Power/toughness som angavs visas korrekt för creature

## KR4 Användare ska kunna ta bort enskilda kort från decken
### TC4.1 Ta bort ett kort ur deck
**Förberedelse:**
* Lägg till 3 olika kort i deck

**Steg**

1. Klicka på "Remove" knappen på ett av korten

**Förväntat resultat**
* Kortet som togs bort försvinner från deck listan
* Ett meddelande visas för användaren att ett kort togs bort
* Card count minskar med 1

### TC4.2 Ta bort alla kort ur deck
**Förberedelse:**
* Lägg till 3 olika kort i deck

**Steg**

1. Ta bort kort 1
2. Ta bort kort 2
3. ta bort kort 3

**Förväntat resultat:**

* Efter varje kort som tas bort uppdateras deck listan
* När det sista kortet tas bort så visas "No card in deck"
* När det sista kort tas bort visar card count "0"

## KR5 Användare ska kunna rensa hela decken på kort
### TC5.1 Rensa deck med kort
**Förberedelse:**
* Lägg till 3 olika kort i deck

**Steg**

1. Klicka på "Clear deck"
2. Klicka på "OK"

**Förväntat resultat:**
* Alla kort försvinner från deck
* Ett meddelande visas för användaren att decken har rensats på kort
* Card count visar "0"
* När decken har rensats så visas "No cards in deck"

## TC5.2 Rensa tom deck
**Förberedelse:**
* Decken ska vara tom

**Steg**

1. Klicka på "Clear deck"
2. Klicka på "OK"

**Förväntat resultat:**
* Ett meddelande visas för användaren att decken hat rensats på kort
* När decken har rensats så visas "No cards in deck"
* Card count visar "0"

## TC 5.3 Lägg till kort efter att deck har rensats
**Förberedelser:**
* Ha en deck som har rensats på kort en gång

**Steg**

1. Lägg till ett kort
2. Klicka på "OK"

**Förväntat resultat**
* 1 kort läggs till i deck
* Card count visar "1"

## KR6 Systemet ska förhindra att det finns fler än 60 kort i decken
### TC6.1 Lägg till upp till 60 kort
**Förberedelse:**
* Öppna applikationen i webbläsaren

**Steg**

1. Lägg till 60 kort

**Förväntat resultat:**
* 60 kort läggs till i deck
* Card count visar "60"

### TC6.2 Försök lägg till kort när deck är full (60 kort = full)
**Förberedelse:**
* Deck ska ha 60 kort

**Steg**
1. Försök lägg till 1 kort

**Förväntat resultat:**
* Koret läggs inte till i deck
* Ett meddelande visas för användaren "Failed to add card"
* Card count visar "60"

### TC6.3 Försök lägga till kort som överstiger deck kapacistet (60 kort = full)
**Förberedelse:**
* Ha 58 kort i deck

**Steg**
1. Försök lägga till 3 kort samtidigt (quantity = 3)

**Förväntat resultat:**
* Inget kort läggs till i deck
* Ett meddelande visas för användaren "Failed to add card"
* Card count visar "58"

