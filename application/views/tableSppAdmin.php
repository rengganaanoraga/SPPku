<div class="panel panel-default">
    <div class="panel-heading">                                
        <h3 class="panel-title">Data Tahunan</h3>
        <ul class="panel-controls">
            <li><a class="ambilData"><span class="fa fa-refresh"></span></a></li>
        </ul>                                
    </div>
    <div class="panel-body div_before_table"  style="overflow-x: scroll;">
        <table class="table datatable-siswa">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <th>Jumlah Bayar</th>
                    <th>Terbayar</th>
                    <th>Tagihan</th>
                    <th>Kurang</th>
                    <th>Status</th>
                    <th><input type='checkbox' onchange='handleChange(this);'></th>
                </tr>
            </thead>
            <tbody>
                <?php $nomer = 1; foreach ($bulan as $bl) { 
                    $val = 0;
                    $iuran = $this->M_spp->GetIuran($bl->nama_bulan,$tahun, $idSantri);
                    $pembayaran = $this->M_spp->GetPembayaran($bl->nama_bulan,$tahun, $idSantri);
                    $jmlbyr = $pembayaran->jumlah;
                    $tagih = $this->M_spp->GetTagihan($tahun,$idSantri,$bl->nama_bulan);
                    if ($tagih) {
                        $tgh=$tagih->tagihan;
                    }else{
                        $tgh=$tagihan;
                    }
                    $kurang = $tgh - ($pembayaran->jumlah + $iuran->jumlah);
                    
                    ?>
                    <tr class="trkurang">
                        <td><div id="bulan<?php echo $bl->id_bulan;?>"><?php echo $bl->nama_bulan ?></div></td>
                        <td><?php echo $tahun;?></td>
                        <td class="tdkurang">Rp.<input type="number" onchange="checkTotal()" id="bayar<?php echo $bl->id_bulan;?>" value="<?php echo $val ?>" <?php if ($kurang == 0 ) {
                            echo "disabled";
                        } ?>>
                        </td>
                        <td>
                            Rp.<?php
                            echo $pembayaran->jumlah + $iuran->jumlah;?>
                        </td>
                        <td>Rp. <?php echo $tgh; ?></td>
                        <td id="kurang<?php echo $bl->id_bulan; ?>">Rp.<?php echo $kurang;?></td>
                        <td><div class="<?php if ($kurang == 0 ) {
                            echo "btn btn-info";
                        }else{ echo "btn btn-danger";} ?>" disabled><?php if ($kurang == 0 ) {
                            echo "Lunas";
                        }else{ echo "Belum Lunas";} ?></div></td>
                        <td><input type="checkbox" onchange="UbahData(this, '<?php echo $bl->id_bulan; ?>','<?php echo $kurang;?>');" id="check<?php echo $bl->id_bulan;?>" <?php if ($kurang == 0) {echo "disabled";} ?>></td>
                    </tr>   
                <?php $nomer++;} ?>
            </tbody>
        </table>  
    </div>
  
    <div class="panel-footer">
        <div class="col-md-9">
            <h4 id="totalBayar">Total Bayar : Rp. 0,-</h4>
        </div>
        <div class="col-md-3 float-right">
            <a  onclick="Bayar()">
                <button class="btn btn-info pull-right" >Bayar</button>
            </a>
        </div>
    </div>
</div>


<script type="text/javascript">
    SetHeight();
    function bayarSemua() {
        for (var i = 1; i <=12;  i++) {
            document.getElementById("check"+i).checked = true;

        }
    }
    function handleChange(checkbox) {
        if(checkbox.checked == true){
            for (var i = 1; i <= 12;  i++) {
                if (document.getElementById('check'+i).disabled == true) {
                    document.getElementById("check"+i).checked = true;
                    document.getElementById('bayar'+i).value = "0";
                }else{
                    document.getElementById("check"+i).checked = true;
                    document.getElementById('bayar'+i).value = "200000";
                    checkTotal();
                }
            }
        }else if(checkbox.checked == false){
            for (var i = 1; i <=12;  i++) {
                if (document.getElementById("check"+i).disabled == true) {
                    document.getElementById("check"+i).checked = true;
                }else{
                    document.getElementById("check"+i).checked = false;
                    document.getElementById('bayar'+i).value = "0";
                }
            }
       }
   }   
   
    function UbahData(checkbox, idBulan, kurang) {
       if (checkbox.checked == true) {
        document.getElementById('bayar'+idBulan).value = kurang;
        checkTotal();
       }else{
        document.getElementById('bayar'+idBulan).value = 0;
        checkTotal();
       }
   }
    function checkTotal() {
        var totalBayar = 0;
        var jumlah = 0;
        var txt = "Rp.";
        for (var i = 1; i <= 12 ; i++) {
            
        jumlah = eval(document.getElementById('bayar'+i).value);
        totalBayar = jumlah + totalBayar;
        }
        document.getElementById("totalBayar").innerHTML = "Total Bayar : Rp. "+totalBayar+",-";
    }
    function Bayar() {
        var bayar;
        var jmlbyr;
        for (var i = 1; i <= 12; i++) {
            if (document.getElementById('bayar'+i).value == 0) {

            }else{
              $.ajax({
                type:"post",
                url:"<?php echo base_url('index.php/C_spp/BayarSpp'); ?>",
                data:"nama="+document.getElementById('bulan'+i).innerHTML+"&tahun=<?php echo $tahun; ?>"+"&idSantri=<?php echo $idSantri;?>&bayar="+eval(document.getElementById('bayar'+i).value)+"&tagihan=<?php echo $tagihan; ?>",
                cache:false,
                success: function(msg){
                    $("#tableData").html(msg);
                }
              });
            }
        }
        alert('Sukses');
        // window.open("<?php echo base_url('index.php/C_spp/PrintNota/'.$idSantri.'/'.$tahun);?>");
        window.location = '<?php echo base_url('index.php/C_spp/PrintNota/'.$idSantri.'/'.$tahun);?>', '_blank';

    }
</script>