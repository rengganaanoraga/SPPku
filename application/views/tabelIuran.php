<div class="panel panel-default">
    <div class="panel-heading">                                
        <h3 class="panel-title">Data Tahunan</h3>
        <ul class="panel-controls">
            <li><a class="ambilData" style="cursor: pointer;" title="Tambah Data" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap"><span class="fa fa-plus"></span></a></li>
        </ul>                                
    </div>
    
    <div class="panel-body div_before_table" style="overflow-x: scroll;">
        <table class="table datatable-siswa">
            <thead>
                <tr>
                    <th>Jumlah Iuran</th>
                    <th>Deskripsi Iuran</th>
                    <th>Status Iuran</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($iuran as $i) {
                    if ($i->status_iuran == 0) {
                        $i->status_iuran = 'Masuk'; 
                    } else {
                        $i->status_iuran = 'Keluar';
                    } ?>
                    <tr>
                        <td>Rp.<?php echo $i->jumlah_iuran;?></td>
                        <td><?php echo $i->deskripsi_iuran;?></td>
                        <td>
                            <div class="<?php if ($i->status_iuran == 'Keluar') { 
                                    echo 'btn btn-danger';
                                } elseif($i->status_iuran == 'Masuk') {
                                    echo 'btn btn-info';
                                } ?>"><?php echo $i->status_iuran; ?></div>
                        </td>
                    </tr>   
                <?php } ?>
            </tbody>
        </table>
    </div>
    <div class="panel-footer">
        <h2 class="text-panel col-md-6 col-xs-6" style="color: #1caf9a; font-weight: bold;">
            Saldo Bulan ini : Rp. 
            <?php
                $sl = $this->M_iuran->GetSaldoIuran($bulan, $tahun);
                $pengeluaranIuran = $this->M_iuran->GetPengeluaran($bulan, $tahun);
                if ($pengeluaranIuran->jumlah == null) {
                    $pengeluaranIuran->jumlah = 0;
                }
                $saldo = $sl->jumlah-$pengeluaranIuran->jumlah;
                $pemasukan = $sl->jumlah;
                echo $saldo;
            ?>
        </h2>
        <div class="col-md-6 col-xs-6">
            <a href="<?php echo base_url('index.php/C_iuran/Print/'.$bulan.'/'.$tahun.'/'.$saldo.'/'.$pengeluaranIuran->jumlah.'/'.$pemasukan)?>"><button class="btn btn-info pull-right" onclick="" ><span class="fa fa-print"></span>Print</button></a>
        </div>
    </div>
    
</div>

<script type="text/javascript">
    SetHeight();
</script>