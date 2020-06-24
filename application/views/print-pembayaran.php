<?php 

?>
<html>
<head>
	<title>Nota</title>
</head>
<body>
 
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
		<h2>Pembayaran SPP Pondok Pesantren Al Islam</h2>
		<h4>Pada hari ini <?php echo $hari[date('l')].", ".date('d')." ".$bln[date('m') - 1]." ".date('Y');?> buku iuran pondok Al Islam.</h4>
 
	</center>
	<center>
		<table style="width: 50%; ">
			<?php
			foreach ($dataBayar as $d) {
				?>
				<tr >
					<td style="width: 80%;"><?php echo $d->bulan; ?></td>
					<td style="width: 5%;">:</td>
					<td style="width: 15%;">Rp. <?php echo $d->jumlah_bayar + 15000; ?></td>
				</tr>
				<?php
			 } 
			?>
			<tr>
				<td colspan="3"><hr></td>
			</tr>
			<tr>
				<td style="width: 80%;">Total Bayar</td>
				<td style="width: 5%;">:</td>
				<td style="width: 15%;">Rp. <?php echo $jumlahBayar->jumlah+$TotalIuran->jumlah;?></td>
			</tr>
			<tr>
				<td colspan="3">
		<p>* sudah termasuk iuran sebesar Rp. 15.000 per Bulan.</p></td>
			</tr>
		</table>
	</center>
 
	<script>
		window.print();
	</script>
 
</body>
</html>