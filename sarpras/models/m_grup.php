<?php
	// error_reporting(0);
	session_start();
	require_once '../../lib/dbcon.php';
	require_once '../../lib/func.php';
	require_once '../../lib/pagination_class.php';
	require_once '../../lib/tglindo.php';

	// var_dump($_SESSION);exit();
	$mnu  = 'grup';
	$mnu2 = 'lokasi';
	$mnu3 = 'katalog';
	$mnu4 = 'barang';
	$mnu5 = 'jenis';
	
	$tb   = 'sar_'.$mnu;
	$tb2  = 'sar_'.$mnu2;
	$tb3  = 'sar_'.$mnu3;
	$tb4  = 'sar_'.$mnu4;
	$tb5  = 'sar_'.$mnu5;
	// $out=array();

	if(!isset($_POST['aksi'])){
		$out=json_encode(array('status'=>'invalid_no_post'));		
		// $out=['status'=>'invalid_no_post'];		
	}else{
		switch ($_POST['aksi']) {
			// tampil ---------------------------------------------------------------------
			case 'tampil':
				switch ($_POST['subaksi']) {
					// grup barang
					case 'grup':
						$lokasi       = isset($_POST['g_lokasiS'])?filter(trim($_POST['g_lokasiS'])):'';
						$g_kode       = isset($_POST['g_kodeS'])?filter(trim($_POST['g_kodeS'])):'';
						$g_nama       = isset($_POST['g_namaS'])?filter(trim($_POST['g_namaS'])):'';
						$g_keterangan = isset($_POST['g_keteranganS'])?filter(trim($_POST['g_keteranganS'])):'';
						
						$sql = 'SELECT
									g.replid,
									g.kode,
									g.nama,
									IFNULL(tbtot.jum,0) u_total,
									IFNULL(tbpjm.jum,0) u_dipinjam,
									IFNULL(tbtot.jum,0) - IFNULL(tbpjm.jum,0) u_tersedia,
									IFNULL(tbaset.aset,0) aset,
									g.keterangan
								FROM
									sar_grup g
									LEFT JOIN (
										SELECT 
											k.grup,
											count(*) jum 
										from 
											sar_katalog k
											left JOIN sar_barang b on b.katalog = k.replid
										GROUP BY
											k.grup
									)tbtot on tbtot.grup = g.replid
									
									LEFT JOIN(
										SELECT 
											k.grup,
											count(*)jum
										from 
											sar_peminjaman pj
											left JOIN sar_pengembalian kb on kb.peminjaman = pj.replid
											LEFT JOIN sar_barang b on b.replid = pj.barang
											left JOIN sar_katalog k on k.replid = b.katalog
										WHERE
											kb.replid is NULL
										GROUP BY	
											k.grup
									)tbpjm on tbpjm.grup = g.replid

									LEFT JOIN(
										SELECT
											k.grup,
											SUM(b.harga)aset
										from 
											sar_barang b
											join sar_katalog k on k.replid = b.katalog
										GROUP BY 
											k.grup
									)tbaset on tbaset.grup = g.replid
								WHERE
									g.lokasi = '.$lokasi.' and
									g.kode like "%'.$g_kode.'%" and
									g.nama like "%'.$g_nama.'%" and
									g.keterangan like "%'.$g_keterangan.'%" 
								ORDER BY
									g.kode asc';
						// print_r($sql);exit(); 	
						if(isset($_POST['starting'])){ //nilai awal halaman
							$starting=$_POST['starting'];
						}else{
							$starting=0;
						}

						$recpage= 5;//jumlah data per halaman
						$aksi    ='tampil';
						$subaksi ='grup';
						// $obj 	= new pagination_class($sql,$starting,$recpage);
						$obj 	= new pagination_class($sql,$starting,$recpage,$aksi,$subaksi);
						// var_dump($obj);exit();
						$result =$obj->result;
						// print_r($result);exit(); 	

						#ada data
						$jum	= mysql_num_rows($result);
						$out ='';$totaset=0;
						if($jum!=0){	
							$nox 	= $starting+1;
							while($res = mysql_fetch_array($result)){	
								$btn ='<td>
											<button data-hint="detail"  class="button" onclick="vwKatalog('.$res['replid'].');">
												<i class="icon-zoom-in"></i>
											</button>
											<button data-hint="ubah"  class="button" onclick="grupFR('.$res['replid'].');">
												<i class="icon-pencil on-left"></i>
											</button>
											<button data-hint=""  class="button" onclick="grupDel('.$res['replid'].');">
												<i class="icon-remove on-left"></i>
										 </td>';
								$out.= '<tr>
											<td>'.$res['kode'].'</td>
											<td>'.$res['nama'].'</td>
											<td>'.$res['u_total'].'</td>
											<td>'.$res['u_tersedia'].'</td>
											<td>'.$res['u_dipinjam'].'</td>
											<td class="text-right">Rp. '.number_format($res['aset']).',-</td>
											<td>'.$res['keterangan'].'</td>
											'.$btn.'
										</tr>';
								$totaset+=$res['aset'];
								$nox++;
							}
						}else{ #kosong
							$out.= '<tr align="center">
									<td  colspan=9 ><span style="color:red;text-align:center;">
									... data tidak ditemukan...</span></td></tr>';
						}
						// $out.= '<tr class="info"><td colspan="10">'..'</td></tr>';
						#link paging
						$out.= '<tr class="info"><td colspan=9>'.$obj->anchors.'</td></tr>';
						$out.='<tr class="info"><td colspan=9>'.$obj->total.'</td></tr>';
					break;
					// grup barang

					// katalog
					case 'katalog':
						$k_grup       = isset($_POST['grup'])?filter(trim($_POST['grup'])):'';
						$k_kode       = isset($_POST['k_kodeS'])?filter(trim($_POST['k_kodeS'])):'';
						$k_nama       = isset($_POST['k_namaS'])?filter(trim($_POST['k_namaS'])):'';
						$k_keterangan = isset($_POST['k_keteranganS'])?filter(trim($_POST['k_keteranganS'])):'';
						// var_dump($k_grup);exit();
						$sql = 'SELECT
									k.replid,
									k.kode,
									k.nama,
									j.nama jenis,
									COUNT(*) jum_unit,
									SUM(b.harga) aset,
									k.susut,
									k.keterangan
								FROM	
									sar_katalog k
									LEFT JOIN sar_jenis  j on j.replid = k.jenis
									LEFT JOIN sar_barang b on b.katalog = k.replid
								WHERE
									k.grup = "'.$k_grup.'" and
									k.kode like "%'.$k_kode.'%" and
									k.nama like "%'.$k_nama.'%" and
									k.keterangan like "%'.$k_keterangan.'%"
								GROUP BY 
									k.replid
								ORDER BY
									k.kode asc';
						// print_r($sql);exit(); 	
						if(isset($_POST['starting'])){ //nilai awal halaman
							$starting=$_POST['starting'];
						}else{
							$starting=0;
						}

						$recpage= 5;//jumlah data per halaman
						$aksi    ='tampil';
						$subaksi ='katalog';
						// $obj 	= new pagination_class($sql,$starting,$recpage);
						$obj 	= new pagination_class($sql,$starting,$recpage,$aksi,$subaksi);
						$result =$obj->result;

						#ada data
						$jum	= mysql_num_rows($result);
						$out ='';$totaset=0;
						if($jum!=0){	
							$nox 	= $starting+1;
							while($res = mysql_fetch_array($result)){	
								$btn ='<td>
											<button data-hint="detail"  class="button" onclick="vwBarang('.$res['replid'].');">
												<i class="icon-zoom-in"></i>
											</button>
											<button data-hint="ubah"  class="button" onclick="katalogFR('.$res['replid'].');">
												<i class="icon-pencil on-left"></i>
											</button>
											<button data-hint="hapus"  class="button" onclick="katalogDel('.$res['replid'].');">
												<i class="icon-remove on-left"></i>
										 </td>';
								$out.= '<tr>
											<td>'.$res['kode'].'</td>
											<td>'.$res['nama'].'</td>
											<td>'.$res['jenis'].'</td>
											<td>'.$res['jum_unit'].'</td>
											<td class="text-right">Rp. '.number_format($res['aset']).',-</td>
											<td class="text-right">'.$res['susut'].'%</td>
											<td>'.$res['keterangan'].'</td>
											'.$btn.'
										</tr>';
								$totaset+=$res['aset'];
								$nox++;
							}
						}else{ #kosong
							$out.= '<tr align="center">
									<td  colspan=9 ><span style="color:red;text-align:center;">
									... data tidak ditemukan...</span></td></tr>';
						}
						// $out.= '<tr class="info"><td colspan="10">'..'</td></tr>';
						#link paging
						$out.= '<tr class="info"><td colspan=9>'.$obj->anchors.'</td></tr>';
						$out.='<tr class="info"><td colspan=9>'.$obj->total.'</td></tr>';
					break;
					// katalog

					// barang
					case 'barang':
						$b_katalog    = isset($_POST['b_katalogS'])?filter(trim($_POST['b_katalogS'])):'';
						$b_kode       = isset($_POST['b_kodeS'])?filter(trim($_POST['b_kodeS'])):'';
						$b_barkode    = isset($_POST['b_barkodeS'])?filter(trim($_POST['b_barkodeS'])):'';
						$b_harga      = isset($_POST['b_hargaS'])?filter(trim($_POST['b_hargaS'])):'';
						$b_kondisi    = isset($_POST['b_kondisiS'])?filter(trim($_POST['b_kondisiS'])):'';
						$b_sumber     = isset($_POST['b_sumberS'])?filter(trim($_POST['b_sumberS'])):'';
						$b_status     = isset($_POST['b_statusS'])?filter(trim($_POST['b_statusS'])):'';
						$b_keterangan = isset($_POST['b_keteranganS'])?filter(trim($_POST['b_keteranganS'])):'';
						
						$sql = 'SELECT (
										SELECT 
											CONCAT(ll.kode,"/",gg.kode,"/",tt.kode,"/",kk.kode,"/",LPAD(b.urut,5,0))
										from 
											sar_katalog kk,
											sar_grup gg,
											sar_tempat tt,
											sar_lokasi ll
										where 
											kk.replid = b.katalog AND
											kk.grup   = gg.replid AND
											b.tempat  = tt.replid AND
											tt.lokasi = ll.replid
									)as kode,
									b.replid,
									LPAD(b.urut,5,0) as barkode,(
										case b.sumber
											when 0 then "Beli"
											when 1 then "Pemberian" 
											when 2 then "Membuat Sendiri" 
										end
									)as sumber,
									b.harga,
									IF(b. STATUS=1,"Tersedia","Dipinjam")AS status,
									k.nama as kondisi,
									t.nama as tempat,
									b.keterangan
								FROM
									sar_barang b 
									LEFT JOIN sar_kondisi k on k.replid = b.kondisi
									LEFT JOIN sar_tempat t on t.replid = b.tempat
								WHERE
									b.katalog = '.$b_katalog.' and
									b.kode LIKE "%'.$b_kode.'%" and
									b.barkode LIKE "%'.$b_barkode.'%" and
									b.harga LIKE "%'.$b_harga.'%" and
									b.sumber LIKE "%'.$b_sumber.'%" and
									b.kondisi LIKE "%'.$b_kondisi.'%" and
									b.status LIKE "%'.$b_status.'%" and
									b.keterangan LIKE "%'.$b_keterangan.'%"';
						// print_r($sql);exit(); 	
						if(isset($_POST['starting'])){ //nilai awal halaman
							$starting=$_POST['starting'];
						}else{
							$starting=0;
						}

						$recpage= 5;//jumlah data per halaman
						$aksi    ='tampil';
						$subaksi ='barang';
					 // $obj 	= new pagination_class($sql,$starting,$recpage);  // lawas
						$obj 	= new pagination_class($sql,$starting,$recpage,$aksi,$subaksi);  //baru
						$result =$obj->result;

						#ada data
						$jum = mysql_num_rows($result);
						$out ='';$totaset=0;
						if($jum!=0){	
							// $nox 	= $starting+1;
							while($res = mysql_fetch_array($result)){	
								$btn ='<td>
											<button data-hint="ubah"  class="button" onclick="barangFR('.$res['replid'].');">
												<i class="icon-pencil on-left"></i>
											</button>
											<button data-hint="hapus"  class="button" onclick="barangDel('.$res['replid'].');">
												<i class="icon-remove on-left"></i>
										 </td>';
								$out.= '<tr>
											<td>'.$res['kode'].'</td>
											<td>'.$res['barkode'].'</td>
											<td>'.$res['tempat'].'</td>
											<td>'.$res['sumber'].'</td>
											<td class="text-right">Rp. '.number_format($res['harga']).',-</td>
											<td>'.$res['kondisi'].'</td>
											<td>'.$res['status'].'</td>
											<td>'.$res['keterangan'].'</td>
											'.$btn.'
										</tr>';
								// $nox++;
							}
						}else{ #kosong
							$out.= '<tr align="center">
									<td  colspan=9 ><span style="color:red;text-align:center;">
									... data tidak ditemukan...</span></td></tr>';
						}
						// $out.= '<tr class="info"><td colspan="10">'..'</td></tr>';
						#link paging
						$out.= '<tr class="info"><td colspan=9>'.$obj->anchors.'</td></tr>';
						$out.='<tr class="info"><td colspan=9>'.$obj->total.'</td></tr>';
					break;
					// barang
				}
			break; 
			// tampil ---------------------------------------------------------------------

			// head info ------------------------------------------------------------------
			case 'headinfo':
				switch ($_POST['subaksi']) {
					case 'katalog':
						$s = 'SELECT 
								g.nama as grup,
								l.nama as lokasi,
								sum(b.harga)as totaset
							  FROM 
							  	'.$tb4.' b,
							  	'.$tb3.' k,
							  	'.$tb2.' l,
							  	'.$tb.' g
							  WHERE 
								g.replid ='.$_POST['grup'].' and 
								b.katalog = k.replid and
							  	g.lokasi = l.replid and
							  	g.replid=k.grup';
						$q 	= mysql_query($s);
						$stat = ($q)?'sukses':'gagal';
						$r = mysql_fetch_assoc($q);
						$out = json_encode(array(
								'status'=>$stat,
								'grup'=>$r['grup'],
								'lokasi'=>$r['lokasi'],
								'totaset'=>number_format($r['totaset'])
							));
					break;

					case 'barang':
						$s = '	SELECT
									g.replid,
									g.nama as grup,(
										SELECT nama
										from sar_lokasi 
										where replid = g.lokasi
									)as lokasi,
									IFNULL(tbjum.totbarang,0)totbarang,
									tbjum.susut,
									tbjum.nama as katalog,
									tbjum.totaset
								from 
									sar_grup g
									LEFT JOIN (
										SELECT 
											k.replid,
											k.grup,
											k.susut,
											k.nama,
											count(*)totbarang,
											sum(b.harga)totaset
										from 
											sar_katalog k,
											sar_barang b
										WHERE
											k.replid = b.katalog AND
											k.replid = '.$_POST['katalog'].'
									)tbjum on tbjum.grup = g.replid
								where 
									tbjum.replid= '.$_POST['katalog'];
						// var_dump($s);exit();
						$e = mysql_query($s);
						$r = mysql_fetch_assoc($e);
						if(!$e){
							$stat='gagal';
						}else{
							$stat ='sukses';
							$dt   = array(
										'idkatalog' =>$r['replid'],
										'katalog'   =>$r['katalog'],
										'grup'      =>$r['grup'],
										'lokasi'    =>$r['lokasi'],
										'susut'     =>$r['susut'],
										'totbarang' =>$r['totbarang'],
										'totaset'   =>number_format($r['totaset'])
									);
						}
						$out  = json_encode(array(
									'status' =>$stat,
									'data'   =>$dt
								));
					break;
				}
			break;
			// head info ------------------------------------------------------------------

			// add / edit -----------------------------------------------------------------
			case 'simpan':
				switch ($_POST['subaksi']) {
					case 'grup':
						$s 		= $tb.' set 	lokasi 		= "'.filter($_POST['g_lokasiH']).'",
												kode 		= "'.filter($_POST['g_kodeTB']).'",
												nama 		= "'.filter($_POST['g_namaTB']).'",
												keterangan 	= "'.filter($_POST['g_keteranganTB']).'"';
						$s2 	= isset($_POST['replid'])?'UPDATE '.$s.' WHERE replid='.$_POST['replid']:'INSERT INTO '.$s;
						var_dump($s2);exit();
						$e 		= mysql_query($s2);
						$stat 	= ($e)?'sukses':'gagal';
						$out 	= json_encode(array('status'=>$stat));
					break;

					case 'katalog':
						switch ($_POST['subaksi2']) {
							case 'upload':
								$error=false;
								$files=array();
								foreach($_FILES as $file){
									$tipex		= substr($file['type'],6);
									$namaAwal 	= $file['name'];
									$namaSkrg	= $_SESSION['id_loginS'].'_'.substr((md5($namaAwal.rand())),2,10).'.'.$tipex;
									$src		= $file['tmp_name'];
									$destix		= '../../img/upload/'.basename($namaSkrg);

									if(move_uploaded_file($src, $destix))
										$files[] = $namaSkrg;
									else
										$error = true;
								}$stat=$error?'gagal_upload':'sukses';
								$out=json_encode(array('status'=>$stat));
							break;

							case 'db':
								$s 		= $tb3.' set 	grup 		= "'.$_POST['k_grupH2'].'",
														kode 		= "'.filter($_POST['k_kodeTB']).'",
														nama 		= "'.filter($_POST['k_namaTB']).'",
														jenis 		= "'.$_POST['k_jenisTB'].'",
														'.($_POST['fileadd'][0]!=''?'photo= "'.$_POST['fileadd'][0].'"':'').',
														susut 		= "'.filter($_POST['k_susutTB']).'",
														keterangan 	= "'.filter($_POST['k_keteranganTB']).'"';
								$s2 	= isset($_POST['replid'])?'UPDATE '.$s.' WHERE replid='.$_POST['replid']:'INSERT INTO '.$s;
								$e 		= mysql_query($s2);
								$stat 	= ($e)?'sukses':'gagal_simpan_db';
								$out 	= json_encode(array('status'=>$stat));
							break;
						}
					break;

					case 'barang':
						$s 		= $tb4.' set 	katalog    = "'.$_POST['b_katalogH2'].'",
												tempat     = "'.$_POST['b_tempatTB'].'",
												sumber     = "'.$_POST['b_sumberTB'].'",
												harga      = "'.getuang($_POST['b_hargaTB']).'",
												kondisi    = "'.$_POST['b_kondisiTB'].'",
												keterangan = "'.filter($_POST['b_keteranganTB']).'"';

						$stat = true;
						if(!isset($_POST['replid'])){ //add
							if(isset($_POST['b_jumbarangTB']) and $_POST['b_jumbarangTB']>1){ //  lebih dr 1 unit barang
								for($i=0; $i<($_POST['b_jumbarangTB']); $i++) { // iterasi sbnyak jum barang 
									$e    = mysql_query('INSERT INTO '.$s.', urut='.($_POST['b_urutH']+$i));
									if(!$e)$stat=false;  
								}
							}else{ // 1 unit barang
								$e=mysql_query('INSERT INTO '.$s.', urut='.$_POST['b_urutH']);
								if(!$e)$stat=false;  
							// var_dump($e);exit();
							}
						}else{ //edit
							$s2 = 'UPDATE '.$s.', urut='.$_POST['b_urutH'].' WHERE replid='.$_POST['replid'];
							var_dump($s2);exit();
							$e  = mysql_query($s2);
							if(!$e)$stat=false;  
						}$out 	= json_encode(array('status'=>($stat?'sukses':'gagal')));
					break;
				}
			break;
			// add / edit -----------------------------------------------------------------
			
			// delete ---------------------------------------------------------------------
			case 'hapus':
				switch ($_POST['subaksi']) {
					case 'grup':
						$d    = mysql_fetch_assoc(mysql_query('SELECT * from '.$tb.' where replid='.$_POST['replid']));
						$s    = 'DELETE from '.$tb.' WHERE replid='.$_POST['replid'];
						$e    = mysql_query($s);
						$stat = ($e)?'sukses':'gagal';
						$out  = json_encode(array('status'=>$stat,'terhapus'=>$d['nama']));
					break;

					case 'katalog':
						$d    = mysql_fetch_assoc(mysql_query('SELECT * from '.$tb3.' where replid='.$_POST['replid']));
						$s    = 'DELETE from '.$tb3.' WHERE replid='.$_POST['replid'];
						// var_dump($s);exit();
						$e    = mysql_query($s);
						$stat = ($e)?'sukses':'gagal';
						$out  = json_encode(array('status'=>$stat,'terhapus'=>$d['nama']));
					break;

					case 'barang':
						$d    = mysql_fetch_assoc(mysql_query('SELECT * from '.$tb4.' where replid='.$_POST['replid']));
						$s    = 'DELETE from '.$tb4.' WHERE replid='.$_POST['replid'];
						// var_dump($s);exit();
						$e    = mysql_query($s);
						$stat = ($e)?'sukses':'gagal';
						$out  = json_encode(array('status'=>$stat,'terhapus'=>$d['kode']));
					break;
				}
			break;
			// delete ---------------------------------------------------------------------

			// ambiledit ------------------------------------------------------------------
			case 'ambiledit':
				switch ($_POST['subaksi']) {
					case 'grup';
						$s = 'SELECT * FROM '.$tb.'  WHERE replid='.$_POST['replid'];
						// var_dump($s);exit();
						$e 		= mysql_query($s);
						$r 		= mysql_fetch_assoc($e);
						$stat 	= ($e)?'sukses':'gagal';
						$out 	= json_encode(array(
									'kode'       =>$r['kode'],
									'nama'       =>$r['nama'],
									'lokasi'     =>$r['lokasi'],
									'keterangan' =>$r['keterangan']
								));					
					break;

					case 'katalog';
						$s = '	SELECT
									k.kode,
									k.nama,
									k.jenis,
									k.susut,
									k.keterangan,
									l.nama as lokasi, 
									g.nama as grup
								FROM 
									'.$tb3.' k,
									 '.$tb2.' l,
									 '.$tb.' g
								WHERE 
									g.replid = k.grup and 
									l.replid = g.lokasi and 
									k.replid ='.$_POST['replid'];
						$e 		= mysql_query($s);
						$r 		= mysql_fetch_assoc($e);
						$stat 	= ($e)?'sukses':'gagal';
						if(!$e){
							$stat ='gagal';
						}else{
							$stat ='sukses';
							$dt   =array(
										'kode'       =>$r['kode'],
										'nama'       =>$r['nama'],
										'susut'      =>$r['susut'],
										'lokasi'     =>$r['lokasi'],
										'grup'       =>$r['grup'],
										'jenis'      =>$r['jenis'],
										'keterangan' =>$r['keterangan']
									);						
						}$out 	= json_encode(array(
									'status' =>$stat,
									'data'   =>$dt
								));					
					break;

					case 'barang';
						$s ='SELECT
								b.tempat,
								LPAD(b.urut,5,0) as barkode,(
									SELECT 
										CONCAT(ll.kode,"/",gg.kode,"/",tt.kode,"/",kk.kode,"/",LPAD(b.urut,5,0))
									from 
										sar_katalog kk,
										sar_grup gg,
										sar_tempat tt,
										sar_lokasi ll
									where 
										kk.replid = b.katalog AND
										kk.grup   = gg.replid AND
										b.tempat  = tt.replid AND
										tt.lokasi = ll.replid
								)as kode,
								b.harga,
								b.urut,
								b.kondisi,
								b.sumber,
								b.keterangan
							FROM
								sar_barang b, sar_kondisi k
							WHERE
								b.kondisi = k.replid and
								b.replid  = '.$_POST['replid'];
						// print_r($s);exit();
						$e 		= mysql_query($s);
						$r 		= mysql_fetch_assoc($e);
						$stat 	= ($e)?'sukses':'gagal';
						if(!$e){
							$stat ='gagal';
						}else{
							$stat ='sukses';
							$dt   =array(
										'tempat'     =>$r['tempat'],
										'barkode'    =>$r['barkode'],
										'urut'       =>$r['urut'],
										'kode'       =>$r['kode'],
										'harga'      =>$r['harga'],
										'kondisi'    =>$r['kondisi'],
										'sumber'     =>$r['sumber'],
										'keterangan' =>$r['keterangan']
									);						
						}$out 	= json_encode(array(
									'status' =>$stat,
									'data'   =>$dt
								));					
					break;
				}
			break;
			// ambiledit ------------------------------------------------------------------

			// generate barcode -----------------------------------------------------------
			case 'kodegenerate':
				// concat(tb1.lokasi,"/",tb1.grup,"/",tb1.tempat,"/",tb1.katalog,"/",tb2.barang)kode,
				$s='SELECT
						tb1.lokasi,
						tb1.grup,
						tb1.tempat,
						tb1.katalog,
						tb2.barang,
						LPAD(tb2.barang,5,0)barkode	
					FROM (
						SELECT
							l.kode lokasi,
							g.kode grup,
							t.kode tempat,
							k.kode katalog
						FROM
							sar_lokasi l 
							JOIN sar_grup g on g.lokasi = l.replid
							JOIN sar_katalog k on k.grup= g.replid
							JOIN sar_tempat t on t.lokasi = l.replid
						WHERE	
							t.replid = '.$_POST['tempat'].' 
							and k.replid = '.$_POST['katalog'].'
						)tb1,';

				if($_POST['replid']!=''){//edit
					$s.= '(SELECT LPAD(urut,5,0) AS barang FROM sar_barang WHERE replid='.$_POST['replid'].')tb2';
				}else{ //add 
					$s.= '(SELECT (MAX(urut) + 1) AS barang FROM sar_barang )tb2';
				}

				// print_r($s);exit();
				$e    = mysql_query($s);
				$r    = mysql_fetch_assoc($e);
				$stat = !$e?'gagal':'sukses';
				$out  = json_encode(array(
							'status' =>$stat,
							'data'   =>array(
										'lokasi'  =>$r['lokasi'],
										'grup'    =>$r['grup'],
										'tempat'  =>$r['tempat'],
										'katalog' =>$r['katalog'],
										'barang'  =>$r['barang'],
										'barkode' =>$r['barkode']
						)));
			break;
			// generate barcode -----------------------------------------------------------
			}
	}echo $out;

    // ---------------------- //
    // -- created by rovi  -- //
    // ---------------------- // 
?>