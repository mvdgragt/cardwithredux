# Projektarbete - E-wallet

Beskrivning: Du ska skapa en applikation där användaren kan hantera olika betalkort. Användaren ska kunna skapa upp till max 4 kort, och måste alltid minst ha ett kort i sin e-wallet. Tekniker du ska använda i denna app är följande:
-  Create-react-app
-  Inherited properties ( props )
-  State
-  Redux
-  De-structuring
-  Array methods (map, sort, etc.)
-  React Router
-  Life Cycle Hooks
-  API calls (VG)

Applikationen ska ha två routes (du får ändra namnet på dessa om du vill) :

/home
-  Högst upp ska du visa ett aktivt kort.
-  Om användaren har fler kort, ska dessa finnas listade under det aktiva kortet.
-  Det ska finnas en Add new card -knapp, som routar användaren vidare till /addcard.
-  Vid klick på kort i listan så ska den läggas som active card högst upp i vyn.

/addcard
-  Ett nytt kort ska kunna läggas till med följande information: Vendor, card number, cardholder, expire month, expire year, CCV. (Se bild nedan).
-  För kortutgivare ska du hårdkoda in minst tre alternativ man kan välja mellan. Den användaren väljer ska stå på kortet uppe till höger (t.ex. Mastercard, Visa, American Express etc. Eller om ni vill hitta på något roligare!).
-  Högst upp ska en förhandsvisning av kortet finnas, som uppdateras automatiskt när användare fyller i informationen.

Funktionella krav
För att få Godkänt ska du:
-  Ha använt React och Redux för att lösa uppgiften.
-  Lagt till grundläggande funktionalitet som att visa ut samtliga kort och lägga till betalkort.
-  Det är en single file application (SPA) som använder react-router.
-  Det ska finnas ett aktivt betalkort vid start av applikationen.
För att få Väl Godkänt ska du:
-  Gör ett API call vid start av applikationen, där du hämtar en slumpvald användare från följande API: https://randomuser.me/api/.
●  Denna personens för och efternamn ska stå med stora bokstäver på samtliga kort som finns/skapas.
●  Det ska gå att ta bort kort från listan. Det ska dock INTE vara möjligt att ta bort ett kort som är aktivt.
●  Fälten när en kort läggs till ska valideras så du i fältet kortnummer enbart kan mata in siffror, och det måste vara 16 siffror. Fältet för namn ska inte gå att fylla i, och förhandsvisningen ska visa användaren som hämtats från API:et.
●  Inga större buggar.
# cardwithredux
# cardwithredux
