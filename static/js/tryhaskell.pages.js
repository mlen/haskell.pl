// Module for the guide pages
tryhaskell.pages = {};

// Unshow a string
tryhaskell.pages.unString = function(str){
    return str.replace(/^"(.*)"$/,"$1").replace(/\\"/,'"');
}

// Random message from a list of messages
tryhaskell.pages.rmsg = function(choices) {
    return choices[Math.floor((Math.random()*100) % choices.length)];
}

// Simple HTML encoding
tryhaskell.pages.htmlEncode = function(text,shy){
    var x = $('<div></div>');
    x.text(text);
    return x.html();
}

// The nemesis
tryhaskell.nemesis = "chirs";

// All pages
tryhaskell.pages.list =
    [
        {title:'Masz wolne 5 minut?',
         guide:
         '<div class="indent">' +
         '<h3>Masz wolne 5 minut?</h3>' +
         '<p>Wpisz <code title="Kliknij by wkleić &quot;help&quot; do konsoli." style="cursor: pointer;">help</code> by rozpocząć przewodnik po języku</p>' +
         '<p>Lub wpisz poniższe by sprawdzić co się stanie ' +
         '<small class="note">(kliknij by wstawić automatycznie)</small>:</p>' +
         '<p>' +
         '<code title="Kliknij by wkleić &quot;23 * 36&quot; do konsoli." style="cursor: pointer;">23 * 36</code> lub <code title="Kliknij by wkleić &quot;reverse ' +
         '&quot;hello&quot;&quot; do konsoli." style="cursor: pointer;">reverse ' +
         '"hello"</code> lub <code title="Kliknij by wkleić &quot;map (+1) [1,2,3]&quot; do konsoli." style="cursor: pointer;">foldr (:) [] [1,2,3]</code> lub <code title="Kliknij by wkleić." style="cursor: pointer;">do line <- getLine; putStrLn line</code> lub <code>readFile "/welcome"</code>' +
         '</p>' +
         '<p><a href="https://hackage.haskell.org/package/pure-io-0.2.0/docs/PureIO.html#g:2">Pod tym linkiem</a> znajdują się akcje wejścia-wyjścia wspierane w tej piaskownicy.</p>' +
         '</p>' +
         '</div>' +
         '</div>'
        },
        ////////////////////////////////////////////////////////////////////////
        // Lesson 1

        // Simple addition
        {lesson:1,
         title:'Podstawy: liczby, teksty, itp.',
         guide:
         '<h3>' + tryhaskell.pages.rmsg(['Nauka za pomocą liczb','Matematyka jest muzyką dla umysłu','Powrót do podstaw'])
         + '</h3>'
         + "<p>Zacznijmy od odrobiny matematyki. Możesz jej używać w wyrażeniach Haskella."
         + "Wpisz: <code>5 + 7</code></p>"
        },
        {guide:function(result){
            if (!result) result = {expr:'5+7',value:12};
            var complied = result.expr.replace(/ /g,'')=="5+7";
            var who = complied? 'oczekiwaliśmy' : 'oczekiwałeś';
            return '<h3>' + tryhaskell.pages.rmsg(['Pierwsze wyrażenie w Haskellu',
                                                   "Pierwszy raz"]) + '</h3>'
                + '<p>Świetnie, wpisałeś to perfekcyjnie! Uzyskałeś wynik'+
                ' <code>' + result.value + '</code>. Dokładnie to czego '+who+'. '
                + "</p><p>Spróbujmy czegoś całkowicie innego."+
                " Wpisz swoje imię, np:" +
                ' <code>"Adam"</code></p>'
        },
         trigger:function(result){
             return result.type.match(/^\(?Num [a-z]+\)? => [a-z]+$/) ||
                 result.type == "Integer" ||
                 result.type == "Int";
         }
        },
        // Strings & types
        {guide:function(result){
            if (!result) result = {expr:'"Adam"',value:"\"Adam\""};
            var n = tryhaskell.pages.unString(result.value); if (n) n = ", " +n;
            n += "!";
            return '<h3>' + tryhaskell.pages.rmsg(['Typy wartości',"Jak masz na imię?"]) +
                '</h3>'
                + '<p>Witaj' + tryhaskell.pages.htmlEncode(n)
                + (n!="!"? " To ładne imię. Szczerze." : "")
                + "<p class=\"text-justify\">Przy każdej próbie otrzymujesz jako zwrot wartość wyrażenia. Jak dotąd były to liczby i łańcuchy znakowe.</p>"
                + "<p class=\"text-justify\">Możesz także użyć listy wartości. Sprawdźmy listę liczb. Załóżmy, że to szczęśliwe liczby w grze losowej: <code>[42,13,22]</code></p>"
        },
         trigger:function(result){
             return result.type == "[Char]"
                 || result.type == "String";
         }
        },
        // Overview of lesson 1
        {guide:function(result){
            if (!result) result = {value:"[42,13,22]"};
            return '<h3>' + tryhaskell.pages.rmsg(["Lekcja 2: kolejne wyzwania"]) +
                '</h3>' +
                "<p class=\"text-justify\">Świetnie, przetestowałeś listę liczb! Jeśli te liczby będą dla Ciebie szczęśliwe i coś wygrasz podzielimy się wygraną, w porządku?</p>" +
                "<p>Sprawdźmy czego się już nauczyłeś:</p>" +
                "<ol>"+
                "<li>Jak zapisywać wyrażenia matematyczne i listy wartości.</li>"+
                "</ol>" +
                "<p class=\"text-justify\">Listy możesz także przekształcać. Jeśli chcesz by lista Twoich szczęśliwych numerków była posortowana, zrób to w ten sposób: " +
                "<code>sort " + result.value + "</code></p>"
        },
         trigger:function(result){
             return result.expr.match(/^[ ]*\[[0-9, ]+\][ ]*$/) &&
                 result.type.match(/^\(?Num [a-z]+\)? => \[[a-z]+\]$/);
         }
        },
        ////////////////////////////////////////////////////////////////////////
        // Lesson 2 - Functions
        // Functions on lists
        {lesson:2,
         title: 'Simple Functions',
         guide:function(result){
             if (!result) result = {value:"[13,23,30]"};
             return '<h3>' + tryhaskell.pages.rmsg(["Zabawa z funkcjami"]) +
                 '</h3>' +
                 "<p class=\"text-justify\">Gratulujemy, właśnie użyłeś <strong>funkcji</strong>."+
                 " Za ich pomocą programuje się w języku Haskell." +
                 "<p>Jak można się domyślić, otrzymaliśmy <code>" +
                 tryhaskell.pages.htmlEncode(result.value)
                 + "</code>.</p><p class=\"text-justify\">Czy kiedykolwiek chciałeś mieć bliźniaka z piekła rodem? Ja też. "+
                 "Na szczęście możemy posortować listę znaków lub łańcuch znakowy"+
                 "<strong>łańcuch znakowy</strong>" +
                 " w taki sam sposób jak liczby! <code>sort \"Adam\"</code></p>"
         },
         trigger:function(result){
             return result.expr.match(/sort/) &&
                 result.type.match(/\(?Num [a-z]+, Ord [a-z]+\)? => \[[a-z]+\]$/);
         }
        },
        // Tuples
        {guide:function(result){
            if (!result) result = {value:"\"Aadm\""};
            tryhaskell.nemesis = tryhaskell.pages.htmlEncode(tryhaskell.pages.unString(result.value));
            return '<h3>' +
                tryhaskell.pages.rmsg(["Krotki, bo czasami pojedyncza wartość nie wystarcza!"]) +
                '</h3>' +
                "<p class=\"text-justify\">Uważaj na bliźniaka z piekła rodem, samo jego imię "+tryhaskell.nemesis+" jest już zaskakujące! W razie problemów dzwoń po pomoc.</p>" +
                "<p class=\"text-justify\">Mój bliźniak ma 28 lat, a oto jego opis za pomocą krotki w języku Haskell: "+
                "<code>(28,\"Aadm\")</code></p>"
        },
         trigger:function(result){
             return result.expr.match(/sort/) &&
                 result.type == "[Char]";
         }
        },
        // Functions on tuples
        {guide:function(result){
            if (!result) result = {value:"(28,\"Aadm\")"};
            var age = result.value.match(/^\(([0-9]+)+/);
            var villain = tryhaskell.pages.htmlEncode(result.value.replace(/\\"/g,'"'));
            return '<h3>' +
                tryhaskell.pages.rmsg(["Dane trzymamy razem"]) +
                '</h3>' +
                "<p>Czy "+(age?age[1]+" lat":"to")+" jest normalnym wiekiem dla takiej osoby z piekła rodem?</p>" +
                "<p class=\"text-justify\">Właśnie napisałeś <em>krotkę</em>. W Haskellu łatwe jest umieszczanie danych różnych typów razem, gdy są powiazane znaczeniowo. " +
                "W krotce możesz umieszczać ile chcesz danych i dowolnego typu:</p>" +
                "<ul><li><code>(1,\"ananas\",23/35)</code></li><li><code>(\"Agnieszka\",\"Beata\",\"Cecylia\")</code></li></ul>" +
                "<p>Załóżmy, że nasz gagatek jest opisany jako " +
                "<code>" + villain + "</code>" +
                ", to jak pobrać jego wiek?</p>" +
                "<code>fst " + villain + "</code>"
        },
         trigger:function(result){
             return result.type.match(/\(?Num [a-z]\)? => \([a-z], \[Char\]\)$/);
         }
        },
        // Summary of lesson 2
        {guide:function(result){
            return '<h3>' +
                tryhaskell.pages.rmsg(["Lekcja druga zakończona! Gratulacje!"]) +
                '</h3>' +

            "<p class=\"text-justify\">Świetna robota! Pobrałeś wiek z <code>krotki</code>! Nawet się nie spociłeś, prawda? Funkcja <code>fst</code> "+
                "po prostu pobiera <em>pierwszą</em> wartość. Została nazwana <em>\"fst\"</em> od angielskiego <em>\"first\"</em> ponieważ " +
                " jest używana <em>często</em>, więc jej nazwa powinna być krótka!</p>" +

            "<p>Sprawdźmy czego się nauczyłeś:</p>" +
                "<ol>"+
                "<li>Funkcje mogą być przyjmować listy dowolnych typów jako argumentów.</li>" +
                "<li>Możemy przechowywać dane w krotkach.</li>" +
                "<li>Pobieranie wartości z krotki jest bardzo proste.</li>"+
                "</ol>" +

            "<p class=\"text-justify\">Teraz powiedzmy, że chcesz użyć wartości więcej niż raz. Jak to zrobić? "+
                "To proste, możemy napisać:</p>" +

            "<code>let x = 4 in x * x</code>"
        },
         trigger:function(result){
             return result.expr.match(/fst/) &&
                 result.type.match(/^\(?Num [a-z]\)? => [a-z]$/);
         }
        },
        {guide:function(result){
            return "<h3>Trochę przyjemności</h3>" +

            "<p class=\"text-justify\">Właśnie <em>związałeś</em> <em>zmienną</em>. " +
                "To oznacza, że związałeś zmienną <code>x</code> z wyrażeniem <code>4</code>, " +
                " więc gdy napiszesz <code>x</code> w jakimś kodzie (<em>ciele</em>) " +
                " to będzie znaczyło to tyle samo jakbyś napisał <code>4</code>.</p>" +

            "<p>Wygląda to tak: <code>let <em>zmienna</em> = <em>wyrażenie</em> in <em>ciało</em></code></p>" +

            "Słowo <code>in</code> oddziela <em>wyrażenie</em> od <em>ciała</em>.</p>" +

            "<p>Na przykład: " +
                "<code><span class='highlight'>let</span> x <span class='highlight'>=</span> 8 * 10 <span class='highlight'>in</span> x + x</code></p>" +

            "<p class=\"text-justify\">Więc jeśli chcesz pobrać wiek swojego alter ego z poprzednich przykładów po prostu wykonaj:</p>" +

            "<code><span class='highlight'>let</span> villain <span class='highlight'>=</span> (28,\"Aadm\") <span class='highlight'>in</span> fst villain</code>"

        },trigger:function(result){
            return result.expr.match(/^[ ]*let[ ]+x[ ]*=[ ]*[0-9]+[ ]*in[ ]*x[ ]*\*[ ]*x/) &&
                result.type.match(/\(?Num [a-z]\)? => [a-z]$/);
        }
        },
        {guide:function(result){
            return "<h3>Więcej niż podstawy, lećmy dalej!</h3>" +
                "<p>Teraz przyjrzyjmy się " +
                "<strong>lukrowi składniowemu</strong> (<em>syntactic sugar</em>). " +
                "Wpisz:</p>" +
                "<p><code>'a' : []</code></p>" +
                "<p>Lub po prostu pomiń to i skocz do lekcji czwartej (<code>lesson4</code>) by pouczyć się o funkcjach, kwintesencji Haskella!";
        },trigger:function(result){
            return result.expr.match(/^[ ]*let[ ]+villain[ ]*=[ ]*\([0-9]+,[ ]*"[^"]+"\)[ ]*in[ ]+fst[ ]+villain[ ]*/) &&
                result.type.match(/\(?Num [a-z]\)? => [a-z]$/);
        }
        },
        // Lesson 3: Syntactic sugar
        {lesson:3,
         title:'Syntactic Sugar',
         guide:function(result){
             return '<h3>' +
                 tryhaskell.pages.rmsg(["Stworzyłeś listę!"]) +
                 '</h3>' +
                 "<p class=\"text-justify\">Bardzo dobrze, to była zmyślna składnia. Użyłeś funkcji <code>(:)</code>." +
                 "Przyjmuje ona dwa argumenty, dowolną wartość i listę, a następnie konstruuje z nich nową listę. " +
                 "W skrócie nazywamy ją <em>'cons'</em>.</p>" +
                 "<p class=\"text-justify\"><code>'a'</code> jest po prostu znakiem 'a', <code>[]</code> jest pustą listą. Tak więc " +
                 "dokleja <code>'a'</code> z przodu do pustej listy "+
                 "i tworzy listę <code>['a']</code>!</p>" +
                 "<p class=\"text-justify\">Jednak na szczęście nie musimy pisać " +
                 "<code>'a' : 'b' : []</code> za każdym razem gdy potrzebujemy list znaków; możemy do tego użyć " +
                 "<strong>lukru składniowego</strong> i po prostu napisać"+
                 " <code>['a','b']</code>. Nie wierz na słowo, lepiej sprawdź samemu!</p>" +
                 "<code>'a' : 'b' : [] == ['a','b']</code>"
         },
         trigger:function(result){
             return result.expr.match(/^[ ]*'a'[ ]*:[ ]*\[\][ ]*/) &&
                 result.type == "[Char]";
         }
        },
        // Booleans and string syntactic sugar
        {guide:function(result){
            return '<h3>' +
                tryhaskell.pages.rmsg(["Lecimy dalej!"]) +
                '</h3>' +
                "<p>Łapiesz tę składnię całkiem nieźle!</p>" +
                "<p>Otrzymałeś wartość logiczną " +
                "<code>True</code>. Co oznacza, że wartości wyrażeń w porównaniu są równe!</p>" +
                "<p>Jeszcze jeden przykład lukru sładniowego:</p>" +
                "<code>['a','b','c'] == \"abc\"</code>"
        },
         trigger:function(result){
             return result.type == "Bool" &&
                 result.expr.replace(/[^':\[\]\=,]/g,'') == "'':'':[]==['','']";
         }
        },
        // Summary of syntactic sugar section
        {guide:function(result){
            return '<h3>' +
                tryhaskell.pages.rmsg(["Lekcja 4: Lukier składniowy jest słodki"]) +
                '</h3>' +
                "<p>Podsumujmy czego się nauczyłeś:</p>" +
                "<ol>" +
                "<li>w wyrażeniu <code>'a' : []</code> znak <code>:</code> jest w rzeczywistości" +
                " funkcją tylko zapisaną w sposób skrócony.</li>" +
                "<li>lista znaków <code>['a','b']</code> może być zapisana jako " +
                "<code>\"ab\"</code>. Czyli o wiele prościej!</li>"
                + "</ol>" +
                "<p>Nieźle, doszedłeś już całkiem daleko! " +
                "Przeróbmy jeszcze nieco więcej na temat funkcji i przekazywania ich. " +
                "Wypróbuj ten kod:</p> <code>map (+1) [1..5]</code></p>";
        },
         trigger:function(result){
             return result.expr.replace(/[^\]\[',=\"]?/g,'') == "['','','']==\"\"" &&
                 result.type == "Bool";
         }
        },
        {lesson:4,
         title:'Functions, reloaded; passing, defining, etc.',
         guide:function(){
             var title =
                 tryhaskell.pages.rmsg(["Funkcje, funktory, funktoidy, fajnie"]);
             return "<h3>" + title + "</h3>" +

             "<p>Tu zaczyna się magia!</p>" +

             "<p>Przekazałeś funkcję <code>(+1)</code> " +
                 "do funkcji <code>map</code>.</p>" +

             "<p>Możesz spróbować innych rzeczy, na przykład <small class='note'>(pamiętaj, że możesz kliknięciem wstawić kod do konsoli)</small>:</p>" +

             "<ul>" +
                 "<li><code>map (*99) [1..10]</code></li>" +
                 "<li><code>map (/5) [13,24,52,42]</code></li>" +
                 "<li><code>filter (>5) [62,3,25,7,1,9]</code></li>" +
                 "</ul>" +

             "<p>Zauważ, że krotka różni się od listy ponieważ możesz zrobić coś takiego:</p>" +
                 "<code>(1,\"George\")</code>"
         },
         trigger:function(result){
             return result.expr.match(/^[ ]*map[ ]+\(\+1\)[ ]*\[1..5\][ ]*$/) &&
                 (result.type.match(/^\(?Num [a-z], Enum [a-z]\)? => \[[a-z]\]$/) ||
                  result.type.match(/^\(?Enum [a-z], Num [a-z]\)? => \[[a-z]\]$/));
         }},
        {guide:function(result){
            return "<h3>Listy i krotki</h3>" +

            "<p class=\"text-justify\">W liście możesz mieć tylko liczby lub znaki" +
                " , jednak w krotce możesz umieścić wszystko! </p>" +

            "<p class=\"text-justify\">Możesz także stworzyć nową listę za pomocą <code>(:)</code> co łączy wartości razem w jedną listę: </p>" +
                "<p><code>1 : [2,3]</code></p>" +

            "<p class=\"text-justify\">Jednak nie możesz zrobić tego z krotką! Możesz jedynie zapisać krotkę a następnie sprawdzać jej zawartość. Nie możesz tworzyć nowych tak jak by to były listy." +

            "<p class=\"text-justify\">Napiszmy naszą własną funkcję! To proste. Na przykład coś prostego:</p>" +
                "<code>let square x = x * x in square "+tryhaskell.pages.rmsg([52,10,3])+"</code>"

        },
         trigger:function(result){
             return result.expr.match(/^[ ]*\(1,"[^"]+"\)[ ]*$/) &&
                 result.type.match(/^\(?Num [a-z]\)? => \([a-z], \[Char\]\)$/);
         }},
        {guide:function(result){
            return "<h3>Zajmijmy się funkcjami</h3>" +
                "<p>Bardzo dobrze! Myślę, że powinieneś się zająć składnią <code>let</code>.</p>" +
                "<p>Zdefiniowałeś właśnie funkcję. Możesz to przeczytać, że dla danego " +
                "<em>parametru</em> nazwanego <code>x</code>, <code>square</code> od " +
                "<code>x</code> wynosi <code>x * x</code>." +
                "<p>Możesz też spróbować tego:</p>" +
                "<ul><li><code>let add1 x = x + 1 in add1 5</code></li>" +
                "<li><code>let second x = snd x in second (3,4)</code></li>" +
                "</ul>" +
                "<p>Zaszalejmy i użyjmy naszej funkcji <code>square</code> z funkcją <code>map</code>:</p>" +
                "<code>let square x = x * x in map square [1..10]</code>"
        },
         trigger:function(result){
             return result.expr.match(/^[ ]*let[ ]*square[ ]+x[ ]*=[ ]*x[ ]*\*[ ]*x[ ]*in[ ]*square[ ]+[0-9]+/) &&
                 result.type.match(/\(?Num [a-z]\)? => [a-z]$/);
         }},
        {guide:function(result){
            if (!result || !result.value) result = { value: "[1,4,9,16,25,36,49,64,81,100]" };
            return "<h3>Zajmijmy się funkcjami</h3>" +

            "<p class=\"text-justify\">Nieźle! Stworzyłeś funkcję <code>square</code> a następnie " +
                "przekazałeś ją do innej funkcji (<code>map</code>) i otrzymałeś wynik <code>" +
                tryhaskell.pages.htmlEncode(result.value) + "</code>. Czyli dokładnie to czego się spodziewałeś!</p>" +

            "<p class=\"text-justify\">Haskell całkiem nieźle radzi sobie z tworzeniem takich rzeczy. " +
                "Kilka innych przykładów:</p>" +

            "<ul>" +
                "<li><code>let add1 x = x + 1 in map add1 [1,5,7]</code></li>" +
                "<li><code>let take5s = filter (==5) in take5s [1,5,2,5,3,5]</code></li>" +
                "<li><code>let take5s = filter (==5) in map take5s [[1,5],[5],[1,1]]</code></li>" +
                "</ul>" +

            "<p>Otrzymałeś to czego się spodziewałeś?</p>" +

            "<p>Jeszcze jeden przykład: jak zmienić literę z małej na wielką?</p>" +

            "<p><code>toUpper 'a'</code></p>"
        },
         trigger:function(result){
             return result.expr.match(/^[ ]*let[ ]+square[ ]+x[ ]*=[ ]*x[ ]*\*[ ]*x[ ]*in[ ]+map[ ]+square[ ]*\[1..10\][ ]*$/) &&
                 (result.type.match(/^\(?Num [a-z], Enum [a-z]\)? => \[[a-z]\]$/) ||
                  result.type.match(/^\(?Enum [a-z], Num [a-z]\)? => \[[a-z]\]$/));
         }},
        {guide:function(result){
            return "<h3>Czas na ćwiczenia!</h3>" +

            "<p>Chcę byś użył funkcji <code>toUpper</code> by zmienić na wielkie litery moje imię " +
                "<code>\"Adam\"</code>. Spróbuj." +
                " Potrafisz to zrobić, wierzę w Ciebie!</p>" +

            "<p>Pamiętaj: znaki są zapisywane jako <code>'a'</code> a " +
                "łańcuchy znakowe (listy znaków) jako <code>\"a\"</code>." +

            '<p>Podpowiedź: <code class="spoiler">map toUpper "Adam"</code></p>'
        },
         trigger:function(result){
             return result.expr.match(/^toUpper 'a'$/) &&
                 result.type == "Char";
         }},
        {guide:function(result){
            return "<h3>Lekcja 5</h3>" +

            "<p>Wyśmienicie! Robisz wspaniałe postępy!</p>" +
            "<p>Przekazałeś <code>toUpper</code> do <code>map</code>. I wyszło nieźle.</p>" +

            "<p>Przyjrzyjmy się czego już się nauczyłeś:</p>" +

            "<ol>" +
                "<li>Funkcje takie jak <code>map</code> pobierają inne funkcje jako parametry.</li>" +
                "<li>Funkcje takie jak <code>(+1)</code>, <code>(>5)</code> lub "+
                "<code>square</code> mogą być przekazane do innych funkcji jako parametry.</li>" +
                "<li>Definiowanie funkcji jest tylko sposobem zapisu co zrobić z przekazanymi parametrami.</li>"  +
            "</ol>" +

            "<p>Sprawdźmy <em>dopasowanie wzorców</em>; sposób na "+
                "uzyskanie wartości z innych wartości używając wzorców. Wypróbuj: </p>" +
                "<p><code>let (a,b) = (10,12) in a * 2</code></p>"
        },
         trigger:function(result){
             return result.type == "[Char]" &&
                 result.expr.match(/^map[ ]+toUpper/);
         }},
        {lesson:5,
         title:'Pattern Matching',
         guide:function(result){
             var title =
                 tryhaskell.pages.rmsg(["A teraz wzorce",
                                        "Dopasowanie wzorców!"])
             return "<h3>" + title + "</h3>" +

             "<p>Niezły pokaz!</p>" +
                 "<p>Tak więc miałeś wartość <code>(10,12)</code> i dopasowałeś ją " +
                 " do wzorca <code>(a,b)</code>, a następnie możesz coś" +
                 " zrobić z <code>a</code> i <code>b</code>!" +

             "<p>Uwaga: Dopasowanie wzorca <code>(a,b)</code> do "+
                 "<code>(1,2)</code> by pobrać <code>a</code> jest tym samym co działanie" +
                 " <code>fst (1,2)</code>, tak jak zrobiłeś w kroku siódmym (wpisz <code>step7</code> by powrócić do niego)!</p>" +

             "<p>Wzorzec zawsze musi zostać dopasowany do wartości w spobób jaki została skonstruowana. "+
                 "Pamiętaj, że <code>\"abc\"</code> jest " +
                 "lukrem składniowym dla <code>'a' : 'b' : 'c' : []</code>.</p>" +

             "<p>Tak więc możesz pobrać znaki ze stringa za pomocą wzorca:</p>" +

             "<code>let (a:b:c:[]) = \"xyz\" in a</code>"
         },
         trigger:function(result){
             return result.expr.match(/^[ ]*let[ ]+\(a,b\)[ ]+=[ ]+\(10,12\)[ ]+in[ ]+a[ ]*\*[ ]*2[ ]*$/) &&
                 result.type.match(/\(?Num [a-z]\)? => [a-z]$/);
         }},
        {guide:function(result){
            return "<h3>"+tryhaskell.pages.rmsg(["Ignorowanie wartości"])+"</h3>" +

            "<p>Wchodzimy w coraz bardziej zadziwiającą składnię, co? Wiem, że dasz radę!</p>" +

            "<p>Jeśli potrzebujesz tylko niektórych wartości, możesz zignorować inne za pomocą znaku <code>_</code> (podkreślenia) w następujący sposób:</p>" +

            "<p><code>let (a:_:_:_) = \"xyz\" in a</code></p>" +

            "<p>W rzeczywistości zapis <code>(a:b:c:d)</code> jest skrótem dla zapisu " +
                "<code>(a:(b:(c:d)))</code>, więc możesz resztę zignorować w jednym ruchu:</p>" +

            "<code>let (a:_) = \"xyz\" in a</code>"
        },
         trigger:function(result){
             return result.expr.match(/^[ ]*let[ ]+\(a:b:c:\[\]\)[ ]*=[ ]*\"xyz\"[ ]*in[ ]+a[ ]*$/) &&
                 result.type == "Char";
         }},
        {guide:function(result){
            return "<h3>"+tryhaskell.pages.rmsg(["Ćwiczenie!","Pokaż co potrafisz!"])+"</h3>" +

            "<p>Spróbuj pobrać wartość <code>'a'</code> z podanej wartości za pomocą dopasowania wzorców:</p>" +
                "<p><code>(10,\"abc\")</code></p>" +

            "<p>Rozwiązanie: <code class='spoiler'>let (_,(a:_)) = (10,\"abc\") in a</code></p>"
        },
         trigger:function(result){
             return result.expr.match(/^[ ]*let[ ]*\(a:_\)[ ]*=[ ]*"xyz"[ ]*in[ ]*a[ ]*$/) &&
                 result.type == "Char";
         }},
        {guide:function(result){
            return "<h3>"+tryhaskell.pages.rmsg(["Dobrze!","Nieźle!","Świetnie!"])+"</h3>" +

            "<p>Myślę, że już poznałeś dopasowanie wzorców.</p>" +

            "<p>Jeśli nadal nie jesteś pewien, oto kilka innych rzeczy, które możesz spróbować:</p>" +

            "<ul>" +
                "<li><code>let _:_:c:_ = \"abcd\" in c</code></li>" +
                "<li><code>let [a,b,c] = \"cat\" in (a,b,c)</code></li>" +
                "</ul>" +

            "<p>Możesz też pobrać całą wartość <em>i</em> dopasować wzór do niej (mieć ciastko i zjeść ciastko):</p>" +

            "<code>let abc@(a,b,c) = (10,20,30) in (abc,a,b,c)</code>"
        },
         trigger:function(result){
             return result.expr.match(/^[ ]*let[ ]*\(_,\(?a:_\)?\)[ ]*=[ ]*\(10,\"abc\"\)[ ]*in[ ]*a[ ]*$/) &&
                 result.type == "Char";
         }},
        {guide:function(result){
            return "<h3>"+tryhaskell.pages.rmsg(["I to już koniec"])+"</h3>" +

            "<p>To było łatwe, prawda?</p>" +

            "<p>Podsumujmy czego się nauczyliśmy:</p>" +

            "<ol>" +
                "<li>Wartości są dopasowywane do wzorca lub <em>dekonstruowane</em> za pomocą zapisu adekwatnego do konstrukcji wartości.</li>" +
                "<liWzorce umożliwiają użycie dopasowanych wartości.</li>" +
                "<li>Możesz zignorować dowolną wartość, którą chcesz.</li>" +
                "<li>Można również dopasować wzór i zachować oryginalną wartość.</li>" +
                "</ol>" +

            "<p>W porządku! To wszystko na ten moment. Nadszedł czas, aby przejść do <a href='/documentation'>dokumentacji</a>!</p>"

        },
         trigger:function(result){
             return result.type.match(/Num/)
         }}
    ];
