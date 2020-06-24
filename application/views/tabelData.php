<div class="panel panel-default">
    <div class="panel-heading">                                
        <h3 class="panel-title">Data Tahunan</h3>
        <ul class="panel-controls">
            <li><a class="ambilData" onclick="lihatData()"><span class="fa fa-refresh"></span></a></li>
        </ul>                                
    </div>
    <div class="panel-body div_before_table">
        <table class="table datatable-siswa" style="overflow-x: scroll;">
            <thead>
                <tr>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <!-- <th>Jumlah Bayar</th> -->
                    <th>Terbayar</th>
                    <th>Tagihan</th>
                    <th>Kurang</th>
                </tr>
            </thead>
            <tbody>
                <?php $nomer = 1; foreach ($bulan as $bl) { 
                    $iuran = $this->M_spp->GetIuran($bl->nama_bulan,$tahun, $idSantri);
                    $pembayaran = $this->M_spp->GetPembayaran($bl->nama_bulan,$tahun, $idSantri);
                    $kurang = 200000 - ($pembayaran->jumlah + $iuran->jumlah);

                    ?>
                    <tr>
                        <td><?php echo $bl->nama_bulan;?></td>
                        <td><?php echo $tahun;?></td>
                        <td>
                            Rp.<?php
                            echo $pembayaran->jumlah +  $iuran->jumlah?>
                        </td>
                        <td>Rp.200000</td>
                        <td>Rp.<?php echo $kurang;?></td>
                    </tr>   
                <?php $nomer++;} ?>
            </tbody>
        </table>
    </div>
    <div class="panel-footer">
    </div>
</div>
<script type="text/javascript">
    SetHeight();
</script>