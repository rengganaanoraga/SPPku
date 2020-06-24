<html>
    <title>Print Laporan - Pondok Pesantren Al Islam</title>
    <link rel="icon" href="<?=base_url()?>assets/img/logo_spp.png" type="image/x-icon" />
<body>
    
	<center>
 
		<img src="<?=base_url()?>assets/img/kop.png" alt="">
 
	</center>
    <center>
        <?php
            $hari = [
                "Monday" => "Senin",
                "Tuesday" => "Selasa",
                "Wednesday" => "Rabu",
                "Thursday" => "Kamis",
                "Friday" => "Jumat",
                "Saturday" => "Sabtu",
                "Sunday" => "Minggu"
            ]; 
            $bln= ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"] 
        ?>
        <p style="margin-top: 75px; width: 500px; text-align: left;">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pada hari ini <?php echo $hari[date('l')].", ".date('d')." ".$bln[date('m') - 1]." ".date('Y');?> buku cash pondok Al Islam dalam keadaan sebagai berikut.
        </p>
        <table style="width: 500px; border: none; text-align: left;">
            <tr>
                <td>Pengeluaran Bulan <?php echo $bulan?></td>
                <td>:</td>
                <td>Rp.<?php echo $pengeluaran;?></td>
            </tr>
            <tr>
                <td>Pemasukan Bulan <?php echo $bulan?></td>
                <td>:</td>
                <td>Rp.<?php echo $pemasukan;?></td>
            </tr>
            <tr>
                <td>Saldo Saat Ini </td>
                <td>:</td>
                <td>Rp.<?php echo $saldo;?></td>
            </tr>
        </table>
        <div style="width: 500px;">
        <p style="margin-top: 100px; margin-left: 300px;">Malang, <?php echo date('d')."/".$bln[date('m') - 1]."/".date('Y') ?></p>
            <div style="width: 33.3%; float:left; margin-top: 0px;">
                Ketua 
            </div>
            <div style="width: 33.3%; float:left; margin-top: 150px;">
                Pengasuh
            </div>
            <div style="width: 33.3%; float:left; margin-top: 0px;">
                Bendahara
            </div> 
        </div>
    </center>
 
	<script>
		window.print();
	</script>
 
</body>
</html>