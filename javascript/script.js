//Start the game on button press//
var startGame = document.querySelector(".btn-success");
startGame.addEventListener("click", Main);

//Détermine le nombre de cube à générer//
var nbButtons = document.querySelectorAll(".limit");
LimitSquare(nbButtons);

//Fonction principal
function Main() {
    //Variable et fonctions//
    var answer = document.querySelector("#answer");
    answer.innerHTML = "<span></span>";
    startGame.textContent = "Play Again";
    startGame.classList.add("btn-default");
    startGame.classList.remove("btn-success");
    var compteurCube = LimitSquare(nbButtons);
    var generatedSquares = GenerateSquare(compteurCube);
    var randomColors = PickRandomSquare(compteurCube);
    var rightColor = randomColors[Math.floor(Math.random() * compteurCube)];
    //Logique
    ChangeSquareColor(randomColors, rightColor, nbButtons, answer);
}

//Fonction qui détermine la limite de cube à générer
function LimitSquare(p_nbButtons) {
    for (var i = 0; i < p_nbButtons.length; i++) {
        p_nbButtons[i].addEventListener("click", function() {
            document.querySelector(".selected").classList.remove("selected");
            this.classList.toggle("selected");
        })
    }
    return document.querySelector(".selected").textContent;
}

//Fonction qui génère les carrés
function GenerateSquare(p_compteurCube) {
    //Reset les cubes pour chaque nouvelle partie
    document.querySelector(".squares").innerHTML = "";
    var dataArray = [];
    //Logique
    for (var i = 0; i < p_compteurCube; i++) {
        dataArray.unshift("<div class='square'></div>");
        document.querySelector(".squares").innerHTML += dataArray[i];
    }
    return dataArray;
}

//Fonction qui change la couleur des carre
function ChangeSquareColor(p_randomColors, p_rightColor, p_nbButtons, p_answer) {
    //Variable
    var backgroundColor = "#323232";
    var squares = document.querySelectorAll(".square");
    //Logique
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = p_randomColors[i];
        squares[i].addEventListener("click", function() {
            if (this.style.backgroundColor === p_rightColor) {
                for (var i = 0; i < squares.length; i++) {
                    squares[i].style.backgroundColor = p_rightColor;
                }
                for (var z = 0; z <= p_nbButtons.length; z++) {
                    document.querySelectorAll(".btn-menu")[z].style.backgroundColor = p_rightColor;
                }
                //Change la couleur des éléments de la page avec la couleur gagnante
                p_answer.innerHTML = "<span>Good Cube!</span>";
                document.querySelector(".banniere").style.backgroundColor = p_rightColor;
                document.querySelector(".rightColorDisplay").textContent = p_rightColor;
            }
            else {
                p_answer.innerHTML = "<span>Wrong Cube...</span>";
                this.style.backgroundColor = backgroundColor;
            }
        });
    }
}

//Fonction qui prend des couleurs aleatoire
function PickRandomSquare(p_compteurCube) {
    //Variable
    var randomNumbers = [];
    var randomColors = [];
    //Logique
    for (var i = 0; i < p_compteurCube; i++) {
        //Créer trois couleurs Rgb
        for (var z = 0; z <= 3; z++) {
            randomNumbers.unshift(Math.floor(Math.random() * 255));
        }
        //Ajoute le nobmre de couleurs nécéssaires
        randomColors.push("rgb(" + randomNumbers[0] + ", " + randomNumbers[1] + ", " + randomNumbers[2] + ")");
    }
    return randomColors;
}
