<?php
  session_start();
  require_once '../../lib/dbcon.php';
  require_once '../../lib/mpdf/mpdf.php';
  require_once '../../lib/tglindo.php';
  require_once '../../lib/func.php';
  require_once '../../lib/bar128.php';

  // $buku = '';
  // foreach ($_GET['bukuArr'] as $i => $v) {
  //   $buku.='';
  // }

  $x     = isset($_SESSION['id_loginS']).$_GET['lokasiS'].$_GET['bukuArr'];
  $token = base64_encode($x);
  var_dump($_GET['token']);
  var_dump($token);
  exit();
  if(!isset($_SESSION)){ // login 
    echo 'user has been logout';
  }else{ // logout
    if(!isset($_GET['token']) OR  $token!==$_GET['token']){
      echo 'maaf token - url tidak valid';
    }else{
        ob_start(); // digunakan untuk convert php ke html
        // <body OnLoad="window.print()" OnFocus="window.close()">
        $out='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <title>SISTER::Perpus - Perangkat</title>
            </head>

            <body>';

            $lokasi = isset($_GET['lokasiS'])?filter($_GET['lokasiS']):'';
            
            $s = 'SELECT 
                    b.replid,
                    b.idbuku,
                    b.barkode,
                    k.callnumber 
                  from pus_buku b
                      LEFT JOIN pus_katalog k ON k.replid=b.katalog
                      LEFT JOIN pus_lokasi l ON b.lokasi =  l.replid
                  WHERE
                      b.lokasi = '.$lokasi.' AND 
                      b.replid IN ('.$_GET['bukuArr'].')';
             print_r($s);exit();
                  // var_dump($s);exit();
                  $e = mysql_query($s) or die(mysql_error());
                  $n = mysql_num_rows($e);
                  // $out.=' <table borde="1" width="50%">';
                  $out.=' <table border="1">';
                  // $nox = 1;
                  if($n==0){
                    $out.=' <tr>
                              <td colspan="2">-</td>
                            </tr>';
                  }else{
                    $kolom = 2;
                    $counter = 1;
                    while ($r=mysql_fetch_assoc($e)) {
                      $out.="<tr>
                                <td>".$r['callnumber']."</td>
                             </tr>
                             <tr>
                                <td></td>
                             </tr>";

                      // if (($counter-1) % $kolom == 0){
                      //   $out.="<tr>";
                      // } 
                      // $x =" ".$r['barkode']." ";

                      // $out.="<td align='center' cellspacing='5'>
                      //     <barcode code='$x' type='C128A' class='barcode' />
                      //   </td>";
                      // // $out.="<br />".$r['kode']."

                      // if ($counter % $kolom == 0) {
                      //   $out.="</tr>";
                      // }

                      // $counter++;
                    }
                  }
          $out.='</table>';
        echo $out;
  
        #generate html -> PDF ------------
          $out2 = ob_get_contents();
          ob_end_clean(); 
          $mpdf=new mPDF('c', 'A4', '', '', 4, 4, 10, 10, 0, 0);   
          // $mpdf=new mPDF('c','A4','');   
          $mpdf->SetDisplayMode('fullpage');   
          $stylesheet = file_get_contents('../../lib/mpdf/r_barcode_buku.css');
// var_dump($stylesheet);exit();
          $mpdf->SetDisplayMode('fullpage');
          $mpdf->list_indent_first_level = 0;
          $mpdf->WriteHTML($stylesheet,1);  // The parameter 1 tells that this is css/style only and no body/html/text
          $mpdf->writeBarcode($out);
          $mpdf->WriteHTML($out);
          $mpdf->keep_table_proportions = true;
          $mpdf->Output();
    }
}
  // ---------------------- //
  // -- created by epiii -- //
  // ---------------------- // 

?>