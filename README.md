
<p align="center">
  <img src="https://i.imgur.com/H9To4Em.png" width="200"/>
</p>

Pentru a funcționa sistemul de contact și recenzii, rulează: **json-server --watch db.json** <br/>
Pagina de administrare se găsește în assets/pages/admin_page.html

# Cum funcționează aplicația de recenzii ?

Administratorul site-ului alege din admin_page care review-uri sunt bune și care nu pentru a putea fi publicate pe homepage modificând atributul ”read” din json utilizând metoda PUT. (Cele negative se soluționează printr-un răspuns pe email)
Când deschidem pagina principală, folosind window.onload, se creează un array de comentarii luate din db.json folosind GET, apoi se aplică 
shuffle pe acest array și se afisează primele 3 comentarii în secțiunea reviews din homepage.
Metoda POST este folosită când scriem un review către administrator folosind secțiunea contact, iar metoda DELETE, in admin_page unde un administator poate șterge anumite mesaje.

De făcut în viitor: Fiecare comentariu care apare in secțiunea review să primească calificative de la alți utilizatori (Like), iar funcția care alege ce review să apară în pagină
să aleagă review în funcție de numărul de like-uri.

Primul release v1.0 este versiunea folosind doar HTML si CSS.
Release-ul v2.0 include elemente de JavaScript(Vanilla JS).

Nu s-a folosit niciun fel de framework la realizarea acestui site ! :+1:
