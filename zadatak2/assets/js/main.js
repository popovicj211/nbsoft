//$(document).ready(() => {

//window.onload = function() {

// document.getElementById("btn-send").addEventListener("click", processForm);
//}

$(document).ready(function() {
    $("#btn-send").click(processForm);
})



const listBirthYear = () => {

    let listOptions = "";
    let date = new Date();
    let year = date.getFullYear();
    let startYear = year - 75
    let endYear = year - 18
    let arrYears = [];

    listOptions += `<option value="0">Izaberite</option>`
    for (let d = endYear; d >= startYear; d--) {
        arrYears.push(d);
        listOptions += `<option value="${d}">${d}</option>`;
    }

    $("#ddlbirthyear").html(listOptions);
}

listBirthYear();


// const processForm = () => {
function processForm(e) {
    e.preventDefault()
    let firstname = $("#firstname");
    let lastname = $("#lastname");
    let listBirthYear = $("#ddlbirthyear");
    let listBirthYearSelected = $("#ddlbirthyear option:selected");
    let address = $("#address");
    let listCity = $("#ddlcity");
    let listCitySelected = $("#ddlcity option:selected");
    let message = $("#message");

    let genderChecked = $("[name='rdbgendern']:checked");
    let gender = $("[name='rdbgendern']");



    let regFirstname = /^[A-ZČĆŠĐŽ][a-zčćšđž]{3,}$/;
    let regLastname = /^[A-ZČĆŠĐŽ][a-zčćšđž]{3,}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{3,})*$/;

    let regAddress = /^[A-ZČĆŠĐŽ][a-zčćšđž]{4,}(\s[A-ZČĆŠĐŽa-zčćšđž]{4,})*(\s[1-9][0-9]{1,2}[a-z]{0,2})$/;
    let regMessage = /^[A-ZČĆŠĐŽa-zčćšđž\d\s\.\,\*\+\?\!\-\_\/\'\:\;]{5,}$/;

    let isDisabled = true;

    let uspesnoNiz = [];
    let greskeNiz = [];

    let errorsCount = 0;

    function proveraRegEx(regEx, element) {
        if (!$(element).val().match(regEx)) {
            $(element).addClass("error");
            return false;
        } else {
            $(element).removeClass("error");
            $(element).addClass("ok");
            return true;
        }
    }

    firstname.blur(function() {
        if (!proveraRegEx(regFirstname, firstname)) {
            errorsCount++;
        }
    });

    lastname.blur(function() {
        if (!proveraRegEx(regLastname, lastname)) {
            errorsCount++;
        }
    });

    if (listBirthYearSelected.val() == "0") {
        errorsCount++;
        listBirthYear.addClass("error");
        console.log(listBirthYearSelected.val())
    } else {
        listBirthYear.removeClass("error");
        listBirthYear.addClass("ok");
    }


    if (listCitySelected.val() == "0") {
        errorsCount++;
        listCity.addClass("error");
    } else {
        listCity.removeClass("error");
        listCity.addClass("ok");
    }


    address.blur(function() {
        if (!proveraRegEx(regAddress, address)) {
            errorsCount++;
        }
    });

    message.blur(function() {
        if (!proveraRegEx(regMessage, message)) {
            errorsCount++;
        }
    });

    if (genderChecked.length == 0) {
        errorsCount++;
        gender.addClass("error");
    } else {
        gender.removeClass("error");
        gender.addClass("ok");
    }


    /*   if (listaStatus.length == 0) {
           brojGresaka++;
           $("<p class='alert alert-danger'>Morate izabrati status</p>").insertAfter($("[name='rbStatus']").parent().parent())
       } else {
          
       }


       if (testovi == "") {
           brojGresaka++;
           $("<p class='alert alert-danger'>Morate izabrati barem jedan test</p>").insertAfter($("[name='chbTestovi']").parent().parent())
       } else {
          
       }*/


    if (errorsCount == 0) {
        isDisabled = false;
        ajaxSendData();
        $("#success-message").html("<p class='alert alert-success'>Uspesno ste poslali podatke</p>");
        $("#formular").css("display", "none");
    }

    console.log(errorsCount)

    $("#btn-send").attr("disabled", isDisabled);




    /* if (!regIme.test(ime.val())) {
                ime.css("border", "2px solid #ff0000");
                greskeNiz.push("Ime nije dobro uneto");
            } else {
                ime.css("border", "2px solid #00ff00");
                uspesnoNiz.push("Ime je uspesno uneto");
            }

          


            if (!regPrezime.test(prezime.val())) {

                prezime.css("border", "2px solid #ff0000");
                greskeNiz.push("Prezime nije dobro uneto");
            } else {
                prezime.css("border", "2px solid #00ff00");
                uspesnoNiz.push("Prezime je uspesno uneto");
            }

            if (pol.length == 0) {
                greskeNiz.push("Pol nije izabran, izaberite odgovarajuci pol");
            }

            if (listaGradOpcije.val() == "0") {

                listaGrad.css("border", "2px solid #ff0000");
                greskeNiz.push("Grad nije izabran");
            } else {

                listaGrad.css("border", "2px solid #00ff00");
                uspesnoNiz.push("Grad je izabran");
            }



            if (listaGodinaRodjenjaOpcije.val() == "0") {

                listaGodinaRodjenja.css("border", "2px solid #ff0000");
                greskeNiz.push("Datum rodjenja nije izabran");
            } else {

                listaGodinaRodjenja.css("border", "2px solid #00ff00");
                uspesnoNiz.push("Datum rodjenja je izabran");
            }

            if (!regAdresa.test(adresa.val())) {

                adresa.css("border", "2px solid #ff0000");
                greskeNiz.push("Adresa nije dobro uneto");
            } else {
                adresa.css("border", "2px solid #00ff00");
                uspesnoNiz.push("Adresa je uspesno uneto");
            }



            if (!regPoruka.test(poruka.val())) {
                poruka.css("border", "2px solid #ff0000");
                greskeNiz.push("Poruka nije dobro uneto");
            } else {
                poruka.css("border", "2px solid #00ff00");
                uspesnoNiz.push("Poruka je uspesno uneto");
            }
*/

    /*      var rezultat = ''
          if (greskeNiz.length != 0) {
              for (var x in errors) {
                  rezultat = ' <p style="color:#ff0000;"> ' + errors[x] + '</p> ';
                  document.getElementsByClassName("coninstruction")[x].innerHTML = rezultat;
              }

          } else {
              for (var y in uspesnoNiz) {
                  rezultat = ' <p style="color:#fff;"> ' + goodArray[y] + '</p> ';
                  document.getElementsByClassName("coninstruction")[y].innerHTML = rezultat;
              }
              ajaxSendData()
          }

          */





    function ajaxSendData() {

        $.ajax({
            url: "http://localhost/nbsoft/zadatak2/server/forma.php",
            method: "post",
            dataType: "json",
            data: {

                firstnamen: firstname.val(),
                lastnamen: lastname.val(),
                rdbgendern: genderChecked.val(),
                ddlbirthyearn: listBirthYearSelected.val(),
                addressn: address.val(),
                ddlgradn: listCitySelected.val(),
                messagen: message.val(),
                sendn: "Send"
            },
            success: function(data) {

                alert(data);

            },
            error: function(xhr, status, Msgerror) {
                var poruka = "";
                switch (xhr.status) {
                    case 404:
                        poruka = "Stranica nije pronađena";
                        break;
                    case 422:
                        poruka = "Podaci nisu validni";
                        break;
                    case 500:
                        poruka = "Greška na serveru";
                        break;
                }
                console.log(xhr.status);
                $("#feedback").html("<h1 style='color:#ff0000;'>" + poruka + "</h1>");
            }

        })

    }


}






//});