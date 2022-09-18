$(document).ready(function() {
    let errorsCount = 0;
    let firstname = $("#firstname");
    let lastname = $("#lastname");
    let address = $("#address");
    let message = $("#message");
    let regFirstname = /^[A-ZČĆŠĐŽ][a-zčćšđž]{3,}$/;
    let regLastname = /^[A-ZČĆŠĐŽ][a-zčćšđž]{3,}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{3,})*$/;
    let regAddress = /^[A-ZČĆŠĐŽ][a-zčćšđž]{4,}(\s[A-ZČĆŠĐŽa-zčćšđž]{4,})*(\s[1-9][0-9]{1,2}[a-z]{0,2})$/;
    let regMessage = /^[A-ZČĆŠĐŽa-zčćšđž\d\s\.\,\*\+\?\!\-\_\/\'\:\;]{5,}$/;
    let arrSuccess = [];

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
        } else {
            arrSuccess.push("Ime: " + $(firstname).val());
        }
    });

    lastname.blur(function() {
        if (!proveraRegEx(regLastname, lastname)) {
            errorsCount++;
        } else {
            arrSuccess.push("Prezime: " + $(lastname).val());
        }
    });

    address.blur(function() {
        if (!proveraRegEx(regAddress, address)) {
            errorsCount++;
        } else {
            arrSuccess.push("Adresa: " + $(address).val());
        }
    });

    message.blur(function() {
        if (!proveraRegEx(regMessage, message)) {
            errorsCount++;
        } else {
            arrSuccess.push("Poruka: " + $(message).val());
        }
    });

    $("#btn-send").click(processForm);



    function processForm(e) {
        e.preventDefault()

        let listBirthYear = $("#ddlbirthyear");
        let listBirthYearSelected = $("#ddlbirthyear option:selected");

        let listCity = $("#ddlcity");
        let listCitySelected = $("#ddlcity option:selected");


        let genderChecked = $("[name='rdbgendern']:checked");
        let gender = $("[name='rdbgendern']");
        let = citizen = $("[name='chbcitizenn']");
        let = citizenChecked = $("[name='chbcitizenn']:checked");
        let = citizens = "";






        let isDisabled = true;






        if (listBirthYearSelected.val() == "0") {
            errorsCount++;
            listBirthYear.addClass("error");
            console.log(listBirthYearSelected.val())
        } else {
            listBirthYear.removeClass("error");
            listBirthYear.addClass("ok");
            arrSuccess.push("Godina rođenja: " + listBirthYearSelected.val());
        }


        if (listCitySelected.val() == "0") {
            errorsCount++;
            listCity.addClass("error");
        } else {
            listCity.removeClass("error");
            listCity.addClass("ok");
            arrSuccess.push("Grad: " + listCitySelected.val());
        }




        $(citizenChecked).each(function(i) {
            citizens += $(this).val() + " ";
        });



        if (genderChecked.length == 0) {
            errorsCount++;
            gender.addClass("bg-danger");
        } else {
            gender.removeClass("bg-danger");
            genderChecked.addClass("bg-success");
            arrSuccess.push("Pol: " + genderChecked.val());
        }



        if (citizens == "") {
            errorsCount++;
            citizen.addClass("bg-danger");
        } else {
            citizen.removeClass("bg-danger");
            citizenChecked.addClass("bg-success");
            arrSuccess.push("Državljanin: " + citizens);
        }


        if (errorsCount == 0) {
            ajaxSendData();
            $("#success-message").html("<p class='alert alert-success'>Uspesno ste poslali podatke</p>");

            let recordsSuccess = '<ul class="list-group">';
            for (let i in arrSuccess) {
                recordsSuccess += '<li class="list-group-item">' + arrSuccess[i] + '</li>';
            }
            recordsSuccess += '</ul>';
            $("#success-data").html(recordsSuccess);

            $("#formular").css("display", "none");
        }

        console.log(errorsCount)











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
                    chbcitizenn: citizens,
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