var mnu       ='perangkat'; 
var mnu2      ='lokasi'; 

var dir       ='models/m_'+mnu+'.php';
var dir2      ='models/m_'+mnu2+'.php';

var settingFR = id_contentFR = barkode_contentFR = info_contentFR = cetak_contentFR ='';

    function switchPN(){
        $('#cetak').toggle('slow');
        $('#labelcetak').toggle('slow');
        $('#cetaklabel').toggle('slow');
    }

// main function load first 
    $(document).ready(function(){
    //Dialog ID
        // id_contentFR    +='<div style="overflow:scroll;height:600px;">'
        settingFR    +='<div style="overflow:scroll;height:600px;">'
                       +'<form autocomplete="off" onsubmit="idSV();return false;">' 
                        +'<input id="id_formH" type="hidden">' 
                                +'<table width="700px" class="table hovered bordered striped">'
                                    +'<thead>'
                                        +'<tr style="color:white;"class="info">'
                                            +'<th width="250"class="text-left">Kode</th>'
                                            +'<th width="450" class="text-left">Keterangan</th>'
                                        +'</tr>'
                                    +'</thead>'     
                                    +'<tbody id="idTBL">'

                                    +'</tbody>'

                                    +'<tfoot>'
                                    +'</tfoot>'
                                +'</table>'
                            
                            +'<label>Format</label>'
                            +'<div class="input-control text size6">'
                                +'<input  required type="text" name="f_idTB" id="f_idTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div><br>'
                            +'<div class="input-control checkbox">'
                                +'<label>'
                                    +'<input type="checkbox" />'
                                    +'<span class="checked"></span>'
                                    +'Update nomor ID item ke format baru'
                                +'</label>'
                            +'</div>'
                            +'<div class="form-actions">' 
                                +'<button class="button primary">simpan</button>&nbsp;'
                                +'<button class="button" type="button" onclick="$.Dialog.close()">Batal</button> '
                            +'</div>'
                +'</div>';
                //End div

        barkode_contentFR    +='<div style="overflow:scroll;height:600px;">'
                       +'<form autocomplete="off" onsubmit="barkodeSV();return false;">' 
                        +'<input id="barkode_formH" type="hidden">' 
                                +'<table width="700px" class="table hovered bordered striped">'
                                    +'<thead>'
                                        +'<tr style="color:white;"class="info">'
                                            +'<th width="250"class="text-left">Kode</th>'
                                            +'<th width="450" class="text-left">Keterangan</th>'
                                        +'</tr>'
                                    +'</thead>'     
                                    +'<tbody id="barkodeTBL">'
                                        +'<tr>'
                                            +'<td class="text-justify">[nomorauto(.panjang digit)]</td>'
                                            +'<td class="text-justify">'
                                            +'Nomor otomatis (incremental). Panjang digit maksimal 5 karakter dengan penambahan '
                                            +'angka 0 di depan. Jika panjang digit tidak diberikan atau 0 maka panjang digit sesuai '
                                            +'angka asli tanpa penambahan angka 0 di depan.<br>'
                                            +'Contoh:<br>'
                                            +'[nomorauto.5] untuk nomor otomatis dengan panjang digit lima karakter.'
                                            +'[nomorauto] untuk nomor otomatis dengan panjang digit sesuai angka asli.' 
                                            +'</td>'
                                        +'</tr>'
                                        +'<tr>'
                                            +'<td class="text-justify">[tahun]</td>'
                                            +'<td class="text-justify">Tahun</td>'
                                        +'</tr>'
                                        +'<tr>'
                                            +'<td class="text-justify">[kodelokasi]</td>'
                                            +'<td class="text-justify">Kode lokasi</td>'
                                        +'</tr>'
                                        +'<tr>'
                                            +'<td class="text-justify">[kodetingkat]</td>'
                                            +'<td class="text-justify">Kode tingkat koleksi</td>'
                                        +'</tr>'
                                        +'<tr>'
                                            +'<td class="text-justify">[sumber]</td>'
                                            +'<td class="text-justify">Sumber item'
                                            +'Sumber dari pembelian berkode B. <br>Sumber dari hibah/pemberian berkode H.'
                                            +'</td>'
                                        +'</tr>'
                                    +'</tbody>'

                                    +'<tfoot>'
                                    +'</tfoot>'
                                +'</table>'
                            
                            +'<label>Format</label>'
                            +'<div class="input-control text size6">'
                                +'<input  required type="text" name="f_barkodeTB" id="f_barkodeTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div><br>'
                            +'<div class="input-control checkbox">'
                                +'<label>'
                                    +'<input type="checkbox" />'
                                    +'<span class="checked"></span>'
                                    +'Update barkode item ke format baru'
                                +'</label>'
                            +'</div>'
                            +'<div class="form-actions">' 
                                +'<button class="button primary">simpan</button>&nbsp;'
                                +'<button class="button" type="button" onclick="$.Dialog.close()">Batal</button> '
                            +'</div>'
                +'</div>';
                //End div

        info_contentFR  +='<div style="overflow:scroll;height:250px;">'
                        +'<form autocomplete="off" onsubmit="simpan();return false;" id="infoFR">' 
                            +'<input id="info_formH" type="hidden">' 
                            +'<label>Judul</label>'
                            +'<div class="input-control text">'
                                +'<input required type="text" name="judulTB" id="judulTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div>'
                            +'<label>Deskripsi</label>'
                            +'<div class="input-control text">'
                                +'<input required type="text" name="deskripsiTB" id="deskripsiTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div>'
                            +'<div class="form-actions">' 
                                +'<button class="button primary">simpan</button>&nbsp;'
                                +'<button class="button" type="button" onclick="$.Dialog.close()">Batal</button> '
                            +'</div>'
                        +'</form>';
                    +'</div>';
                    //End div

        cetak_contentFR += '<form autocomplete="off" onsubmit="simpan();return false;" id="'+mnu+'FR">' 
                            +'<input id="idformH" type="hidden">' 
                            +'<label>Kode</label>'
                            +'<div class="input-control text">'
                                +'<input placeholder="kode" required type="text" name="kodeTB" id="kodeTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div>'
                            +'<label>Nama Lokasi</label>'
                            +'<div class="input-control text">'
                                +'<input  placeholder="lokasi" required type="text" name="namaTB" id="namaTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div>'
                            +'<label>Alamat</label>'
                            +'<div class="input-control text">'
                                +'<input  placeholder="alamat" required type="text" name="alamatTB" id="alamatTB">'
                                +'<button class="btn-clear"></button>'
                            +'</div>'
                            +'<label>Keterangan</label>'
                            +'<div class="input-control textarea">'
                                +'<textarea placeholder="keterangan" name="keteranganTB" id="keteranganTB"></textarea>'
                            +'</div>'
                            +'<div class="form-actions">' 
                                +'<button class="button primary">simpan</button>&nbsp;'
                                +'<button class="button" type="button" onclick="$.Dialog.close()">Batal</button> '
                            +'</div>'
                        +'</form>';

    // button action
        $("#barkodeBC").on('click', function(){ 
            barkodeFR('');
        });
        $("#idBC").on('click', function(){ 
            idFR('');
        });
        $("#infoBC").on('click', function(){ 
            infoFR('');
        });
        $("#cetaklabel").on('click', function(){ 
            switchPN();
            cmblokasi();
        });

        // search button
        $('#cari_sirkulasiBC').on('click',function(){
            $('#cari_sirkulasiTR').toggle('slow');
            $('#memberS').val('');
            $('#barcodeS').val('');
            $('#judulS').val('');
        });
        $('#cari_statistikBC').on('click',function(){
            $('#cari_statistikTR').toggle('slow');
            $('#s_judulS').val('');
            $('#klasifikasiS').val('');
            $('#pengarangS').val('');
            $('#penerbitS').val('');
        });

        // default view
        loadView('','');
    }); 
// end of main function ---------

//paging ---
    function pagination(page,aksix,subaksi){ 
        var aksi ='aksi='+aksix+'&subaksi='+subaksi+'&starting='+page;
        var cari ='';
        var el,el2;

        if(subaksi!=''){ // multi paging 
            el  = '.'+subaksi+'_cari';
            el2 = '#'+subaksi+'_tbody';
        }else{ // single paging
            el  = '.cari';
            el2 = '#tbody';
        }

        $(el).each(function(){
            var p = $(this).attr('id');
            var v = $(this).val();
            cari+='&'+p+'='+v;
        });

        $.ajax({
            url:dir,
            type:"post",
            data: aksi+cari,
            beforeSend:function(){
                $(el2).html('<tr><td align="center" colspan="10"><img src="img/w8loader.gif"></td></tr></center>');
            },success:function(dt){
                setTimeout(function(){
                    $(el2).html(dt).fadeIn();
                },1000);
            }
        });
    }
//end of paging ---


// load form (all)
    function loadFR(titl,cont,inpArr){        
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            width: 500,
            padding: 10,
            onShow: function(){
                $.Dialog.title(titl); 
                $.Dialog.content(cont);
                  
                if(inpArr!=null){ // main form : set value fields 
                    $.each(inpArr,function (id,item) {
                       $('#'+id).val(item);
                    });
                }
            }
        });
    }

/* form ID (add & edit) */
   // function pinjamFR(id){
   //      if(id!=''){ // edit mode
            
   //      }else{ // add  mode
   //          var titl   ='<i class="icon-plus-2"></i> Tambah ';
   //          var inpArr ={"tgl_pinjamTB":getToday(),"tgl_kembaliTB":getLastDate};
   //          loadFR(titl,pinjam_contentFR,inpArr);
   //          cmblokasi();
   //      }

   //  }
    function idFR(id){
        if(id!=''){ // edit mode
            
        }else{ // add  mode
            var titl   ='<i class="icon-plus-2"></i> Edit Format Nomor ID ';
            var inpArr ={"tgl_pinjamTB":getToday(),"tgl_kembaliTB":getLastDate};
            loadFR(titl,settingFR,inpArr);
        }
    }

/* form Barkode (add & edit) */
    function barkodeFR(id){
        if(id!=''){ // edit mode
                    $.ajax({
                        url:dir,
                        data:'aksi=ambiledit&subaksi=barkode&replid='+id,
                        type:'post',
                        dataType:'json',
                        success:function(dt){
                            $('#barkode_formH').val(id);
                            $('#f_barkodeTB').val(dt.nilai);
                        }
                    });        
            
        }else{ // add  mode
            var titl   ='<i class="icon-plus-2"></i> Edit Format Barkode item ';
            var inpArr ={"tgl_pinjamTB":getToday(),"tgl_kembaliTB":getLastDate};
            loadFR(titl,barkode_contentFR,inpArr);
        }
    }

/* form Cetak Label (add & edit) */
        function infoFR(id){
            if(id!=''){ // edit mode
                
            }else{ // add  mode
                var titl   ='<i class="icon-plus-2"></i> Edit Cetak Label';
                var inpArr ={"tgl_pinjamTB":getToday(),"tgl_kembaliTB":getLastDate};
                loadFR(titl,info_contentFR,inpArr);
            }
        }

/*view*/

        function view(kunci){  
            var res='';
            var aksi ='aksi=tampil&subaksi=setting&kunci='+kunci;
            return $.ajax({
                url : dir,
                type: 'post',
                data: aksi,
                dataType:'json'
            });
        }
        function loadView(id,kunci){
            if(kunci!=''){ //edit
                view(kunci).done(function(dt){
                    detSetting(kunci);
                });
            }else{ //view --> all 
                view('idfmt').done(function(dt){
                    $('#idTB').val(dt.row);
                });
                view('labelt').done(function(dt){
                    $('#barkodeTB').val(dt.row);
                });
            }
        }
        function detSetting (id){
            $.ajax({
                url:dir,
                data:'aksi=tampil&subaksi=detSetting&kunci='+id,
                type:'post',
                dataType:'json',
                success:function(dt){
                    // console.log(dt);
                    if(dt.status!='sukses'){
                        notif(dt.status,'red');
                    }else{
                        // data detail barang
                        $('#f_idTB').val(data.kunci);
                        var tbl='';
                        $.each(dt.data,function(id,item){
                            var btn;
                            tbl+='<tr>'
                                +'<td><input type="checkbox" dp="'+item.kunci+'" brg="'+item.replid+'" /></td>'
                                +'<td>'+item.nilai+'</td>'
                                +'<td>'+item.keterangan+'</td>'
                            +'</tr>';
                        });$('#idTBL').html(tbl);
                        loadFR('titl',settingFR);
                    }
                }
            });            
        }


        // function viewBarkode(){  
        //     var aksi ='aksi=tampil&subaksi=barkode';
        //     $.ajax({
        //         url : dir,
        //         type: 'post',
        //         data: aksi,
        //         success:function(dt){
        //                 $('#barkodeTB').val(dt);
        //         }
        //     });
        // }
        // function viewJudul(){  
        //     var aksi ='aksi=tampil&subaksi=judul';
        //     $.ajax({
        //         url : dir,
        //         type: 'post',
        //         data: aksi,
        //         success:function(dt){
        //                 $('#judulTB').val(dt);
        //         }
        //     });
        // }
        // function viewDeskripsi(){  
        //     var aksi ='aksi=tampil&subaksi=deskripsi';
        //     $.ajax({
        //         url : dir,
        //         type: 'post',
        //         data: aksi,
        //         success:function(dt){
        //                 $('#deskripsiTB').val(dt);
        //         }
        //     });
        // }

// fungsi AJAX : asyncronous
    // function ajaxFC (u,d) {
    //     return $.ajax({
    //         url:u,
    //         type:'post',
    //         dataType:'json',
    //         data:d
    //     });
    // }

// input uang --------------------------
    // function inputuang(e) {
    //     $(e).maskMoney({
    //         precision:0,
    //         prefix:'Rp. ', 
    //         // allowNegative: true, 
    //         thousands:'.', 
    //         // decimal:',', 
    //         affixesStay: true
    //     });
    // }
// end of input uang --------------------------

// notifikasi
    function notif(cont,clr) {
        var not = $.Notify({
            caption : "<b>Notifikasi</b>",
            content : cont,
            timeout : 3000,
            style :{
                background: clr,
                color:'white'
            },
        });
    }
// end of notifikasi

//end of  print to PDF -------
    function printPDF(mn){
        var par='',tok='',p,v;
        $('.'+mn+'_cari').each(function(){
            p=$(this).attr('id');
            v=$(this).val();
            par+='&'+p+'='+v;
            tok+=v;
        });var x  = $('#id_loginS').val();
        var token = encode64(x+tok);
        window.open('report/r_'+mn+'.php?token='+token+par,'_blank');
    }

// left pad (replace with 0)
    function lpadZero (n, length){
        var str = (n > 0 ? n : -n) + "";
        var zeros = "";
        for (var i = length - str.length; i > 0; i--)
            zeros += "0";
        zeros += str;
        return n >= 0 ? zeros : "-" + zeros;
    }

/*about date*/ 
// get month format -------------
    function monthFormat(mon){
        switch(mon){
            case 1:return 'Jan';break;
            case 2:return 'Feb';break;
            case 3:return 'Mar';break;
            case 4:return 'Apr';break;
            case 5:return 'May';break;
            case 6:return 'Jun';break;
            case 7:return 'Jul';break;
            case 8:return 'Aug';break;
            case 9:return 'Sep';break;
            case 10:return 'Oct';break;
            case 11:return 'Nov';break;
            case 12:return 'Dec';break;
        }
    }

//date format -----------------
    function dateFormatx(typ,d,m,y){
        if(typ=='id') // 25 Dec 2014
            return d+' '+m+' '+y;
        else // 2014-12-25
            return y+'-'+m+'-'+d;
    }

//global u/ tanggal --------
    var now  = new Date();
    var dd   = now.getDate();
    var mm   = now.getMonth()+1;
    var yyyy = now.getFullYear();

//tanggal terakhir : dd
    function lastDate(m,y){
        return 32 - new Date(y, (m-1), 32).getDate();
    }
// tanggal hari ini : dd mm yyyy
    function getToday() {
        // function addLeadingZeros (n, length){
        return dateFormatx('id',lpadZero(dd,2),monthFormat(mm),yyyy);
    }
// tanggal pertama bulan ini : dd mm yyyy 
    function getFirstDate() {
        return dateFormatx('id','01',monthFormat(mm),yyyy);
    }
// tanggal terakhir bulan ini  : dd mm yyyy
    function getLastDate() {
        var dd = lastDate(mm,yyyy);
        return dateFormatx('id',dd,monthFormat(mm),yyyy);
    }

        
