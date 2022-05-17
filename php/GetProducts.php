<?php
    // Conexão com o banco de dados
    $dbUser = "admin";
    $dbPassword = "ifsp@1234";
    $dbName = "store";
    $dbHost = "localhost";
    $connection = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName);
    if( $connection ) {
        // Realizar a leitura do banco
        $query = "select * from products";
        $results = mysqli_query($connection, $query);
        // Entregar os dados para quem pediu
        $products = [];
        $index = 0;
        while($record = mysqli_fetch_row($results)){
            $product = new stdClass();
            $product->id = $record[0];
            $product->name = $record[1];
            $product->description = $record[2];
            $product->category = $record[3];
            $product->urlProductImage = $record[4];
            $product->price = $record[5];
            $products[$index] = $product;
            $index = $index + 1;
        } 
        echo json_encode($products);
    } else {
        echo "<br />Conexão não efetuada";
        echo "<br />". mysqli_connect_error();
    }
?>