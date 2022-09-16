<?php

$dir  = $_SERVER["DOCUMENT_ROOT"].'/nbsoft/zadatak4/files';

$dir2  = $_SERVER["DOCUMENT_ROOT"].'/nbsoft/zadatak4/files/folder2';

//$files1 = scandir($dir2);

//print_r($files1);


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
    return $files;
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
//return $image;
}

$rt = scanAllDir($dir2);

print_r($rt);






function showFileDataOnPage($getDataFromFileArr){




  echo "";
}

/*
  function readFileSubDir($scanDir) {

	$handle = opendir($scanDir);

	while (($fileItem = readdir($handle)) !== false) {
		
		if (($fileItem == '.') || ($fileItem == '..')) continue;
		$fileItem = rtrim($scanDir,'/') . '/' . $fileItem;

		if (is_dir($fileItem)) {
			foreach (readFileSubDir($fileItem) as $childFileItem) {
				yield $childFileItem;
			}

		} else {
			yield $fileItem;
		}
	}

	closedir($handle);
}


$rt3 = scanAllDir($dir2);

print_r($rt3);*/


/*
function listAllFiles($dir) {
    $array = array_diff(scandir($dir), array('.', '..'));
   
    foreach ($array as &$item) {
      $item = $dir . $item;
    }
    unset($item);
    foreach ($array as $item) {
      if (is_dir($item)) {
       $array = array_merge($array, listAllFiles($item . DIRECTORY_SEPARATOR));
      }
    }
    return $array;
  }


$rt3 =  listAllFiles($dir2);

print_r($rt3);

*/