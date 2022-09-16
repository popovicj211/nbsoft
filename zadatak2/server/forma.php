<?php
header("Content-Type:application/json");

if($_SERVER['REQUEST_METHOD'] != "POST"){
    echo "You don't have access on this page!";
 }

 

 if(isset($_POST['sendn']))
 {
       $firstname = $_POST['firstnamen'];
       $lastname = $_POST['lastnamen']; 
       
 }