
var dir   = 'models/m_lokasi.php';
var dir2  = 'models/m_buku.php';
var dir3  = 'models/m_katalog.php';
var dir4  = 'models/m_penerbit.php';
var dir5  = 'models/m_pengarang.php';
var dir6  = 'models/m_koleksi.php';

var contentFR ='';

// main function ---
    $(document).ready(function(){
        contentFR += '<form autocomplete="off" onsubmit="simpan();return false;" id="koleksiFR">' 
                        +'<input id="idformH" type="hidden">' 
                        +'<label>Lokasi</label>'

                        +'<div class="input-control text">'
                            +'<input  type="hidden" name="lokasiH" id="lokasiH" class="span2">'
                            // +'<input enabled="enabled" name="lokasiTB" id="lokasiTB" class="span2">'
                            +'<input disabled="disabled" name="lokasiTB" id="lokasiTB" class="span2">'
                            +'<button class="btn-clear"></button>'
                        +'</div>'
                        
                        +'<label>Kode Tempat</label>'
                        +'<div class="input-control text">'
                            +'<input placeholder="kode tampat"  class="span2" required type="text" name="kodeTB" id="kodeTB">'
                            +'<button class="btn-clear"></button>'
                        +'</div>'

                        +'<label>Nama Tempat</label>'
                        +'<div class="input-control text">'
                            +'<input  placeholder="kode" required type="text" name="namaTB" id="namaTB">'
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

        /*
        load pertama kali (pilihn salah satu) :
        cmblokasi : bila ada combo box
        viewTB : jika tanpa combo box
        */

        //combo lokasi
        cmblokasi();
        
        //load table // edit by epiii
        // viewTB();

        //add form
        // $("#tambahBC").on('click', function(){
        //     viewFR('');
        // });

        //search action // edit by epiii
        $('#lokasiS').on('change',function (e){ // change : combo box
                viewTB($('#lokasiS').val());
        });
        $('#barkodeS').on('keydown',function (e){ // keydown : textbox
            if(e.keyCode == 13)
                viewTB($('#lokasiS').val());
        });$('#idbukuS').on('keydown',function (e){ // keydown : textbox
            if(e.keyCode == 13)
                viewTB($('#lokasiS').val());
        });$('#judulS').on('keydown',function (e){ // keydown : textbox
            if(e.keyCode == 13)
                viewTB($('#lokasiS').val());
        });$('#callnumberS').on('keydown',function (e){ // keydown : textbox
            if(e.keyCode == 13)
                viewTB($('#lokasiS').val());
        });$('#pengarangS').on('keydown',function (e){ // keydown : textbox
            if(e.keyCode == 13)
                viewTB($('#lokasiS').val());
        });$('#penerbitS').on('keydown',function (e){ // keydown : textbox
            if(e.keyCode == 13)
                viewTB($('#lokasiS').val());
        });

        // search button
        $('#cariBC').on('click',function(){
            $('#cariTR').toggle('slow');
            // $('#lokasiS').val('');
            $('#barkodeS').val('');
            $('#idbukuS').val('');
            $('#judulS').val('');
            $('#callnumberS').val('');
            $('#penerbitS').val('');
            $('#pengarangS').val('');
        });
    }); 
// end of main function ---

// combo departemen ---
    function cmblokasi(){
        $.ajax({
            url:dir,
            data:'aksi=cmblokasi',
            dataType:'json',
            type:'post',
            success:function(dt){
                var out='';
                if(dt.status!='sukses'){
                    out+='<option value="">'+dt.status+'</option>';
                }else{
                    $.each(dt.lokasi, function(id,item){
                        out+='<option value="'+item.replid+'">['+item.kode+'] '+item.nama+'</option>';
                    });
                    //panggil fungsi viewTB() ==> tampilkan tabel 
                    viewTB(dt.lokasi[0].replid); 
                }$('#lokasiS').html(out);
            }
        });
    }
//end of combo departemen ---

//save process ---
    // function simpan(){
    //     var urlx ='&aksi=simpan';
    //     // edit mode
    //     if($('#idformH').val()!=''){
    //         urlx += '&replid='+$('#idformH').val();
    //     }
    //     $.ajax({
    //         url:dir2,
    //         cache:false,
    //         type:'post',
    //         dataType:'json',
    //         data:$('form').serialize()+urlx,
    //         success:function(dt){
    //             if(dt.status!='sukses'){
    //                 cont = 'Gagal menyimpan data';
    //                 clr  = 'red';
    //             }else{
    //                 $.Dialog.close();
    //                 kosongkan();
    //                 viewTB($('#lokasiS').val());
    //                 cont = 'Berhasil menyimpan data';
    //                 clr  = 'green';
    //             }notif(cont,clr);
    //         }
    //     });
    // }
//end of save process ---

// view table ---
    function viewTB(lok){ //edit by epiii 
        var aksi ='aksi=tampil';
        var cari ='&lokasiS='+lok
                    +'&barkodeS='+$('#barkodeS').val()
                    +'&idbukuS='+$('#idbukuS').val()
                    +'&judulS='+$('#judulS').val()
                    +'&callnumberS='+$('#callnumberS').val()
                    +'&pengarangS='+$('#pengarangS').val()
                    +'&penerbitS='+$('#penerbitS').val();
        $.ajax({
            url : dir6,
            type: 'post',
            data: aksi+cari,
            beforeSend:function(){
                $('#tbody').html('<tr><td align="center" colspan="5"><img src="img/w8loader.gif"></td></tr></center>');
            },success:function(dt){
                setTimeout(function(){
                    $('#tbody').html(dt).fadeIn();
                },1000);
            }
        });
    }
// end of view table ---

// form ---
    // function viewFR(id){
    //     $.Dialog({
    //         shadow: true,
    //         overlay: true,
    //         draggable: true,
    //         width: 500,
    //         padding: 10,
    //         onShow: function(){
    //             var titlex;
    //             if(id==''){  //add mode
    //                 // alert('halooo');
    //                 titlex='<span class="icon-plus-2"></span> Tambah ';
    //                 $.ajax({
    //                     url:dir6,
    //                     data:'aksi=cmblokasi&replid='+$('#lokasiS').val(),
    //                     type:'post',
    //                     dataType:'json',
    //                     success:function(dt){
    //                         $('#lokasiTB').val(dt.lokasi[0].nama);
    //                         $('#lokasiH').val($('#lokasiS').val());
    //                     }
    //                 });
    //             }else{ // edit mode
    //                 titlex='<span class="icon-pencil"></span> Ubah';
    //                 $.ajax({
    //                     url:dir6,
    //                     data:'aksi=ambiledit&replid='+id,
    //                     type:'post',
    //                     dataType:'json',
    //                     success:function(dt){
    //                         $('#idformH').val(id);
    //                         $('#lokasiH').val($('#lokasiS').val()); // edit by epii
    //                         $('#lokasiTB').val(dt.lokasi);
    //                         $('#kodeTB').val(dt.kode);
    //                         $('#namaTB').val(dt.nama);
    //                         $('#keteranganTB').val(dt.keterangan);
    //                     }
    //                 });
    //             }$.Dialog.title(titlex+' '+mnu); // edit by epiii
    //             $.Dialog.content(contentFR);
    //         }
    //     });
    // }
// end of form ---

//paging ---
    function pagination(page,aksix,menux){ // edit by epiii
        var datax = 'starting='+page+'&aksi='+aksix+'&menu='+menux;
        var cari ='&lokasiS='+lok
                    +'&barkodeS='+$('#barkodeS').val()
                    +'&idbukuS='+$('#idbukuS').val()
                    +'&judulS='+$('#judulS').val()
                    +'&callnumberS='+$('#callnumberS').val()
                    +'&pengarangS='+$('#pengarangS').val()
                    +'&penerbitS='+$('#penerbitS').val();
        $.ajax({
            url:dir,
            type:"post",
            data: datax+cari,
            beforeSend:function(){
                $('#tbody').html('<tr><td align="center" colspan="5"><img src="img/w8loader.gif"></td></tr></center>');
            },success:function(dt){
                setTimeout(function(){
                    $('#tbody').html(dt).fadeIn();
                },1000);
            }
        });
    }   
//end of paging ---
    
//del process ---
    // function del(id){
    //     if(confirm('melanjutkan untuk menghapus data?'))
    //     $.ajax({
    //         url:dir,
    //         type:'post',
    //         data:'aksi=hapus&replid='+id,
    //         dataType:'json',
    //         success:function(dt){
    //             var cont,clr;
    //             if(dt.status!='sukses'){
    //                 cont = '..Gagal Menghapus '+dt.terhapus+' ..';
    //                 clr  ='red';
    //             }else{
    //                 viewTB($('#lokasiS').val());
    //                 cont = '..Berhasil Menghapus '+dt.terhapus+' ..';
    //                 clr  ='green';
    //             }
    //             notif(cont,clr);
    //         }
    //     });
    // }
//end of del process ---

// notifikasi
// function notif(cont,clr) {
//     var not = $.Notify({
//         caption : "<b>Notifikasi</b>",
//         content : cont,
//         timeout : 3000,
//         style :{
//             background: clr,
//             color:'white'
//         },
//     });
// }
// end of notifikasi

//reset form ---
    // function kosongkan(){
    //     $('#idformTB').val('');
    //     $('#namaTB').val('');
    //     $('#keteranganTB').val('');
    // }
//end of reset form ---

    // ---------------------- //
    // -- created by rovi  -- //
    // ---------------------- // 