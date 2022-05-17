<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
echo 'Script para receber e armazenar os dados de algum produto';
//Objetivo: Receber os dados do produto que foram digitados no formulário e armazenar em um banco de dados. 

// Recebendo os dados do formulário
$productName = $_GET['productName'];
$productDescription = $_GET['productDescription'];
$productPrice = $_GET['productPrice'];
$productCategory = $_GET['productCategory'];
$productUrlImage = $_GET['urlProductImage'];

//Conexão com o banco de dados. 
$hostname = 'localhost';
$user = 'admin';
$password = 'ifsp@1234';
$database = 'store';
$conn = mysqli_connect($hostname, $user, $password, $database);
if($conn){
    echo 'Conexão com o banco efetuada com sucesso !!! <br />';
    //Gravar os dados no banco de dados
    $query = "insert into products (productName, productDescription, productCategory, productUrlImage, productPrice) values ('".$productName."','".$productDescription."','".$productCategory."','".$productUrlImage."',".$productPrice.");";
    echo '<br />'.$query;
    $res = mysqli_query($conn, $query);
    if($res){
        echo '<h2>Prduto incluído com sucesso!!!</h2>';
    } else {
        echo '<h2>Prduto não incluído.!!!</h2>';
        var_dump(mysqli_error($conn));
    }
}else {
    echo 'Conexão com o banco de dados não efetuada !!! <br />';
    echo mysqli_connect_error();
}





?>