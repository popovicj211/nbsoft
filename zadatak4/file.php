<?php

$dir  = $_SERVER["DOCUMENT_ROOT"].'/nbsoft/zadatak4/files';

$dir2  = $_SERVER["DOCUMENT_ROOT"].'/nbsoft/zadatak4/files/folder2';


function getDataFromFile($files){
if(isset($files)){
  $eachFile = [];
  $records = [];
    for($i = 0; $i < count($files); $i++){
     $eachFile[] = file($files[$i]);
      for($j = 0; $j < count($eachFile[$i]); $j++){
          $records[] = explode("\t", $eachFile[$i][$j]);
     }
    }  
    return $eachFile[0];
}
  return null;
   
}





function scanAllDir($dir2) {
  $result = [];
  $filePath = [];

  foreach(scandir($dir2) as $key => $filename) {
    if ($filename[0] === '.') continue;
    $filePath[] = $dir2 . '/' . $filename;
    if (is_dir($filePath[$key])) {

      foreach (scanAllDir($filePath) as $childFilename) {
        $result[] = $filename . '/' . $childFilename;
      }
    } else {

       $image = glob( $dir2."/*.{jpg,jpeg,png,gif}", GLOB_BRACE);
          if(isset($image))
            $filePath = array_diff($filePath,$image);
            $result[] = $filename;
          $getDataFromFileArr = getDataFromFile($filePath);
     
    }
  }
  return array("result" => $result , "fileRecords" => $getDataFromFileArr);

}

$rt = scanAllDir($dir2);

print_r($rt);



showFileDataOnPage(scanAllDir($dir2));


function showFileDataOnPage($getDataFromFileArr){

  echo "<ul>";
    foreach($getDataFromFileArr["fileRecords"] as $value){
      echo "<li>".$value."</li>";
    }
  echo "</ul>";
}

