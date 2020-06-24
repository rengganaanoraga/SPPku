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
                    <th>No</th>
                    <th>Deskripsi</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php $no = 0; foreach ($cash as $bl) { $no++;
                        if ($bl->status == 0) {
                            $bl->status = 'Masuk'; 
                        } else {
                            $bl->status = 'Keluar';
                        } ?>
                     
                    <tr>
                        <td><?php echo $no; ?></td>
                        <td><?php echo $bl->deskripsi;?></td>
                        <td>Rp.<?php echo $bl->jumlah;?></td>
                        <td>
                            <div class="<?php if ($bl->status == 'Keluar') { 
                                echo 'btn btn-danger';
                            } elseif($bl->status == 'Masuk') {
                                echo 'btn btn-info';
                            } ?>" style="cursor: default;"><?php echo $bl->status; ?></div>
                        </td>
                    </tr>  
                <?php } ?>
            </tbody>
        </table>
    </div>
    <div class="panel-footer row">
        <h2 class="text-panel col-md-6 col-xs-6" style="color: #1caf9a; font-weight: bold;">
            Saldo Bulan ini : Rp. 
            <?php
                $saldo = $this->M_cash->GetSaldo($bulan, $tahun);
                $jumlahSaldo = $saldo->jumlah;
                $pengeluaran = $this->M_cash->GetPengeluaran($bulan, $tahun);
                $jumlahPengeluaran = $pengeluaran->jumlah;
                if ($jumlahPengeluaran == null) {
                    $jumlahPengeluaran = 0;
                }
                $as = $jumlahSaldo-$jumlahPengeluaran;
                echo $as;
             ?>
        </h2>
        <div class="col-md-6 col-xs-6">
            <a href="<?php echo base_url('index.php/C_cash/Print/'.$bulan.'/'.$tahun.'/'.$as.'/'.$jumlahPengeluaran.'/'.$jumlahSaldo)?>"><button class="btn btn-info pull-right"><span class="fa fa-print"></span>Print</button></a>
        </div>
    </div>
</div>
<script type="text/javascript">
    SetHeight();
</script>