<div class="form-group">
    <div class="col-md-3 col-xs-4">
        <label><b>Tahun</b></label>
    </div>
    <div class="col-md-9 col-xs-8">
        <select style="width:100%;" class="form-control select metode-bayar">
        	<option>Pilih Tahun</option>
            <?php 
                for($i=date('Y');$i>=2010;$i--){
                    ?>
                    <option value="<?php echo $i; ?>" id="filterTahun"><?php echo $i; ?></option>
            <?php    }
            ?>
        </select>
    </div>
</div>
<!-- <script type="text/javascript">
	base_url = "<?php echo base_url();?>";
        getclick();

        function getclick(){
            $.ajax({
                type: "POST",
                url: base_url + "C_spp",
                data: {act:"GetData"},
                tryCount: 0,
                retryLimit: 3,
                beforeSend: function(){
                    $("tbody").html("");
                    SetHeight();
                },
                success: function(resp){
                    /*var list_siswa = "";
                    $.each(resp.Data, function(index, item){
                        list_siswa += "<tr><td>"+item.bulan+"</td><td>"+item.tahun+"</td><td>"+item.jumlah_bayar+"</td><td>200000</td></tr>";
                    });
                    $('.div_before_table').html('<table class="table datatable-siswa"><thead><tr><th>Bulan</th><th>Tahun</th><th>Jumlah Bayar</th><th>Tagihan</th></tr></thead><tbody><tr></tr></tbody></table>');
                    $("tbody").html(list_siswa);*/
                    $('#tabelsantri').html(resp);
                    SetHeight();
                },
                error: function(xhr, textstatus, errorthrown){
                    alert("error");
                    SetHeight();
                }
            });
        }
</script> -->