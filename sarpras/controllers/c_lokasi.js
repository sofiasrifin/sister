var mnu       ='lokasi';
var dir       ='models/m_'+mnu+'.php';
var contentFR ='';

// main function ---
    $(document).ready(function(){
        contentFR += '<form autocomplete="off" onsubmit="simpan();return false;" id="'+mnu+'FR">' 
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
                        +'<label>Kontak</label>'
                        +'<div class="input-control text">'
                            +'<input  placeholder="kontak / no telp" required type="text" name="kontakTB" id="kontakTB">'
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

        //combo departemen
        // cmbdepartemen();
        
        //load table
        viewTB();

        //add form
        $("#tambahBC").on('click', function(){
            viewFR('');
        });

        //search action
        $('#kodeS').keydown(function (e){
            if(e.keyCode == 13)
                viewTB();
        });$('#namaS').keydown(function (e){
            if(e.keyCode == 13)
                viewTB();
        });$('#alamatS').keydown(function (e){
            if(e.keyCode == 13)
                viewTB();
        });$('#kontakS').keydown(function (e){
            if(e.keyCode == 13)
                viewTB();
        });$('#keteranganS').keydown(function (e){
            if(e.keyCode == 13)
                viewTB();
        });

        // search button
        $('#cariBC').on('click',function(){
            $('#cariTR').toggle('slow');
            $('#kodeS').val('');
            $('#namaS').val('');
            $('#alamatS').val('');
            $('#kontakS').val('');
            $('#keteranganS').val('');
        });
    }); 
// end of main function ---

//save process ---
    function simpan(){
        var urlx ='&aksi=simpan';
        // edit mode
        if($('#idformH').val()!=''){
            urlx += '&replid='+$('#idformH').val();
        }
        $.ajax({
            url:dir,
            cache:false,
            type:'post',
            dataType:'json',
            data:$('form').serialize()+urlx,
            success:function(dt){
                if(dt.status!='sukses'){
                    cont = 'Gagal menyimpan data';
                    clr  = 'red';
                }else{
                    $.Dialog.close();
                    kosongkan();
                    viewTB($('#lokasiS').val());
                    cont = 'Berhasil menyimpan data';
                    clr  = 'green';
                }
                notif(cont,clr);
            }
        });
    }
//end of save process ---

// view table ---
    function viewTB(kode){
        var aksi ='aksi=tampil';
        // edit by epiii
        var cari = '&kodeS='+$('#kodeS').val()
                    +'&namaS='+$('#namaS').val()
                    +'&alamatS='+$('#alamatS').val()
                    +'&kontakS='+$('#kontakS').val()
                    +'&keteranganS='+$('#keteranganS').val();
        $.ajax({
            url : dir,
            type: 'post',
            // data: aksi,
            data: aksi+cari, //edit by epiii
            beforeSend:function(){
                $('#tbody').html('<tr><td align="center" colspan="6"><img src="img/w8loader.gif"></td></tr></center>');
            },success:function(dt){
                setTimeout(function(){
                    $('#tbody').html(dt).fadeIn();
                    // $('#tbody').delay(4000).fadeIn().html(data);
                },1000);
            }
        });
    }
// end of view table ---

// form ---
    function viewFR(id){
        $.Dialog({
            shadow: true,
            overlay: true,
            draggable: true,
            width: 500,
            padding: 10,
            onShow: function(){
                var titlex;
                if(id==''){  //add mode
                    titlex='<span class="icon-plus-2"></span> Tambah ';
                    $.ajax({
                        url:dir,
                        data:'aksi=replid',
                        type:'post',
                        dataType:'json',
                        success:function(dt){
                            $('#lokasiH').val($('#lokasiS').val());
                            $('#lokasiTB').val(dt.lokasi[0].kode);
                        }
                    });

                }else{ // edit mode
                    titlex='<span class="icon-pencil"></span> Ubah';
                    $.ajax({
                        url:dir,
                        data:'aksi=ambiledit&replid='+id,
                        type:'post',
                        dataType:'json',
                        success:function(dt){
                            $('#idformH').val(id);
                            $('#lokasiH').val($('#lokasiS').val());
                            $('#kodeTB').val(dt.kode);
                            $('#namaTB').val(dt.nama);
                            $('#alamatTB').val(dt.alamat);
                            // $('#alamatTB').val(dt.aolamat);
                            $('#kontakTB').val(dt.kontak);
                            $('#keteranganTB').val(dt.keterangan);
                        }
                    });
                }$.Dialog.title(titlex+' '+mnu);
                $.Dialog.content(contentFR);
            }
        });
    }
// end of form ---

//paging ---
    function pagination(page,aksix,menux){
        var datax = 'starting='+page+'&aksi='+aksix+'&menu='+menux;
        var cari = '&kodeS='+$('#kodeS').val()
                    +'&namaS='+$('#namaS').val()
                    +'&alamatS='+$('#alamatS').val()
                    +'&kontakS='+$('#kontakS').val()
                    +'&keteranganS='+$('#keteranganS').val();
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
    function del(id){
        if(confirm('melanjutkan untuk menghapus data?'))
        $.ajax({
            url:dir,
            type:'post',
            data:'aksi=hapus&replid='+id,
            dataType:'json',
            success:function(dt){
                var cont,clr;
                if(dt.status!='sukses'){
                    cont = '..Gagal Menghapus '+dt.terhapus+' ..';
                    clr  ='red';
                }else{
                    viewTB($('#lokasiS').val());
                    cont = '..Berhasil Menghapus '+dt.terhapus+' ..';
                    clr  ='green';
                }
                notif(cont,clr);
            }
        });
    }
//end of del process ---
    
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

//reset form ---
    function kosongkan(){
        $('#idformTB').val('');
        $('#kodeTB').val('');
        $('#namaTB').val('');
        $('#alamatTB').val('');
        $('#kontakTB').val('');
        $('#keteranganTB').val('');
    }
//end of reset form ---

    // ---------------------- //
    // -- created by rovi  -- //
    // ---------------------- // 